import { useCallback, useEffect, useRef } from "react";

export function useDebounce<A extends unknown[]>(
  callback: (...args: A) => void,
  delayMs: number,
): (...args: A) => void {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    return (): void => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [delayMs]);

  return useCallback(
    (...args: A) => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        cbRef.current(...args);
      }, delayMs);
    },
    [delayMs],
  );
}
