import { useRef } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Layers3,
  Network,
  Building2,
} from "lucide-react";
import { site } from "../../content/site";
import { ProductVisual } from "../ProductVisual";
import type { MotionState } from "../three/ProductCanvas";
export default function BusinessHero({ onExplore }: { onExplore: () => void }) {
  const motion = useRef<MotionState>({ progress: 1, camera: 0 });
  return (
    <section className="business-hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-content">
        <div className="eyebrow">
          <span className="status-dot" /> BUSINESS INTELLIGENCE / THE NEUAURA
          LAYER
        </div>
        <h1 id="hero-heading">
          Your business.
          <br />
          Connected to
          <br />
          <span>the real world.</span>
        </h1>
        <p>
          NEUAURA is being developed as the intelligence layer between
          real-world customer interactions and your business systems. Consented
          input becomes structured customer context in the background, helping
          owners understand needs, stay updated on relationships and keep the
          business connected.
        </p>
        <div className="hero-actions">
          <a href="#platform" className="button button-primary">
            Explore the intelligence <ArrowUpRight size={17} />
          </a>
          <a href="#workspace" className="text-link" onClick={onExplore}>
            See the owner view <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="hero-maturity">
          <span className="tiny-square" />
          {site.status}
        </div>
        <div className="hero-audience">
          <span>ONE INTELLIGENCE LAYER</span>
          <strong>Customer → context → BMS & owner</strong>
        </div>
      </div>
      <div className="hero-composition">
        <div className="hero-coordinate">
          N / 001 <span>INDUSTRIAL INTELLIGENCE</span>
        </div>
        <div className="hero-signal">
          <div className="signal-input">
            <AudioLines size={19} />
            <span>Consented customer interaction</span>
            <span className="signal-wave">
              {[9, 17, 25, 13, 31, 22, 37, 18, 29, 11].map((h, i) => (
                <i key={i} style={{ height: h }} />
              ))}
            </span>
          </div>
          <div className="signal-connector">
            <span />
            <ArrowDown size={13} />
          </div>
          <div className="hero-context">
            <div className="context-heading">
              <Network size={16} />
              <span>Business intelligence</span>
              <span className="sample-tag">ILLUSTRATIVE</span>
            </div>
            <div className="hero-context-flow">
              <span>
                <Layers3 size={13} /> Customer needs
              </span>
              <ArrowRight size={12} />
              <span>Connected relationships</span>
            </div>
            <div className="hero-context-task">
              <Building2 size={13} />
              <span>Structured context → BMS / owner view</span>
              <i />
            </div>
          </div>
          <a
            className="hero-preview-link"
            href="#workspace"
            onClick={onExplore}
          >
            Explore the owner’s view <ArrowUpRight size={12} />
          </a>
        </div>
        <div className="hero-hardware">
          <ProductVisual motion={motion} mode="pendant" rotate variant="hero" />
          <div className="hardware-caption">
            <span>FUTURE WEARABLE ECOSYSTEM</span>
            <span>Two empty cradles. One shared core.</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#problem">
          <ArrowDown size={14} /> FOLLOW THE CONTEXT
        </a>
        <span>CUSTOMER CONTEXT. BUSINESS UNDERSTANDING.</span>
        <span>{site.tagline}</span>
      </div>
    </section>
  );
}
