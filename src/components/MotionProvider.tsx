import { useEffect, useState, type ReactNode } from "react";
import { MotionContext } from "../context/MotionContext";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function MotionProvider({ children }: { children: ReactNode }) {
  const systemReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [manual, setManual] = useState(false);
  const reduced = systemReduced || manual;
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced);
    return () => {
      delete document.documentElement.dataset.reducedMotion;
    };
  }, [reduced]);
  return (
    <MotionContext.Provider value={{ reduced, systemReduced, setManual }}>
      {children}
    </MotionContext.Provider>
  );
}
