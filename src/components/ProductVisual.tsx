import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ProductDrawing } from "./ProductDrawing";
import type { ProductMode } from "../content/site";
import type { MotionState } from "./three/ProductCanvas";

const ProductCanvas = lazy(() => import("./three/ProductCanvas"));
interface Props {
  motion: React.RefObject<MotionState>;
  mode?: ProductMode;
  rotate?: boolean;
  resetKey?: number;
  variant?: "hero" | "explorer" | "reveal";
  onReady?: () => void;
}
class WebGLBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function ProductVisual({ mode = "glasses", ...props }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = props.onReady;
  const handleReady = useCallback(() => {
    setReady(true);
    onReady?.();
  }, [onReady]);
  const fallback = (
    <div className="visual-fallback">
      {props.variant === "reveal" ? (
        <div className="fallback-collection">
          {(["glasses", "wristband", "pendant"] as const).map((form) => (
            <ProductDrawing
              key={form}
              mode={form}
              includeCore={form === "wristband"}
            />
          ))}
        </div>
      ) : (
        <ProductDrawing mode={mode} />
      )}
      <span className="fallback-caption">
        {entered
          ? "Concept illustration · interactive 3D when supported"
          : "Original product concept"}
      </span>
    </div>
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    if (wrapper.current) observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`product-visual ${ready ? "is-ready" : ""}`} ref={wrapper}>
      <WebGLBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          {entered ? (
            <ProductCanvas {...props} modeKey={mode} onReady={handleReady} />
          ) : (
            fallback
          )}
        </Suspense>
      </WebGLBoundary>
    </div>
  );
}
