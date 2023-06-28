import { useParams } from "react-router";

export function useOrgRepoParams() {
  const params = useParams();

  const { org, repo } = params;

  return { org, repo };
}
