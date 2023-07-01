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
        <input
          {...inputProps}
          ref={ref}
          type="checkbox"
          className=" bg-vela-cyan checked:bg-vela-cyan focus-within:text-vela-cyan hover:bg-vela-cyan focus:bg-vela-cyan focus:text-vela-cyan"
          id={id}
        />
        <Label.Root className="font-bold" htmlFor={id}>
          {label}
        </Label.Root>
      </>
    );
  }
);
