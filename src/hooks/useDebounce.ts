import { useRef } from "react";

function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  timeLimit: number
): (...args: Parameters<T>) => void {
  let timeoutId = useRef<NodeJS.Timeout | null>(null);

  return (...args) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      timeoutId.current = null;
      fn(...args);
    }, timeLimit);
  };
}

export default useDebounce;
