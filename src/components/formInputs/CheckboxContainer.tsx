import { PropsWithChildren } from "react";

export function CheckboxContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-4 [&_label]:flex-1">{children}</div>
  );
}
