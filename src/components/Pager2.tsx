import { useNavigate } from "react-router";
import { SerializedHeaders } from "../library/headers";

interface PagerProps {
  page: number;
  path: string;
  pagination: SerializedHeaders | null;
}

// todo: the api returns Link information for paging
// but we have no access to it using the api interface package
// <https://vela.example.com/api/v1/repos/example_org?per_page=10&page=1>; rel="first", <https://vela.example.com/api/v1/repos/example_org?per_page=10&page=49>; rel="last", <https://vela.example.com/api/v1/repos/example_org?per_page=10&page=49>; rel="next", <https://vela.example.com/api/v1/repos/example_org?per_page=10&page=47>; rel="prev"
export function Pager2(props: PagerProps) {
  const newer = Math.max(props.page - 1, 1);
  const older = props.page + 1;

  const navigate = useNavigate();

  function handlePage(dir: -1 | 1) {
    const page = dir === -1 ? newer : older;
    const dest = {
      pathname: props.path,
      search: `page=${page}`,
    };
    navigate(dest);
  }

  const left = props.pagination && "prev" in props.pagination;
  const right = props.pagination && "next" in props.pagination;

  console.log("details=", props.pagination);

  // these could have been Link but
  // I wanted to maintain any existing query strings in the url
  // if they were in there but neither way in
  // react router seem to make it easy
  return (
    <div className="flex justify-end gap-4">
      {left && (
        <button className="btn-secondary" onClick={() => handlePage(-1)}>
          ← newer
        </button>
      )}
      {right && (
        <button className="btn-secondary" onClick={() => handlePage(1)}>
          older →
        </button>
      )}
    </div>
  );
}
