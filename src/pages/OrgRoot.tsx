import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import { TabsContainer, getTabNavLinkCls } from "../components/tabs";
import { TabsList } from "../components/tabs/TabsList";
import { useOrgParam } from "../library/hooks/useOrgParam";

export function OrgRoot() {
  const org = useOrgParam();

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
        <TabsList>
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

          {/* todo: import.meta.env.VITE_VELA_SCM isn't used in the frontend ui so there's no way for this button to get linked up yet */}
          {/* <li className="flex items-center ml-auto">
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
  );
}
