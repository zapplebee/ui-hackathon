import { useQuery } from "@tanstack/react-query";
import { ApiError, SecretsService } from "../api";
import { IconCopy } from "./IconCopy";
import { IconGear } from "./IconGear";
import { Loader } from "./Loader";
import { Table } from "./Table";

export interface OrgSharedSecretsWidgetProps {
  org: string;
  team: string;
}
export function OrgSharedSecretsWidget({
  org,
  team,
}: OrgSharedSecretsWidgetProps) {
  const orgTeamSecretsQuery = useQuery({
    queryKey: ["org-team-secrets", org, team],
    queryFn: () =>
      // fairly unlikely that the repo has more than 100 secrets; this way we don't need paging
      SecretsService.getSecrets("native", "shared", org!, team, 1, 100),
  });

  function handleCopyToClipboard(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (navigator && navigator.clipboard) {
      const name = "name";
      const key = "key";
      const engine = "engine";
      const type = "type";

      const toCopy = `
      - name: "${name}"
        key: "${key}"
        engine: "${engine}"
        type: "${type}"
      `;

      navigator.clipboard.writeText(toCopy);
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Shared Secrets</h2>
          {orgTeamSecretsQuery.isLoading ? <Loader /> : null}
        </div>
        <div>
          {orgTeamSecretsQuery.isSuccess && !orgTeamSecretsQuery.isError ? (
            <>
              <button className="btn-secondary flex items-center gap-2">
                Add Shared Secret
                <span className="inline-block h-6 w-6">
                  <IconGear />
                </span>
              </button>
            </>
          ) : null}
        </div>
      </div>
      {orgTeamSecretsQuery.isError ? (
        <>
          <div className="space-y-4">
            <p>
              There was an error fetching shared secrets for{" "}
              <code>
                {org}:{team}
              </code>
              , please refresh or try again later!
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
                There are no shared secrets for{" "}
                <code>
                  {org}:{team}
                </code>{" "}
                yet. Create a new team in this organization to add shared
                secrets.
              </p>
            </>
          ) : (
            <Table
              head={
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Key</th>
                  <th>Type</th>
                  <th>Events</th>
                  <th>Images</th>
                  <th>Allow Command</th>
                </tr>
              }
              body={
                <>
                  {orgTeamSecretsQuery.data.map((secret) => {
                    return (
                      <tr key={secret.id}>
                        <td>
                          <button
                            onClick={handleCopyToClipboard}
                            type="button"
                            className="w-[3rem] pl-[1.25rem]"
                            title="copy secret yaml to clipboard"
                          >
                            <span className="block h-6 w-6">
                              <IconCopy />
                            </span>
                          </button>
                        </td>
                        <td>{secret.name}</td>
                        <td>
                          {secret.org}/{secret.name}
                        </td>
                        <td>{secret.type}</td>
                        <td className="font-mono">
                          {secret.events.join(", ")}
                        </td>
                        <td>
                          {secret.images.length === 0
                            ? "no images"
                            : secret.images.join(", ")}
                        </td>
                        <td>{secret.allow_command ? "yes" : "no"}</td>
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
