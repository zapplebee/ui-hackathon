import React, { useId } from "react";

import * as Label from "@radix-ui/react-label";

type RadioButtonProps = {
  label: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ label, ...inputProps }: RadioButtonProps, ref) => {
    const id = useId();
    return (
      <>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <input
              {...inputProps}
              className="peer relative h-6 w-6 shrink-0 appearance-none rounded-full border-2 border-vela-cyan bg-vela-coal-dark disabled:cursor-not-allowed disabled:border-vela-gray disabled:bg-vela-coal"
              type="radio"
              id={id}
              ref={ref}
            />
            <div className="pointer-events-none absolute hidden h-3 w-3 rounded-full bg-vela-cyan outline-none peer-checked:block"></div>
          </div>
          {/* <div className="absolute flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:bg-vela-cyan after:content-['']"></div> */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg> */}
          <Label.Root className="flex-1 font-bold" htmlFor={id}>
            {label}
          </Label.Root>
        </div>
      </>
    );
  }
);
