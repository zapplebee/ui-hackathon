import { PropsWithChildren } from "react";

export function HelpText({ children }: PropsWithChildren) {
  return <span className="text-sm font-thin italic">{children}</span>;
}
