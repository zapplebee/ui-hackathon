import * as RadioGroup from "@radix-ui/react-radio-group";

import { Input } from "./formInputs/Input.tsx";
import { Textarea } from "./formInputs/TextArea.tsx";

import { Checkbox } from "./formInputs/Checkbox.tsx";

import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SecretsService } from "../api/index.ts";
import { SecretCorrected, SecretPost } from "../api/models/Secret.ts";
import { ExternalLink } from "./ExternalLink.tsx";
import { HelpText } from "./HelpText.tsx";
import { Loader } from "./Loader.tsx";
import { Notice } from "./Notice.tsx";
import { PageTitle } from "./PageTitle.tsx";
import { CheckboxContainer } from "./formInputs/CheckboxContainer.tsx";
import { FormControl } from "./formInputs/FormControl.tsx";
import { useToast } from "./toast/useToast.tsx";

export interface RepoSecretsFormWidgetProps {
  org: string;
  repo: string;
  secretName?: string;
  mode: "edit" | "add" | "view";
}

function Spacer() {
  return <div className="mb-2" />;
}

function Reverse({ children }: any) {
  return (
    <div className="flex flex-row-reverse items-center gap-4 [justify-content:start]">
      {children}
    </div>
  );
}

function SaveButton({ isLoading }: any) {
  if (isLoading) {
    return (
      <div className="btn-primary flex justify-center align-middle opacity-30">
        <Loader />
      </div>
    );
  }
  return <input type="submit" className="btn-primary" value="Save" />;
}

export function RepoSecretsFormWidget({
  org,
  repo,
  secretName,
  mode,
}: RepoSecretsFormWidgetProps) {
  const { register, handleSubmit, getValues, setValue, control } = useForm<any>(
    {
      defaultValues: async () => {
        if (mode === "add") {
          return {};
        }
        const resp = (await SecretsService.getSecret(
          "native",
          "repo",
          org!,
          repo,
          secretName!
        )) as unknown as SecretCorrected;

        return {
          secretName: resp.name,
          events: resp.events,
          allowCommands: JSON.stringify(resp.allow_command),
          allowedImages: resp.images,
        };
      },
    }
  );

  const { fields, swap, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "allowedImages", // unique name for your Field Array
  });

  const SuccessToast = useToast();
  const FailedToast = useToast();

  const addSecretMutation = useMutation({
    mutationFn: (data: any) => {
      console.log("repo secrets add widget payload", JSON.stringify(data));

      const createSecretBody: SecretPost = {
        org,
        repo,
        type: "repo",
        team: null,
        events: data.events,
        allow_command: data.allowCommands === "true",
        name: data.secretName,
        value:
          mode === "add" || data.secretValue !== "" ? data.secretValue : null,
        images: data.allowedImages,
      };

      if (mode === "add") {
        return SecretsService.createSecret(
          "native",
          "repo",
          org,
          repo,
          createSecretBody
        );
      }

      return SecretsService.updateSecrets(
        "native",
        "repo",
        org,
        repo,
        secretName as string,
        createSecretBody as any
      );
    },
    onError(error: any) {
      console.log({ error });
      FailedToast.publish();
    },
    onSuccess() {
      SuccessToast.publish();
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    addSecretMutation.mutate(data);
  };

  const { isLoading, isSuccess, failureReason } = addSecretMutation;

  const failureString =
    ((failureReason && typeof failureReason?.body) === "string"
      ? JSON.parse(failureReason?.body)?.error
      : failureReason?.body?.error) ?? "Unknown Error";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageTitle>Add Repo Secret</PageTitle>
        <div className="mb-4 mt-4 flex max-w-3xl items-center justify-between">
          <div className="flex w-full items-center gap-4">
            <div className="flex w-full flex-col gap-4">
              {/* Secret name */}
              <FormControl>
                <Input
                  placeholder="Secret Name"
                  label="Name"
                  {...register("secretName")}
                />
              </FormControl>

              {/* Secret Value */}
              <FormControl>
                <Textarea label="Value" {...register("secretValue")} />
              </FormControl>

              {/* Events */}
              <div className="flex items-center gap-2">
                <h3 className="font-bold">Limit to Events</h3>
                <div>
                  <HelpText>(at least one event must be selected)</HelpText>
                </div>
              </div>
              <Notice>
                Disclaimer: Native secrets do NOT have the pull_request event
                enabled by default. This is intentional to help mitigate
                exposure via a pull request against the repo. You can override
                this behavior, at your own risk, for each secret.
              </Notice>
              <div>
                <CheckboxContainer>
                  <Checkbox
                    label="Push"
                    {...register("events[]")}
                    value="push"
                  />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    label="Pull Request"
                    {...register("events[]")}
                    value="pull_request"
                  />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox label="Tag" {...register("events[]")} value="tag" />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    label="Comment"
                    {...register("events[]")}
                    value="comment"
                  />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    label="Deployment"
                    {...register("events[]")}
                    value="deployment"
                  />
                </CheckboxContainer>
              </div>

              {/* Allowed Images */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">Limit to Docker Images</h3>
                  <div>
                    <HelpText>
                      (Leave blank to enable this secret for all images)
                    </HelpText>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-4">
                  <div className="flex items-center gap-4">
                    <Input
                      label="Image name"
                      {...register("_allowedImageName")}
                    />
                  </div>
                  <button
                    type="button"
                    className="text-sm"
                    onClick={() => {
                      // todo: extract into handler?
                      const newValue = getValues("_allowedImageName").trim();

                      if (newValue === "") {
                        return;
                      }

                      const existingValues = getValues("allowedImages");
                      const set = [
                        ...new Set([
                          ...(existingValues ? existingValues : []),
                          newValue,
                        ]),
                      ];
                      setValue("allowedImages", set);
                      setValue("_allowedImageName", "");
                    }}
                  >
                    <div className="block h-6 w-6">add</div>
                  </button>
                </div>

                {fields.length === 0 ? (
                  <div className="ml-4 mr-4 bg-vela-coal-dark p-2 font-mono text-sm">
                    enabled for all images
                  </div>
                ) : null}
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4 pl-4">
                    <Input
                      label="Image Name"
                      disabled
                      {...register(`allowedImages.${index}`)}
                    />

                    <div>
                      <button
                        type="button"
                        className="text-sm"
                        onClick={() => remove(index)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3>Allow Commands</h3>
                  <div>
                    <HelpText>
                      ("No" will disable this secret in commands)
                    </HelpText>
                  </div>
                </div>

                <div>
                  <RadioGroup.Root
                    id="allow_commands"
                    className="flex flex-col gap-2.5"
                    defaultValue="true"
                    aria-label="Allow commands"
                  >
                    <div className="flex items-center">
                      <RadioGroup.Item
                        className="h-[25px] w-[25px] rounded-full border-2 border-vela-cyan bg-vela-coal-dark"
                        value="true"
                        id="r1"
                        {...register("allowCommands")}
                      >
                        <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:bg-vela-cyan after:content-['']" />
                      </RadioGroup.Item>
                      <label
                        className="pl-[15px] text-[15px] leading-none text-white"
                        htmlFor="r1"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroup.Item
                        className="h-[25px] w-[25px] rounded-full border-2 border-vela-cyan bg-vela-coal-dark"
                        value="false"
                        id="r2"
                        {...register("allowCommands")}
                      >
                        <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:bg-vela-cyan after:content-['']" />
                      </RadioGroup.Item>
                      <label
                        className="pl-[15px] text-[15px] leading-none text-white"
                        htmlFor="r2"
                      >
                        No
                      </label>
                    </div>
                  </RadioGroup.Root>
                </div>
              </div>

              <div className="text-sm">
                Need help?{" "}
                <ExternalLink
                  href="https://go-vela.github.io/docs/tour/secrets/"
                  rel=""
                >
                  Visit our docs!
                </ExternalLink>
              </div>
              {isSuccess ? (
                <Link
                  className="btn-primary"
                  to={`/${org}/${repo}/$/secrets/native}`}
                >
                  ← Back to Secrets
                </Link>
              ) : (
                <SaveButton isLoading={isLoading} />
              )}
              <SuccessToast.Component type="success" title="Success">
                Successfully saved your secret
              </SuccessToast.Component>
              <FailedToast.Component type="error" title="Error">
                {failureString}
              </FailedToast.Component>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
