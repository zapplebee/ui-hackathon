import { useQuery } from "@tanstack/react-query";
import { ApiError, SecretsService } from "../api";
import { IconCopy } from "./IconCopy";
import { IconPlus } from "./IconPlus";
import { Loader } from "./Loader";
import { Table } from "./Table";

export interface OrgSecretsWidgetProps {
  org: string;
}
export function OrgSecretsWidget({ org }: OrgSecretsWidgetProps) {
  const orgSecretsQuery = useQuery({
    queryKey: ["org-secrets", org],
    queryFn: () =>
      // fairly unlikely that the repo has more than 100 secrets; this way we don't need paging
      SecretsService.getSecrets("native", "org", org!, "*", 1, 100),
  });

  function handleCopyToClipboard(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (navigator && navigator.clipboard) {
      // TODO
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
          <h2 className="text-3xl font-bold">Org Secrets</h2>
          {orgSecretsQuery.isLoading ? <Loader /> : null}
        </div>
        <div>
          {orgSecretsQuery.isSuccess && !orgSecretsQuery.isError ? (
            <>
              <button className="btn-secondary flex items-center gap-2">
                Add Org Secret
                <span className="inline-block h-6 w-6">
                  <IconPlus />
                </span>
              </button>
            </>
          ) : null}
        </div>
      </div>
      {orgSecretsQuery.isError ? (
        <>
          <div className="space-y-4">
            <p>
              There was an error fetching organization secrets for{" "}
              <code>{org}</code>, please refresh or try again later!
            </p>

            <blockquote className="border-l-4 border-l-vela-red p-4">
              {orgSecretsQuery.error
                ? (orgSecretsQuery.error as ApiError).body.error
                : null}
            </blockquote>
          </div>
        </>
      ) : null}
      {orgSecretsQuery.isSuccess && !orgSecretsQuery.isError ? (
        <>
          {orgSecretsQuery.data.length === 0 ? (
            <>
              <p>
                There are no secrets org <code>{org}</code> yet.
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
                  {orgSecretsQuery.data.map((secret) => {
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
