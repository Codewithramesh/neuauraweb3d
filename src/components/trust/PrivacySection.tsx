import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Eye,
  LockKeyhole,
  Pause,
  Play,
  ShieldCheck,
  Square,
  Trash2,
} from "lucide-react";
import { Modal, SampleLabel, SectionLabel } from "../ui/Primitives";
const principles = [
  {
    icon: Eye,
    title: "Informed consent",
    copy: "Clear notice and appropriate permission before capture. No secret recording or unapproved profiling.",
  },
  {
    icon: Pause,
    title: "User control",
    copy: "Visible status, deliberate start and stop, pause capability and appropriate deletion controls.",
  },
  {
    icon: ShieldCheck,
    title: "Review before sharing",
    copy: "People verify and correct extracted context. Consequential external actions need confirmation.",
  },
  {
    icon: LockKeyhole,
    title: "Responsible data handling",
    copy: "Pilot policies must define access, retention, deletion, export, ownership and security before real business data is processed.",
  },
];
export default function PrivacySection() {
  const [capture, setCapture] = useState<"idle" | "active" | "paused">("idle"),
    [consent, setConsent] = useState(false),
    [hasSample, setHasSample] = useState(false),
    [reviewed, setReviewed] = useState(false),
    [text, setText] = useState(
      "The customer requested an updated proposal. Share revised scope after internal approval.",
    ),
    [confirm, setConfirm] = useState(false),
    [message, setMessage] = useState("");
  function start() {
    if (!consent) return;
    setCapture("active");
    setHasSample(true);
    setReviewed(false);
    setMessage(
      "Interface simulation started. No microphone is accessed and no audio is captured.",
    );
  }
  function stop() {
    setCapture("idle");
    setMessage(
      "Capture simulation stopped. Review the fictional context below.",
    );
  }
  return (
    <section
      className="trust-section section-wrap"
      id="trust"
      aria-labelledby="trust-heading"
    >
      <SectionLabel number="08" right="PRIVACY & ENTERPRISE TRUST">
        HUMAN CONTROL, BY DESIGN
      </SectionLabel>
      <div className="split-heading">
        <h2 id="trust-heading">
          Business intelligence
          <br />
          requires trust<span className="teal">.</span>
        </h2>
        <p>
          The useful part of intelligence begins with permission, clear controls
          and accountable decisions.
        </p>
      </div>
      <div className="trust-principles">
        {principles.map((p, i) => (
          <article key={p.title}>
            <div>
              <p.icon size={25} strokeWidth={1.2} />
              <span>0{i + 1}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.copy}</p>
          </article>
        ))}
      </div>
      <div className="trust-demo">
        <div className="trust-demo-copy">
          <span className="eyebrow">CONTROL INTERFACE / CONCEPT</span>
          <h3>
            Know when it starts.
            <br />
            Decide where it goes.
          </h3>
          <p>
            A visible, deliberate capture and review experience. Try the
            controls with fictional context.
          </p>
          <span className="section-note">
            No microphone access. No recording. No external sharing. Technical
            security architecture and retention policies require validation; no
            certifications or offline guarantees are claimed.
          </span>
        </div>
        <div className="consent-interface">
          <div className="capture-status">
            <span className={`capture-dot ${capture}`} />
            <div>
              <span>CAPTURE STATUS</span>
              <strong>
                {capture === "idle"
                  ? "NOT RECORDING"
                  : capture === "active"
                    ? "ACTIVE — SIMULATION"
                    : "PAUSED — SIMULATION"}
              </strong>
            </div>
            <SampleLabel short />
          </div>
          <label className="check-label">
            <input
              type="checkbox"
              checked={consent}
              disabled={capture !== "idle"}
              onChange={(e) => setConsent(e.target.checked)}
            />
            I have received appropriate consent for this fictional capture
            simulation.
          </label>
          <div className="capture-controls">
            <button disabled={capture !== "idle" || !consent} onClick={start}>
              <Play size={14} /> Start simulation
            </button>
            <button
              disabled={capture === "idle"}
              onClick={() => {
                setCapture(capture === "active" ? "paused" : "active");
                setMessage(
                  capture === "active"
                    ? "Simulation paused."
                    : "Simulation resumed. No audio is captured.",
                );
              }}
            >
              <Pause size={14} />
              {capture === "paused" ? "Resume" : "Pause"}
            </button>
            <button disabled={capture === "idle"} onClick={stop}>
              <Square size={13} /> Stop
            </button>
          </div>
          {hasSample && (
            <div className="capture-sample">
              <label>
                Review & correct the fictional context
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setReviewed(false);
                  }}
                  maxLength={1000}
                  rows={3}
                />
              </label>
              <div className="capture-sample-actions">
                <button
                  disabled={capture !== "idle" || text.trim().length < 10}
                  onClick={() => {
                    setReviewed(true);
                    setMessage(
                      "Fictional context marked reviewed. Sharing still requires confirmation.",
                    );
                  }}
                >
                  <Check size={13} />
                  {reviewed ? "Reviewed" : "Mark reviewed"}
                </button>
                <button
                  disabled={!reviewed || capture !== "idle"}
                  onClick={() => setConfirm(true)}
                >
                  Share sample <ArrowUpRight size={13} />
                </button>
                <button
                  aria-label="Discard fictional capture sample"
                  disabled={capture !== "idle"}
                  onClick={() => {
                    setHasSample(false);
                    setReviewed(false);
                    setMessage("Fictional sample discarded locally.");
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )}
          {message && (
            <p className="capture-message" role="status">
              {message}
            </p>
          )}
          <span className="capture-disclaimer">
            INTERFACE SIMULATION · NO ACTUAL CAPTURE OR TRANSMISSION
          </span>
        </div>
      </div>
      {confirm && (
        <Modal
          title="Confirm sharing of this sample?"
          onClose={() => setConfirm(false)}
        >
          <SampleLabel />
          <p className="dialog-copy">
            Review the corrected fictional context and destination.
          </p>
          <div className="dialog-record">
            <p>{text}</p>
            <span>DESTINATION</span>
            <strong>Example team workspace · simulation</strong>
          </div>
          <div className="dialog-assurance">
            <ShieldCheck size={16} />
            <span>
              No data will be transmitted. This demonstrates the confirmation
              step.
            </span>
          </div>
          <div className="dialog-actions">
            <button className="small-button" onClick={() => setConfirm(false)}>
              Cancel
            </button>
            <button
              className="small-button primary"
              onClick={() => {
                setConfirm(false);
                setMessage(
                  "Sharing simulation confirmed. Nothing was transmitted.",
                );
              }}
            >
              Confirm simulated share <Check size={14} />
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
