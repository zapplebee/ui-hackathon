import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { formatDistanceToNowStrict } from "date-fns";
import { Webhook, WebhookService } from "../api";
import { IconFailure } from "../components/icons/IconFailure.tsx";
import { IconSuccess } from "../components/icons/IconSuccess.tsx";
import { Loader } from "../components/Loader";
import { Pager } from "../components/Pager";
import { Table } from "../components/Table";
import { TopBumper } from "../components/TopBumper";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { usePageParam } from "../library/hooks/usePageParam";
import React from "react";
import { REFETCH_INTERVAL } from "../library/constants";

export function RepoAudit() {
  const { org, repo } = useOrgRepoParams();
  const { page } = usePageParam();

  const hooksQuery = useQuery({
    queryKey: ["hooks", org, repo, page],
    queryFn: () => WebhookService.getHooks(org!, repo!, page, 10),
    refetchInterval: REFETCH_INTERVAL,
  });

  return (
    <>
      <TopBumper />

      <div>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold">Hooks</h2>
              {hooksQuery.isLoading ? <Loader /> : null}
            </div>
            {hooksQuery.isSuccess && hooksQuery.data.length > 0 ? (
              <div>
                <Pager path={`/${org}/${repo}/audit`} page={page} />
              </div>
            ) : null}
          </div>

          {hooksQuery.isSuccess && hooksQuery.data.length > 0 ? (
            <div>
              <Table
                head={
                  <tr>
                    <th></th>
                    <th>Source</th>
                    <th>Created</th>
                    <th>Host</th>
                    <th>Event</th>
                    <th>Branch</th>
                    <th></th>
                  </tr>
                }
                body={
                  <>
                    {hooksQuery.data.map((hook) => {
                      const cls = classNames("border-l-2", {
                        "border-l-vela-red": hook.status === "failure",
                        "border-l-vela-green": hook.status === "success",
                      });
                      const clsPrimaryTr = classNames(cls, {
                        "!border-b !border-b-transparent": !!hook.error,
                      });
                      return (
                        <React.Fragment key={hook.id}>
                          <tr className={clsPrimaryTr}>
                            <td className="w-[3rem] border-l-vela-red !pl-[1.25rem]">
                              <HookStatusIndicator hook={hook} />
                            </td>
                            <td>
                              <code className="whitespace-nowrap bg-vela-coal p-1">
                                {hook.source_id}
                              </code>
                            </td>
                            <td className="whitespace-nowrap">
                              {hook.created
                                ? `${formatDistanceToNowStrict(
                                    new Date(Math.floor(hook.created * 1000))
                                  )} ago`
                                : "-"}
                            </td>
                            <td>{hook.host}</td>
                            <td>{hook.event}</td>
                            <td>{hook.branch}</td>
                            <td></td>
                          </tr>
                          {hook.error ? (
                            <tr className={cls}>
                              <td colSpan={7}>
                                <p className="text-sm text-vela-red-light">
                                  {hook.error}
                                </p>
                              </td>
                            </tr>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </>
                }
              />
            </div>
          ) : null}
        </div>
        <div className="py-32">&nbsp;</div>
      </div>
    </>
  );
}

interface HookStatusIndicatorProps {
  hook: Webhook;
}

function HookStatusIndicator({ hook }: HookStatusIndicatorProps) {
  const cls = classNames("block h-5 w-5", {
    "text-vela-green": hook.status === "success",
    "text-vela-red": hook.status === "failure",
  });
  if (hook.status === "success") {
    return (
      <span className={cls}>
        <IconSuccess />
      </span>
    );
  } else if (hook.status === "failure") {
    return (
      <span className={cls}>
        <IconFailure />
      </span>
    );
  }

  return null;
}
