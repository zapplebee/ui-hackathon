import { useParams } from "react-router";

/**
 * Gets the org and repo route params.
 *
 * @deprecated use useOrgParam and useRepoParam instead
 *
 * @returns an object with org and repo
 */
export function useOrgRepoParams() {
  const params = useParams();

  const { org, repo } = params;

  return { org, repo };
}
