import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarClock,
  History,
  MessageSquare,
  Network,
  Target,
} from "lucide-react";
import type { Interaction, WorkspaceTab } from "../../content/demo";
import { SampleLabel } from "../ui/Primitives";
type Props = {
  records: Interaction[];
  onOpen: (id: string, tab?: WorkspaceTab) => void;
  onView: (tab: WorkspaceTab) => void;
};
export default function BusinessOverview({ records, onOpen, onView }: Props) {
  return (
    <div className="overview-content owner-overview">
      <div className="owner-briefing">
        <div>
          <span className="eyebrow">THE OWNER’S VIEW / CONCEPT</span>
          <h4>The customer context behind the business.</h4>
          <p>
            See what people need, where concerns remain and how each
            relationship is developing. Every insight below links to its source.
          </p>
        </div>
        <Network size={42} strokeWidth={1} />
      </div>
      <div className="workspace-summary-strip">
        <button onClick={() => onView("Interactions")}>
          <MessageSquare size={19} />
          <strong>{String(records.length).padStart(2, "0")}</strong>
          <span>Sample interactions</span>
          <ArrowUpRight size={13} />
        </button>
        <button onClick={() => onView("Search")}>
          <Target size={19} />
          <strong>
            {String(records.filter((r) => r.needs).length).padStart(2, "0")}
          </strong>
          <span>Customer needs to explore</span>
          <ArrowUpRight size={13} />
        </button>
        <button onClick={() => onView("Organisations")}>
          <Building2 size={19} />
          <strong>
            {String(new Set(records.map((r) => r.organisation)).size).padStart(
              2,
              "0",
            )}
          </strong>
          <span>Connected organisations</span>
          <ArrowUpRight size={13} />
        </button>
      </div>
      <div className="owner-intelligence-grid">
        <div>
          <div className="workspace-block-heading">
            <h4>What do customers need?</h4>
            <SampleLabel short />
          </div>
          <div className="owner-signals">
            {records.map((r) => (
              <button key={r.id} onClick={() => onOpen(r.id)}>
                <span className="owner-signal-top">
                  <span className="record-avatar">{r.initials}</span>
                  <span>
                    <strong>{r.organisation}</strong>
                    <small>
                      {r.kind} / {r.person}
                    </small>
                  </span>
                  <ArrowUpRight size={14} />
                </span>
                <p>{r.needs}</p>
                <span className="owner-signal-footer">
                  {r.reviewed
                    ? "Reviewed sample context"
                    : "Draft insight · source available"}
                  <ArrowRight size={12} />
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="workspace-block-heading">
            <h4>What needs attention?</h4>
            <span className="state-pill">CUSTOMER CONTEXT</span>
          </div>
          <div className="owner-concerns">
            {records.map((r) => (
              <button key={r.id} onClick={() => onOpen(r.id)}>
                <span>
                  {r.organisation}
                  <ArrowUpRight size={12} />
                </span>
                <strong>{r.objection}</strong>
                <small>From the source interaction · {r.date}</small>
              </button>
            ))}
          </div>
          <div className="owner-bms-note">
            <Network size={23} />
            <h4>A clearer input for your BMS.</h4>
            <p>
              Customer requirements and relationship context can complement
              operational records. Export and API connectivity are planned in
              stages.
            </p>
            <a href="#integrations">
              Explore business systems <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
      <div className="workspace-activity owner-activity">
        <div className="workspace-block-heading">
          <h4>
            <History size={14} /> Relationship updates
          </h4>
          <button onClick={() => onView("Organisations")}>
            View organisations <ArrowRight size={12} />
          </button>
        </div>
        {records.map((r) => (
          <p key={r.id}>
            <i />
            <span>
              <CalendarClock size={11} /> {r.date}
            </span>
            {r.person} shared customer context.
            <button onClick={() => onOpen(r.id, "People")}>
              {r.organisation}
            </button>
          </p>
        ))}
      </div>
      <div className="owner-scope-note">
        Illustrative qualitative briefing from {records.length} fictional
        interaction{records.length === 1 ? "" : "s"}. No live monitoring or
        autonomous decisions. Advanced team analytics require later validation.
      </div>
    </div>
  );
}
