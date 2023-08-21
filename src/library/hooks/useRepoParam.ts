import { useParams } from "react-router";
import invariant from "tiny-invariant";

export function useRepoParam() {
  const { repo } = useParams();

  invariant(!!repo, "repo param missing");

  return repo;
}
