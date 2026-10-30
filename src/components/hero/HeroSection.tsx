import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, MoveUpRight, Rotate3D } from "lucide-react";
import gsap from "gsap";
import { modes, site, type ProductMode } from "../../content/site";
import { ProductVisual } from "../ProductVisual";
import { ModeIcon } from "../ProductDrawing";
import type { MotionState } from "../three/ProductCanvas";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function HeroSection() {
  const [mode, setMode] = useState<ProductMode>("glasses");
  const motion = useRef<MotionState>({ progress: 0, camera: 0 });
  const reduce = useReducedMotion();
  const select = (id: ProductMode) => {
    setMode(id);
    gsap.to(motion.current, {
      progress: modes.find((m) => m.id === id)!.progress,
      duration: reduce ? 0 : 1.8,
      ease: "power2.inOut",
      overwrite: true,
    });
  };
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-grid-line" />
      <div className="hero-content">
        <div className="eyebrow">
          <span className="status-dot" /> MODULAR INTELLIGENCE WEARABLE
        </div>
        <h1 id="hero-heading">
          One core.
          <br />
          Three ways
          <br />
          to wear<span className="teal">.</span>
        </h1>
        <p>
          A new relationship with intelligence.
          <br />
          One modular core. Designed to move with you,
          <br className="desktop-break" /> and turn everyday interactions into
          useful context.
        </p>
        <div className="hero-actions">
          <a href="#product" className="button button-primary">
            Explore NEUAURA <ArrowUpRight size={18} />
          </a>
          <a href="#contact" className="text-link">
            Discuss a pilot <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="hero-status">
          <span className="small-square" />
          {site.status}
        </div>
      </div>
      <div className="hero-product">
        <div className="studio-glow" />
        <div className="coordinate coordinate-top">
          N / 001 <span>MODULAR SYSTEM</span>
        </div>
        <ProductVisual motion={motion} mode={mode} rotate variant="hero" />
        <div className="core-callout">
          <span className="callout-dot" />
          <div className="callout-line" />
          <span>
            THE INTELLIGENCE.
            <br />
            <strong>IN ONE DETACHABLE CORE.</strong>
          </span>
        </div>
        <div className="hero-model-meta">
          <span>
            <span className="teal">
              0{modes.findIndex((m) => m.id === mode) + 1}
            </span>{" "}
            / {mode.toUpperCase()}
          </span>
          <span>
            <Rotate3D size={15} /> Drag to explore
          </span>
        </div>
        <div className="hero-modes" aria-label="Preview wearing configurations">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => select(m.id)}
              aria-pressed={mode === m.id}
              className={mode === m.id ? "active" : ""}
            >
              <ModeIcon mode={m.id} />
              <span>{m.label}</span>
              {mode === m.id && <span className="selector-dot" />}
            </button>
          ))}
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#product">
          <ArrowDown size={15} />
          <span>SCROLL TO DISCOVER</span>
        </a>
        <span>HUMAN INTELLIGENCE. REIMAGINED.</span>
        <span className="hero-bottom-note">
          DESIGNED AROUND YOU <MoveUpRight size={13} />
        </span>
      </div>
    </section>
  );
}
