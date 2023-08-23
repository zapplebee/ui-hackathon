import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BuildsService } from "../api";
import { BuildFilterBar } from "../components/BuildFilterBar";
import { BuildRow } from "../components/BuildRow";
import { Pager2 } from "../components/Pager2";
import { TopBumper } from "../components/TopBumper";
import { REFETCH_INTERVAL } from "../library/constants";
import { getHeaders, getLink, getPagination } from "../library/headers";
import { useEventParam } from "../library/hooks/useEventParam";
import { useOrgParam } from "../library/hooks/useOrgParam";
import { usePageParam } from "../library/hooks/usePageParam";
import { useRepoParam } from "../library/hooks/useRepoParam";
import { getRepoSettingsRoute } from "../library/routes";

export function RepoBuilds() {
  const org = useOrgParam();
  const repo = useRepoParam();

  const page = usePageParam();
  const event = useEventParam();

  const builds = useQuery({
    queryKey: ["builds", org, repo, page, event],
    queryFn: () =>
      BuildsService.getBuilds(
        org!,
        repo!,
        event as Parameters<typeof BuildsService.getBuilds>["2"], // override
        undefined,
        undefined,
        undefined,
        page,
        undefined,
      ),
    // todo: would like to throttle this when its not busy
    refetchInterval: REFETCH_INTERVAL,
  });

  const pagination = getPagination(getLink(getHeaders(builds.data)));

  return (
    <>
      <TopBumper />

      <div>
        <div>
          {builds.isSuccess && builds.data.length > 0 ? (
            <div className="mb-4 flex flex-col gap-4">
              <div>
                <BuildFilterBar />
              </div>
              <div>
                <Pager2
                  path={`/${org}/${repo}`}
                  page={page}
                  pagination={pagination}
                />
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-6">
            {builds.isSuccess && builds.data.length > 0 ? (
              <>
                {builds.data.map((build) => {
                  return <BuildRow key={build.id} build={build} />;
                })}
              </>
            ) : null}
          </div>
        </div>

        {builds.isSuccess && builds.data.length === 0 && event === null ? (
          <NoBuilds org={org} repo={repo} />
        ) : null}

        {builds.isSuccess && builds.data.length === 0 && event !== null ? (
          <NoBuildsFiltered event={event} />
        ) : null}

        <div className="py-32">&nbsp;</div>
      </div>
    </>
  );
}

interface NoBuildsProps {
  org: string;
  repo: string;
}

function NoBuilds({ org, repo }: NoBuildsProps) {
  return (
    <>
      <h3 className="text-3xl font-bold">Your repository has been enabled!</h3>

      <div className="space-y-4 text-base">
        <p>Builds will show up here once you have: </p>

        <ol className="list-outside list-decimal space-y-4 pl-8">
          <li>
            A <code>.vela.yml</code> file that describes your build pipeline in
            the root of your repository. <br />
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
            Trigger one of the{" "}
            <Link to={getRepoSettingsRoute(org, repo)}>
              configured webhook events
            </Link>{" "}
            by performing the respective action via Git.
          </li>
        </ol>

        <p>Happy building!</p>
      </div>
    </>
  );
}

interface NoBuildsFilteredProps {
  event: string;
}

function NoBuildsFiltered({ event }: NoBuildsFilteredProps) {
  return (
    <>
      <h3 className="text-3xl font-bold">
        No builds for <code>{event}</code>
      </h3>
      <p>
        There were no builds for <code>{event}</code> event found. Try another
        filter.
      </p>
    </>
  );
}
