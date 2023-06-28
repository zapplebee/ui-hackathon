import { useParams } from "react-router";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";

export interface RedirectorProps {
  // render prop
  // https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering
  children: ({
    org,
    repo,
    team,
  }: {
    org: string;
    repo: string;
    team: string;
  }) => JSX.Element;
}

export function Redirector({ children }: RedirectorProps) {
  const { org, repo } = useOrgRepoParams();
  const { team } = useParams();

  return children({ org: org!, repo: repo!, team: team! });
}
