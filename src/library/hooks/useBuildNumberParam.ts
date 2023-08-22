import { useParams } from "react-router-dom";
import invariant from "tiny-invariant";

export function useBuildNumberParam() {
  const { number: raw } = useParams();

  invariant(!!raw, "build number param missing");

  const buildNumber = parseInt(raw || "1", 10);

  invariant(!Number.isNaN(buildNumber), "build number not a number");

  return buildNumber;
}
