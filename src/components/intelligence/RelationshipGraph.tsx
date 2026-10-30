import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  CheckCheck,
  GitBranch,
  ListChecks,
  MessageSquare,
  Network,
  Target,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import {
  graphEntities,
  graphEdges,
  type WorkspaceTab,
} from "../../content/demo";
import { SectionLabel, SampleLabel } from "../ui/Primitives";
const entityIcons = [
  UserRound,
  Building2,
  MessageSquare,
  Target,
  GitBranch,
  CheckCheck,
  ListChecks,
  CalendarClock,
  ArrowUpRight,
];
export default function RelationshipGraph({
  onOpen,
}: {
  onOpen: (tab: WorkspaceTab, id: string) => void;
}) {
  const [selected, setSelected] = useState("interaction"),
    entity = graphEntities.find((n) => n.id === selected)!;
  const neighbours = graphEdges
    .filter((e) => e.includes(selected))
    .flat()
    .filter((x) => x !== selected);
  const Icon = entityIcons[graphEntities.indexOf(entity)];
  return (
    <section
      className="relationship-section section-wrap"
      id="intelligence"
      aria-labelledby="relationship-heading"
    >
      <SectionLabel
        number="03"
        right="THE HUMAN INTELLIGENCE RELATIONSHIP LAYER"
      >
        CONNECTED CONTEXT
      </SectionLabel>
      <div className="split-heading">
        <h2 id="relationship-heading">
          Not just what was said.
          <br />
          <span className="muted">What it means for the business.</span>
        </h2>
        <p>
          One interaction is part of a bigger relationship. Explore how people,
          needs, decisions and commitments fit together.
        </p>
      </div>
      <div className="graph-toolbar">
        <span>
          <Network size={15} /> RELATIONSHIP EXPLORER
        </span>
        <SampleLabel />
      </div>
      <div className="graph-layout">
        <div className="graph-scroll">
          <div
            className="relationship-graph"
            aria-label="Select an entity in the illustrative relationship graph"
          >
            <svg
              viewBox="0 0 1000 600"
              className="graph-connections"
              aria-hidden="true"
            >
              {graphEdges.map(([from, to]) => {
                const a = graphEntities.find((e) => e.id === from)!,
                  b = graphEntities.find((e) => e.id === to)!;
                return (
                  <path
                    key={`${from}-${to}`}
                    className={
                      from === selected || to === selected ? "active" : ""
                    }
                    d={`M ${a.x * 10} ${a.y * 6} C ${(a.x + b.x) * 5} ${a.y * 6}, ${(a.x + b.x) * 5} ${b.y * 6}, ${b.x * 10} ${b.y * 6}`}
                  />
                );
              })}
            </svg>
            {graphEntities.map((n, i) => {
              const I = entityIcons[i];
              return (
                <button
                  className={`graph-node ${n.id === selected ? "selected" : ""} ${neighbours.includes(n.id) ? "connected" : ""} ${n.id === "interaction" ? "central" : ""}`}
                  key={n.id}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  onClick={() => setSelected(n.id)}
                  aria-pressed={n.id === selected}
                  aria-label={`Inspect ${n.type.toLowerCase()}: ${n.title}`}
                >
                  <span>
                    <I size={13} />
                    {n.type}
                  </span>
                  <strong>{n.title}</strong>
                  <i />
                </button>
              );
            })}
          </div>
        </div>
        <aside className="graph-inspector" aria-live="polite">
          <div className="inspector-top">
            <Icon size={24} />
            <span>
              CONTEXT /{" "}
              {String(graphEntities.indexOf(entity) + 1).padStart(2, "0")}
            </span>
          </div>
          <span className="eyebrow">{entity.type}</span>
          <h3>{entity.title}</h3>
          <p>{entity.description}</p>
          <div className="related-entities">
            <span>CONNECTED CONTEXT</span>
            {Array.from(new Set(neighbours)).map((id) => {
              const item = graphEntities.find((e) => e.id === id)!;
              return (
                <button key={id} onClick={() => setSelected(id)}>
                  <span>{item.type}</span>
                  {item.title}
                  <ArrowUpRight size={12} />
                </button>
              );
            })}
          </div>
          <a
            href="#workspace"
            className="button button-outline"
            onClick={() => onOpen(entity.tab, entity.recordId)}
          >
            Open in workspace <ArrowUpRight size={15} />
          </a>
          <div className="inspector-note">
            <ShieldCheck size={13} /> Confirm identity and review extracted
            details before sharing.
          </div>
        </aside>
      </div>
      <label className="graph-mobile-select">
        Explore an entity
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {graphEntities.map((n) => (
            <option value={n.id} key={n.id}>
              {n.type} — {n.title}
            </option>
          ))}
        </select>
      </label>
      <div className="graph-footnote">
        <span className="status-dot" /> Select a node to explore its context.
        Every record in this example is fictional.
      </div>
    </section>
  );
}
