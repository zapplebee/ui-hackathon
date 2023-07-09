import { cva } from "class-variance-authority";

/**
 * Button variants.
 *
 * Enables a repeatable structure to relate class names to component props.
 *
 * @example
 * <Button intent="primary">Build now</Button
 *
 * @see https://cva.style/docs
 */
export const buttonVariants = cva(
  [
    "inline-block",
    "w-auto",
    "leading-6",
    "max-w-full",
    "cursor-pointer",
    "text-center",
    "font-bold",
    "select-none",
    "whitespace-nowrap",
    "border-2",
    "border-transparent",
    "no-underline",
    "sm:px-[1.2rem]",
    "sm:py-[0.4rem]",
    "px-[1rem]",
    "py-[0.2rem]",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-vela-cyan",
          "hover:border-vela-cyan",
          "text-vela-coal",
          "hover:bg-vela-coal",
          "hover:text-vela-offwhite",
          "focus:border-vela-cyan",
          "focus:bg-vela-coal",
          "focus:text-vela-offwhite",

          "disabled:cursor-not-allowed",
          "disabled:bg-vela-cyan/75",
          "disabled:hover:text-vela-coal",
          "disabled:hover:border-transparent",
        ],
        secondary: [
          "border-vela-cyan",
          "bg-vela-coal",
          "text-vela-cyan",
          "hover:border-vela-cyan",
          "hover:bg-vela-cyan",
          "hover:text-vela-coal",
          "focus:border-vela-cyan",
          "focus:bg-vela-cyan",
          "focus:text-vela-coal",

          "disabled:cursor-not-allowed",
          "disabled:hover:bg-vela-coal",
          "disabled:text-vela-cyan/50",
        ],
        underlined: [
          "bg-vela-coal",
          "border-b-vela-coal-light",
          "text-vela-gray",
          "hover:text-vela-white",

          "disabled:cursor-not-allowed",
          "disabled:border-b-vela-coal-light/50",
          "disabled:text-vela-white/50",
        ],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      intent: "primary",
    },
  }
);
