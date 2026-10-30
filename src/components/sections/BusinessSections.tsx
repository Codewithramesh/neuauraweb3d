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
    "Customer needs stay out of sight",
    "Owners lose visibility when requirements and concerns stay with the person who heard them.",
  ],
  [
    "Systems miss the real-world picture",
    "Manual notes and delayed CRM entries leave customer context disconnected from operations.",
  ],
  [
    "Relationship updates arrive late",
    "Important changes, objections and customer expectations are hard to track across the team.",
  ],
  [
    "Fragmented relationship history",
    "Important context stays scattered across notes, messages and memory.",
  ],
];
const fragments = [
  { name: "Customer conversations", icon: FileText },
  { name: "Customer needs", icon: Target },
  { name: "Email messages", icon: Mail },
  { name: "CRM entries", icon: Building2 },
  { name: "Customer concerns", icon: MessageSquare },
  { name: "Service discussions", icon: CheckCheck },
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
            Customer conversations.
            <br />
            <span>Business blind spots.</span>
          </h2>
          <p>
            What customers need, what concerns them and how a relationship is
            developing can remain scattered across people, notes and systems.
            The business needs that context.
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
          right="COMMON ARCHITECTURE / WORKFLOW-SPECIFIC VALIDATION"
        >
          DESIGNED AROUND YOUR BUSINESS
        </SectionLabel>
        <div className="split-heading">
          <h2 id="usecases-heading">
            One intelligence layer.
            <br />
            Different business workflows.
          </h2>
          <p>
            The same customer-to-context architecture can support different
            teams. We begin with field sales and business development, then
            validate account, service and operational workflows with pilot
            partners.
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
                  onOpen("Overview", i === 0 ? "northstar-01" : "meridian-02")
                }
              >
                Explore the business view <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
        <div className="adjacent-usecases">
          <article>
            <Users size={23} />
            <div>
              <span>ADJACENT APPLICATION</span>
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
              <span>ADJACENT APPLICATION</span>
              <h3>Service & operations</h3>
              <p>
                Customer issues, service requirements, field observations and
                relationship continuity. A potential next workflow, subject to
                validation.
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
  { title: "Owner & team workspace", icon: Users },
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
          Give your BMS
          <br />
          <span className="muted">the customer context.</span>
        </h2>
        <p>
          A Business Management System knows the operational record. NEUAURA is
          intended to add the customer needs, open concerns and relationship
          history behind it, through structured export and future APIs.
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
            "Owner briefings",
            "Customer service workflows",
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
            "Search, customer profiles and basic export. The demo provides fictional structured JSON; it does not connect to a live BMS.",
          ],
          [
            "02",
            "Validate the connections.",
            "API capabilities and validated workflow integrations. Advanced team analytics and configurable workflows remain later scope.",
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
      <ClipboardList size={13} /> Customers. Context. Business intelligence.
      <ArrowDown size={12} />
    </span>
  );
}
