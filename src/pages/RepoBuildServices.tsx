import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { Base64 } from "js-base64";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Build, BuildsService, Service, ServicesService } from "../api";
import { Details } from "../components/Details";
import { DetailsPanel } from "../components/DetailsPanel";
import { Loader } from "../components/Loader";
import { LogsDisplay, LogsDisplayMethods } from "../components/LogsDisplay";
import { TimeTicker2 } from "../components/TimeTicker2";
import { IconDownArrow } from "../components/icons/IconDownArrow";
import { IconFailure } from "../components/icons/IconFailure";
import { IconKilled } from "../components/icons/IconKilled";
import { IconPause } from "../components/icons/IconPause";
import { IconPending } from "../components/icons/IconPending";
import { IconPlay } from "../components/icons/IconPlay";
import { IconRunning } from "../components/icons/IconRunning";
import { IconSuccess } from "../components/icons/IconSuccess";
import { IconUpArrow } from "../components/icons/IconUpArrow";
import { REFETCH_INTERVAL } from "../library/constants";
import { useBuildNumberParam } from "../library/hooks/useBuildNumberParam";
import { useOrgParam } from "../library/hooks/useOrgParam";
import { useRepoParam } from "../library/hooks/useRepoParam";

export function RepoBuildServices() {
  const org = useOrgParam();
  const repo = useRepoParam();
  const buildNumber = useBuildNumberParam();

  const build = useQuery({
    // enabled: shouldRefetch,
    queryKey: ["build", org, repo, buildNumber],
    queryFn: () => BuildsService.getBuild(org, repo, buildNumber),
    refetchInterval: REFETCH_INTERVAL,
    // todo: should not refetch if in terminal state
  });

  const services = useQuery({
    // enabled: shouldRefetch,
    queryKey: ["services", org, repo, buildNumber],
    queryFn: () => ServicesService.getServices(org, repo, buildNumber, 1, 100),
    refetchInterval: REFETCH_INTERVAL,
    // todo: should not refetch if in terminal state
  });

  return (
    <>
      {services.isLoading ? <Loader /> : null}
      {services.isSuccess && services.data.length === 0 ? (
        <p>There are no services for this pipeline.</p>
      ) : null}
      {build.isSuccess && services.isSuccess && services.data.length > 0 ? (
        <>
          {services.data.map((service) => {
            return (
              <ServiceRow
                key={service.id}
                service={service}
                org={org}
                repo={repo}
                build={build.data}
              />
            );
          })}
        </>
      ) : null}
    </>
  );
}

interface ServiceRowProps {
  service: Service;
  org: string;
  repo: string;
  build: Build;
}

function ServiceRow({ service, org, repo, build }: ServiceRowProps) {
  const iconCls = classNames("h-8 w-8", {
    "text-vela-green": service.status === "success",
    "text-vela-yellow": service.status === "running",
    "text-vela-red": service.status === "failure",
    "text-vela-lavender": service.status === "killed",
    "text-vela-coal-light": service.status === "pending",
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div key={service.number} data-step={service.number} className="flex">
      <div className="ml-[1.5rem] mr-4 h-full bg-vela-coal">
        <div className="py-4">
          <div className={iconCls} data-status={service.status}>
            {service.status === "success" ? <IconSuccess /> : null}
            {service.status === "running" ? <IconRunning /> : null}
            {service.status === "failure" ? <IconFailure /> : null}
            {service.status === "killed" ? <IconKilled /> : null}
            {/* pending icon is special 🤔 */}
            {service.status === "pending" ? (
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
            navigate({ hash: `step:${service.number}` });
          }}
          open={open}
          summary={
            <div className="flex justify-between">
              <div>{service.name}</div>
              <div className="font-mono">
                <TimeTicker2 start={service.started!} end={service.finished} />
              </div>
            </div>
          }
        >
          {open ? (
            <>
              <div className="border-b border-vela-coal-light">
                <DetailsPanel>
                  <div className="flex justify-end">
                    <a href="#" className="text-sm">
                      download step logs
                    </a>
                  </div>
                </DetailsPanel>
              </div>

              <DetailsPanel padded={false}>
                <div className="text-sm">
                  <Logs
                    org={org!}
                    repo={repo!}
                    build={build}
                    service={service}
                  />
                </div>
              </DetailsPanel>
            </>
          ) : null}
        </Details>
      </div>
    </div>
  );
}

// TODO: this is copied/shared with step logs
interface LogsProps {
  org: string;
  repo: string;
  build: Build;
  service: Service;
}

function Logs(props: LogsProps) {
  const { org, repo, build, service } = props;

  const [following, setFollowing] = useState(false);

  const logDisplayRef = useRef<LogsDisplayMethods>(null);

  // todo: is it ok to assume finished is always set?
  const shouldRefresh = service.finished === 0 ? REFETCH_INTERVAL : false;

  const logs = useQuery({
    queryKey: ["logs-service", org, repo, build.number, service.number],
    queryFn: () =>
      ServicesService.getServiceLogs(org, repo, build.number!, service.number!),
    refetchInterval: shouldRefresh,
  });

  // todo: how should these log components
  // be coordinated so that only the most recent
  // follow-button be respected and shown accordingly in the ui?
  // first thought: use a custom window event, as its the easiest option
  useEffect(() => {
    if (logs.data && following) {
      logDisplayRef.current?.bottomRef.current?.blur();
      logDisplayRef.current?.bottomRef.current?.focus();
    }

    // if we were following the logs and its step is finished
    // let's bump down the scroll one last time
    // and turn off following
    if (following && service.status === "finished") {
      logDisplayRef.current?.bottomRef.current?.blur();
      logDisplayRef.current?.bottomRef.current?.focus();
      setFollowing(false);
    }
  }, [following, logs.data, service.id, service.status]);

  useEffect(() => {
    if (service.finished !== 0) {
      logs.refetch();
    }
  }, [logs, service.finished]);

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
                  logDisplayRef.current?.topRef.current?.blur();
                  logDisplayRef.current?.topRef.current?.focus();
                }}
              >
                <IconUpArrow />
              </button>
              <button
                className="h-7 w-7 rounded-sm bg-vela-coal-light p-1 shadow-sm"
                title="jump to bottom"
                onClick={(e) => {
                  e.preventDefault();
                  logDisplayRef.current?.bottomRef.current?.blur();
                  logDisplayRef.current?.bottomRef.current?.focus();
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

          <LogsDisplay
            ref={logDisplayRef}
            id={`service-${service.id}`}
            number={service.number}
            active={service.finished === 0}
            fetching={logs.isFetched}
            logs={nlogs}
          />
        </div>
      ) : null}
    </>
  );
}
