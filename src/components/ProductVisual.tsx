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

export function ProductVisual({ mode = "pendant", ...props }: Props) {
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
      {props.variant === "reveal" || props.variant === "hero" ? (
        <div className="fallback-collection">
          <svg
            className="fallback-core"
            viewBox="0 0 80 180"
            role="img"
            aria-label="Single shared electronic core concept"
          >
            <rect
              x="13"
              y="8"
              width="54"
              height="164"
              rx="24"
              fill="#26343d"
              stroke="#aeb8c1"
              strokeWidth="3"
            />
            <circle
              cx="40"
              cy="36"
              r="8"
              fill="#0a1621"
              stroke="#6b8293"
              strokeWidth="2"
            />
            <path d="M34 142h12" stroke="#66e0ce" strokeWidth="2" />
          </svg>
          {(["pendant", "wristband"] as const).map((form) => (
            <ProductDrawing key={form} mode={form} includeCore={false} />
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
