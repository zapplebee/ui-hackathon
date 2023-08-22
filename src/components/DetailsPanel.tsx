import classNames from "classnames";
import { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {
  padded?: boolean;
}

export function DetailsPanel({ padded = true, children }: Props) {
  const cls = classNames("bg-vela-coal-dark", { "p-4": padded });
  return <div className={cls}>{children}</div>;
}
