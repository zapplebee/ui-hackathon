import { formatDistanceToNowStrict } from "date-fns";
import { useHeartbeat } from "../library/heartbeat";

export interface Props {
  created: number;
}

export function TimeDuration({ created }: Props) {
  useHeartbeat(); // todo: is this good?

  let text = "";
  let dt = null;

  if (created > 0) {
    dt = new Date(convert(created));
    text = formatDistanceToNowStrict(dt);
  }

  if (text === "" || !dt) {
    return null;
  }

  return <time dateTime={dt.toISOString()}>{text} ago</time>;
}

function convert(v: number) {
  return v * 1000;
}
