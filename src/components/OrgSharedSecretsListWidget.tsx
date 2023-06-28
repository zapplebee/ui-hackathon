import { useQuery } from "@tanstack/react-query";
import { ApiError, SecretsService } from "../api";
import { Loader } from "./Loader";
import { Table } from "./Table";
import { Link } from "react-router-dom";

export interface OrgSharedSecretsListWidgetProps {
  org: string;
}
export function OrgSharedSecretsListWidget({
  org,
}: OrgSharedSecretsListWidgetProps) {
  const orgTeamSecretsQuery = useQuery({
    queryKey: ["org-team-secrets-all", org],
    queryFn: () =>
      // fairly unlikely that the repo has more than 100 secrets; this way we don't need paging
      SecretsService.getSecrets("native", "shared", org!, "*", 1, 100),
  });

  const teams =
    orgTeamSecretsQuery.data && orgTeamSecretsQuery.data.length > 0
      ? [...new Set(orgTeamSecretsQuery.data.map((secret) => secret.team))]
      : [];

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Shared Secrets</h2>
          {orgTeamSecretsQuery.isLoading ? <Loader /> : null}
        </div>
      </div>
      {orgTeamSecretsQuery.isError ? (
        <>
          <div className="space-y-4">
            <p>
              There was an error fetching shared secrets for <code>{org}</code>,
              please refresh or try again later!
            </p>

            <blockquote className="border-l-4 border-l-vela-red p-4">
              {orgTeamSecretsQuery.error
                ? (orgTeamSecretsQuery.error as ApiError).body.error
                : null}
            </blockquote>
          </div>
        </>
      ) : null}
      {orgTeamSecretsQuery.isSuccess && !orgTeamSecretsQuery.isError ? (
        <>
          {orgTeamSecretsQuery.data.length === 0 ? (
            <>
              <p>
                There are no shared secrets <code>{org}</code> yet.
              </p>
            </>
          ) : (
            <Table
              head={
                <tr>
                  <th>Team Name</th>
                </tr>
              }
              body={
                <>
                  {teams.map((team) => {
                    return (
                      <tr key={team}>
                        <td>
                          <Link to={`/${org}/$/secrets/native/shared/${team}`}>
                            {team}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </>
              }
            />
          )}
        </>
      ) : null}
    </>
  );
}
