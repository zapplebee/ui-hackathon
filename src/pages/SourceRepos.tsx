import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Repo, ReposService, User, UsersService } from "../api";
import { OrgGroup } from "../components/OrgGroup";
import { Loader } from "../components/Loader";
import { RepoRow } from "../components/RepoRow";
import { RepoRowGroup } from "../components/RepoRowGroup";
import { TopBumper } from "../components/TopBumper";
import { FavoriteStar } from "../components/FavoriteStar";
import { Helmet } from "react-helmet-async";
import { mapOrgRepoToString } from "../library/utils";
import { Searchbar } from "../components/Searchbar";
import { Toast, ToastCommands } from "../components/toast/Toast";

type OverrideGetSourceReposType = Record<string, Repo[]>;

export function SourceRepos() {
  const currentUser = useQuery({
    queryKey: ["current-user"],
    queryFn: UsersService.getCurrentUser,
  });

  const sourceRepos = useQuery({
    queryKey: ["source-repos"],
    queryFn: UsersService.getSourceRepos,

    // source repos is a long running
    // api call, so we should not abuse the endpoint
    staleTime: 5 * 1000,
  });

  const badTypeWorkaround = sourceRepos.data as OverrideGetSourceReposType;
  const groups = Object.entries(badTypeWorkaround ? badTypeWorkaround : []);

  const [filter, setFilter] = useState("");

  const filtered = groups
    .map(([, repos]) => repos)
    .flatMap((a) => a)
    .filter((repo) => {
      return mapOrgRepoToString({ org: repo.org!, repo: repo.name! }).includes(
        filter
      );
    });

  return (
    <>
      <Helmet>
        <title>Source repos - Vela</title>
      </Helmet>
      <TopBumper />
      {/* search */}

      {currentUser.isLoading || sourceRepos.isLoading ? (
        <div className="flex max-w-3xl flex-col gap-4">
          <h2 className="flex items-center gap-4 text-3xl font-bold">
            <div>Loading your repos</div>
            <Loader />
          </h2>

          <p>
            Hang tight while we grab the list of repositories that you have
            access to from GitHub. If you have access to a lot of organizations
            and repositories this might take a little while.
          </p>
        </div>
      ) : null}

      {currentUser.isSuccess && sourceRepos.isSuccess ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold">Your repos</h2>
              {sourceRepos.isFetching ? <Loader /> : null}
            </div>

            <div>
              <button
                className="btn-secondary"
                onClick={() => {
                  sourceRepos.refetch();
                }}
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="mb-4">
            <Searchbar
              placeholder="Type to filter your repos..."
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
          </div>
          {filter === "" ? (
            <div className="flex flex-col gap-8">
              {groups.map(([org, repos]) => {
                return (
                  <React.Fragment key={org}>
                    <OrgGroup name={org}>
                      <RepoRowGroup>
                        {repos.map((repo) => {
                          return (
                            <YourRepoRow
                              key={`${org}/${repo.name}`}
                              repo={repo}
                              currentUser={currentUser.data}
                            />
                          );
                        })}
                      </RepoRowGroup>
                    </OrgGroup>
                  </React.Fragment>
                );
              })}
            </div>
          ) : null}

          {filter !== "" ? (
            <>
              <div className="flex flex-col gap-4">
                {filtered.map((repo) => {
                  return (
                    <YourRepoRow
                      key={repo.id}
                      repo={repo}
                      currentUser={currentUser.data}
                      filtered={true}
                    />
                  );
                })}
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}

interface YourRepoRowProps {
  filtered?: boolean;
  repo: Repo;
  currentUser: User;
}

function YourRepoRow({
  repo,
  currentUser,
  filtered = false,
}: YourRepoRowProps) {
  const enabledToastRef = useRef<ToastCommands>(null);
  const favoritedToastRef = useRef<ToastCommands>(null);

  const queryClient = useQueryClient();

  /**
   * TODO: library needs its types fixed
   * @param repo
   */
  async function handleEnable(repo: Repo) {
    const create: Repo = { ...repo, active: true };

    // todo: error handling?
    // is there something we could do with optimistic ui for this?
    await ReposService.createRepo(create);
    queryClient.invalidateQueries({ queryKey: ["source-repos"] });
    enabledToastRef.current?.publish();

    await UsersService.updateCurrentUser({
      ...currentUser,
      // todo: extract this into a function
      favorites: [
        ...(currentUser?.favorites ?? []),
        `${repo.org}/${repo.name}`,
      ],
    });
    queryClient.invalidateQueries({ queryKey: ["current-user"] });
    favoritedToastRef.current?.publish();
  }

  async function handleFavorite(favorites: string[]) {
    await UsersService.updateCurrentUser({ ...currentUser, favorites });
    favoritedToastRef.current?.publish();
  }

  const name = filtered ? `${repo.org}/${repo.name}` : `${repo.name}`;

  return (
    <RepoRow name={name} org={repo.org!} repo={repo.name!}>
      <div className="flex gap-2">
        {repo.active ? (
          <>
            <FavoriteStar
              currentUser={currentUser}
              org={repo.org!}
              repo={repo.name!}
              onClick={(updatedFavorites) => {
                handleFavorite(updatedFavorites);
              }}
            />
            {/* this was a non-clickable button */}
            <div className="flex w-auto max-w-full select-none items-center gap-2 whitespace-nowrap border-2 border-vela-green bg-vela-coal px-[1.2rem] py-[0.4rem] text-center font-bold leading-6 text-vela-green no-underline outline-none">
              <svg
                className="transform"
                fill="none"
                height="18"
                width="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                role="img"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <div>Enabled</div>
            </div>
            <button
              className="btn-primary"
              title={`View ${repo.org}/${repo.name}`}
            >
              View
            </button>
          </>
        ) : (
          <>
            <FavoriteStar
              currentUser={currentUser}
              org={repo.org!}
              repo={repo.name!}
              onClick={(updatedFavorites) => {
                handleFavorite(updatedFavorites);
              }}
            />
            <button
              onClick={() => {
                handleEnable(repo);
              }}
              className="btn-primary"
              title={`Enable ${repo.org}/${repo.name}`}
            >
              Enable
            </button>
          </>
        )}
      </div>

      {/* todo: there's just a ton of these elements floating around now, is this the best way? */}
      <Toast ref={enabledToastRef} title={<h2>Enabled</h2>} type="success">
        <code>
          {repo.org}/{repo.name}
        </code>{" "}
        enabled.
      </Toast>
      <Toast
        ref={favoritedToastRef}
        title={<h2>Favorites updated</h2>}
        type="success"
      >
        <code>
          {repo.org}/{repo.name}
        </code>{" "}
        updated in your favorites.
      </Toast>
    </RepoRow>
  );
}
