import { useEffect, useState } from "react";

interface Props {
  start: number;
  end?: number;
}

/**
 * Time Ticker 2.
 *
 * @TODO does this work better?
 *
 * @returns
 */
export function TimeTicker2({ start, end }: Props) {
  const [, setSeconds] = useState(0);

  useEffect(() => {
    function fn() {
      setSeconds((p) => p + 1);
    }

    const handle = setInterval(fn, 500);

    if (end && end > 0) {
      handle && clearInterval(handle);
    }

    return () => {
      handle && clearInterval(handle);
    };
  }, [setSeconds, end]);

  // for steps not started or killed, they may be set to display a unique
  // non-time display
  if (start === 0 && (!end || end === 0)) {
    return <>--:--</>;
  }

  const str = formatTicker(start, end);

  return <>{str}</>;
}

function formatTicker(start: number, end: number | undefined) {
  // if end, start are available
  // this ticker has stopped and can rely on state for its time
  // otherwise, we can use the machine's local epoch time instead
  // to compute the elapsed time between start time and now-in-time
  const diff =
    end && end > 0 ? end - start : Math.floor(Date.now() / 1000) - start;

  // todo: consider hour part as a bonus
  const str = `${`${Math.floor(diff / 60)}`.padStart(2, "0")}:${`${
    diff % 60
  }`.padStart(2, "0")}`;

  return str;
}
