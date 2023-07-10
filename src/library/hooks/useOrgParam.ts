import { useParams } from "react-router";
import invariant from "tiny-invariant";

export function useOrgParam() {
  const { org } = useParams();

  if (!org) {
    if ("production" !== process.env.NODE_ENV) {
      invariant(false, "org param missing");
    } else {
      invariant(false);
    }
  }

  return org;
}
