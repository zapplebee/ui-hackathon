import React from "react";

interface SearchbarProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  right?: React.ReactNode;
}
export function Searchbar(props: SearchbarProps) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <svg
            className="absolute top-2"
            fill="none"
            height="24"
            width="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            role="img"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <input
            type="text"
            className="w-full border-b-2 border-l-0 border-r-0 border-t-0 border-b-vela-cyan bg-transparent pl-[32px] placeholder-vela-gray"
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
        </div>
        {props.right}
      </div>
    </>
  );
}
