import { useSearchParams } from "react-router-dom";

export function usePageParam() {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  return { page };
}
