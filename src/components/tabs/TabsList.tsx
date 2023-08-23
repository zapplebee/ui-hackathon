import { PropsWithChildren } from "react";

export interface TabsList extends PropsWithChildren {}

export function TabsList({ children }: TabsList) {
  return (
    <ul className="relative flex flex-1 gap-x-2 md:gap-x-4 lg:gap-x-8 pb-2 sm:border-b-4 sm:border-b-vela-coal-light sm:pb-0">
      {children}
    </ul>
  );
}
