import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppNavigation } from "./AppNavigation";

export function UnauthenticatedRoot() {
  return (
    <>
      <AppHeader />
      <AppNavigation />

      <div className="px-12 pb-16">
        <Outlet />
      </div>
    </>
  );
}
