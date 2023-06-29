import { Helmet } from "react-helmet-async";
import { TopBumper } from "../components/TopBumper";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { useParams } from "react-router";
import { RepoSecretsAddEditWidget } from "../components/RepoSecretsAddEditWidget";

export function RepoSecretsEdit() {
  const { secretName } = useParams();
  const { org, repo } = useOrgRepoParams();

  const mode = secretName ? "edit" : "add";
  return (
    <>
      <Helmet>
        <title>{`${mode.toLocaleUpperCase()} Native Secret - Secrets - ${org}/${repo} - Vela`}</title>
      </Helmet>
      <TopBumper />
      <div>
        <RepoSecretsAddEditWidget
          org={org!}
          repo={repo!}
          mode={mode}
          secretName={secretName}
        />
        <div className="py-4"></div>
      </div>
    </>
  );
}
