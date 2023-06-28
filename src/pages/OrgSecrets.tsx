import { Helmet } from "react-helmet-async";
import { OrgSecretsWidget } from "../components/OrgSecretsWidget";
import { TopBumper } from "../components/TopBumper";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { OrgSharedSecretsListWidget } from "../components/OrgSharedSecretsListWidget";

export function OrgSecrets() {
  const { org } = useOrgRepoParams();

  return (
    <>
      <Helmet>
        <title>{`Secrets - ${org} - Vela`}</title>
      </Helmet>
      <TopBumper />
      <div>
        <OrgSecretsWidget org={org!} />
      </div>
      <div className="py-4">
        <hr />
      </div>
      <div>
        <OrgSharedSecretsListWidget org={org!} />
      </div>
    </>
  );
}
