import { useSearchParams } from "react-router-dom";

export function useEventParam() {
  const [searchParams] = useSearchParams();

  const event = searchParams.get("event");

  return event;
}
