import { ComponentPropsWithoutRef, ElementType } from "react";
import classNames from "classnames";
import { type ButtonIntent, getButtonVariantClasses } from "./button-variants";

export interface ButtonProps<T extends ElementType = "button"> {
  as?: T;
  intent?: ButtonIntent;
}

/**
 * Button.
 *
 * The default intent is "primary."
 *
 * @param props button props
 * @returns
 */
export function Button<T extends ElementType = "button">({
  as,
  intent,
  className,
  ...props
}: ButtonProps<T> & ComponentPropsWithoutRef<T>) {
  const Comp = as || "button";
  const variantCls = getButtonVariantClasses(intent || "primary");
  return <Comp {...props} className={classNames(variantCls, className)} />;
}
