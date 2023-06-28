import { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {}

export function RepoRowGroup(props: Props) {
  return <div className="flex flex-col gap-4 pl-4">{props.children}</div>;
}
