import { useState } from "react";
import {
  ArrowUpRight,
  Fingerprint,
  LockKeyhole,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { roadmap } from "../../content/site";

const principles = [
  {
    icon: ShieldCheck,
    title: "Consent first.",
    summary: "Understanding starts with permission.",
    detail:
      "Information capture should be transparent and consent-based. Appropriate notice and meaningful permission are fundamental design requirements, to be validated in each intended setting.",
  },
  {
    icon: SlidersHorizontal,
    title: "You are in control.",
    summary: "Clear choices. Always human.",
    detail:
      "Clear controls over when capture is enabled are part of the product direction. Device indicators and physical control concepts shown here remain subject to hardware validation.",
  },
  {
    icon: Fingerprint,
    title: "Clarity by design.",
    summary: "Know where your information goes.",
    detail:
      "Processing and storage details will be documented as the implementation is validated. No claim of end-to-end encryption, zero cloud storage, certified compliance or complete offline operation is made.",
  },
  {
    icon: LockKeyhole,
    title: "Responsible connections.",
    summary: "Your context, in authorised workflows.",
    detail:
      "Only authorised and appropriately configured workflows should receive information. Integration permissions, retention and data handling must be reviewed before any pilot.",
  },
];
export default function PrivacySection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      className="privacy-section section-wrap"
      id="privacy"
      aria-labelledby="privacy-heading"
    >
      <div className="section-kicker">
        <span>05 — TRUST IS THE FOUNDATION</span>
        <span>PRIVACY BY DESIGN</span>
      </div>
      <div className="section-heading-row">
        <h2 id="privacy-heading">
          Intelligence.
          <br />
          With user control.
        </h2>
        <div>
          <ShieldCheck
            className="privacy-heading-icon"
            size={33}
            strokeWidth={1}
          />
          <p>
            Useful intelligence should begin
            <br />
            with trust. These principles guide
            <br />
            what we are building.
          </p>
        </div>
      </div>
      <div className="privacy-grid">
        {principles.map((p, i) => (
          <article className={open === i ? "open" : ""} key={p.title}>
            <div className="privacy-card-top">
              <p.icon size={27} strokeWidth={1.2} />
              <span>0{i + 1}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <button
              aria-expanded={open === i}
              aria-controls={`privacy-detail-${i}`}
              aria-label={`${open === i ? "Close" : "Read"} ${p.title} principle`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {open === i ? <X size={16} /> : <Plus size={16} />}
            </button>
            <div
              id={`privacy-detail-${i}`}
              hidden={open !== i}
              className="privacy-detail"
            >
              {p.detail}
            </div>
          </article>
        ))}
      </div>
      <div className="privacy-note">
        <LockKeyhole size={13} />
        <span>
          Design principles in development. Technical processing, storage and
          security details will follow validation.
        </span>
      </div>
    </section>
  );
}
export function RoadmapSection() {
  return (
    <section
      className="roadmap-section section-wrap"
      id="roadmap"
      aria-labelledby="roadmap-heading"
    >
      <div className="section-kicker">
        <span>06 — THE ROAD AHEAD</span>
        <span>BUILT WITH INTENTION</span>
      </div>
      <div className="roadmap-heading">
        <h2 id="roadmap-heading">A considered journey.</h2>
        <a href="#contact" className="text-link">
          Help shape what comes next <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="roadmap-grid">
        {roadmap.map((stage, i) => (
          <article key={stage.number}>
            <div className={`roadmap-node ${i < 2 ? "current" : ""}`}>
              <span>{stage.number}</span>
              <i />
            </div>
            <span className={`roadmap-status ${i < 2 ? "active" : ""}`}>
              {stage.status}
            </span>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
          </article>
        ))}
      </div>
      <p className="roadmap-note">
        Development stages describe direction, not fixed launch dates. Hardware
        capabilities will be confirmed through validation.
      </p>
    </section>
  );
}
