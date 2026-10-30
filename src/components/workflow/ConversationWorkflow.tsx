import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Building2,
  Check,
  ChevronRight,
  Cpu,
  Download,
  Layers3,
  Network,
  Play,
  RotateCcw,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  initialInteractions,
  initialCommitments,
  type WorkspaceTab,
} from "../../content/demo";
import { architectureLayers } from "../../content/architecture";
import { buildBusinessContext } from "../../lib/intelligence";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { SampleLabel, SectionLabel } from "../ui/Primitives";
const icons = [Users, ShieldCheck, Cpu, Network, Layers3, Building2];
export default function ConversationWorkflow({
  onOpen,
}: {
  onOpen: (tab: WorkspaceTab, id: string) => void;
}) {
  const [recordId, setRecordId] = useState("northstar-01"),
    [layer, setLayer] = useState(0),
    [step, setStep] = useState(-1),
    [showPayload, setShowPayload] = useState(false);
  const reduced = useReducedMotion(),
    running = step >= 0 && step < 5,
    complete = step === 5,
    active = running ? step : layer;
  const record = initialInteractions.find((r) => r.id === recordId)!,
    context = buildBusinessContext(record, initialCommitments),
    current = architectureLayers[active],
    Icon = icons[active];
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setStep((n) => n + 1),
      reduced ? 80 : 520,
    );
    return () => window.clearTimeout(timer);
  }, [running, step, reduced]);
  function run() {
    setShowPayload(false);
    setLayer(5);
    setStep(0);
  }
  function download() {
    const blob = new Blob([JSON.stringify(context, null, 2)], {
        type: "application/json",
      }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `neuaura-${record.id}-context-preview.json`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section
      className="workflow-section section-wrap architecture-section"
      id="platform"
      aria-labelledby="workflow-heading"
    >
      <span id="architecture" className="anchor-alias" />
      <SectionLabel number="02" right="THE CORE NEUAURA ARCHITECTURE">
        THE BUSINESS INTELLIGENCE LAYER
      </SectionLabel>
      <div className="split-heading">
        <h2 id="workflow-heading">
          From the customer.
          <br />
          <span className="muted">Into business understanding.</span>
        </h2>
        <p>
          Customer interaction → consented capture → background processing →
          connected context. An intelligence layer designed to keep owners and
          their business systems connected to what is happening outside the
          dashboard.
        </p>
      </div>
      <div
        className="architecture-flow"
        role="tablist"
        aria-label="NEUAURA architecture layers"
      >
        {architectureLayers.map((l, i) => {
          const I = icons[i];
          return (
            <button
              id={`architecture-tab-${i}`}
              key={l.name}
              role="tab"
              aria-controls="architecture-detail"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              disabled={running}
              onClick={() => setLayer(i)}
              onKeyDown={(e) => {
                if (
                  [
                    "ArrowRight",
                    "ArrowLeft",
                    "ArrowDown",
                    "ArrowUp",
                    "Home",
                    "End",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                  const n =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 5
                        : (i +
                            (["ArrowRight", "ArrowDown"].includes(e.key)
                              ? 1
                              : 5)) %
                          6;
                  setLayer(n);
                  document.getElementById(`architecture-tab-${n}`)?.focus();
                }
              }}
            >
              <span>
                0{i + 1}
                <I size={21} />
              </span>
              <strong>{l.name}</strong>
              <small>{l.label}</small>
              {i < 5 && (
                <ChevronRight className="architecture-next" size={14} />
              )}
            </button>
          );
        })}
      </div>
      <div className="architecture-workbench">
        <div
          className="architecture-inspector"
          id="architecture-detail"
          role="tabpanel"
          aria-labelledby={`architecture-tab-${active}`}
        >
          <span className="eyebrow">
            <Icon size={16} /> LAYER 0{active + 1} / {current.label}
          </span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <ul>
            {current.details.map((x) => (
              <li key={x}>
                <span />
                {x}
              </li>
            ))}
          </ul>
          <div className="architecture-scope">
            <span className="status-dot" />
            {current.scope}
          </div>
        </div>
        <div className="architecture-simulation">
          <div className="architecture-demo-top">
            <span>
              <AudioLines size={14} /> FOLLOW ONE CUSTOMER SIGNAL
            </span>
            <SampleLabel short />
          </div>
          <label className="architecture-input-label">
            Example business workflow
            <select
              aria-label="Architecture sample workflow"
              value={recordId}
              disabled={running}
              onChange={(e) => {
                setRecordId(e.target.value);
                setStep(-1);
                setShowPayload(false);
              }}
            >
              {initialInteractions.map((r) => (
                <option value={r.id} key={r.id}>
                  {r.kind} / {r.organisation}
                </option>
              ))}
            </select>
          </label>
          <blockquote>
            <span>FICTIONAL, PERMITTED INPUT</span>“{record.transcript[0].text}”
            <cite>
              {record.person} · {record.organisation}
            </cite>
          </blockquote>
          <div className="background-process" aria-live="polite">
            <div>
              <span
                className={running ? "status-dot processing" : "status-dot"}
              />
              <strong>
                {running
                  ? `Processing sample / ${["Ingesting permitted input", "Transcribing sample input", "Extracting business context", "Connecting the relationship", "Structuring the record", "Preparing the owner view"][step]}`
                  : complete
                    ? "Structured business context is ready"
                    : "A conversation, ready to become context"}
              </strong>
            </div>
            <ol>
              {[
                "Ingest",
                "Transcribe",
                "Extract",
                "Connect",
                "Structure",
                "Inform",
              ].map((s, i) => (
                <li key={s} className={step >= i ? "done" : ""}>
                  <span>{step >= i ? <Check size={10} /> : i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          {complete && (
            <div className="architecture-output">
              <span className="eyebrow">BUSINESS CONTEXT / DRAFT SAMPLE</span>
              <dl>
                <div>
                  <dt>Customer need</dt>
                  <dd>{context.context.customerNeed}</dd>
                </div>
                <div>
                  <dt>Open concern</dt>
                  <dd>{context.context.openConcern}</dd>
                </div>
                <div>
                  <dt>Connected relationship</dt>
                  <dd>
                    {record.person} → {record.organisation}
                  </dd>
                </div>
              </dl>
              <div className="architecture-output-actions">
                <button
                  onClick={() => setShowPayload(!showPayload)}
                  aria-expanded={showPayload}
                >
                  {showPayload ? "Hide BMS context" : "Inspect BMS context"}
                  <ChevronRight size={13} />
                </button>
                <button onClick={download}>
                  <Download size={13} /> Download sample JSON
                </button>
              </div>
              {showPayload && (
                <pre
                  className="architecture-json"
                  aria-label="Draft BMS context payload"
                >
                  {JSON.stringify(context, null, 2)}
                </pre>
              )}
            </div>
          )}
          <div className="architecture-run-row">
            <button
              className="small-button primary"
              disabled={running}
              onClick={run}
            >
              {complete ? <RotateCcw size={14} /> : <Play size={13} />}{" "}
              {running
                ? "Processing fictional input…"
                : complete
                  ? "Run sample again"
                  : "Process sample interaction"}
            </button>
            {complete && (
              <a href="#workspace" onClick={() => onOpen("Overview", recordId)}>
                Explore the owner view <ArrowUpRight size={13} />
              </a>
            )}
          </div>
          <p className="architecture-local-note">
            Local simulation using predefined fictional records. No audio, AI
            service or business system is connected. Review and correction
            remain available before shared records or external actions.
          </p>
        </div>
      </div>
      <div className="architecture-bottom">
        <div>
          <span>ONE SHARED INTELLIGENCE LAYER</span>
          <p>
            Adapt the customer context to the workflow: sales, account
            relationships, partnerships or service operations. Validate each use
            case before rollout.
          </p>
        </div>
        <a href="#integrations" className="text-link">
          How BMS connectivity evolves <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
