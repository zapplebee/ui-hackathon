import React, { useId } from "react";

import * as Label from "@radix-ui/react-label";

type TextareaProps = {
  label: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function RefTextarea({ label, ...inputProps }: TextareaProps, ref) {
    const id = useId();
    return (
      <>
        <Label.Root className="font-bold" htmlFor={id}>
          {label}
        </Label.Root>
        <textarea
          {...inputProps}
          ref={ref}
          className="border-0 bg-vela-coal-dark font-mono"
          id={id}
        />
      </>
    );
  }
);
