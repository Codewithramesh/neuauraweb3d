import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  CheckCheck,
  FileText,
  Layers3,
  ListChecks,
  Network,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflow } from "../../content/site";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SectionLabel, SampleLabel } from "../ui/Primitives";
gsap.registerPlugin(ScrollTrigger);
const icons = [AudioLines, FileText, Layers3, ShieldCheck, Network, ListChecks];
export default function ConversationWorkflow() {
  const [active, setActive] = useState(0),
    root = useRef<HTMLElement>(null),
    manual = useRef(false),
    reduce = useReducedMotion(),
    mobile = useMediaQuery("(max-width: 800px)");
  useEffect(() => {
    if (reduce || mobile) return;
    const t = ScrollTrigger.create({
      trigger: root.current,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        if (!manual.current)
          setActive(Math.min(5, Math.floor(self.progress * 6)));
      },
    });
    const release = () => {
      manual.current = false;
    };
    window.addEventListener("wheel", release, { passive: true });
    return () => {
      t.kill();
      window.removeEventListener("wheel", release);
    };
  }, [reduce, mobile]);
  const Icon = icons[active],
    step = workflow[active];
  return (
    <section
      className="workflow-section section-wrap"
      id="platform"
      ref={root}
      aria-labelledby="workflow-heading"
    >
      <SectionLabel number="02" right="SOFTWARE-FIRST BY DESIGN">
        THE PLATFORM
      </SectionLabel>
      <div className="split-heading">
        <h2 id="workflow-heading">
          From conversation
          <br />
          to business action<span className="teal">.</span>
        </h2>
        <p>
          The initial MVP can use approved phones, laptops and compatible
          capture devices. The value begins in the intelligence layer.
        </p>
      </div>
      <div
        className="workflow-tabs"
        role="tablist"
        aria-label="Conversation to action workflow"
      >
        {workflow.map((s, i) => {
          const I = icons[i];
          return (
            <button
              key={s.name}
              id={`flow-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="flow-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => {
                manual.current = true;
                setActive(i);
              }}
              onKeyDown={(e) => {
                if (
                  [
                    "ArrowRight",
                    "ArrowDown",
                    "ArrowLeft",
                    "ArrowUp",
                    "Home",
                    "End",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 5
                        : (i +
                            (["ArrowRight", "ArrowDown"].includes(e.key)
                              ? 1
                              : 5)) %
                          6;
                  manual.current = true;
                  setActive(next);
                  document.getElementById(`flow-tab-${next}`)?.focus();
                }
              }}
            >
              <span>
                0{i + 1}
                <I size={20} />
              </span>
              <strong>{s.name}</strong>
              <i />
            </button>
          );
        })}
      </div>
      <div
        className="workflow-panel"
        id="flow-panel"
        role="tabpanel"
        aria-labelledby={`flow-tab-${active}`}
      >
        <div className="workflow-copy">
          <span className="eyebrow">
            0{active + 1} / {step.name.toUpperCase()}
          </span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <p className="workflow-detail">{step.detail}</p>
          <a href="#workspace" className="text-link">
            Try the workspace <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="workflow-visual" key={active}>
          <div className="workflow-visual-top">
            <Icon size={20} />
            <span>{step.name.toUpperCase()} / CONCEPT</span>
            <SampleLabel short />
          </div>
          {active === 0 ? (
            <div className="waveform" aria-label="Illustrative audio waveform">
              {Array.from({ length: 39 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    height: 12 + ((i * 17) % 61),
                    animationDelay: `${i * 0.045}s`,
                  }}
                />
              ))}
            </div>
          ) : active === 1 ? (
            <div className="transcript-example">
              <span>ARJUN MEHTA / SAMPLE</span>
              <p>{step.example}</p>
              <div className="transcript-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
          ) : active === 2 ? (
            <div className="extraction-example">
              {[
                "Person / Arjun Mehta",
                "Organisation / Northstar Components",
                "Need / Updated proposal",
                "Deadline / Friday",
              ].map((x) => (
                <span key={x}>
                  <i />
                  {x}
                </span>
              ))}
            </div>
          ) : active === 3 ? (
            <div className="review-example">
              <ShieldCheck size={35} />
              <strong>Suggested, then verified.</strong>
              <span>Correct the context. Confirm the record.</span>
              <a href="#workspace">
                Open the review demo <ArrowRight size={14} />
              </a>
            </div>
          ) : active === 4 ? (
            <div className="connection-example">
              <span>Arjun Mehta</span>
              <i />
              <Network size={36} />
              <i />
              <span>Northstar Components</span>
            </div>
          ) : (
            <div className="followup-example">
              <CheckCheck size={24} />
              <div>
                <strong>Prepare the revised proposal</strong>
                <span>Awaiting review and confirmation</span>
              </div>
              <span className="state-pill">PROPOSED</span>
            </div>
          )}
          <div className="workflow-example-bottom">
            <span>
              {active === 1
                ? "A permitted conversation, made readable."
                : step.example}
            </span>
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </section>
  );
}
