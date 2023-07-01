import { PropsWithChildren } from "react";

export function PageTitle({ children }: PropsWithChildren) {
  return (
    <h2 className="border-b-2 border-b-vela-lavender text-2xl font-bold">
      {children}
    </h2>
  );
}
