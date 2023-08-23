import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BuildsService } from "../api";
import { BuildRow } from "../components/BuildRow";
import { Loader } from "../components/Loader";
import { Pager } from "../components/Pager";
import { TopBumper } from "../components/TopBumper";
import { REFETCH_INTERVAL } from "../library/constants";
import { useOrgParam } from "../library/hooks/useOrgParam";
import { usePageParam } from "../library/hooks/usePageParam";

export function OrgBuilds() {
  const org = useOrgParam();
  const page = usePageParam();

  // why don't we reuse the useBuildsQuery hook?
  // because this is a not pulling based on repo
  const builds = useQuery({
    queryKey: ["builds", org, page],
    queryFn: () =>
      BuildsService.getBuildsForOrg(
        org!,
        undefined,
        undefined,
        undefined,
        undefined,
        page,
        undefined,
      ),
    refetchInterval: REFETCH_INTERVAL,
  });

  return (
    <>
      <TopBumper />
      <div>
        {builds.isLoading ? (
          <>
            <Loader />
          </>
        ) : null}
        <div className="flex flex-col gap-4">
          {builds.isSuccess && builds.data.length === 0 ? <NoBuilds /> : null}
          {builds.isSuccess && builds.data.length > 0 ? (
            <>
              <Pager path={`/${org}/builds`} page={page} />
              {builds.data.map((build) => {
                return (
                  <React.Fragment key={build.id}>
                    <BuildRow build={build} showRepoName={true} />
                  </React.Fragment>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
      <div className="py-32">&nbsp;</div>
    </>
  );
}

function NoBuilds() {
  return (
    <>
      <h1 className="text-4xl font-bold">Your organization has no builds!</h1>

      <div className="space-y-4 text-base">
        <p>Builds will show up here once you have: </p>

        <ol className="list-inside list-decimal space-y-4 pl-4">
          <li>
            A <code>.vela.yml</code> file that describes your build pipeline in
            the root of one of your repositories.{" "}
            <a href="https://go-vela.github.io/docs/usage/">
              Review the documentation
            </a>{" "}
            for help or{" "}
            <a href="https://go-vela.github.io/docs/usage/examples/">
              check some of the pipeline examples
            </a>
            .
          </li>
          {/* todo: settings link */}
          <li>
            Trigger one of the configured webhook events for a repository by
            performing the respective action via Git.
          </li>
        </ol>

        <p>Happy building!</p>
      </div>
    </>
  );
}
