import { PropsWithChildren } from "react";

interface TabsContainerProps extends PropsWithChildren {}
/**
 * Basic container for tabs.
 * @param param0
 * @returns
 */
export function TabsContainer({ children }: TabsContainerProps) {
  return (
    <div className="flex flex-col overflow-x-auto overflow-y-hidden  sm:overflow-x-visible sm:overflow-y-visible">
      {children}
    </div>
  );
}
