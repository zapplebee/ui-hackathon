import React, { useRef } from "react";
import { Toast, ToastCommands, ToastProps } from "./Toast";

export const useToast = () => {
  const ref = useRef<ToastCommands>(null);

  const publish = () => {
    ref?.current?.publish();
  };

  const Component = React.useMemo(
    () =>
      function SynthesizedToast(props: ToastProps) {
        return <Toast {...props} ref={ref} />;
      },
    []
  );

  return { publish, Component };
};
