import { useState } from "react";

export function useDebouncedState<T>(
  initialState: T,
  delay: number,
): [T, (state: T) => void] {
  const [state, setState] = useState<T>(initialState);
  let timeout: NodeJS.Timeout;

  const debouncedStateSetter = (state: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setState(state);
    }, delay);
  };

  return [state, debouncedStateSetter];
}
