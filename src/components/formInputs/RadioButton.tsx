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
              className="peer relative h-6 w-6 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-vela-cyan bg-vela-coal-dark disabled:cursor-not-allowed disabled:border-vela-gray disabled:bg-vela-coal"
              type="radio"
              id={id}
              ref={ref}
            />
            <div className="pointer-events-none absolute hidden h-3 w-3 rounded-full bg-vela-cyan outline-none peer-checked:block"></div>
          </div>
          <Label.Root className="flex-1 cursor-pointer" htmlFor={id}>
            {label}
          </Label.Root>
        </div>
      </>
    );
  }
);
