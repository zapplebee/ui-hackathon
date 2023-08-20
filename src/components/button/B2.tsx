import type { VariantProps } from "class-variance-authority";
import { ElementType, ComponentPropsWithoutRef } from "react";

import { buttonVariants } from "./variants";

export interface ButtonProps<T extends ElementType = "button">
  extends VariantProps<typeof buttonVariants> {
  as?: T;
}

export function Button<T extends ElementType = "button">({
  as,
  intent,
  className,
  ...props
}: ButtonProps<T> & ComponentPropsWithoutRef<T>) {
  const Comp = as || "button";
  return (
    <Comp
      {...props}
      className={buttonVariants({
        intent: intent,
        className: className,
      })}
    />
  );
}
