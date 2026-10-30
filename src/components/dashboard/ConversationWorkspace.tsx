import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Building2,
  Check,
  CheckCheck,
  ChevronRight,
  Download,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  MoreHorizontal,
  Network,
  PanelLeftClose,
  RotateCcw,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import {
  initialInteractions,
  initialCommitments,
  sampleQueries,
  workspaceTabs,
  type Commitment,
  type WorkspaceTab,
} from "../../content/demo";
import { canConfirm, searchDemo } from "../../lib/demo";
import BusinessOverview from "./BusinessOverview";
import { Modal, SampleLabel, SectionLabel } from "../ui/Primitives";

const tabIcons = {
  Overview: LayoutDashboard,
  Interactions: MessageSquare,
  People: Users,
  Organisations: Building2,
  Commitments: ListChecks,
  "Follow-ups": CheckCheck,
  Search,
};
type Props = {
  filter: string;
  onFilter: (filter: string) => void;
  view: WorkspaceTab;
  onView: (view: WorkspaceTab) => void;
  selectedId: string;
  onSelect: (id: string) => void;
};
export default function ConversationWorkspace({
  filter,
  onFilter: setFilter,
  view,
  onView,
  selectedId,
  onSelect,
}: Props) {
  const [records, setRecords] = useState(() =>
    initialInteractions.map((r) => ({ ...r })),
  );
  const [commitments, setCommitments] = useState(() =>
    initialCommitments.map((c) => ({ ...c })),
  );
  const [commitmentFilter, setCommitmentFilter] = useState("All states");
  const [editing, setEditing] = useState(false),
    [subview, setSubview] = useState<"Context" | "Transcript">("Context");
  const [query, setQuery] = useState(""),
    [searched, setSearched] = useState(false),
    [toast, setToast] = useState("");
  const [modal, setModal] = useState<"share" | "followup" | null>(null),
    [targetId, setTargetId] = useState("");
  const [draft, setDraft] = useState(""),
    [sidebarOpen, setSidebarOpen] = useState(false);
  const record = records.find((r) => r.id === selectedId) || records[0];
  const visibleRecords = records.filter(
    (r) => filter === "All workflows" || r.kind === filter,
  );
  const visibleCommitments = commitments.filter((c) =>
    visibleRecords.some((r) => r.id === c.interactionId),
  );
  const related = commitments.filter((c) => c.interactionId === record.id);
  const results = useMemo(
    () =>
      searched
        ? searchDemo(visibleRecords, visibleCommitments, query, selectedId)
        : [],
    [searched, visibleRecords, visibleCommitments, query, selectedId],
  );
  function changeView(tab: WorkspaceTab) {
    onView(tab);
    setEditing(false);
    setSidebarOpen(false);
    setToast("");
  }
  function selectRecord(id: string) {
    onSelect(id);
    setEditing(false);
    setSubview("Context");
    setToast("");
  }
  function openRecord(id: string, tab: WorkspaceTab = "Interactions") {
    selectRecord(id);
    onView(tab);
    setSidebarOpen(false);
  }
  function openReview(id: string) {
    onSelect(id);
    onView("Interactions");
    setSubview("Context");
    setEditing(true);
    setToast("");
  }
  function review(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const changes = {
      summary: String(d.get("summary") || "").trim(),
      needs: String(d.get("needs") || "").trim(),
      objection: String(d.get("objection") || "").trim(),
      decision: String(d.get("decision") || "").trim(),
    };
    if (Object.values(changes).some((v) => v.length < 3)) {
      setToast("Please provide meaningful context in each review field.");
      return;
    }
    setRecords((rows) =>
      rows.map((r) =>
        r.id === record.id ? { ...r, ...changes, reviewed: true } : r,
      ),
    );
    setEditing(false);
    setToast(
      "Context reviewed and corrected in this sample only. No information was shared.",
    );
  }
  function confirmCommitment(c: Commitment) {
    if (!canConfirm(records.find((r) => r.id === c.interactionId))) return;
    setCommitments((rows) =>
      rows.map((row) => (row.id === c.id ? { ...row, confirmed: true } : row)),
    );
    setToast(
      "Commitment confirmed in this local sample. No external action was taken.",
    );
  }
  function openFollowup(c: Commitment) {
    setTargetId(c.id);
    setDraft(c.followUp);
    setModal("followup");
  }
  function finishSimulation() {
    if (modal === "share") {
      if (!record.reviewed) return;
      setToast("Sharing simulation complete. No information was transmitted.");
    } else {
      const c = commitments.find((c) => c.id === targetId);
      if (
        !c?.confirmed ||
        !canConfirm(records.find((r) => r.id === c.interactionId)) ||
        draft.trim().length < 10
      )
        return;
      setCommitments((rows) =>
        rows.map((row) =>
          row.id === targetId
            ? { ...row, completed: true, followUp: draft.trim() }
            : row,
        ),
      );
      setToast(
        "Follow-up confirmed in the sample. No email was sent and no external task was created.",
      );
    }
    setModal(null);
  }
  function reset() {
    setRecords(initialInteractions.map((r) => ({ ...r })));
    setCommitments(initialCommitments.map((c) => ({ ...c })));
    setFilter("All workflows");
    setCommitmentFilter("All states");
    onSelect("northstar-01");
    onView("Overview");
    setEditing(false);
    setQuery("");
    setSearched(false);
    setToast("Sample workspace reset.");
    setModal(null);
  }
  function exportSample() {
    const data = {
      notice:
        "Entirely fictional local product demonstration. Not a real customer record.",
      interactions: records,
      commitments,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "neuaura-v1-illustrative-workspace.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setToast(
      "Fictional sample data exported locally. No production integration was used.",
    );
  }
  const recordList = (tab: WorkspaceTab = "Interactions") => (
    <div className="workspace-record-list">
      {visibleRecords.map((r) => (
        <button
          key={r.id}
          className={record.id === r.id ? "selected" : ""}
          onClick={() => openRecord(r.id, tab)}
        >
          <span className="record-avatar">{r.initials}</span>
          <span>
            <strong>
              {tab === "People"
                ? r.person
                : tab === "Organisations"
                  ? r.organisation
                  : r.title}
            </strong>
            <small>
              {tab === "People"
                ? r.organisation
                : tab === "Organisations"
                  ? r.person
                  : r.date}{" "}
              · illustrative
            </small>
          </span>
          <ChevronRight size={14} />
        </button>
      ))}
    </div>
  );
  const contextFields = (
    <div className="context-fields">
      <div>
        <span>CUSTOMER REQUIREMENTS</span>
        <p>{record.needs}</p>
      </div>
      <div>
        <span>OBJECTION</span>
        <p>{record.objection}</p>
      </div>
      <div>
        <span>DECISION</span>
        <p>{record.decision}</p>
      </div>
      <div>
        <span>COMMITMENT / DEADLINE</span>
        {related.map((c) => (
          <p key={c.id}>
            {c.action} · {c.deadline}
          </p>
        ))}
      </div>
    </div>
  );
  return (
    <section
      className="workspace-section section-wrap"
      id="workspace"
      aria-labelledby="workspace-heading"
    >
      <SectionLabel number="04" right="WORKING DEMONSTRATION / FICTIONAL DATA">
        THE SOFTWARE EXPERIENCE
      </SectionLabel>
      <div className="split-heading">
        <h2 id="workspace-heading">
          Your customers.
          <br />
          Your business, connected.
        </h2>
        <div>
          <p>
            Explore the owner’s view of customer needs, open concerns and
            relationship context. Follow any insight back to the interaction
            behind it.
          </p>
          <span className="section-note">
            Browser-only demonstration. No real recordings or production
            backend.
          </span>
        </div>
      </div>
      <div className="workspace-shell">
        <div className={`workspace-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="workspace-logo">
            <span>N</span>
            <div>
              NEUAURA<small>BUSINESS INTELLIGENCE</small>
            </div>
            <button
              aria-label="Close workspace navigation"
              className="workspace-sidebar-close"
              onClick={() => setSidebarOpen(false)}
            >
              <PanelLeftClose size={17} />
            </button>
          </div>
          <span className="workspace-nav-label">YOUR WORKSPACE</span>
          <nav
            role="tablist"
            aria-label="Sample workspace navigation"
            aria-orientation="vertical"
          >
            {workspaceTabs.map((tab, i) => {
              const Icon = tabIcons[tab];
              return (
                <button
                  key={tab}
                  id={`workspace-tab-${i}`}
                  role="tab"
                  aria-selected={view === tab}
                  aria-controls="workspace-panel"
                  tabIndex={view === tab ? 0 : -1}
                  onClick={() => changeView(tab)}
                  onKeyDown={(e) => {
                    if (
                      ["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)
                    ) {
                      e.preventDefault();
                      const next =
                        e.key === "Home"
                          ? 0
                          : e.key === "End"
                            ? 6
                            : (i + (e.key === "ArrowDown" ? 1 : 6)) % 7;
                      changeView(workspaceTabs[next]);
                      document.getElementById(`workspace-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <Icon size={16} />
                  {tab}
                  {tab === "Interactions" && (
                    <span aria-hidden="true">{records.length}</span>
                  )}
                </button>
              );
            })}
          </nav>
          <div className="workspace-sidebar-bottom">
            <span className="demo-avatar">D</span>
            <div>
              Demo workspace<small>All records are fictional</small>
            </div>
            <ShieldCheck size={15} />
          </div>
        </div>
        <div className="workspace-app">
          <header className="workspace-topbar">
            <button
              className="workspace-menu"
              aria-label="Open workspace navigation"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MoreHorizontal size={18} />
            </button>
            <div>
              Workspace <ChevronRight size={12} />
              <strong>{view}</strong>
            </div>
            <div className="workspace-topbar-actions">
              <button
                onClick={exportSample}
                title="Download fictional sample data"
              >
                <Download size={14} />
                <span>Export sample</span>
              </button>
              <button onClick={reset} aria-label="Reset sample workspace">
                <RotateCcw size={14} />
                <span>Reset demo</span>
              </button>
            </div>
          </header>
          <div className="workspace-data-banner">
            <span className="status-dot" />
            <span>ILLUSTRATIVE DATA — NOT A REAL CUSTOMER RECORD</span>
            <span>INTERACTIVE CONCEPT</span>
          </div>
          <div
            className="workspace-content"
            id="workspace-panel"
            role="tabpanel"
            aria-labelledby={`workspace-tab-${workspaceTabs.indexOf(view)}`}
          >
            <div className="workspace-page-heading">
              <div>
                <span className="workspace-kicker">
                  BUSINESS INTELLIGENCE / V1
                </span>
                <h3>
                  {view === "Overview"
                    ? "Stay close to the customer."
                    : view === "Search"
                      ? "Ask your business context."
                      : view}
                </h3>
                <p>
                  {view === "Overview"
                    ? "A connected picture of customer needs, concerns and relationship updates."
                    : view === "Interactions"
                      ? "The source conversations behind your business context."
                      : view === "People"
                        ? "People connected to the context they shared."
                        : view === "Organisations"
                          ? "A relationship history, in one place."
                          : view === "Commitments"
                            ? "Keep customer commitments connected to their source and owner."
                            : view === "Follow-ups"
                              ? "Suggested next steps grounded in the customer relationship."
                              : "Search the fictional dataset. No AI service or real recordings are connected."}
                </p>
              </div>
              {view !== "Search" && (
                <label className="workspace-filter">
                  Workflow
                  <select
                    aria-label="Filter sample workflow"
                    value={filter}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFilter(value);
                      setEditing(false);
                      const next = records.find(
                        (r) => value === "All workflows" || r.kind === value,
                      );
                      if (next) onSelect(next.id);
                    }}
                  >
                    <option>All workflows</option>
                    <option>Field sales</option>
                    <option>Business development</option>
                    <option>Service &amp; operations</option>
                  </select>
                </label>
              )}
            </div>
            {view === "Overview" && (
              <BusinessOverview
                records={visibleRecords}
                onOpen={openRecord}
                onView={changeView}
              />
            )}
            {view === "Interactions" && (
              <div className="workspace-split-view">
                <aside>{recordList()}</aside>
                <div className="interaction-detail">
                  <div className="record-detail-heading">
                    <div>
                      <SampleLabel short />
                      <h4>{record.title}</h4>
                      <p>
                        {record.date} · {record.person} · {record.organisation}
                      </p>
                    </div>
                    <span
                      className={`state-pill ${record.reviewed ? "reviewed" : ""}`}
                    >
                      {record.reviewed
                        ? "REVIEWED IN SAMPLE"
                        : "UNVERIFIED EXTRACTION"}
                    </span>
                  </div>
                  <div
                    className="record-subtabs"
                    role="tablist"
                    aria-label="Interaction detail"
                  >
                    {(["Context", "Transcript"] as const).map((t) => (
                      <button
                        role="tab"
                        key={t}
                        aria-selected={subview === t}
                        aria-controls="record-detail-panel"
                        onClick={() => {
                          setSubview(t);
                          setEditing(false);
                        }}
                      >
                        {t === "Context" ? "Summary & context" : "Transcript"}
                      </button>
                    ))}
                  </div>
                  <div
                    id="record-detail-panel"
                    role="tabpanel"
                    aria-label={subview}
                  >
                    {subview === "Transcript" ? (
                      <div className="record-transcript">
                        {record.transcript.map((line, i) => (
                          <div key={i}>
                            <span>
                              {String(i + 1).padStart(2, "0")} / {line.speaker}
                            </span>
                            <p>{line.text}</p>
                          </div>
                        ))}
                        <p className="inline-note">
                          Fictional source text supplied for this demonstration.
                          No recording is connected.
                        </p>
                      </div>
                    ) : editing ? (
                      <form
                        className="review-form"
                        key={record.id}
                        onSubmit={review}
                      >
                        <div className="review-form-title">
                          <ShieldCheck size={17} />
                          <span>Verify and correct the sample extraction</span>
                        </div>
                        {(
                          [
                            { key: "summary", label: "Conversation summary" },
                            { key: "needs", label: "Customer requirements" },
                            { key: "objection", label: "Objection" },
                            { key: "decision", label: "Decision" },
                          ] as const
                        ).map((f) => (
                          <label key={f.key}>
                            {f.label}
                            <textarea
                              name={f.key}
                              aria-label={f.label}
                              required
                              minLength={3}
                              maxLength={1500}
                              rows={f.key === "summary" ? 3 : 2}
                              defaultValue={record[f.key]}
                            />
                          </label>
                        ))}
                        <label className="check-label">
                          <input type="checkbox" required />I have checked this
                          context against the sample transcript.
                        </label>
                        <div className="review-form-actions">
                          <button
                            type="submit"
                            className="small-button primary"
                          >
                            <Check size={14} /> Save reviewed context
                          </button>
                          <button
                            type="button"
                            className="small-button"
                            onClick={() => setEditing(false)}
                          >
                            Cancel review
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="record-summary">
                          <span>
                            <AudioLines size={14} /> SUGGESTED SUMMARY
                          </span>
                          <p>{record.summary}</p>
                        </div>
                        {contextFields}
                        <div className="record-actions">
                          <button
                            className="small-button primary"
                            onClick={() => setEditing(true)}
                          >
                            <ShieldCheck size={14} />
                            {record.reviewed
                              ? "Edit reviewed context"
                              : "Review extraction"}
                          </button>
                          <button
                            className="small-button"
                            disabled={!record.reviewed}
                            onClick={() => setModal("share")}
                          >
                            <ArrowUpRight size={14} /> Share reviewed context
                          </button>
                        </div>
                        <p className="inline-note">
                          {record.reviewed
                            ? "Review is saved only in this browser session. Sharing requires a separate confirmation."
                            : "Review the extraction to enable the sharing simulation. Nothing is automatically shared."}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            {(view === "People" || view === "Organisations") && (
              <div className="workspace-split-view">
                <aside>{recordList(view)}</aside>
                <div className="relationship-detail">
                  <div className="profile-heading">
                    <span className="profile-avatar">
                      {view === "People" ? (
                        record.initials
                      ) : (
                        <Building2 size={27} />
                      )}
                    </span>
                    <div>
                      <SampleLabel short />
                      <h4>
                        {view === "People"
                          ? record.person
                          : record.organisation}
                      </h4>
                      <p>
                        {view === "People"
                          ? `${record.role} / ${record.organisation}`
                          : "Fictional company profile · demonstration record"}
                      </p>
                    </div>
                  </div>
                  <div className="profile-facts">
                    <div>
                      <span>
                        {view === "People"
                          ? "ORGANISATION"
                          : "ASSOCIATED CONTACT"}
                      </span>
                      <button
                        onClick={() =>
                          changeView(
                            view === "People" ? "Organisations" : "People",
                          )
                        }
                      >
                        {view === "People"
                          ? record.organisation
                          : record.person}
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                    <div>
                      <span>IMPORTANT CONTEXT</span>
                      <p>{record.needs}</p>
                    </div>
                  </div>
                  <div className="workspace-block-heading">
                    <h4>Interaction history</h4>
                    <span className="state-pill">SAMPLE</span>
                  </div>
                  <button
                    className="relationship-history"
                    onClick={() => openRecord(record.id)}
                  >
                    <MessageSquare size={17} />
                    <span>
                      <strong>{record.title}</strong>
                      <small>
                        {record.date} ·{" "}
                        {record.reviewed
                          ? "Reviewed in sample"
                          : "Awaiting review"}
                      </small>
                    </span>
                    <ArrowUpRight size={14} />
                  </button>
                  <div className="workspace-block-heading">
                    <h4>Outstanding commitments</h4>
                  </div>
                  {related.map((c) => (
                    <button
                      className="relationship-history"
                      key={c.id}
                      onClick={() => openRecord(record.id, "Commitments")}
                    >
                      <ListChecks size={17} />
                      <span>
                        <strong>{c.action}</strong>
                        <small>
                          {c.deadline} ·{" "}
                          {c.completed
                            ? "Confirmed follow-up simulation"
                            : "Pending"}
                        </small>
                      </span>
                      <ArrowUpRight size={14} />
                    </button>
                  ))}
                  <div className="profile-context">
                    <span>RELATIONSHIP CONTINUITY</span>
                    <p>{record.summary}</p>
                  </div>
                </div>
              </div>
            )}
            {view === "Commitments" && (
              <div className="commitments-view">
                <div className="commitments-toolbar">
                  <span>Proposed commitments stay linked to their source.</span>
                  <label>
                    Status
                    <select
                      aria-label="Filter commitment status"
                      value={commitmentFilter}
                      onChange={(e) => setCommitmentFilter(e.target.value)}
                    >
                      <option>All states</option>
                      <option>Awaiting confirmation</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                    </select>
                  </label>
                </div>
                <div className="commitment-table-wrap">
                  <table className="commitment-table">
                    <thead>
                      <tr>
                        <th>Commitment / source</th>
                        <th>Responsible person</th>
                        <th>Deadline</th>
                        <th>Confirmation / status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleCommitments
                        .filter(
                          (c) =>
                            commitmentFilter === "All states" ||
                            (commitmentFilter === "Awaiting confirmation" &&
                              !c.confirmed) ||
                            (commitmentFilter === "Confirmed" &&
                              c.confirmed &&
                              !c.completed) ||
                            (commitmentFilter === "Completed" && c.completed),
                        )
                        .map((c) => {
                          const r = records.find(
                            (r) => r.id === c.interactionId,
                          )!;
                          return (
                            <tr key={c.id}>
                              <td>
                                <strong>{c.action}</strong>
                                <button onClick={() => openRecord(r.id)}>
                                  {r.title}
                                  <ArrowUpRight size={10} />
                                </button>
                                <small>Illustrative record</small>
                              </td>
                              <td>{c.owner}</td>
                              <td>{c.deadline}</td>
                              <td>
                                <span
                                  className={`state-pill ${c.confirmed ? "reviewed" : ""}`}
                                >
                                  {c.completed
                                    ? "SIMULATION COMPLETE"
                                    : c.confirmed
                                      ? "CONFIRMED IN SAMPLE"
                                      : "NOT CONFIRMED"}
                                </span>
                                {!c.confirmed ? (
                                  <>
                                    <button
                                      className="confirm-inline"
                                      disabled={!r.reviewed}
                                      onClick={() => confirmCommitment(c)}
                                    >
                                      Confirm commitment <Check size={12} />
                                    </button>
                                    {!r.reviewed && (
                                      <button
                                        className="review-inline"
                                        onClick={() => openReview(r.id)}
                                      >
                                        Review source first{" "}
                                        <ArrowRight size={11} />
                                      </button>
                                    )}
                                  </>
                                ) : !c.completed ? (
                                  <button
                                    className="review-inline"
                                    onClick={() => {
                                      onView("Follow-ups");
                                      onSelect(r.id);
                                    }}
                                  >
                                    Review follow-up <ArrowRight size={11} />
                                  </button>
                                ) : null}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {visibleCommitments.filter(
                    (c) =>
                      commitmentFilter === "All states" ||
                      (commitmentFilter === "Awaiting confirmation" &&
                        !c.confirmed) ||
                      (commitmentFilter === "Confirmed" &&
                        c.confirmed &&
                        !c.completed) ||
                      (commitmentFilter === "Completed" && c.completed),
                  ).length === 0 && (
                    <div className="workspace-empty">
                      <ListChecks size={24} />
                      <strong>No sample commitments match this status.</strong>
                      <button onClick={() => setCommitmentFilter("All states")}>
                        Clear status filter
                      </button>
                    </div>
                  )}
                </div>
                <div className="workspace-caution">
                  <ShieldCheck size={15} /> Confirm the source context before
                  accepting a commitment. No external system is updated.
                </div>
              </div>
            )}
            {view === "Follow-ups" && (
              <div className="followups-view">
                {visibleCommitments.map((c) => {
                  const r = records.find((r) => r.id === c.interactionId)!;
                  return (
                    <article key={c.id} className="followup-record">
                      <div>
                        <span className="eyebrow">
                          SUGGESTED FOLLOW-UP / ILLUSTRATIVE
                        </span>
                        <span
                          className={`state-pill ${c.completed ? "reviewed" : ""}`}
                        >
                          {c.completed
                            ? "CONFIRMED IN SAMPLE"
                            : "AWAITING APPROVAL"}
                        </span>
                      </div>
                      <h4>{c.followUp}</h4>
                      <p>
                        {r.organisation} · {c.owner} · {c.deadline}
                      </p>
                      <ol className="approval-path">
                        <li className={r.reviewed ? "done" : ""}>
                          <Check size={12} /> Review context
                        </li>
                        <li className={c.confirmed ? "done" : ""}>
                          <Check size={12} /> Confirm commitment
                        </li>
                        <li className={c.completed ? "done" : ""}>
                          <Check size={12} /> Approve next step
                        </li>
                      </ol>
                      <div className="followup-actions">
                        <button
                          className="small-button primary"
                          disabled={!r.reviewed || !c.confirmed || c.completed}
                          onClick={() => openFollowup(c)}
                        >
                          {c.completed
                            ? "Simulation complete"
                            : "Review suggested action"}
                          <ArrowUpRight size={13} />
                        </button>
                        {!r.reviewed ? (
                          <button
                            className="text-button"
                            onClick={() => openReview(r.id)}
                          >
                            Review source context
                          </button>
                        ) : !c.confirmed ? (
                          <button
                            className="text-button"
                            onClick={() => {
                              onSelect(r.id);
                              onView("Commitments");
                            }}
                          >
                            Confirm the commitment first
                          </button>
                        ) : null}
                      </div>
                      <p className="inline-note">
                        This demonstration never sends email, creates external
                        tasks or makes commercial decisions.
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
            {view === "Search" && (
              <div className="intelligent-search">
                <div className="search-scope">
                  <Network size={14} />
                  <span>Current relationship: {record.organisation}</span>
                  <SampleLabel short />
                </div>
                <form
                  className="sample-search-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSearched(true);
                  }}
                >
                  <Search size={20} />
                  <input
                    aria-label="Search fictional business context"
                    placeholder="Ask about a need, decision or commitment…"
                    value={query}
                    required
                    maxLength={250}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Clear search query"
                      onClick={() => {
                        setQuery("");
                        setSearched(false);
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                  <button type="submit" aria-label="Search sample records">
                    <ArrowRight size={19} />
                  </button>
                </form>
                <span className="search-local-note">
                  Local sample search · no real recordings, live AI or
                  production backend
                </span>
                <div className="sample-query-list">
                  <span>TRY A QUESTION</span>
                  {sampleQueries.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuery(q);
                        setSearched(true);
                      }}
                    >
                      {q}
                      <ArrowUpRight size={13} />
                    </button>
                  ))}
                </div>
                {searched && (
                  <div className="search-results" aria-live="polite">
                    <div className="workspace-block-heading">
                      <h4>
                        {results.length} sample result
                        {results.length === 1 ? "" : "s"}
                      </h4>
                      <span>Context from fictional records</span>
                    </div>
                    {results.length ? (
                      results.map((result) => (
                        <button
                          key={result.id}
                          onClick={() =>
                            openRecord(result.recordId, result.tab)
                          }
                        >
                          <span className="eyebrow">
                            {result.type} / ILLUSTRATIVE
                          </span>
                          <strong>{result.title}</strong>
                          <p>{result.text}</p>
                          <span>
                            Open source context <ArrowUpRight size={12} />
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="workspace-empty">
                        <Search size={25} />
                        <strong>No matching sample context.</strong>
                        <p>
                          Try “Northstar”, “implementation” or a suggested
                          question.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          {toast && (
            <div className="workspace-toast" role="status">
              <Check size={14} />
              <span>{toast}</span>
              <button
                aria-label="Dismiss workspace message"
                onClick={() => setToast("")}
              >
                <X size={13} />
              </button>
            </div>
          )}
          <footer className="workspace-app-footer">
            <ShieldCheck size={12} />
            <span>CUSTOMER → CONTEXT → BUSINESS INTELLIGENCE</span>
            <span>Sample changes reset on reload.</span>
          </footer>
        </div>
      </div>
      {modal && (
        <Modal
          title={
            modal === "share"
              ? "Share this reviewed context?"
              : "Approve this suggested follow-up?"
          }
          onClose={() => setModal(null)}
        >
          <SampleLabel />
          <p className="dialog-copy">
            {modal === "share"
              ? "Review the details and the proposed destination before confirming. This is a sharing simulation."
              : "Review the suggested action before confirming. This is an action simulation."}
          </p>
          {modal === "share" ? (
            <div className="dialog-record">
              <span>CONTEXT</span>
              <strong>{record.title}</strong>
              <p>{record.summary}</p>
              <span>DESTINATION</span>
              <strong>Example team workspace · simulation</strong>
            </div>
          ) : (
            <label className="dialog-draft">
              Suggested action
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={4}
                minLength={10}
                maxLength={1500}
              />
            </label>
          )}
          <div className="dialog-assurance">
            <ShieldCheck size={16} />
            <span>
              No information will be transmitted. No email or external task will
              be created.
            </span>
          </div>
          <div className="dialog-actions">
            <button className="small-button" onClick={() => setModal(null)}>
              Cancel
            </button>
            <button
              className="small-button primary"
              disabled={modal === "followup" && draft.trim().length < 10}
              onClick={finishSimulation}
            >
              {modal === "share"
                ? "Confirm simulated share"
                : "Confirm simulated action"}
              <Check size={14} />
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
