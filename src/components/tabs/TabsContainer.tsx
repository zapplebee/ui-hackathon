import { PropsWithChildren } from "react";

interface TabsContainerProps extends PropsWithChildren {}
/**
 * Basic container for tabs.
 * @param param0
 * @returns
 */
export function TabsContainer({ children }: TabsContainerProps) {
  return (
    <div className="flex flex-col">
      <ul className="relative flex flex-1 gap-x-8 overflow-x-auto overflow-y-hidden pb-2 sm:overflow-x-visible sm:overflow-y-visible sm:border-b-4 sm:border-b-vela-coal-light sm:pb-0">
        {children}
      </ul>
    </div>
  );
}
