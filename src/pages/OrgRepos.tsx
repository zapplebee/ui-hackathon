import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ReposService } from "../api";
import { Loader } from "../components/Loader";
import { Pager } from "../components/Pager";
import { RepoRow } from "../components/RepoRow";
import { TopBumper } from "../components/TopBumper";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { usePageParam } from "../library/hooks/usePageParam";

export function OrgRepos() {
  const { org } = useOrgRepoParams();

  const { page } = usePageParam();

  const orgQuery = useQuery({
    queryKey: ["org", org!, page],
    queryFn: () => ReposService.listReposForOrg(org!, true, page),
  });

  return (
    <>
      <TopBumper />
      {orgQuery.isLoading ? (
        <>
          <Loader />
        </>
      ) : null}

      <div className="flex flex-col gap-4">
        {orgQuery.isSuccess && orgQuery.data.length === 0 ? <NoRepos /> : null}
        {orgQuery.isSuccess && orgQuery.data.length > 0 ? (
          <>
            <Pager path={`/${org}`} page={page} />
            {orgQuery.data.map((repo) => {
              return (
                <RepoRow
                  key={repo.id}
                  name={repo.name}
                  repo={repo.name!}
                  org={repo.org!}
                >
                  <div className="flex flex-col items-stretch gap-2 sm:flex-row">
                    <Link
                      to={`/${org}/${repo.name}/settings`}
                      className="btn-secondary"
                    >
                      Settings
                    </Link>
                    <Link
                      to={`/${org}/${repo.name}/hooks`}
                      className="btn-secondary"
                    >
                      Hooks
                    </Link>
                    <Link
                      to={`/${org}/${repo.name}/secrets`}
                      className="btn-secondary"
                    >
                      Secrets
                    </Link>
                    <Link to={`/${org}/${repo.name}`} className="btn-primary">
                      View
                    </Link>
                  </div>
                </RepoRow>
              );
            })}
          </>
        ) : null}
      </div>
    </>
  );
}

function NoRepos() {
  return (
    <>
      <h1 className="text-4xl font-bold">
        This organization has no repositories!
      </h1>

      <div className="space-y-4 text-base">
        <p>
          Repositories will show up here once they have been created and
          activated.
        </p>

        <p>Happy building!</p>
      </div>
    </>
  );
}
