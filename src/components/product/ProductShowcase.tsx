import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Expand,
  Pause,
  Play,
  RotateCcw,
  Rotate3D,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { modes, type ProductMode } from "../../content/site";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ModeIcon, ProductDrawing } from "../ProductDrawing";
import { ProductVisual } from "../ProductVisual";
import type { MotionState } from "../three/ProductCanvas";

gsap.registerPlugin(ScrollTrigger);
const stages = [
  {
    title: "The glasses",
    description: "Technology that fits into everyday eyewear.",
  },
  {
    title: "The core",
    description: "A linear release. One unchanged electronic module.",
  },
  {
    title: "Wristband",
    description: "Aligned with a new cradle. Mechanically docked.",
  },
  {
    title: "Pendant",
    description: "Released, repositioned and secured in a minimal form.",
  },
  {
    title: "One continuous system",
    description: "Three attachment systems. One shared electronic core.",
  },
];
const stageFor = (p: number) =>
  p < 0.15 ? 0 : p < 0.4 ? 1 : p < 0.63 ? 2 : p < 0.92 ? 3 : 4;

export default function ProductShowcase() {
  const section = useRef<HTMLElement>(null);
  const motion = useRef<MotionState>({ progress: 0, camera: 0 });
  const manual = useRef(false);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);
  const [mode, setMode] = useState<ProductMode>("glasses");
  const [rotate, setRotate] = useState(false);
  const [reset, setReset] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const mobile = useMediaQuery("(max-width: 900px)");
  const reduce = useReducedMotion();
  useEffect(() => {
    if (mobile || reduce || !section.current) return;
    const progress = { value: 0 };
    // Each mechanical phase owns its own timeline; one master synchronises them.
    const detachment = gsap
      .timeline()
      .to(progress, { value: 0.23, duration: 23, ease: "none" });
    const separation = gsap
      .timeline()
      .to(progress, { value: 0.34, duration: 11, ease: "none" });
    const wristDock = gsap
      .timeline()
      .to(progress, { value: 0.53, duration: 19, ease: "none" });
    const pendantDock = gsap
      .timeline()
      .to(progress, { value: 0.81, duration: 28, ease: "none" });
    const composition = gsap
      .timeline()
      .to(progress, { value: 1, duration: 19, ease: "none" });
    const cameraMotion = gsap
      .timeline()
      .to(motion.current, { camera: 0.7, duration: 23 })
      .to(motion.current, { camera: 0, duration: 30 });
    const timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top+=80",
          end: "bottom bottom",
          scrub: 0.6,
        },
        onUpdate: () => {
          if (manual.current) return;
          motion.current.progress = progress.value;
          const next = stageFor(progress.value);
          if (next !== stageRef.current) {
            stageRef.current = next;
            setStage(next);
            setMode(
              next < 2 ? "glasses" : next === 2 ? "wristband" : "pendant",
            );
          }
        },
      })
      .add(detachment)
      .add(separation)
      .add(wristDock)
      .add(pendantDock)
      .add(composition)
      .add(cameraMotion, 0);
    const release = () => {
      manual.current = false;
      gsap.killTweensOf(motion.current, "progress");
    };
    const releaseKeyboard = (event: KeyboardEvent) => {
      if (
        ["PageDown", "PageUp", "Home", "End", " "].includes(event.key) &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      )
        release();
    };
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", releaseKeyboard);
    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", releaseKeyboard);
    };
  }, [mobile, reduce]);
  useEffect(() => {
    if (!expanded) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", close);
    const dialog =
      section.current?.querySelector<HTMLElement>('[role="dialog"]');
    const previous = document.activeElement as HTMLElement | null;
    dialog?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialog) return;
      const buttons = dialog.querySelectorAll<HTMLElement>(
        'button,a[href],[tabindex="0"]',
      );
      const first = buttons[0],
        last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    dialog?.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", close);
      dialog?.removeEventListener("keydown", trap);
      previous?.focus();
    };
  }, [expanded]);
  const select = (id: ProductMode) => {
    manual.current = true;
    setMode(id);
    setReset((r) => r + 1);
    const target = modes.find((m) => m.id === id)!.progress;
    const next = id === "glasses" ? 0 : id === "wristband" ? 2 : 3;
    setStage(next);
    stageRef.current = next;
    gsap.to(motion.current, {
      progress: target,
      duration: reduce ? 0 : 2.1,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };
  return (
    <>
      <div className="product-intro section-wrap" id="product">
        <div className="section-kicker">
          <span>01 — THE MODULAR SYSTEM</span>
          <span>ONE CORE. NO COMPROMISE.</span>
        </div>
        <div className="section-heading-row">
          <h2>
            Built to fit
            <br />
            your world<span className="teal">.</span>
          </h2>
          <p>
            Not another device to fit your life around.
            <br />A thoughtfully engineered system that
            <br className="desktop-break" /> adapts to the way you move through
            it.
          </p>
        </div>
      </div>
      <section
        className={`transformation ${mobile || reduce ? "tap-driven" : ""}`}
        ref={section}
        aria-label="Interactive modular product explorer"
      >
        <div
          className={`explorer-sticky ${expanded ? "is-expanded" : ""}`}
          {...(expanded
            ? {
                role: "dialog",
                "aria-modal": true,
                "aria-label": "Expanded product explorer",
                tabIndex: -1,
              }
            : {})}
        >
          <div className="explorer-topline">
            <span className="technical-label">
              <span className="status-dot" /> INTERACTIVE PRODUCT EXPLORER
            </span>
            <span>CONCEPT VISUALISATION</span>
          </div>
          <div className="explorer-stage">
            <div className="studio-glow" />
            <ProductVisual
              motion={motion}
              mode={mode}
              rotate={rotate}
              resetKey={reset}
              variant="explorer"
            />
            <div className="stage-copy" aria-live="polite">
              <span className="technical-label">
                0{stage + 1} / {stages[stage].title.toUpperCase()}
              </span>
              <h3>{stages[stage].description}</h3>
              <span className="stage-footnote">
                {stage === 4
                  ? "Empty glasses and pendant cradles shown. The core is in the wristband."
                  : "The same core. The same camera, button and indicator."}
              </span>
            </div>
            <div className="explorer-tools">
              <button
                disabled={reduce}
                aria-label={
                  reduce
                    ? "Automatic rotation disabled by reduced motion"
                    : rotate
                      ? "Pause automatic rotation"
                      : "Rotate product automatically"
                }
                aria-pressed={rotate}
                onClick={() => setRotate(!rotate)}
              >
                {rotate ? <Pause size={17} /> : <Rotate3D size={17} />}
              </button>
              <button
                aria-label="Reset product view"
                onClick={() => {
                  setReset((r) => r + 1);
                  setRotate(false);
                }}
              >
                <RotateCcw size={17} />
              </button>
              <button
                aria-label={
                  expanded ? "Close expanded view" : "Expand product view"
                }
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <X size={18} /> : <Expand size={17} />}
              </button>
            </div>
          </div>
          <div className="explorer-bottom">
            <div
              className="configuration-selector"
              aria-label="Select product configuration"
            >
              {modes.map((m) => (
                <button
                  className={stage !== 4 && mode === m.id ? "active" : ""}
                  key={m.id}
                  onClick={() => select(m.id)}
                  aria-pressed={stage !== 4 && mode === m.id}
                >
                  <ModeIcon mode={m.id} />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
            <span className="explorer-hint">
              {mobile || reduce ? (
                <>
                  <Check size={14} /> Select a form to explore
                </>
              ) : (
                <>
                  <ArrowDown size={14} /> Scroll to see the transformation
                </>
              )}
            </span>
          </div>
          <div
            className="transformation-steps"
            aria-label="Transformation stages"
          >
            {stages.map((s, i) => (
              <button
                key={s.title}
                className={stage === i ? "active" : ""}
                aria-label={`Show stage ${i + 1}: ${s.title}`}
                aria-pressed={stage === i}
                onClick={() => {
                  manual.current = true;
                  setStage(i);
                  stageRef.current = i;
                  const progress = [0, 0.23, 0.53, 0.81, 1][i];
                  setMode(
                    i < 2 ? "glasses" : i === 2 ? "wristband" : "pendant",
                  );
                  gsap.to(motion.current, {
                    progress,
                    duration: reduce ? 0 : 1.8,
                    ease: "power2.inOut",
                    overwrite: true,
                  });
                }}
              >
                <span>0{i + 1}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ProductDetailGallery() {
  const [detail, setDetail] = useState<ProductMode | null>(null);
  return (
    <section className="gallery section-wrap" aria-labelledby="gallery-heading">
      <div className="section-kicker">
        <span>THREE FORMS. ONE PHILOSOPHY.</span>
        <span>DESIGNED IN EVERY DETAIL</span>
      </div>
      <div className="gallery-heading">
        <h2 id="gallery-heading">
          Intelligence looks
          <br />
          good on you.
        </h2>
        <p>
          Considered materials. Familiar silhouettes.
          <br />A system that is unmistakably yours.
        </p>
      </div>
      <div className="product-gallery-grid">
        {modes.map((m) => (
          <article
            key={m.id}
            className={`product-card ${detail === m.id ? "detail-open" : ""}`}
          >
            <div className="product-card-top">
              <span>
                0{modes.indexOf(m) + 1} / {m.label.toUpperCase()}
              </span>
              <ModeIcon mode={m.id} size={25} />
            </div>
            <div className="product-card-art">
              <ProductDrawing mode={m.id} />
              <span className="material-tag">
                {m.id === "glasses"
                  ? "SMOKED GRAPHITE"
                  : m.id === "wristband"
                    ? "MATTE GRAPHITE / TITANIUM"
                    : "SATIN TITANIUM"}
              </span>
            </div>
            <div className="product-card-body">
              <h3>{m.label}</h3>
              <p>
                {m.id === "glasses"
                  ? "Everyday eyewear. A new perspective."
                  : m.id === "wristband"
                    ? "Intelligence, always at hand."
                    : "A little closer to what matters."}
              </p>
              <button
                onClick={() => setDetail(detail === m.id ? null : m.id)}
                aria-expanded={detail === m.id}
                aria-controls={`details-${m.id}`}
              >
                Explore the details <ArrowUpRight size={16} />
              </button>
              <div id={`details-${m.id}`} hidden={detail !== m.id}>
                <ul>
                  {m.details.map((d) => (
                    <li key={d}>
                      <Check size={13} />
                      {d}
                    </li>
                  ))}
                </ul>
                <span className="concept-note">
                  Original concept · geometry and materials subject to
                  validation
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="gallery-note">
        <span className="small-square" />
        <p>
          Different ways to wear. The same core at the heart of each.
          <br className="mobile-only" /> These are original design concepts;
          final hardware is in development.
        </p>
        <a href="#roadmap">
          Follow the development <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}

export function ProductReveal() {
  const motion = useRef<MotionState>({ progress: 1, camera: 0 });
  const [play, setPlay] = useState(false);
  const reduce = useReducedMotion();
  return (
    <section className="product-reveal" aria-labelledby="reveal-heading">
      <div className="reveal-top">
        <span className="technical-label">NEUAURA / THE MODULAR SYSTEM</span>
        <span className="outline-badge">CONCEPT</span>
      </div>
      <div className="reveal-art">
        <ProductVisual motion={motion} rotate={play} variant="reveal" />
        <button
          disabled={reduce}
          aria-label={
            reduce
              ? "Automatic rotation disabled by reduced motion"
              : play
                ? "Pause product rotation"
                : "Rotate the product collection"
          }
          onClick={() => setPlay(!play)}
        >
          {play ? <Pause size={15} /> : <Play size={15} />}
          <span>{play ? "Pause" : "Rotate"} the system</span>
        </button>
      </div>
      <div className="reveal-copy">
        <span className="brand-wordmark">NEUAURA</span>
        <h2 id="reveal-heading">One core. Three ways to wear.</h2>
        <p>Human Intelligence Relationship Layer.</p>
        <a href="#contact" className="button button-primary">
          Be part of the journey <ArrowUpRight size={17} />
        </a>
        <a href="#contact" className="text-link reveal-secondary">
          Discuss a pilot <ArrowUpRight size={14} />
        </a>
        <span className="reveal-disclaimer">
          ONE SHARED CORE · TWO EMPTY CRADLES · ORIGINAL CONCEPT VISUALISATION
        </span>
      </div>
    </section>
  );
}
