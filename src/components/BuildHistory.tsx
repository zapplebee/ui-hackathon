import classNames from "classnames";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Build } from "../api";
import { TimeTicker3 } from "./TimeTicker3.tsx";
import { IconFailureMini } from "./icons/IconFailureMini.tsx";
import { IconPendingMini } from "./icons/IconPendingMini.tsx";
import { IconRunningMini } from "./icons/IconRunningMini.tsx";
import { IconSuccessMini } from "./icons/IconSuccessMini.tsx";

export interface Props {
  org: string;
  repo: string;
  builds: Build[];
  current: number;
}

export function BuildHistory(props: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm">Recent Builds</p>
      <ol className="flex">
        {props.builds.map((build) => {
          const current = props.current === build.number;
          const liCls = classNames("first:ml-0 group relative", {
            "mx-[0.2rem]": current,
          });
          const linkCls = classNames(
            "!text-vela-coal-dark p-[1px] block w-6 h-6",
            {
              "bg-vela-green": build.status === "success",
              "bg-vela-yellow": build.status === "running",
              "bg-vela-red":
                build.status === "failure" ||
                build.status === "canceled" ||
                build.status === "error",
              "bg-vela-gray": build.status === "pending",
            },
          );
          return (
            <li
              key={build.id}
              data-recent-build-number={build.number}
              data-recent-build-current={props.current === build.number}
              className={liCls}
            >
              <Link
                title={`Build #${build.number}`}
                to={`/${props.org}/${props.repo}/${build.number}`}
                className={linkCls}
              >
                {build.status === "pending" ? <IconPendingMini /> : null}
                {build.status === "running" ? <IconRunningMini /> : null}
                {build.status === "success" ? <IconSuccessMini /> : null}
                {build.status === "failure" ||
                build.status === "canceled" ||
                build.status === "error" ? (
                  <IconFailureMini />
                ) : null}
                <span className="sr-only">
                  Build #{build.number}
                  {current ? " - current build" : null}
                </span>
              </Link>

              {/*
                TODO:ACCESSIBILITY
                Because this requires `hover` (aligned with the original implementation,
                it is not necessarily the most accessible component in the ui.
                We should review this component and make it keyboard controllable at least.
              */}
              <div className="absolute left-0 top-8 z-10 hidden w-64 origin-top-right border border-vela-coal-light bg-vela-coal-dark shadow-lg group-hover:block">
                <div className="p-2 text-sm">
                  <dl className="grid grid-cols-[max-content_1fr] gap-x-4 [&_dd]:text-right">
                    <dt>#{build.number}</dt>
                    <dd>
                      <em title="event type">{build.event}</em>
                    </dd>

                    {build.started ? (
                      <>
                        <dt>started:</dt>
                        <dd>
                          {format(
                            new Date(build.started * 1000),
                            "MMMM do, yyyy",
                          )}
                        </dd>
                      </>
                    ) : null}

                    {build.finished ? (
                      <>
                        <dt>finished:</dt>
                        <dd>
                          {format(
                            new Date(build.finished * 1000),
                            "MMMM do, yyyy",
                          )}
                        </dd>
                      </>
                    ) : null}

                    {build.started && build.finished ? (
                      <>
                        <dt>duration:</dt>
                        <dd>
                          <TimeTicker3
                            start={build.started}
                            end={build.finished}
                          />
                        </dd>
                      </>
                    ) : null}

                    <dt>worker:</dt>
                    <dd>{build.host}</dd>

                    <dt>author:</dt>
                    <dd>{build.author}</dd>

                    <dt>commit:</dt>
                    <dd>{build.commit?.substring(0, 8)}</dd>

                    <dt>branch:</dt>
                    <dd>{build.branch}</dd>
                  </dl>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
