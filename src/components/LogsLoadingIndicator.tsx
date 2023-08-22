import classNames from "classnames";

export interface LogsLoadingIndicatorProps {
  active: boolean;
  fetching: boolean;
}

/**
 * Displays loading dots and an animation whenever new logs are fetched.
 * @param param0
 * @returns
 */
export function LogsLoadingIndicator({
  active,
  fetching,
}: LogsLoadingIndicatorProps) {
  const cls = classNames("flex w-full items-start transition-all", {
    visible: active,
    invisible: !active,
  });

  const cls2 = classNames(
    "relative block w-[6ch] select-none overflow-hidden whitespace-nowrap text-right font-mono no-underline transition-all duration-500",
    {
      "translate-x-0": !fetching,
      "translate-x-2": fetching,
    },
  );

  return (
    <tr className={cls} aria-hidden>
      <td>
        <span className={cls2}>
          <span className="animate-pulse [animation-delay:0ms]">&middot;</span>
          <span className="animate-pulse [animation-delay:250ms]">
            &middot;
          </span>
          <span className="animate-pulse [animation-delay:500ms]">
            &middot;
          </span>
        </span>
      </td>
    </tr>
  );
}
