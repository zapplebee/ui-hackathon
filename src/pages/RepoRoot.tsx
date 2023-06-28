import { Helmet } from "react-helmet-async";
import { Outlet, useMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { TabsContainer, getTabNavLinkCls } from "../components/tabs";

export function RepoRoot() {
  const { org, repo } = useOrgRepoParams();

  // react router allows wildcards `*`
  // so we can use that to determine if we're on a build route
  const isBuildRoute = useMatch("/:org/:repo/:number/*");

  // todo: what should we do if this happens?
  if (!org) {
    return null;
  }

  if (!repo) {
    return null;
  }

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
      <Tabs org={org} repo={repo} isBuild={isBuild} />
      <div>
        <Outlet />
      </div>
    </>
  );
}

interface TabProps {
  org: string;
  repo: string;
  isBuild?: boolean;
}

function Tabs(props: TabProps) {
  const { isBuild = false } = props;

  return (
    <>
      <div data-repo-tabs>
        <TabsContainer>
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
        </TabsContainer>
      </div>
    </>
  );
}
