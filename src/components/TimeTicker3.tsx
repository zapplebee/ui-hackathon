import { useHeartbeat } from "../library/heartbeat";

interface Props {
  start: number;
  end?: number;
}

/**
 * Time Ticker 3.
 *
 * @TODO not sure I like this either.
 *
 * @returns
 */
export function TimeTicker3({ start, end }: Props) {
  if (start === 0 && (!end || end === 0)) {
    return <>--:--</>;
  }

  if (!end) {
    return <TimeTickerActive start={start} end={end} />;
  }

  const str = formatTicker(start, end);
  return <>{str}</>;
}

function TimeTickerActive({ start, end }: Props) {
  useHeartbeat();

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
