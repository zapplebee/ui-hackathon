import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Base64 } from "js-base64";
import { Helmet } from "react-helmet-async";
import { Build, BuildsService, Step, StepsService } from "../api";
import { BuildHistory } from "../components/BuildHistory";
import { BuildRow } from "../components/BuildRow";
import { Details } from "../components/Details";
import { DetailsPanel } from "../components/DetailsPanel";
import { Loader } from "../components/Loader";
import { TopBumper } from "../components/TopBumper";
import { useBuildNumberParam } from "../library/hooks/useBuildNumberParam";
import { useBuildsQuery } from "../library/hooks/useBuilds";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";

// using our own types in index.d.ts temporarily
import ansiHTML from "ansi-html-community";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { IconDownArrow } from "../components/IconDownArrow";
import { IconFailure } from "../components/IconFailure";
import { IconKilled } from "../components/IconKilled";
import { IconPause } from "../components/IconPause";
import { IconPending } from "../components/IconPending";
import { IconPlay } from "../components/IconPlay";
import { IconRunning } from "../components/IconRunning";
import { IconSuccess } from "../components/IconSuccess";
import { IconUpArrow } from "../components/IconUpArrow";
import { TimeTicker2 } from "../components/TimeTicker2";
import { REFETCH_INTERVAL } from "../library/constants";

export function RepoBuild() {
  const { org, repo } = useOrgRepoParams();
  const { buildNumber } = useBuildNumberParam();

  const { builds } = useBuildsQuery(org!, repo!, 1);

  const [shouldRefetch, setShouldRefetch] = useState(true);

  // this is absolutely ridiculous
  // react router will not unmount and mount
  // a component when the route elements are the same (even with different params)
  // meaning out central build history widget would exhibit wild behavior without this
  // we would be stalled out, because a shouldRefetch=false would be sticky
  // even though the props would somehow change from under it
  useEffect(() => {
    if (org && repo && buildNumber) {
      setShouldRefetch(true);
    }
  }, [org, repo, buildNumber]);

  const build = useQuery({
    enabled: shouldRefetch,
    queryKey: ["build", org, repo, buildNumber],
    queryFn: () => BuildsService.getBuild(org!, repo!, buildNumber),
    refetchInterval: REFETCH_INTERVAL,
    // todo: should not refetch if in terminal state
  });

  const steps = useQuery({
    enabled: shouldRefetch,
    queryKey: ["build-steps", org, repo, buildNumber],
    queryFn: () => StepsService.getSteps(org!, repo!, buildNumber, 1, 100),
    refetchInterval: REFETCH_INTERVAL,
    // todo: should not refetch if in terminal state
  });

  /**
   * We'll always fetch the build and steps at least once,
   * but we will detect if the finished timestamp is set to non-zero,
   * and if should refetch hasn't already been flipped (acting as our one time sentinel flag).
   * Then we'll set should refetch to false to stop build/step fetches.
   */
  useEffect(() => {
    if (
      shouldRefetch === true &&
      !!build.data &&
      typeof build.data.finished === "number" &&
      build.data.finished > 0
    ) {
      build.refetch();
      steps.refetch();
      setShouldRefetch(false);
    }
  }, [build, build.data?.finished, shouldRefetch, steps]);

  const queryClient = useQueryClient();

  const cancelBuildMutation = useMutation({
    mutationFn: () => {
      return BuildsService.cancelBuild(repo!, org!, buildNumber);
    },
    onSuccess() {
      // attempts to validate builds query cache
      queryClient.invalidateQueries({ queryKey: ["builds", org, repo] });
    },
    // todo: toast
  });

  const restartBuildMutation = useMutation({
    mutationFn: () => {
      return BuildsService.restartBuild(org!, repo!, buildNumber);
    },
    onSuccess() {
      // attempts to validate builds query cache
      queryClient.invalidateQueries({ queryKey: ["builds", org, repo] });
    },
    // todo: toast
  });

  // todo
  // consider fetching the logs for steps at the top level here instead

  if (builds.isLoading || build.isLoading || steps.isLoading) {
    return (
      <>
        <TopBumper />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Helmet>
        {build.isSuccess ? (
          <title>{`#${build.data.number} - ${org}/${repo} - Vela`}</title>
        ) : null}
      </Helmet>
      <TopBumper />
      <div>
        {builds.isSuccess ? (
          <div className="flex flex-col items-start justify-between gap-4 pb-4 sm:flex-row sm:items-center">
            <div>
              <BuildHistory
                org={org!}
                repo={repo!}
                current={buildNumber}
                builds={builds.data}
              />
            </div>
            <div className="flex gap-2">
              {build.data?.status === "running" ? (
                <button
                  className="btn-secondary flex items-center justify-between gap-2"
                  onClick={() => {
                    cancelBuildMutation.mutate();
                  }}
                >
                  <span>Cancel Build</span>
                  {cancelBuildMutation.isLoading ? (
                    <span className="text-white">
                      <Loader />
                    </span>
                  ) : null}
                </button>
              ) : null}
              <button
                className="btn-secondary flex gap-2"
                onClick={() => {
                  restartBuildMutation.mutate();
                }}
              >
                <span>Restart Build</span>
                {restartBuildMutation.isLoading ? (
                  <span className="text-white">
                    <Loader />
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        ) : null}
        {build.isSuccess ? (
          <BuildRow build={build.data} showActions={false} />
        ) : null}

        <div className="py-2"></div>

        {build.isSuccess && steps.isSuccess ? (
          <>
            <Steps
              steps={steps.data}
              org={org!}
              repo={repo!}
              build={build.data}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

interface StepsProps {
  steps: Step[];
  org: string;
  repo: string;
  build: Build;
}

interface StageWithSteps {
  name: string;
  steps: Step[];
  derived?: "init/clone" | "unstaged";
}

function Steps({ steps, org, repo, build }: StepsProps) {
  // get unique stages from the steps
  const stageNames = [
    ...new Set(
      steps.map((step) => step.stage).filter((item): item is string => !!item)
    ),
  ];

  const hasStagesDefined = stageNames.length > 0;

  let stagesWithSteps = [];

  if (hasStagesDefined) {
    // rebuild the stages as an array, with stage name
    // and its respective set of steps
    // and leave room for other properties
    // the `reverse` enforce the order of the stages
    // but there is no ordinal or number for stages
    // so we rely on Set not changing their order which is dangerous
    // todo: special handling for 0 stages present (post init removal?)
    stagesWithSteps = stageNames
      .reduce<StageWithSteps[]>((acc, stageName) => {
        // skip `init` / `clone` from going into this structure
        // they're taken care of later
        if (stageName === "init" || stageName === "clone") {
          return acc;
        }
        return [
          ...acc,
          {
            name: stageName,
            steps: steps
              .filter((step) => step.stage === stageName)
              .sort((a, b) => a.number! - b.number!),
          },
        ];
      }, [])
      .reverse();

    stagesWithSteps = [
      {
        name: "init",
        steps: steps
          .filter((step) => ["init", "clone"].includes(step.name!))
          .sort((a, b) => a.number! - b.number!),
        derived: "init/clone",
      },
      ...stagesWithSteps,
    ];
  } else {
    // for builds without stages,
    // put them into a virtual default stage
    stagesWithSteps = [
      {
        name: "default",
        steps: steps.sort((a, b) => a.number! - b.number!),
        derived: "unstaged",
      },
    ];
  }

  return (
    <>
      <div
        className="__flowline flex items-center justify-end gap-4 py-2"
        data-test="log-actions"
      >
        <button
          // mb-4 is a compensation for a visual preception quirk
          // because it looks off-center
          className="mb-4 text-vela-cyan hover:underline"
          data-test="collapse-all"
        >
          <small>collapse all</small>
        </button>
        <button
          // mb-4 is a compensation for a visual preception quirk
          className="mb-4 text-vela-cyan hover:underline"
          data-test="expand-all"
        >
          <small>expand all</small>
        </button>
      </div>

      <div className="space-y-8">
        {stagesWithSteps.map((stageWithSteps) => (
          <div
            key={stageWithSteps.name}
            data-stage={stageWithSteps.name}
            data-stage-count={stageWithSteps.steps.length}
            data-stage-derived={stageWithSteps.derived}
          >
            <div className="grid grid-cols-5 grid-rows-1">
              <div className="__flowline col-span-5 col-start-1 row-start-1"></div>
              <div className="col-span-5 col-start-1 row-start-1">
                <div>
                  {stageWithSteps.derived &&
                  ["init/clone", "unstaged"].includes(
                    stageWithSteps.derived
                  ) ? null : (
                    <h3 className="mb-8 ml-[1.6rem] inline-block bg-vela-coal-light px-[1.2rem] py-[.2rem]">
                      {stageWithSteps.name}
                    </h3>
                  )}
                  <div className="flex flex-col gap-8">
                    {stageWithSteps.steps.map((step) => (
                      <StepRow
                        key={step.id}
                        step={step}
                        org={org!}
                        repo={repo!}
                        build={build}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

interface StepRowProps {
  step: Step;
  org: string;
  repo: string;
  build: Build;
}

function StepRow({ step, org, repo, build }: StepRowProps) {
  const iconCls = classNames("h-8 w-8", {
    "text-vela-green": step.status === "success",
    "text-vela-yellow": step.status === "running",
    "text-vela-red": step.status === "failure",
    "text-vela-lavender": step.status === "killed",
    "text-vela-coal-light": step.status === "pending",
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div key={step.number} data-step={step.number} className="flex">
      <div className="ml-[1.6rem] mr-4 h-full bg-vela-coal">
        <div className="py-4">
          <div className={iconCls} data-status={step.status}>
            {step.status === "success" ? <IconSuccess /> : null}
            {step.status === "running" ? <IconRunning /> : null}
            {step.status === "failure" ? <IconFailure /> : null}
            {step.status === "killed" ? <IconKilled /> : null}
            {/* pending icon is special 🤔 */}
            {step.status === "pending" ? (
              <div className="rounded-[7px] border-2 border-vela-coal-light p-[8px]">
                <IconPending />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Details
          onClick={(e) => {
            e.preventDefault();
            setOpen((p) => !p);

            // todo: make this step signal auto-open a step
            navigate({ hash: `step:${step.number}` });
          }}
          open={open}
          summary={
            <div className="flex justify-between">
              <div>{step.name}</div>
              <div className="font-mono">
                <TimeTicker2 start={step.started!} end={step.finished} />
              </div>
            </div>
          }
        >
          {open ? (
            <>
              <div className="border-b border-vela-coal-light">
                <DetailsPanel>
                  <div className="flex justify-end ">
                    <a href="#" className="text-sm">
                      download step logs
                    </a>
                  </div>
                </DetailsPanel>
              </div>
              {/* todo: reconcile this custom use and the general case
          not details panel because it has special padding that is handled by the child */}
              <div className="bg-vela-coal-dark">
                <div className="text-sm">
                  <Logs org={org!} repo={repo!} build={build} step={step} />
                </div>
              </div>
            </>
          ) : null}
        </Details>
      </div>
    </div>
  );
}

interface LogsProps {
  org: string;
  repo: string;
  build: Build;
  step: Step;
}

function Logs(props: LogsProps) {
  const { org, repo, build, step } = props;

  const [following, setFollowing] = useState(false);

  const topRef = useRef<HTMLAnchorElement>(null);
  const bottomRef = useRef<HTMLAnchorElement>(null);

  // todo: is it ok to assume finished is always set?
  const shouldRefresh = step.finished === 0 ? REFETCH_INTERVAL : false;

  const logs = useQuery({
    queryKey: ["logs", org, repo, build.number!, step.number!],
    queryFn: () =>
      StepsService.getStepLog(org, repo, build.number!, step.number!),
    refetchInterval: shouldRefresh,
  });

  // todo: how should these log components
  // be coordinated so that only the most recent
  // follow-button be respected and shown accordingly in the ui?
  // first thought: use a custom window event, as its the easiest option
  useEffect(() => {
    if (logs.data && following) {
      bottomRef.current?.blur();
      bottomRef.current?.focus();
    }

    // if we were following the logs and its step is finished
    // let's bump down the scroll one last time
    // and turn off following
    if (following && step.status === "finished") {
      bottomRef.current?.blur();
      bottomRef.current?.focus();
      setFollowing(false);
    }
  }, [following, logs.data, step.id, step.status]);

  useEffect(() => {
    if (step.finished !== 0) {
      logs.refetch();
    }
  }, [logs, step.finished]);

  // todo: consider a virtualized option
  // todo: we could memo this if we had to
  let nlogs = Base64.decode(logs.data?.data ?? "")
    .trim()
    .split("\n");

  // a small fallback for an empty log
  if (nlogs.length === 1 && nlogs[0] === "") {
    nlogs = ["The build has not written logs to this step yet."];
  }

  return (
    <>
      {logs.isLoading ? (
        <>
          <div className="flex items-center gap-2 p-4">
            <span>Loading ...</span> <Loader />
          </div>
        </>
      ) : null}

      {logs.isSuccess ? (
        <div className="relative" data-logs>
          <div className="absolute right-6 h-full pb-8" data-logs-sidebar>
            <div className="sticky top-4 my-2 flex flex-col gap-2">
              {/* todo: add tool tips to these buttons */}
              <button
                className="h-7 w-7 rounded-sm bg-vela-coal-light p-1 shadow-sm"
                title="jump to top"
                onClick={(e) => {
                  e.preventDefault();
                  topRef.current?.blur();
                  topRef.current?.focus();
                }}
              >
                <IconUpArrow />
              </button>
              <button
                className="h-7 w-7 rounded-sm bg-vela-coal-light p-1 shadow-sm"
                title="jump to bottom"
                onClick={(e) => {
                  e.preventDefault();
                  bottomRef.current?.blur();
                  bottomRef.current?.focus();
                }}
              >
                <IconDownArrow />
              </button>
              <button
                className="h-7 w-7 rounded-sm bg-vela-coal-light p-1 shadow-sm"
                title={
                  following ? "stop following logs" : "start following logs"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setFollowing((p) => !p);
                }}
              >
                {following ? <IconPause /> : <IconPlay />}
              </button>
            </div>
          </div>

          <div className="__vela-scrollbar block max-h-[80vh] min-h-[10rem] resize-y overflow-y-auto pb-8 pt-4">
            <table className="w-full table-fixed">
              <thead className="hidden">
                <tr>
                  <th>Line Number</th>
                  <th>Line Content</th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="w-full opacity-0" data-step-top>
                  <td>
                    <a
                      ref={topRef}
                      id={`step-${step.id}-top`}
                      tabIndex={-1}
                    ></a>
                  </td>
                </tr>
                {nlogs.map((log, index) => {
                  return (
                    <tr
                      key={`${step.number}:${index}`}
                      id={`${step.number}:${index}`}
                      className="flex w-full items-start hover:bg-vela-coal"
                    >
                      <td>
                        {/* why is this a button? well apparently you can highlight a range now in vela */}
                        {/* todo: make button add #step:line to the url */}
                        <button className="relative w-[6ch] select-none overflow-hidden text-ellipsis whitespace-nowrap text-right font-mono text-vela-cyan no-underline hover:underline">
                          <span>{index + 1}</span>
                        </button>
                      </td>
                      <td className="mr-4 w-full flex-1 overflow-auto pl-4">
                        <code>
                          <pre
                            className="whitespace-pre-wrap [word-break:break-word] [word-wrap:break-word]"
                            // this looks quite different than the elm version
                            // so we'll need to think about different options
                            // 😸 pre with css wrap works though
                            dangerouslySetInnerHTML={{
                              __html: ansiHTML(linkify(log)),
                            }}
                          />
                        </code>
                      </td>
                    </tr>
                  );
                })}
                <LoadingTr
                  active={step.finished === 0}
                  fetching={logs.isFetching}
                />
                <tr className="w-full opacity-0" data-step-bottom>
                  <td>
                    <a
                      ref={bottomRef}
                      id={`step-${step.id}-bottom`}
                      tabIndex={-1}
                      href="#"
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </>
  );
}

/**
 * Linkify. A very basic regex based function to parse a string input with
 * raw http/https urls and convert them into html anchor tagged links.
 *
 * @todo
 * We would probably provide a configuration setting to turn this on or off.
 *
 * @param text
 * @returns text with anchor tagged link
 */
function linkify(text: string) {
  const regex = /((http|https):\/\/[^\s]+)/g;

  const replacedText = text.replace(regex, (url) => {
    return `<a target="_blank" rel="noopener noreferrer" href="${url}">${url}</a>`;
  });

  return replacedText;
}

interface LoadingTrProps {
  active: boolean;
  fetching: boolean;
}

/**
 * Displays loading dots and an animation whenever new logs are fetched.
 * @param param0
 * @returns
 */
function LoadingTr({ active, fetching }: LoadingTrProps) {
  const cls = classNames("flex w-full items-start transition-all", {
    visible: active,
    invisible: !active,
  });
  const cls2 = classNames(
    "relative block w-[6ch] select-none overflow-hidden whitespace-nowrap text-right font-mono no-underline transition-all duration-500",
    {
      "translate-x-0": !fetching,
      "translate-x-2": fetching,
    }
  );

  return (
    <tr className={cls} aria-hidden>
      <td>
        <span className={cls2}>
          <span className="animate-pulse [animation-delay:0ms]">&middot;</span>
          <span className="animate-pulse [animation-delay:250ms]">
            &middot;
          </span>
          <span className="animate-pulse [animation-delay:500ms]">
            &middot;
          </span>
        </span>
      </td>
    </tr>
  );
}
