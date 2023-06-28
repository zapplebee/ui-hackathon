import { useEffect, useRef, useState } from "react";

/**
 * Time Ticker.
 *
 * @TODO how does this work
 *
 * @returns
 */
export function TimeTicker() {
  const [seconds, setSeconds] = useState(() => {
    return Math.floor(Math.random() * 300);
  });
  const startTime = useRef(Date.now());

  useEffect(() => {
    function fn() {
      const diff = Math.floor((Date.now() - startTime.current) / 1000);
      diff;
      setSeconds((p) => p + 1);
    }

    const handle = setInterval(fn, 1000);

    return () => {
      handle && clearInterval(handle);
    };
  }, [setSeconds]);

  const str = `${`${Math.floor(seconds / 60)}`.padStart(2, "0")}:${`${
    seconds % 60
  }`.padStart(2, "0")}`;

  return <>{str}</>;
}
