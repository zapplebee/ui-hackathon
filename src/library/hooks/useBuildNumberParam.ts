import { useParams } from "react-router-dom";

export function useBuildNumberParam() {
  const { number: raw } = useParams();

  const buildNumber = parseInt(raw || "1", 10);

  return { buildNumber };
}
