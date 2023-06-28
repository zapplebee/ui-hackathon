import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import { TabsContainer, getTabNavLinkCls } from "../components/tabs";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";

export function OrgRoot() {
  const { org } = useOrgRepoParams();

  // todo: what should we do if this happens?
  if (!org) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{`${org} - Vela`}</title>
      </Helmet>
      <OrgTabs org={org} />
      <div>
        <Outlet />
      </div>
    </>
  );
}

interface OrgTabProps {
  org: string;
}

function OrgTabs({ org }: OrgTabProps) {
  return (
    <div data-org-tabs>
      <TabsContainer>
        <li>
          <NavLink end className={getTabNavLinkCls()} to={`/${org}`}>
            Repositories
          </NavLink>
        </li>
        <li>
          <NavLink className={getTabNavLinkCls()} to={`/${org}/builds`}>
            Builds
          </NavLink>
        </li>
        <li>
          <NavLink
            className={getTabNavLinkCls()}
            to={`/${org}/$/secrets/native`}
          >
            Secrets
          </NavLink>
        </li>
      </TabsContainer>
    </div>
  );
}
