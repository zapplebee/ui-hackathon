import { Helmet } from "react-helmet-async";
import { TopBumper } from "../components/TopBumper";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { useParams } from "react-router";
import { OrgSharedSecretsWidget } from "../components/OrgSharedSecretsWidget";

export function OrgSharedSecrets() {
  const { org } = useOrgRepoParams();
  const params = useParams();

  const { team } = params;

  return (
    <>
      <Helmet>
        <title>{`Shared Secrets - Team ${team} - ${org} - Vela`}</title>
      </Helmet>
      <TopBumper />
      <div>
        <OrgSharedSecretsWidget org={org!} team={team!} />
      </div>
    </>
  );
}
