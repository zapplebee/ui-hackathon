import React, { useState } from "react";
import { BuildRow } from "../components/BuildRow";
import { Loader } from "../components/Loader";
import { Pager } from "../components/Pager";
import { useBuildsQuery } from "../library/hooks/useBuilds";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { usePageParam } from "../library/hooks/usePageParam";
import { TopBumper } from "../components/TopBumper";
import {
  BuildFilterBar,
  type BuildFilterBarChange,
} from "../components/BuildFilterBar";
import { useQuery } from "@tanstack/react-query";
import { BuildsService } from "../api";
import { REFETCH_INTERVAL } from "../library/constants";

export function RepoBuilds() {
  const { org, repo } = useOrgRepoParams();
  const { page } = usePageParam();

  const [event, setEvent] = useState<string | undefined>(undefined);

  const builds = useQuery({
    queryKey: ["builds", org, repo, page],
    queryFn: () =>
      BuildsService.getBuilds(
        org!,
        repo!,
        // override
        event as Parameters<typeof BuildsService.getBuilds>["2"],
        undefined,
        undefined,
        undefined,
        page,
        undefined
      ),
    // todo: would like to throttle this when its not busy
    refetchInterval: REFETCH_INTERVAL,
  });

  function handleFilter(value: BuildFilterBarChange) {
    let event = value.event || undefined; // ideal for the fallback
    if (event === "all") {
      event = undefined; // all requires undefined
    }
    setEvent(event);
    console.log("event change handled event=", event);
  }

  return (
    <>
      <TopBumper />

      {builds.isSuccess && builds.data.length === 0 ? (
        <NoBuilds />
      ) : (
        <div>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold">Builds</h2>
                {builds.isLoading ? <Loader /> : null}
              </div>
            </div>
            {builds.isSuccess && builds.data.length > 0 ? (
              <div className="mb-4 flex flex-col gap-4">
                <div>
                  <BuildFilterBar onChange={handleFilter} />
                </div>
                <div>
                  <Pager path={`/${org}/${repo}`} page={page} />
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-4">
              {builds.isSuccess && builds.data.length > 0 ? (
                <>
                  {builds.data.map((build) => {
                    return (
                      <React.Fragment key={build.id}>
                        <BuildRow build={build} />
                      </React.Fragment>
                    );
                  })}
                </>
              ) : null}
            </div>
          </div>
          <div className="py-32">&nbsp;</div>
        </div>
      )}
    </>
  );
}

function NoBuilds() {
  return (
    <>
      <h3 className="text-3xl font-bold">Your repository has been enabled!</h3>

      <div className="space-y-4 text-base">
        <p>Builds will show up here once you have: </p>

        <ol className="list-inside list-decimal space-y-4 pl-4">
          <li>
            A <code>.vela.yml</code> file that describes your build pipeline in
            the root of your repository.{" "}
            <a href="https://go-vela.github.io/docs/usage/">
              Review the documentation
            </a>{" "}
            for help or{" "}
            <a href="https://go-vela.github.io/docs/usage/examples/">
              check some of the pipeline examples
            </a>
            .
          </li>
          {/* todo webhook settings */}
          <li>
            Trigger one of the <a href="#">configured webhook events</a> by
            performing the respective action via Git.
          </li>
        </ol>

        <p>Happy building!</p>
      </div>
    </>
  );
}
