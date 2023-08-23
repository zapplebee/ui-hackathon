import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Outlet, useMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { UsersService } from "../api";
import { FavoriteStarButton } from "../components/FavoriteStarButton";
import { TabsContainer, getTabNavLinkCls } from "../components/tabs";
import { TabsList } from "../components/tabs/TabsList";
import { useHandleFavorite } from "../library/hooks/useHandleFavorite";
import { useOrgParam } from "../library/hooks/useOrgParam";
import { useRepoParam } from "../library/hooks/useRepoParam";

export function RepoRoot() {
  const org = useOrgParam();
  const repo = useRepoParam();

  // react router allows wildcards `*`
  // so we can use that to determine if we're on a build route
  const isBuildRoute = useMatch("/:org/:repo/:number/*");

  /**
   * isBuild should only be true when showing the /:org/:repo/:number route
   * and not when showing deployments or settings. React Router
   * does not allow for regex matching anymore so we have to do it in a
   * component space like this.
   */
  const isBuild =
    !!isBuildRoute?.pathname &&
    !Number.isNaN(parseInt(isBuildRoute.params.number ?? "1", 10));

  return (
    <>
      <Helmet>
        <title>{`${org}/${repo} - Vela`}</title>
      </Helmet>
      <RepoRootTabs org={org} repo={repo} isBuild={isBuild} />
      <div>
        <Outlet />
      </div>
    </>
  );
}

interface RepoRootTabsProps {
  org: string;
  repo: string;
  isBuild?: boolean;
}

function RepoRootTabs(props: RepoRootTabsProps) {
  const { isBuild = false } = props;
  const handleFavorite = useHandleFavorite();

  const currentUser = useQuery({
    queryKey: ["current-user"],
    queryFn: UsersService.getCurrentUser,
  });

  return (
    <>
      <div data-repo-tabs>
        <TabsContainer>
          <TabsList>
            <li>
              <NavLink
                end
                className={getTabNavLinkCls((isActive) => {
                  const active = isActive || isBuild;
                  return active;
                })}
                to={`/${props.org}/${props.repo}`}
              >
                Builds
              </NavLink>
            </li>
            <li>
              <NavLink
                className={getTabNavLinkCls()}
                to={`/${props.org}/${props.repo}/deployments`}
              >
                Deployments
              </NavLink>
            </li>
            <li>
              <NavLink
                className={getTabNavLinkCls()}
                // todo: where does this native property come from?
                to={`/${props.org}/${props.repo}/$/secrets/native`}
              >
                Secrets
              </NavLink>
            </li>
            <li>
              <NavLink
                className={getTabNavLinkCls()}
                to={`/${props.org}/${props.repo}/audit`}
              >
                Audit
              </NavLink>
            </li>
            <li>
              <NavLink
                className={getTabNavLinkCls()}
                to={`/${props.org}/${props.repo}/settings`}
              >
                Settings
              </NavLink>
            </li>

            {/*  */}

            <li className="flex items-center ml-auto">
              {currentUser ? (
                <FavoriteStarButton
                  org={props.org}
                  repo={props.repo}
                  favorites={currentUser.data?.favorites ?? []}
                  onClick={(favorites) =>
                    handleFavorite(currentUser.data, favorites)
                  }
                />
              ) : null}
            </li>

            {/* todo: import.meta.env.VITE_VELA_SCM isn't used in the frontend ui so there's no way for this button to get linked up yet */}
            {/* <li className="flex items-center">
              <a
                // TODO: how do we get this value?
                href={"#"}
                className="w-8 h-8 transition-all hover:scale-110 duration-300"
              >
                <Github />
              </a>
            </li> */}
          </TabsList>
        </TabsContainer>
      </div>
    </>
  );
}
