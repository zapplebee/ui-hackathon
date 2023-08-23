import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { User, UsersService } from "../api";
import { ComingSoon } from "../components/ComingSoon";
import { FavoriteStarButton } from "../components/FavoriteStarButton";
import { LoadingFullscreen } from "../components/LoadingFullscreen";
import { OrgGroup } from "../components/OrgGroup";
import { RepoRow } from "../components/RepoRow";
import { RepoRowGroup } from "../components/RepoRowGroup";
import { Searchbar } from "../components/Searchbar";
import { TopBumper } from "../components/TopBumper";
import { isAuthenticated } from "../library/auth";
import { useHandleFavorite } from "../library/hooks/useHandleFavorite";
import { getRepoSecretsRoute, getSourceReposRoute } from "../library/routes";
import {
  mapOrgRepoStringsToObjects,
  mapOrgRepoToString,
  mapToTree,
} from "../library/utils";

export function Home() {
  const authenticated = isAuthenticated();

  return <>{authenticated ? <AuthenticatedHome /> : <UnauthenticatedHome />}</>;
}

/**
 * Shows unauthenticated homepage, prompting for authentication.
 * @returns
 */
function UnauthenticatedHome() {
  return (
    <>
      <Helmet>
        <title>Vela</title>
      </Helmet>
      <TopBumper />
      <div>
        <h1 className="text-4xl font-bold">Try the login</h1>
        <p>
          <Link
            className="text-blue-400 hover:text-blue-500"
            to="/account/login"
          >
            Jump over to the login page →
          </Link>
        </p>
      </div>
      <div className="py-4">
        <hr />
      </div>
      <ComingSoon />
    </>
  );
}

/**
 * Shows the list of favorited repositories for the authenticated user.
 *
 * @returns
 */
function AuthenticatedHome() {
  // Queries
  const currentUser = useQuery({
    queryKey: ["current-user"],
    queryFn: UsersService.getCurrentUser,
  });

  return (
    <>
      <Helmet>
        <title>Overview - Vela</title>
      </Helmet>
      <TopBumper />
      {currentUser.isLoading && <LoadingFullscreen />}
      {currentUser.isFetched &&
      currentUser.data &&
      currentUser.data.favorites ? (
        <>
          {currentUser.data.favorites.length === 0 ? (
            <HomeWithNoFavorites />
          ) : (
            <HomeWithFavorites user={currentUser.data} />
          )}
        </>
      ) : null}
    </>
  );
}

interface HomeWithFavoritesProps {
  user: User;
}

function HomeWithFavorites(props: HomeWithFavoritesProps) {
  const orgRepos = mapOrgRepoStringsToObjects(props.user.favorites);
  const tree = mapToTree(orgRepos);

  const handleFavorite = useHandleFavorite();

  const groups = Object.entries(tree).sort((a, b) => a[0].localeCompare(b[0]));

  const [filter, setFilter] = useState("");

  const filtered = orgRepos.filter((orgRepo) => {
    return mapOrgRepoToString(orgRepo).includes(filter);
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
        </div>
        <div>
          <Link className="btn-secondary" to={getSourceReposRoute()}>
            Source Repos
          </Link>
        </div>
      </div>
      <p>
        Visit <Link to={getSourceReposRoute()}>Source Repositories</Link> to add
        repositories to your favorites. Visit{" "}
        <a
          href="https://go-vela.github.io/docs/"
          rel="noopener noreferrer"
          target="_blank"
        >
          our documentation
        </a>{" "}
        to get started.
      </p>

      <div>
        <Searchbar
          placeholder="Type to filter all favorites..."
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>

      {filter === "" && (
        <div className="flex flex-col gap-6">
          {groups.map(([org, repos]) => {
            return (
              <React.Fragment key={org}>
                <OrgGroup
                  name={
                    <>
                      <Link to={`/${org}`}>{org}</Link>
                    </>
                  }
                  open
                >
                  <RepoRowGroup>
                    {[...repos]
                      // TODO: decide if there's a better place to do this sorting
                      .sort((a, b) => a.repo.localeCompare(b.repo))
                      .map((repo) => {
                        return (
                          <RepoRow
                            key={repo.repo}
                            name={repo.repo}
                            org={org}
                            repo={repo.repo}
                          >
                            <div className="flex flex-col items-stretch gap-2 sm:flex-row">
                              <FavoriteStarButton
                                favorites={props.user.favorites}
                                org={repo.org!}
                                repo={repo.repo!}
                                onClick={(favorites) => {
                                  handleFavorite(props.user, favorites);
                                }}
                              />
                              <Link
                                to={`/${org}/${repo.repo}/settings`}
                                className="btn-secondary"
                              >
                                Settings
                              </Link>
                              <Link
                                to={`/${org}/${repo.repo}/hooks`}
                                className="btn-secondary"
                              >
                                Hooks
                              </Link>
                              <Link
                                to={getRepoSecretsRoute(org, repo.repo)}
                                className="btn-secondary"
                              >
                                Secrets
                              </Link>
                              <Link
                                to={`/${org}/${repo.repo}`}
                                className="btn-primary"
                              >
                                View
                              </Link>
                            </div>
                          </RepoRow>
                        );
                      })}
                  </RepoRowGroup>
                </OrgGroup>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {filter !== "" ? (
        <>
          {filtered.length === 0 ? <p>No results.</p> : null}
          {filtered.map((orgRepo) => {
            return (
              <RepoRow
                key={mapOrgRepoToString(orgRepo)}
                name={`${orgRepo.org}/${orgRepo.repo}`}
                org={orgRepo.org}
                repo={orgRepo.repo}
              >
                <div className="flex flex-col items-stretch gap-2 sm:flex-row">
                  <FavoriteStarButton
                    favorites={props.user.favorites}
                    org={orgRepo.org!}
                    repo={orgRepo.repo!}
                    onClick={(favorites) => {
                      handleFavorite(props.user, favorites);
                    }}
                  />
                  <Link
                    to={`/${orgRepo.org}/${orgRepo.repo}/settings`}
                    className="btn-secondary"
                  >
                    Settings
                  </Link>
                  <Link
                    to={`/${orgRepo.org}/${orgRepo.repo}/hooks`}
                    className="btn-secondary"
                  >
                    Hooks
                  </Link>
                  <Link
                    to={`/${orgRepo.org}/${orgRepo.repo}/secrets`}
                    className="btn-secondary"
                  >
                    Secrets
                  </Link>
                  <Link
                    to={`/${orgRepo.org}/${orgRepo.repo}`}
                    className="btn-primary"
                  >
                    View
                  </Link>
                </div>
              </RepoRow>
            );
          })}
        </>
      ) : null}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HomeWithNoFavorites() {
  return (
    <>
      <div className="flex flex-col gap-4 rounded border border-dashed border-vela-coal-light p-4">
        <p>
          You do not have any favorite repositories. Visit{" "}
          <Link to="/account/source-repos">Source Repositories</Link> to add
          repositories to your favorites.
        </p>
        <p>
          Visit{" "}
          <a
            href="https://go-vela.github.io/docs/"
            rel="noopener noreferrer"
            target="_blank"
          >
            our documentation
          </a>{" "}
          to get started.
        </p>
      </div>
    </>
  );
}
