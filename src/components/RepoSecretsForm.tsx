import * as RadioGroup from "@radix-ui/react-radio-group";

import { Input } from "./formInputs/Input.tsx";
import { Textarea } from "./formInputs/TextArea.tsx";

import { useMutation } from "@tanstack/react-query";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Link } from "react-router-dom";
import { SecretsService } from "../api/index.ts";
import { SecretCorrected, SecretPost } from "../api/models/Secret.ts";
import { getFailureText } from "../library/failure-reason.ts";
import { addStringToSetArray } from "../library/set-utils.ts";
import { ExternalLink } from "./ExternalLink.tsx";
import { HelpText } from "./HelpText.tsx";
import { Loader } from "./Loader.tsx";
import { Notice } from "./Notice.tsx";
import { PageTitle } from "./PageTitle.tsx";
import { Checkbox } from "./formInputs/Checkbox.tsx";
import { FormControl } from "./formInputs/FormControl.tsx";
import { useToast } from "./toast/useToast.tsx";

function SaveButton({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="btn-primary flex justify-center align-middle opacity-30">
        <Loader />
      </div>
    );
  }
  return <input type="submit" className="btn-primary" value="Save" />;
}

export interface RepoSecretsFormProps {
  org: string;
  repo: string;
  secretName?: string;
  mode: "edit" | "add" | "view";
}

interface FormValues {
  secretName: string;
  secretValue: string | null;
  events: ("pull_request" | "push" | "tag" | "comment" | "deployment")[];
  allowCommands: string;
  allowedImages: { value: string }[];
  _allowedImageName: string;
}

export function RepoSecretsForm({
  org,
  repo,
  secretName,
  mode,
}: RepoSecretsFormProps) {
  const { register, handleSubmit, getValues, setValue, control } =
    useForm<FormValues>({
      defaultValues: async () => {
        if (mode === "add") {
          return {
            secretName: "",
            secretValue: "",
            events: ["push", "tag", "deployment"],
            allowCommands: "true",
            allowedImages: [],
            _allowedImageName: "",
          };
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
          secretValue: resp.value,
          events: resp.events,
          allowCommands: JSON.stringify(resp.allow_command),
          allowedImages: resp.images.map((value) => ({ value })),
          _allowedImageName: "",
        };
      },
    });

  const { fields, remove } = useFieldArray({
    name: "allowedImages",
    control,
  });

  const SuccessToast = useToast();
  const FailedToast = useToast();

  const addSecretMutation = useMutation({
    mutationFn: (data: FormValues) => {
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
        images: data.allowedImages.map(({ value }) => value),
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
        createSecretBody
      );
    },
    onError() {
      // todo: is there a better way to programmatically populate the error state
      // for toasts if this happens? we can't pass in state here
      FailedToast.publish();
    },
    onSuccess() {
      SuccessToast.publish();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("form:", JSON.stringify(data, null, 2));
    addSecretMutation.mutate(data);
  };

  const { isLoading, isSuccess, failureReason } = addSecretMutation;

  const failureString = getFailureText(failureReason);

  return (
    <>
      <Checkbox label={"hi"} />
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
              <div className="space-y-2">
                <Controller
                  control={control}
                  name="events"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value?.includes("push")}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, "push"])
                          : field.onChange(
                              field.value?.filter((value) => value !== "push")
                            );
                      }}
                      label="Push"
                    />
                  )}
                />
                {/* <Controller
                  control={control}
                  name="events"
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      // onCheckedChange={(v) => {
                      //   console.log(v);
                      //   console.log(field);
                      // }}

                      label="Pull Request"
                      name="events"
                      value="pull_request"
                    />
                  )}
                /> */}

                {/* <Checkbox
                  label="Pull Request"
                  {...register("events")}
                  value="pull_request"
                /> */}

                {/* <Checkbox label="Tag" {...register("events")} value="tag" />

                <Checkbox
                  label="Comment"
                  {...register("events")}
                  value="comment"
                />

                <Checkbox
                  label="Deployment"
                  {...register("events")}
                  value="deployment"
                /> */}
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
                      const newValue = getValues("_allowedImageName").trim();
                      const existingValues = getValues("allowedImages");
                      const nextValues = addStringToSetArray(
                        newValue,
                        existingValues
                      );
                      setValue("allowedImages", nextValues);
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
                      {...register(`allowedImages.${index}.value` as const)}
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

              {/* Allow commands */}
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

              {/* Need help? */}
              <div className="text-sm">
                Need help?{" "}
                <ExternalLink
                  href="https://go-vela.github.io/docs/tour/secrets/"
                  rel=""
                >
                  Visit our docs!
                </ExternalLink>
              </div>

              {/* Save / back */}
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
