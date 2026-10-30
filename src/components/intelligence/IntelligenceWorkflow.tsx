import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  CheckCheck,
  CircleDot,
  FileText,
  Layers3,
  Link2,
  ListTodo,
  Network,
  Sparkles,
} from "lucide-react";
import { useCases } from "../../content/site";

const steps = [
  {
    name: "Capture",
    icon: AudioLines,
    description: "Start with a real conversation.",
    detail:
      "Wearable hardware designed to capture relevant interactions transparently, with appropriate consent.",
  },
  {
    name: "Structure",
    icon: Layers3,
    description: "Give the conversation context.",
    detail:
      "AI processing in development: summaries, topics, feedback, decisions, observations and proposed action items.",
  },
  {
    name: "Connect",
    icon: Network,
    description: "Put context where it belongs.",
    detail:
      "Planned connections to authorised calendars, email, task management, team dashboards and business systems.",
  },
  {
    name: "Act",
    icon: ArrowUpRight,
    description: "Make the next step clearer.",
    detail:
      "Review useful follow-ups and business context. Keep people in control of the decisions that follow.",
  },
];
export default function IntelligenceWorkflow() {
  const [selected, setSelected] = useState(1);
  const Icon = steps[selected].icon;
  return (
    <section
      className="intelligence-section section-wrap"
      id="intelligence"
      aria-labelledby="intelligence-heading"
    >
      <div className="section-kicker">
        <span>02 — THE INTELLIGENCE LAYER</span>
        <span>
          <span className="status-dot" /> IN DEVELOPMENT
        </span>
      </div>
      <div className="intelligence-heading">
        <h2 id="intelligence-heading">
          More than a wearable.
          <br />
          <span>A layer of intelligence.</span>
        </h2>
        <p>
          Life happens in conversations.
          <br />
          NEUAURA is being developed to turn consented real-world
          <br className="desktop-break" /> interactions into structured context
          and actionable follow-ups.
        </p>
      </div>
      <div
        className="workflow-steps"
        role="tablist"
        aria-label="Explore the intelligence workflow"
      >
        {steps.map((step, i) => (
          <button
            role="tab"
            key={step.name}
            id={`workflow-tab-${i}`}
            aria-selected={selected === i}
            aria-controls="workflow-detail"
            tabIndex={selected === i ? 0 : -1}
            className={selected === i ? "active" : ""}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next = (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                setSelected(next);
                document.getElementById(`workflow-tab-${next}`)?.focus();
              }
            }}
          >
            <span className="step-top">
              <span>0{i + 1}</span>
              <step.icon size={22} />
            </span>
            <h3>{step.name}</h3>
            <p>{step.description}</p>
            <span className="step-line" />
          </button>
        ))}
      </div>
      <div
        className="workflow-detail"
        id="workflow-detail"
        role="tabpanel"
        aria-labelledby={`workflow-tab-${selected}`}
      >
        <div className="workflow-detail-copy">
          <span className="outline-badge">DEVELOPMENT CONCEPT</span>
          <div>
            <Icon size={24} />
            <h3>{steps[selected].name} with intention.</h3>
          </div>
          <p>{steps[selected].detail}</p>
        </div>
        <div
          className="context-preview"
          aria-label="Illustrative context processing"
        >
          <div className="context-wave">
            <AudioLines size={24} />
            <span>
              {[
                9, 16, 27, 13, 35, 22, 42, 30, 17, 36, 24, 45, 31, 18, 28, 13,
                25, 16,
              ].map((height, i) => (
                <i key={i} style={{ height, animationDelay: `${i * 0.08}s` }} />
              ))}
            </span>
            <span className="context-consent">
              <CircleDot size={12} /> CONSENTED INPUT
            </span>
          </div>
          <div className="context-line">
            <span />
            <ArrowDown size={13} />
            <span />
          </div>
          <div className="context-note">
            <div className="context-note-header">
              <Sparkles size={15} />
              <span>Useful context, ready to review</span>
              <span className="sample-pill">SAMPLE</span>
            </div>
            <p>
              Team agreed to revisit the proposal after the next discussion.
            </p>
            <div>
              <ListTodo size={14} />
              <span>Proposed follow-up: review the next draft</span>
              <Check size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="integration-note">
        <Link2 size={15} />
        <span>
          Connections to your existing workflows are planned. No live
          integrations are claimed.
        </span>
      </div>
    </section>
  );
}

export function BusinessSection() {
  const [selected, setSelected] = useState(0);
  const useCase = useCases[selected];
  const [checked, setChecked] = useState(false);
  return (
    <section
      className="business-section section-wrap"
      id="business"
      aria-labelledby="business-heading"
    >
      <div className="section-kicker">
        <span>03 — BUILT FOR HUMAN BUSINESS</span>
        <span>BUSINESS INTELLIGENCE VISION</span>
      </div>
      <div className="section-heading-row">
        <h2 id="business-heading">
          Your business is talking.
          <br />
          <span className="muted">Find the signal.</span>
        </h2>
        <p>
          Every conversation holds context.
          <br />
          Our vision is to help your business
          <br className="desktop-break" /> turn listening into understanding.
        </p>
      </div>
      <div className="business-layout">
        <div
          className="use-case-list"
          role="tablist"
          aria-label="Business use cases"
          aria-orientation="vertical"
        >
          {useCases.map((c, i) => (
            <button
              key={c.id}
              id={`business-tab-${i}`}
              role="tab"
              aria-selected={selected === i}
              aria-controls="business-panel"
              tabIndex={selected === i ? 0 : -1}
              className={selected === i ? "active" : ""}
              onClick={() => {
                setSelected(i);
                setChecked(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const next = (i + (e.key === "ArrowDown" ? 1 : 3)) % 4;
                  setSelected(next);
                  setChecked(false);
                  document.getElementById(`business-tab-${next}`)?.focus();
                }
              }}
            >
              <span>0{i + 1}</span>
              <div>
                <h3>{c.name}</h3>
                {selected === i && <p>{c.description}</p>}
              </div>
              <ArrowUpRight size={17} />
            </button>
          ))}
          <div className="business-intent">
            <span className="small-square" /> Intended capabilities · subject to
            pilot validation
          </div>
        </div>
        <div
          id="business-panel"
          role="tabpanel"
          aria-labelledby={`business-tab-${selected}`}
          className="business-dashboard-wrap"
        >
          <div className="dashboard">
            <div className="dashboard-header">
              <div className="dashboard-brand">
                <span className="dashboard-brand-icon">N</span>
                <span>
                  NEUAURA <span> / INTELLIGENCE</span>
                </span>
              </div>
              <span className="sample-pill">CONCEPT</span>
            </div>
            <div className="dashboard-main">
              <div className="dashboard-overline">
                <span>WORKSPACE OVERVIEW</span>
                <span>
                  <span className="status-dot" /> Sample workspace
                </span>
              </div>
              <h3>A clearer picture.</h3>
              <p>{useCase.note}</p>
              <div className="dashboard-themes">
                <div className="dashboard-subheading">
                  <Layers3 size={14} />
                  <span>Recurring themes</span>
                </div>
                {useCase.themes.map((theme, i) => (
                  <div className="theme-row" key={theme}>
                    <span>{theme}</span>
                    <div className="theme-track">
                      <span style={{ width: `${[83, 61, 44][i]}%` }} />
                    </div>
                    <span className="theme-marker">{["A", "B", "C"][i]}</span>
                  </div>
                ))}
              </div>
              <div className="dashboard-observation">
                <FileText size={16} />
                <div>
                  <span>AN OBSERVATION TO EXPLORE</span>
                  <p>{useCase.observation}</p>
                </div>
              </div>
              <div className="dashboard-task">
                <div className="dashboard-subheading">
                  <ListTodo size={14} />
                  <span>Proposed follow-up</span>
                </div>
                <button
                  onClick={() => setChecked(!checked)}
                  aria-pressed={checked}
                  className={checked ? "checked" : ""}
                >
                  <span className="task-checkbox">
                    {checked && <Check size={11} />}
                  </span>
                  <span>{useCase.task}</span>
                  <ArrowUpRight size={14} />
                </button>
                <span className="dashboard-task-note">
                  {checked ? (
                    <>
                      <CheckCheck size={12} /> Marked reviewed in this sample
                      only
                    </>
                  ) : (
                    "Try reviewing this illustrative task"
                  )}
                </span>
              </div>
            </div>
            <div className="dashboard-footer">
              <Sparkles size={12} />
              <span>ILLUSTRATIVE PRODUCT CONCEPT — SAMPLE DATA</span>
            </div>
          </div>
          <div className="dashboard-caption">
            <span>CONVERSATION → CONTEXT → ACTION</span>
            <span>All content is illustrative</span>
          </div>
        </div>
      </div>
      <div className="systems-architecture">
        <div>
          <span className="technical-label">THE CONNECTION VISION</span>
          <h3>
            Works with the world
            <br />
            you already work in.
          </h3>
        </div>
        <div className="architecture-flow">
          {[
            "NEUAURA wearable",
            "Consented capture",
            "AI structuring",
            "Intelligence layer",
            "Your business systems",
            "Tasks & follow-ups",
          ].map((s, i) => (
            <div key={s}>
              <span className={i === 3 ? "accent-node" : ""}>
                {i === 0 ? (
                  <AudioLines size={17} />
                ) : i === 5 ? (
                  <CheckCheck size={17} />
                ) : null}
                {s}
              </span>
              {i < 5 && <ArrowRight size={13} />}
            </div>
          ))}
        </div>
        <span className="architecture-status">PLANNED INTEGRATIONS</span>
      </div>
    </section>
  );
}
