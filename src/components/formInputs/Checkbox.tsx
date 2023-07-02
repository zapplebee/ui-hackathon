import React, { ButtonHTMLAttributes, useId } from "react";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import * as Label from "@radix-ui/react-label";

// type CheckboxProps = {
//   label: React.ReactNode;
// } & React.DetailedHTMLProps<
//   React.InputHTMLAttributes<HTMLInputElement>,
//   HTMLInputElement
// >;

// type CheckboxProps = {
//   label: React.ReactNode;
// } & React.DetailedHTMLProps<
//   React.ButtonHTMLAttributes<HTMLButtonElement>,
//   HTMLButtonElement
// >;

type CheckboxProps = {
  label: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>;

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ label, ...props }: CheckboxProps, ref) => {
  const id = useId();
  return (
    <div className="flex items-center gap-4 [&_label]:flex-1">
      <RadixCheckbox.Root
        {...props}
        className="flex h-6 w-6 items-center justify-center bg-vela-cyan"
        id={id}
        ref={ref}
      >
        <RadixCheckbox.Indicator>✔️</RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <Label.Root className="leading-none" htmlFor={id}>
        {label}
      </Label.Root>
    </div>
  );
});
