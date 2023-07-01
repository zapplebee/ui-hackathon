import * as ToastPrimitive from "@radix-ui/react-toast";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";

export interface ToastCommands {
  publish: () => void;
}

export interface ToastProps extends PropsWithChildren {
  title: React.ReactNode;
  type?: "info" | "success" | "error";
}

export const Toast = React.forwardRef<ToastCommands, ToastProps>(
  function CustomizedToast(props, forwardedRef) {
    const { type = "info", title, children, ...toastProps } = props;
    const [count, setCount] = React.useState<number[]>([]);

    React.useImperativeHandle(forwardedRef, () => ({
      publish: () => setCount((p) => [...p, p.length]),
    }));

    return (
      <>
        {Array.from({ length: count.length }).map((_, index) => {
          const cls = classNames(
            "relative grid grid-cols-[auto_max-content] items-center gap-x-4 border bg-vela-coal-dark p-4 shadow-md [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]",
            { "border-vela-cyan": type === "info" },
            { "border-vela-green": type === "success" },
            { "border-vela-red": type === "error" }
          );
          return (
            <ToastPrimitive.Root key={index} {...toastProps} className={cls}>
              <ToastPrimitive.Title className="mb-2 text-base font-bold text-white [grid-area:_title]">
                {title}
              </ToastPrimitive.Title>
              <ToastPrimitive.Description asChild>
                <div className="text-sm [grid-area:_description]">
                  {children}
                </div>
              </ToastPrimitive.Description>
              <ToastPrimitive.Close
                aria-label="Close"
                className="absolute right-0 top-0 mr-2 p-2 text-vela-gray hover:text-vela-offwhite"
              >
                <span title="close" aria-hidden>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          );
        })}
      </>
    );
  }
);
