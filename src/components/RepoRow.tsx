import { PropsWithChildren } from "react";
import { DetailsPanel } from "./DetailsPanel";
import { getRepoRoute } from "../library/routes";
import { Link } from "react-router-dom";

export interface Props extends PropsWithChildren {
  name: React.ReactNode;
  org: string;
  repo: string;
}

export function RepoRow(props: Props) {
  return (
    <DetailsPanel>
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link className="text-white" to={getRepoRoute(props.org, props.repo)}>
            {props.name}
          </Link>
        </div>
        <div>{props.children}</div>
      </div>
    </DetailsPanel>
  );
}
