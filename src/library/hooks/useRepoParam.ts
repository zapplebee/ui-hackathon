import { useParams } from "react-router";
import invariant from "tiny-invariant";

export function useRepoParam() {
  const { repo } = useParams();

  if (!repo) {
    if ("production" !== process.env.NODE_ENV) {
      invariant(false, "repo param missing");
    } else {
      invariant(false);
    }
  }

  return repo;
}
