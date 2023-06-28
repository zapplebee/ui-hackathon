import { Loader } from "./Loader";

export function LoadingFullscreen() {
  return (
    <>
      <div className="flex items-center justify-center p-4">
        <Loader />
        Loading...
      </div>
    </>
  );
}
