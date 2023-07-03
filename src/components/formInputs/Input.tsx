import React, { useId } from "react";

import * as Label from "@radix-ui/react-label";

type InputProps = {
  label: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function RefInput({ label, ...inputProps }: InputProps, ref) {
    const id = useId();
    return (
      <>
        <Label.Root className="font-bold" htmlFor={id}>
          {label}
        </Label.Root>
        <input
          {...inputProps}
          ref={ref}
          className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-vela-cyan bg-transparent p-2 text-base"
          id={id}
        />
      </>
    );
  }
);
