import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Check,
  Expand,
  Pause,
  Rotate3D,
  RotateCcw,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { modes, site, type ProductMode } from "../../content/site";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ModeIcon } from "../ProductDrawing";
import { ProductVisual } from "../ProductVisual";
import { SectionLabel } from "../ui/Primitives";
import type { MotionState } from "../three/ProductCanvas";
gsap.registerPlugin(ScrollTrigger);
const stages = [
  {
    name: "Pendant",
    title: "Purposeful, without getting in the way.",
    text: "A compact titanium cradle and a graphite chain, designed as a future input interface for consented customer interactions.",
    p: 0,
  },
  {
    name: "Shared core",
    title: "One electronic core. A deliberate release.",
    text: "The core slides forward along the attachment interface. Its geometry, sensor window, button and indicator remain unchanged.",
    p: 0.22,
  },
  {
    name: "Wristband",
    title: "Align. Dock. A new way to wear.",
    text: "The same core is aligned above the screenless wristband cradle, then mechanically seated.",
    p: 0.68,
  },
  {
    name: "The system",
    title: "Two configurations. One shared architecture.",
    text: "Two empty attachment cradles are shown with one detached electronic core between them.",
    p: 1,
  },
];
export default function ProductExplorer() {
  const section = useRef<HTMLDivElement>(null),
    motion = useRef<MotionState>({ progress: 0, camera: 0 }),
    manual = useRef(false),
    currentStage = useRef(0);
  const [stage, setStage] = useState(0),
    [mode, setMode] = useState<ProductMode>("pendant"),
    [rotate, setRotate] = useState(false),
    [reset, setReset] = useState(0),
    [expanded, setExpanded] = useState(false),
    [details, setDetails] = useState(false);
  const reduce = useReducedMotion(),
    mobile = useMediaQuery("(max-width: 900px)");
  useEffect(() => {
    if (reduce || mobile) return;
    const progress = { value: 0 };
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top top+=100",
        end: "bottom bottom-=25",
        scrub: 0.7,
      },
      onUpdate: () => {
        if (manual.current) return;
        motion.current.progress = progress.value;
        const s =
          progress.value < 0.12
            ? 0
            : progress.value < 0.54
              ? 1
              : progress.value < 0.85
                ? 2
                : 3;
        if (s !== currentStage.current) {
          currentStage.current = s;
          setStage(s);
          setMode(s < 2 ? "pendant" : "wristband");
        }
      },
    });
    timeline
      .to(progress, { value: 0.22, duration: 22, ease: "none" })
      .to(progress, { value: 0.42, duration: 20, ease: "none" })
      .to(progress, { value: 0.68, duration: 26, ease: "none" })
      .to(progress, { value: 1, duration: 32, ease: "none" });
    const release = () => {
      manual.current = false;
      gsap.killTweensOf(motion.current, "progress");
    };
    const keyboard = (e: KeyboardEvent) => {
      if (["PageDown", "PageUp", "Home", "End"].includes(e.key)) release();
    };
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("keydown", keyboard);
    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      window.removeEventListener("wheel", release);
      window.removeEventListener("keydown", keyboard);
    };
  }, [reduce, mobile]);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog =
      section.current?.querySelector<HTMLElement>('[role="dialog"]');
    dialog?.focus();
    const keys = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "Tab" && dialog) {
        const elements = dialog.querySelectorAll<HTMLElement>(
            "button:not(:disabled),a[href]",
          ),
          first = elements[0],
          last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", keys);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", keys);
      previous?.focus();
    };
  }, [expanded]);
  function select(index: number) {
    manual.current = true;
    setStage(index);
    currentStage.current = index;
    setMode(index < 2 ? "pendant" : "wristband");
    setReset((n) => n + 1);
    gsap.to(motion.current, {
      progress: stages[index].p,
      duration: reduce ? 0 : 2,
      ease: "power2.inOut",
      overwrite: true,
    });
  }
  return (
    <section
      className="hardware-section"
      id="hardware"
      aria-labelledby="hardware-heading"
    >
      <span id="product" className="anchor-alias" />
      <div className="section-wrap">
        <SectionLabel
          number="06"
          right="FUTURE HARDWARE / NOT COMMERCIALLY AVAILABLE"
        >
          THE WEARABLE ECOSYSTEM
        </SectionLabel>
        <div className="split-heading">
          <h2 id="hardware-heading">
            A modular hardware experience.
            <br />
            <span className="muted">Built around business interactions.</span>
          </h2>
          <p>
            The future wearable interface to the same business intelligence
            layer: a purpose-built pendant and a screenless wristband, sharing
            one electronic core.
          </p>
        </div>
        <div className="hardware-software-first">
          <ShieldNote />
          <span>
            <strong>Software first.</strong> The intelligence pipeline can be
            validated with existing phones, computers and compatible devices.
            The custom wearable evolves around demonstrated business value.
          </span>
        </div>
      </div>
      <div
        ref={section}
        className={`hardware-story ${reduce || mobile ? "tap-driven" : ""}`}
      >
        <div
          className={`hardware-sticky ${expanded ? "expanded" : ""}`}
          {...(expanded
            ? {
                role: "dialog",
                "aria-modal": true,
                "aria-label": "Expanded hardware explorer",
                tabIndex: -1,
              }
            : {})}
        >
          <div className="hardware-view">
            <div className="hardware-view-top">
              <span className="eyebrow">
                <span className="status-dot" /> INTERACTIVE PRODUCT EXPLORER
              </span>
              <span>{site.hardwareStatus}</span>
            </div>
            <ProductVisual
              motion={motion}
              mode={mode}
              rotate={rotate}
              resetKey={reset}
              variant="explorer"
            />
            <div className="hardware-view-tools">
              <button
                aria-label={
                  reduce
                    ? "Rotation disabled by reduced motion"
                    : rotate
                      ? "Pause automatic product rotation"
                      : "Rotate product automatically"
                }
                disabled={reduce}
                aria-pressed={rotate}
                onClick={() => setRotate(!rotate)}
              >
                {rotate ? <Pause size={17} /> : <Rotate3D size={17} />}
              </button>
              <button
                aria-label="Reset product view"
                onClick={() => {
                  setReset((n) => n + 1);
                  setRotate(false);
                }}
              >
                <RotateCcw size={17} />
              </button>
              <button
                aria-label={
                  expanded
                    ? "Close expanded product view"
                    : "Expand product view"
                }
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <X size={18} /> : <Expand size={17} />}
              </button>
            </div>
            <div
              className="hardware-configurations"
              aria-label="Select wearable configuration"
            >
              {modes.map((m, i) => (
                <button
                  id={`hardware-mode-${m.id}`}
                  key={m.id}
                  aria-pressed={stage !== 3 && mode === m.id}
                  onClick={() => select(i === 0 ? 0 : 2)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      const next = i === 0 ? 1 : 0;
                      select(next === 0 ? 0 : 2);
                      document
                        .getElementById(`hardware-mode-${modes[next].id}`)
                        ?.focus();
                    }
                  }}
                >
                  <ModeIcon mode={m.id} />
                  <span>{m.label}</span>
                  {stage !== 3 && mode === m.id && <Check size={12} />}
                </button>
              ))}
            </div>
          </div>
          <div className="hardware-inspector">
            <span className="eyebrow">
              0{stage + 1} / {stages[stage].name.toUpperCase()}
            </span>
            <h3 aria-live="polite">{stages[stage].title}</h3>
            <p>{stages[stage].text}</p>
            <div
              className="hardware-stages"
              aria-label="Mechanical assembly stages"
            >
              {stages.map((s, i) => (
                <button
                  key={s.name}
                  className={stage === i ? "active" : ""}
                  aria-pressed={stage === i}
                  onClick={() => select(i)}
                >
                  <span>0{i + 1}</span>
                  {s.name}
                  <i />
                </button>
              ))}
            </div>
            <button
              className="material-detail-toggle"
              aria-expanded={details}
              aria-controls="hardware-materials"
              onClick={() => setDetails(!details)}
            >
              Material & design details <span>{details ? "−" : "+"}</span>
            </button>
            <div id="hardware-materials" hidden={!details}>
              <ul>
                {modes
                  .find((m) => m.id === mode)!
                  .details.map((d) => (
                    <li key={d}>
                      <Check size={12} />
                      {d}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="hardware-interaction-hint">
              {reduce || mobile ? <Check size={13} /> : <ArrowDown size={13} />}
              <span>
                {reduce || mobile
                  ? "Tap a configuration or a mechanical stage."
                  : "Scroll through the assembly, or select a stage."}
              </span>
            </div>
            <p className="hardware-disclaimer">
              Original procedural product concept. No final dimensions,
              manufacturing readiness or performance specifications are claimed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function ShieldNote() {
  return <span className="software-first-symbol">N</span>;
}
