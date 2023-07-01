import { PropsWithChildren } from "react";

export function Notice({ children }: PropsWithChildren) {
  return (
    <div className="bg-vela-coal-light p-4 text-sm text-white">{children}</div>
  );
}
