import { twStub } from "../../library/tw-sub";

export type ButtonIntent = "primary" | "secondary" | "underlined";

const baseCls = twStub(
  "inline-block w-auto leading-6 max-w-full cursor-pointer text-center font-bold select-none whitespace-nowrap border-2 border-transparent no-underline sm:px-[1.2rem] sm:py-[0.4rem] px-[1rem] py-[0.2rem]"
);
const primaryCls = twStub(
  "bg-vela-cyan hover:border-vela-cyan text-vela-coal hover:bg-vela-coal hover:text-vela-offwhite focus:border-vela-cyan focus:bg-vela-coal focus:text-vela-offwhite disabled:cursor-not-allowed disabled:bg-vela-cyan/75 disabled:hover:text-vela-coal disabled:hover:border-transparent"
);
const secondaryCls = twStub(
  "border-vela-cyan bg-vela-coal text-vela-cyan hover:border-vela-cyan hover:bg-vela-cyan hover:text-vela-coal focus:border-vela-cyan focus:bg-vela-cyan focus:text-vela-coal disabled:cursor-not-allowed disabled:hover:bg-vela-coal disabled:text-vela-cyan/50"
);
const underlinedCls = twStub(
  "bg-vela-coal border-b-vela-coal-light text-vela-gray hover:text-vela-white disabled:cursor-not-allowed disabled:border-b-vela-coal-light/50 disabled:text-vela-white/50"
);

/**
 * Gets classes for the given intent.
 *
 * @param intent a string that represents the button's visual intent
 * @returns
 */
export function getButtonVariantClasses(intent: ButtonIntent = "primary") {
  const cls = [baseCls];

  if (intent === "primary") {
    cls.push(primaryCls);
  } else if (intent === "secondary") {
    cls.push(secondaryCls);
  } else if (intent === "underlined") {
    cls.push(underlinedCls);
  }

  return cls;
}
