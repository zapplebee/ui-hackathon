import { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {
  summary: React.ReactNode;
  open?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDetailsElement>) => void;
}

export function Details({ summary, children, open, onClick }: Props) {
  return (
    <details
      open={!!open}
      className="border-l-2 border-t-2 border-vela-coal-light transition-colors [&_.x-flip]:open:-rotate-180"
    >
      <summary
        onClick={onClick}
        className="flex cursor-pointer list-none items-center gap-2 p-4"
      >
        <div>
          <svg
            className="x-flip rotate-0 transform text-vela-cyan transition-all duration-300"
            fill="none"
            height="20"
            width="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div className="flex-1" data-summary>
          {summary}
        </div>
      </summary>

      <div data-content>{children}</div>
    </details>
  );
}
