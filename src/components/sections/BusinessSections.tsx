import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Building2,
  CalendarDays,
  CheckCheck,
  ClipboardList,
  FileText,
  Layers3,
  Mail,
  MessageSquare,
  Network,
  Target,
  Users,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { roadmap, site, useCases } from "../../content/site";
import type { WorkspaceTab } from "../../content/demo";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { SectionLabel } from "../ui/Primitives";
const problems = [
  [
    "Lost customer context",
    "Requirements and objections fade when the conversation ends.",
  ],
  [
    "Manual documentation",
    "Notes and CRM updates compete with the next customer interaction.",
  ],
  [
    "Missed follow-ups",
    "Verbal commitments need a clear owner and a next step.",
  ],
  [
    "Fragmented relationship history",
    "Important context stays scattered across notes, messages and memory.",
  ],
];
const fragments = [
  { name: "Meeting notes", icon: FileText },
  { name: "Customer needs", icon: Target },
  { name: "Email messages", icon: Mail },
  { name: "CRM entries", icon: Building2 },
  { name: "Verbal commitments", icon: MessageSquare },
  { name: "Follow-up tasks", icon: CheckCheck },
  { name: "Calendar events", icon: CalendarDays },
];
export function BusinessProblem() {
  const [connected, setConnected] = useState(false),
    ref = useRef<HTMLDivElement>(null),
    reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 72%",
      once: true,
      onEnter: () => setConnected(true),
    });
    return () => t.kill();
  }, [reduce]);
  return (
    <section
      className="problem-section light-section"
      id="problem"
      aria-labelledby="problem-heading"
    >
      <div className="section-wrap">
        <SectionLabel number="01" right="THE COST OF DISCONNECTED CONTEXT">
          THE BUSINESS PROBLEM
        </SectionLabel>
        <div className="split-heading">
          <h2 id="problem-heading">
            Important conversations.
            <br />
            <span>Forgotten commitments.</span>
          </h2>
          <p>
            Customer visits. Sales calls. Partnership discussions. The
            information matters. The places it ends up rarely connect.
          </p>
        </div>
        <div className="problem-layout">
          <div className="problem-list">
            {problems.map(([title, copy], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div
            className={`fragment-diagram ${connected ? "connected" : ""}`}
            ref={ref}
          >
            <div className="fragment-grid" aria-hidden="true" />
            <svg
              viewBox="0 0 600 440"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {[
                [100, 74],
                [390, 55],
                [510, 160],
                [475, 350],
                [195, 360],
                [72, 265],
                [310, 405],
              ].map(([x, y], i) => (
                <path key={i} d={`M ${x} ${y} Q 300 ${y} 300 220`} />
              ))}
            </svg>
            <div className="fragment-core">
              <Network size={25} />
              <strong>NEUAURA</strong>
              <span>
                {connected
                  ? "CONNECTED BUSINESS CONTEXT"
                  : "THE INTELLIGENCE LAYER"}
              </span>
            </div>
            {fragments.map((f, i) => (
              <div className={`fragment fragment-${i}`} key={f.name}>
                <f.icon size={15} />
                <span>{f.name}</span>
              </div>
            ))}
            <div className="fragment-controls">
              <span>ILLUSTRATIVE INFORMATION FLOW</span>
              <button
                aria-pressed={connected}
                onClick={() => setConnected(!connected)}
              >
                {connected ? "Scatter again" : "Connect the context"}
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function BusinessUseCases({
  onOpen,
}: {
  onOpen: (tab: WorkspaceTab, id: string) => void;
}) {
  return (
    <section
      className="usecases-section light-section"
      id="business"
      aria-labelledby="usecases-heading"
    >
      <div className="section-wrap">
        <SectionLabel
          number="05"
          right="FIELD SALES & BUSINESS DEVELOPMENT FIRST"
        >
          BUILT FOR THE CONVERSATION
        </SectionLabel>
        <div className="split-heading">
          <h2 id="usecases-heading">
            Built around real
            <br />
            business conversations.
          </h2>
          <p>
            A focused entry point: teams whose most important business context
            is created between people, in the field.
          </p>
        </div>
        <div className="primary-usecases">
          {useCases.map((c, i) => (
            <article key={c.title}>
              <div className="usecase-top">
                <span>
                  {c.number} / {c.label}
                </span>
                {i === 0 ? <Target size={27} /> : <Network size={27} />}
              </div>
              <span className="usecase-category">{c.title}</span>
              <h3>
                {c.headline.split("\n").map((line, j) => (
                  <span key={line}>
                    {line}
                    {j === 0 && <br />}
                  </span>
                ))}
              </h3>
              <p>{c.description}</p>
              <div className="usecase-flow">
                {c.flow.map((step, j) => (
                  <div key={step}>
                    <span>{step}</span>
                    {j < 3 && <ArrowRight size={11} />}
                  </div>
                ))}
              </div>
              <p className="usecase-note">{c.note}</p>
              <a
                href="#workspace"
                onClick={() =>
                  onOpen(
                    "Interactions",
                    i === 0 ? "northstar-01" : "meridian-02",
                  )
                }
              >
                Explore a fictional workflow <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
        <div className="adjacent-usecases">
          <article>
            <Users size={23} />
            <div>
              <span>ADJACENT WORKFLOW</span>
              <h3>Account management</h3>
              <p>
                Customer interactions, agreed actions, account concerns, renewal
                discussions and relationship history.
              </p>
            </div>
          </article>
          <article>
            <Building2 size={23} />
            <div>
              <span>ADJACENT WORKFLOW</span>
              <h3>Founders & partnerships</h3>
              <p>
                Investor conversations, strategic partnerships, networking,
                potential customers and commercial commitments.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
const architecture = [
  { title: "Consented interaction", icon: MessageSquare },
  { title: "Capture & import", icon: AudioLines },
  { title: "Transcription", icon: FileText },
  { title: "AI context extraction", icon: Layers3 },
  { title: "Relationship intelligence", icon: Network },
  { title: "Human review", icon: Users },
  { title: "Export & API", icon: ArrowUpRight },
  { title: "Existing business systems", icon: Building2 },
];
export function IntegrationArchitecture() {
  return (
    <section
      className="integrations-section section-wrap"
      id="integrations"
      aria-labelledby="integration-heading"
    >
      <SectionLabel number="07" right={site.integrationStatus.toUpperCase()}>
        THE ENTERPRISE CONNECTION
      </SectionLabel>
      <div className="split-heading">
        <h2 id="integration-heading">
          Your business systems.
          <br />
          <span className="muted">Connected to better context.</span>
        </h2>
        <p>
          An intelligence layer that complements the systems you already work
          in. Future connections should follow real pilot demand.
        </p>
      </div>
      <ol className="integration-pipeline">
        {architecture.map((step, i) => (
          <li key={step.title}>
            <span>0{i + 1}</span>
            <step.icon size={23} />
            <strong>{step.title}</strong>
            {i < 7 && <ArrowRight className="pipeline-arrow" size={13} />}
          </li>
        ))}
      </ol>
      <div className="integration-destinations">
        <span>POTENTIAL DESTINATIONS</span>
        <div>
          {[
            "CRM",
            "Business Management Systems",
            "Calendar",
            "Email",
            "Task management",
            "Team dashboards",
            "Enterprise workflows",
          ].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div className="integration-stages">
        {[
          [
            "01",
            "Start with useful records.",
            "Basic export and searchable records. The workspace demonstrates this with fictional local data.",
          ],
          [
            "02",
            "Validate the connections.",
            "API capabilities and carefully validated workflow integrations.",
          ],
          [
            "03",
            "Follow the pilot demand.",
            "CRM, BMS and enterprise connectivity based on actual customer workflows.",
          ],
        ].map(([n, title, copy]) => (
          <article key={n}>
            <span>
              STAGE {n} / {n === "01" ? "MVP DIRECTION" : "PLANNED"}
            </span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <p className="integration-disclaimer">
        No live CRM, BMS, calendar or email integration is claimed. The site’s
        sample export is a browser-only demonstration.
      </p>
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
      <SectionLabel
        number="09"
        right="DIRECTION, WITHOUT INVENTED LAUNCH DATES"
      >
        THE DEVELOPMENT ROADMAP
      </SectionLabel>
      <div className="split-heading">
        <h2 id="roadmap-heading">
          Prove the intelligence.
          <br />
          <span className="muted">Evolve the hardware.</span>
        </h2>
        <a className="text-link" href="#pilot">
          Help shape what comes next <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="roadmap-grid">
        {roadmap.map((s, i) => (
          <article key={s.title}>
            <div className={`roadmap-node ${i < 2 ? "current" : ""}`}>
              <span>0{i + 1}</span>
              <i />
            </div>
            <span className="roadmap-status">{s.status}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </article>
        ))}
      </div>
      <p className="roadmap-note">
        Software workflow validation comes first. Hardware development and
        controlled device pilots depend on demonstrated workflow fit and
        feasibility.
      </p>
    </section>
  );
}
const pilotMetrics = [
  ["Capture adoption", "How consistently the agreed workflow is used."],
  [
    "Documentation time",
    "Notes and CRM administration, compared with a baseline.",
  ],
  ["Extraction quality", "User-verified accuracy and necessary corrections."],
  ["Follow-up completion", "Whether agreed next steps are completed."],
  ["User satisfaction", "Structured feedback from participating people."],
  [
    "Operational reliability",
    "Failures, recovery and usability in the actual workflow.",
  ],
];
export function PilotMetrics() {
  return (
    <div className="pilot-metrics">
      <span className="eyebrow">
        WHAT A PILOT SHOULD VALIDATE / NOT PROVEN RESULTS
      </span>
      <div>
        {pilotMetrics.map(([title, copy]) => (
          <article key={title}>
            <CheckCheck size={15} />
            <div>
              <h4>{title}</h4>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
// Keep the architecture readable in the source and available outside animations.
export function ProcessLegend() {
  return (
    <span className="process-legend">
      <ClipboardList size={13} /> Permission. Context. Review. Follow-through.
      <ArrowDown size={12} />
    </span>
  );
}
