import { useParams } from "react-router";
import invariant from "tiny-invariant";

export function useOrgParam() {
  const { org } = useParams();

  invariant(!!org, "org param missing");

  return org;
}
