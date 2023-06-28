import { useQuery } from "@tanstack/react-query";
import { BuildsService } from "../../api";
import { REFETCH_INTERVAL } from "../constants";

export function useBuildsQuery(org: string, repo: string, page: number) {
  const builds = useQuery({
    queryKey: ["builds", org, repo, page],
    queryFn: () =>
      BuildsService.getBuilds(
        org!,
        repo!,
        undefined,
        undefined,
        undefined,
        undefined,
        page,
        undefined
      ),
    // todo: would like to throttle this when its not busy
    refetchInterval: REFETCH_INTERVAL,
  });

  return { builds };
}
