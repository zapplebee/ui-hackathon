import classNames from "classnames";
import { Params, useMatches } from "react-router";

export interface RouteWithHandle {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: {
    crumb: (match: RouteWithHandle) => React.ReactNode;
  };
}

// based on the example
// https://reactrouter.com/en/main/hooks/use-matches

export function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches.filter(hasHandle("crumb"));

  const combined = crumbs.reduce<(RouteWithHandle | null)[]>(
    (a, b, i, array) => {
      return [...a, b, ...(i === array.length - 1 ? [] : [null])];
    },
    []
  );

  // todo: provide an alternaitve for small screens
  // probably in a Details
  return (
    <nav
      className="flex items-center justify-between gap-4"
      aria-label="Navigation"
    >
      <div
        data-left
        className="flex-1 overflow-x-auto pb-2 sm:overflow-x-visible sm:pb-0"
      >
        <ol
          className="__breadcrumbs flex w-full list-none items-center sm:first:[&_li]:pl-8 [&_li_*]:block [&_li_*]:p-4"
          aria-label="Breadcrumb"
        >
          {combined.map((match, index) => {
            const isDivider = match === null;
            const isSecondToLastElement = index === combined.length - 2;
            const isLastElement = index === combined.length - 1;
            const isFirstElement = index === 0;

            const cls = classNames(
              "relative block whitespace-nowrap",
              { "bg-vela-coal-dark": !isLastElement },
              {
                "bg-vela-lavender font-bold text-vela-coal-dark [&_a]:text-vela-coal-dark":
                  isLastElement,
              },
              { "sm:right-[1rem]": isLastElement && !isFirstElement },
              { "text-vela-lavender": isDivider }
            );

            // generates the divider
            if (match === null) {
              return (
                <li key={"sep" + index} className={cls} aria-hidden>
                  {isSecondToLastElement ? <span>&nbsp;</span> : <span>/</span>}
                </li>
              );
            }

            return (
              <li
                key={match.id}
                className={cls}
                aria-current={isLastElement ? "page" : undefined}
              >
                {match.handle.crumb(match)}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

function isRecordWithKey<T extends string>(
  value: unknown,
  key: T
): value is Record<T, unknown> {
  return !!value && typeof value === "object" && key in value;
}

function hasHandle<Handle extends string, Value>(
  handle: Handle,
  valuePredicate?: (v: unknown) => v is Value
) {
  return (
    route:
      | {
          handle: unknown;
        }
      | RouteWithHandle
  ): route is RouteWithHandle => {
    return (
      !!route.handle &&
      isRecordWithKey(route.handle, handle) &&
      (!valuePredicate ||
        (handle in route.handle && valuePredicate(route.handle[handle])))
    );
  };
}
