import { Signal } from "@preact/signals-react";
import { useSyncExternalStore } from "react";

export function useSignalValue<T>(signal: Signal<T>) {
  return useSyncExternalStore(
    (cb) => signal.subscribe(cb),
    () => signal.value,
    () => signal.value
  );
}
