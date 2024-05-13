import { useRef } from "react";

export const useThrottle = <T,>(callback: (event: T) => void, delay: number): ((event: T) => void) => {
  const lastCallTime = useRef<number>(0);
  let timeoutId: number | null = null;

  return (event: T) => {
    const now = Date.now();
    const elapsed = now - lastCallTime.current;
    if (elapsed > delay) {
      lastCallTime.current = now;
      callback(event);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime.current = now;
        callback(event);
        timeoutId = null;
      }, delay);
    }
  };
};
