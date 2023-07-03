import React, { useId } from "react";

import * as Label from "@radix-ui/react-label";

type CheckboxProps = {
  label: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...inputProps }: CheckboxProps, ref) => {
    const id = useId();
    return (
      <>
        <div className="flex items-center gap-2">
          <input
            {...inputProps}
            className="peer relative mt-1 h-6 w-6 shrink-0 appearance-none border-2 border-transparent bg-vela-cyan checked:border-transparent checked:bg-vela-cyan disabled:cursor-not-allowed disabled:border-vela-gray disabled:bg-vela-coal"
            type="checkbox"
            id={id}
            ref={ref}
          />
          <svg
            className="pointer-events-none absolute mt-1 hidden h-6 w-6 stroke-vela-coal-dark p-0.5 outline-none peer-checked:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <Label.Root className="flex-1 font-bold" htmlFor={id}>
            {label}
          </Label.Root>
        </div>
      </>
    );
  }
);
