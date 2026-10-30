import { useContext } from "react";
import { MotionContext } from "../context/MotionContext";

export function useReducedMotion() {
  return useContext(MotionContext).reduced;
}
