import React, {
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";

// todo: refactor into multiple files if we keep this

const HeartbeatContext = React.createContext(0);

export function useHeartbeat() {
  return useContext(HeartbeatContext);
}

export interface HeartbeatProviderProps extends PropsWithChildren {}

export function HeartbeatProvider({ children }: HeartbeatProviderProps) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    function fn() {
      setCounter((p) => p + 1);
    }

    const handle = setInterval(fn, 1000);

    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("visibilitychange", fn, false);
      window.addEventListener("focus", fn, false);
    }

    return () => {
      handle && clearInterval(handle);
      window.removeEventListener("focus", fn);

      window.removeEventListener("visibilitychange", fn);
      window.removeEventListener("focus", fn);
    };
  });

  return (
    <HeartbeatContext.Provider value={counter}>
      {children}
    </HeartbeatContext.Provider>
  );
}
