import { useRef } from "react";
import { ArrowUpRight, Network } from "lucide-react";
import { site } from "../../content/site";
import { ProductVisual } from "../ProductVisual";
import type { MotionState } from "../three/ProductCanvas";
export default function BrandReveal() {
  const motion = useRef<MotionState>({ progress: 1, camera: 0 });
  return (
    <section className="brand-reveal" aria-labelledby="brand-reveal-heading">
      <div className="section-wrap">
        <div className="reveal-topline">
          <span className="eyebrow">NEUAURA / INDUSTRIAL INTELLIGENCE</span>
          <span>{site.status.toUpperCase()}</span>
        </div>
        <div className="reveal-product">
          <div className="reveal-context-line" aria-hidden="true">
            <span>PERSON</span>
            <i />
            <span>CONTEXT</span>
            <Network size={21} />
            <span>INTELLIGENCE</span>
            <i />
            <span>BMS</span>
          </div>
          <ProductVisual
            motion={motion}
            mode="pendant"
            rotate
            variant="reveal"
          />
          <span className="reveal-product-caption">
            FUTURE HARDWARE CONCEPT · TWO EMPTY CRADLES · ONE SHARED CORE
          </span>
        </div>
        <div className="reveal-copy">
          <span className="brand-wordmark">NEUAURA</span>
          <h2 id="brand-reveal-heading">
            Keep your business
            <br />
            connected to
            <br />
            <span>the customer.</span>
          </h2>
          <p>
            From consented customer interactions to structured context. One
            NEUAURA intelligence layer for the owner’s view, the team’s
            relationships and the business systems that connect them.
          </p>
          <div>
            <a className="button button-primary" href="#pilot">
              Discuss a pilot <ArrowUpRight size={17} />
            </a>
            <a className="text-link" href={`mailto:${site.founder.email}`}>
              Contact the founder <ArrowUpRight size={15} />
            </a>
          </div>
          <span className="reveal-tagline">{site.tagline}</span>
          <div className="neuaura-signature" aria-hidden="true">
            <i />
            <svg width="22" height="24" viewBox="0 0 24 26" fill="none">
              <path
                d="M3 22V4h4l14 18V4M3 4l18 18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
