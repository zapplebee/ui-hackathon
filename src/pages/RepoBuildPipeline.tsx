import { useQuery } from "@tanstack/react-query";
import { Base64 } from "js-base64";
import { useSearchParams } from "react-router-dom";
import { BuildsService, PipelinesService } from "../api";
import { DetailsPanel } from "../components/DetailsPanel";
import { LogsDisplay } from "../components/LogsDisplay";
import { useBuildNumberParam } from "../library/hooks/useBuildNumberParam";
import { useOrgParam } from "../library/hooks/useOrgParam";
import { useRepoParam } from "../library/hooks/useRepoParam";

export function RepoBuildPipeline() {
  const org = useOrgParam();
  const repo = useRepoParam();
  const buildNumber = useBuildNumberParam();

  const [searchParams, setSearchParams] = useSearchParams();

  const expand = searchParams.has("expand");

  const build = useQuery({
    // enabled: shouldRefetch,
    queryKey: ["build", org, repo, buildNumber],
    queryFn: () => BuildsService.getBuild(org, repo, buildNumber),
  });

  const pipeline = useQuery({
    enabled: build.isSuccess,
    queryKey: ["pipeline", org, repo, build.data?.commit],
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    queryFn: () => PipelinesService.getPipeline(org, repo, build.data?.commit!),
  });

  const pipelineExpanded = useQuery({
    enabled: build.isSuccess && expand,
    queryKey: ["pipeline-expanded", org, repo, build.data?.commit],
    queryFn: () =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      PipelinesService.expandPipeline(org, repo, build.data?.commit!),
  });

  const templates = useQuery({
    enabled: build.isSuccess,
    queryKey: ["pipeline-templates", org, repo, build.data?.commit],
    queryFn: () =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      PipelinesService.getTemplates(org, repo, build.data?.commit!, "json"),
  });

  const pipelineFile = expand
    ? pipelineExpanded.isSuccess && pipelineExpanded.data
      ? (pipelineExpanded.data ?? "").trim().split("\n")
      : []
    : pipeline.isSuccess && pipeline.data
    ? Base64.decode(pipeline.data.data ?? "")
        .trim()
        .split("\n")
    : [];

  const templateEntries = Object.entries(
    templates.isSuccess ? templates.data : {},
  )
    // TODO: the __headers check is a workaround for the pagination headers issue
    .map(([name, template]) => (name === "__headers" ? null : template))
    .filter((a): a is NonNullable<typeof a> => !!a);

  return (
    <>
      <div className="border-b border-vela-lavender">
        <DetailsPanel>
          <div className="">Templates</div>
        </DetailsPanel>
      </div>
      {templates.isSuccess &&
        templateEntries.map((template) => {
          return (
            <div key={template.name} className="text-sm">
              <DetailsPanel>
                <dl className="grid grid-cols-[max-content_1fr] gap-y-1 gap-x-4">
                  <dt className="font-bold">Name</dt>
                  <dd>{template.name}</dd>

                  <dt className="font-bold">Source</dt>
                  <dd>{template.source}</dd>

                  <dt className="font-bold">Link</dt>
                  <dd>
                    <a href={template.link}>{template.link}</a>
                  </dd>
                </dl>
              </DetailsPanel>
            </div>
          );
        })}
      {templates.isSuccess && templateEntries.length === 0 ? (
        <div className="text-sm">
          <DetailsPanel>There are no templates for this pipeline.</DetailsPanel>
        </div>
      ) : null}

      <div className="my-4"></div>

      <div className="border-b border-vela-lavender">
        <DetailsPanel>
          <div className="">Pipeline configuration</div>
        </DetailsPanel>
      </div>
      <div className="border-b border-vela-coal-light text-sm">
        <DetailsPanel>
          <ul className="space-y-2">
            <li className="space-x-12">
              <button
                className="text-vela-cyan hover:underline"
                onClick={() => {
                  // todo this could be an abstracted hook
                  if (expand) {
                    searchParams.delete("expand");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.set("expand", "true");
                    setSearchParams(searchParams);
                  }
                }}
              >
                {expand ? "revert pipeline expansion" : "expand pipeline"}
              </button>
              <span className="p-0.5 bg-vela-coal-light text-xs">
                note: yaml fields will be sorted alphabetically when the
                pipeline is expanded.
              </span>
            </li>
            <li>
              <button className="text-vela-cyan hover:underline">
                download .vela.yml
              </button>
            </li>
          </ul>
        </DetailsPanel>
      </div>
      <div className="text-sm">
        <DetailsPanel padded={false}>
          <LogsDisplay
            id={`pipeline-123`}
            active={false}
            fetching={false}
            number={1}
            logs={pipelineFile}
          />
        </DetailsPanel>
      </div>
    </>
  );
}
