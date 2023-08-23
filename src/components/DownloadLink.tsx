export interface DownloadLinkProps {
  data: string;
}

export function DownloadLink() {
  function handleClick() {
    return "hi";
  }

  return (
    <button
      type="button"
      className="text-sm text-vela-cyan hover:underline"
      onClick={handleClick}
    >
      download step logs
    </button>
  );
}
