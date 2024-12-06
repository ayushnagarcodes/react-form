import { useRef } from "react";

// timeLimit in 'ms'
function useThrottle<T extends (...args: any[]) => void>(
  fn: T,
  timeLimit: number
): (...args: Parameters<T>) => void {
  const lastInvokedRef = useRef<number>(0);

  return (...args) => {
    const current = Date.now();

    if (current - lastInvokedRef.current >= timeLimit) {
      lastInvokedRef.current = current;
      fn(...args);
    }
  };
}

export default useThrottle;
