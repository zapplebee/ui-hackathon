import { Helmet } from "react-helmet-async";
import { TopBumper } from "../components/TopBumper";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { RepoSecretsWidget } from "../components/RepoSecretsWidget";
import { OrgSecretsWidget } from "../components/OrgSecretsWidget";

export function RepoSecrets() {
  const { org, repo } = useOrgRepoParams();

  return (
    <>
      <Helmet>
        <title>{`Secrets - ${org}/${repo} - Vela`}</title>
      </Helmet>
      <TopBumper />
      <div>
        <RepoSecretsWidget org={org!} repo={repo!} />
        <div className="py-4">
          <hr />
        </div>
        <OrgSecretsWidget org={org!} />
      </div>
    </>
  );
}
