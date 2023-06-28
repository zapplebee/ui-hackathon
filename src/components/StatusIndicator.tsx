import { IconFailure } from "./IconFailure";
import { IconPending } from "./IconPending";
import { IconRunning } from "./IconRunning";
import { IconSuccess } from "./IconSuccess";

interface StatusIndicatorProps {
  status: string;
}
export function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <div className="-mb-[2px] -mt-[2px] flex">
      {/* TODO: perhaps consider additional icons/colors for these fields */}
      {status === "failure" || status === "canceled" || status === "error" ? (
        <div className="flex items-center bg-vela-red text-stone-800">
          <div className="m-7 h-11 w-11">
            <IconFailure />
          </div>
        </div>
      ) : null}
      {status === "success" ? (
        <div className="flex items-center bg-vela-green text-stone-800">
          <div className="m-7 h-11 w-11">
            <IconSuccess />
          </div>
        </div>
      ) : null}
      {status === "running" ? (
        <div className="flex items-center bg-vela-yellow text-stone-800">
          <div className="m-7 h-11 w-11">
            <IconRunning />
          </div>
        </div>
      ) : null}
      {status === "pending" ? (
        <div className="flex items-center bg-vela-coal-light text-stone-800">
          <div className="m-7 h-11 w-11">
            <IconPending />
          </div>
        </div>
      ) : null}
    </div>
    // </a>
  );
}
