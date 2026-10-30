import { createContext } from "react";

type MotionPreference = {
  reduced: boolean;
  systemReduced: boolean;
  setManual: (value: boolean) => void;
};
export const MotionContext = createContext<MotionPreference>({
  reduced: false,
  systemReduced: false,
  setManual: () => {},
});
