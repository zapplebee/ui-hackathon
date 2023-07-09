import React from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "../../library/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";

export interface ButtonProps extends VariantProps<typeof buttonVariants> {}

export type ForwardedButtonProps<T extends React.ElementType = "button"> =
  PolymorphicPropsWithRef<ButtonProps, T>;

export const Button: PolymorphicForwardRefExoticComponent<
  ButtonProps,
  "button"
> = React.forwardRef(function Heading<T extends React.ElementType = "button">(
  {
    as,
    intent,

    className,
    ...restProps
  }: PolymorphicPropsWithoutRef<ButtonProps, T>,
  ref: React.ForwardedRef<Element>
) {
  const Element: React.ElementType = as || "button";
  return (
    <Element
      ref={ref}
      className={buttonVariants({ intent, className })}
      {...restProps}
    />
  );
});
