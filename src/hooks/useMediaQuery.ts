import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const match = window.matchMedia(query);
      match.addEventListener("change", callback);
      return () => match.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
