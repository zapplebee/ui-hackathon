import { Helmet } from "react-helmet-async";
import { TopBumper } from "../components/TopBumper";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { RepoSecretsForm } from "../components/RepoSecretsForm";

export function RepoSecretsAdd() {
  const { org, repo } = useOrgRepoParams();
  return (
    <>
      <Helmet>
        <title>{`Add Native Secret - Secrets - ${org}/${repo} - Vela`}</title>
      </Helmet>
      <TopBumper />
      <div>
        <RepoSecretsForm org={org!} repo={repo!} mode="add" />
        <div className="py-4"></div>
      </div>
    </>
  );
}
