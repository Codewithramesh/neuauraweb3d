import { useRef } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  Network,
  UserRound,
} from "lucide-react";
import { site } from "../../content/site";
import { ProductVisual } from "../ProductVisual";
import type { MotionState } from "../three/ProductCanvas";
export default function BusinessHero() {
  const motion = useRef<MotionState>({ progress: 1, camera: 0 });
  return (
    <section className="business-hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-content">
        <div className="eyebrow">
          <span className="status-dot" /> BUSINESS CONVERSATION INTELLIGENCE /
          V1
        </div>
        <h1 id="hero-heading">
          Every conversation.
          <br />
          Has business value.
          <br />
          <span>Make it actionable.</span>
        </h1>
        <p>
          Business conversations hold important information, decisions and
          commitments. NEUAURA is being developed to turn consented real-world
          interactions into structured business context, searchable relationship
          intelligence and actionable follow-ups.
        </p>
        <div className="hero-actions">
          <a href="#platform" className="button button-primary">
            Explore the platform <ArrowUpRight size={17} />
          </a>
          <a href="#pilot" className="text-link">
            Discuss a pilot <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="hero-maturity">
          <span className="tiny-square" />
          {site.status}
        </div>
        <div className="hero-audience">
          <span>STARTING WITH</span>
          <strong>Field sales & business development</strong>
        </div>
      </div>
      <div className="hero-composition">
        <div className="hero-coordinate">
          N / 001 <span>INDUSTRIAL INTELLIGENCE</span>
        </div>
        <div className="hero-signal">
          <div className="signal-input">
            <AudioLines size={19} />
            <span>Real conversation</span>
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
              <span>Context, connected.</span>
              <span className="sample-tag">ILLUSTRATIVE</span>
            </div>
            <div className="hero-context-flow">
              <span>
                <UserRound size={13} /> Arjun Mehta
              </span>
              <ArrowRight size={12} />
              <span>Customer meeting</span>
            </div>
            <div className="hero-context-task">
              <Check size={13} />
              <span>Revised proposal · review before sharing</span>
              <i />
            </div>
          </div>
          <a className="hero-preview-link" href="#workspace">
            Explore the software concept <ArrowUpRight size={12} />
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
        <span>SOFTWARE FIRST. HUMAN IN THE LOOP.</span>
        <span>{site.tagline}</span>
      </div>
    </section>
  );
}
