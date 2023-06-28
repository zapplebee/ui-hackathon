import { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {}

export function DetailsPanel({ children }: Props) {
  return <div className="bg-vela-coal-dark p-4">{children}</div>;
}
