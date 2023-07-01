import classNames from "classnames";
import { Link } from "react-router-dom";
import { Build } from "../api";
import { IconFailureMini } from "./icons/IconFailureMini.tsx";
import { IconRunningMini } from "./icons/IconRunningMini.tsx";
import { IconSuccessMini } from "./icons/IconSuccessMini.tsx";
import { IconPendingMini } from "./icons/IconPendingMini.tsx";

export interface Props {
  org: string;
  repo: string;
  builds: Build[];
  current: number; // todo: is this the best way?
}

//

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
            }
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
                the popover variant is in this repo's history, but you can also re-adapt this same code into popover format
              */}
              <div className="absolute left-0 top-8 z-10 hidden w-64 origin-top-right border border-vela-cyan bg-vela-coal-dark shadow-lg group-hover:block">
                <div className="p-2 text-sm">
                  <dl className="flex flex-wrap justify-between [&_dd]:w-1/2 [&_dd]:text-right [&_dt]:w-1/2">
                    <dt>#{build.number}</dt>
                    <dd>
                      <em title="event type">{build.event}</em>
                    </dd>

                    <dt>started:</dt>
                    <dd>{build.started}</dd>

                    <dt>finished:</dt>
                    <dd>{build.finished}</dd>

                    <dt>duration:</dt>
                    <dd>18:25</dd>

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
