import classNames from "classnames";
import { NavLink } from "react-router-dom";

/**
 * Calculate the classnames required for this a tab nav link.
 *
 * TODO: decide where we should keep functions like these
 *
 * @param isActiveFn an optional that augments the inherit NavLink isActive feature
 * @returns
 */
export function getTabNavLinkCls(isActiveFn?: (isActive: boolean) => boolean) {
  const fn: Parameters<typeof NavLink>["0"]["className"] = ({ isActive }) => {
    const cls: string = classNames(
      "relative top-[4px] block border-b-4 p-4 !text-white transition-colors duration-300 hover:border-b-vela-cyan hover:!no-underline",
      (isActiveFn ? isActiveFn(isActive) : isActive)
        ? "border-b-vela-cyan font-bold"
        : "border-b-transparent"
    );
    return cls;
  };

  return fn;
}
