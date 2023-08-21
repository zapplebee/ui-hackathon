import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { BuildsService } from "../api";
import { BuildHistory } from "../components/BuildHistory";
import { BuildRow } from "../components/BuildRow";
import { Loader } from "../components/Loader";
import { TopBumper } from "../components/TopBumper";
import { useBuildNumberParam } from "../library/hooks/useBuildNumberParam";
import { useBuildsQuery } from "../library/hooks/useBuilds";

// using our own types in index.d.ts temporarily
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { TabsContainer } from "../components/tabs/TabsContainer.tsx";
import { getTabNavLinkCls } from "../components/tabs/tabs-utils.ts";
import { REFETCH_INTERVAL } from "../library/constants";
import { useOrgParam } from "../library/hooks/useOrgParam.ts";
import { useRepoParam } from "../library/hooks/useRepoParam.ts";
import {
  getBuildPipelineRoute,
  getBuildRoute,
  getBuildServicesRoute,
} from "../library/routes.ts";

export function RepoBuild() {
  const org = useOrgParam();
  const repo = useRepoParam();
  const buildNumber = useBuildNumberParam();

  const { builds } = useBuildsQuery(org!, repo!, 1);

  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    if (org && repo && buildNumber) {
      setShouldRefetch(true);
    }
  }, [org, repo, buildNumber]);

  const build = useQuery({
    enabled: shouldRefetch,
    queryKey: ["build", org, repo, buildNumber],
    queryFn: () => BuildsService.getBuild(org, repo, buildNumber),
    refetchInterval: REFETCH_INTERVAL,
    // todo: should not refetch if in terminal state
  });

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
      setShouldRefetch(false);
    }
  }, [build, build.data?.finished, shouldRefetch]);

  // todo
  // consider fetching the logs for steps at the top level here instead

  if (builds.isLoading || build.isLoading) {
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

        <TabsContainer>
          <li>
            <NavLink
              end
              to={getBuildRoute(org, repo, buildNumber)}
              className={getTabNavLinkCls()}
            >
              Build
            </NavLink>
          </li>
          <li>
            <NavLink
              to={getBuildServicesRoute(org, repo, buildNumber)}
              className={getTabNavLinkCls()}
            >
              Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to={getBuildPipelineRoute(org, repo, buildNumber)}
              className={getTabNavLinkCls()}
            >
              Pipeline
            </NavLink>
          </li>
        </TabsContainer>

        <div className="py-2"></div>

        <Outlet />
      </div>
    </>
  );
}
