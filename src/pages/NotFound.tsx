import { Link } from "react-router-dom";
import { TopBumper } from "../components/TopBumper";

export function NotFound() {
  return (
    <>
      <TopBumper />
      <div className="text-center">
        <h1 className="text-3xl font-bold">Not Found</h1>
        <p>Sorry, it's not here.</p>

        <Link to="/" className="my-12 flex justify-center">
          <svg viewBox="0 0 1500 1500" className="h-12 w-12">
            <path
              className="fill-vela-lavender"
              d="M1477.22 329.54l-139.11-109.63 11.45-176.75-147.26 98.42-164.57-65.51 48.11 170.47-113.16 136.27 176.99 6.93 94.63 149.72 61.28-166.19 171.64-43.73z"
            ></path>
            <path
              className="fill-vela-cyan"
              d="M1174.75 635.12l-417.18 722.57a3.47 3.47 0 01-6 0L125.38 273.13a3.48 3.48 0 013-5.22h796.86l39.14-47.13-14.19-50.28h-821.8A100.9 100.9 0 0041 321.84L667.19 1406.4a100.88 100.88 0 00174.74 0l391.61-678.27z"
            ></path>
            <path
              className="fill-vela-offwhite"
              d="M1087.64 497.29l-49.37-1.93-283.71 491.39L395.9 365.54H288.13l466.43 807.88 363.02-628.76-29.94-47.37z"
            ></path>
          </svg>
        </Link>
      </div>
    </>
  );
}
