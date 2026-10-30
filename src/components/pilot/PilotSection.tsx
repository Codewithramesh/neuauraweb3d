import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Download,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { founderMailto, site } from "../../content/site";
import {
  downloadEnquiry,
  submitEnquiry,
  type Enquiry,
  type EnquiryResult,
} from "../../lib/enquiry";
import { PilotMetrics } from "../sections/BusinessSections";
import { SectionLabel } from "../ui/Primitives";
export default function PilotSection() {
  const [busy, setBusy] = useState(false),
    [result, setResult] = useState<EnquiryResult | null>(null),
    [error, setError] = useState(""),
    [prepared, setPrepared] = useState<Enquiry | null>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setResult(null);
    const d = new FormData(e.currentTarget);
    const enquiry: Enquiry = {
      name: String(d.get("name") || "").trim(),
      email: String(d.get("email") || "").trim(),
      organisation: String(d.get("organisation") || "").trim(),
      role: String(d.get("role") || "").trim(),
      users: Number(d.get("users")),
      workflow: String(d.get("workflow") || "").trim(),
      message: String(d.get("message") || "").trim(),
    };
    if (
      enquiry.name.length < 2 ||
      enquiry.organisation.length < 2 ||
      enquiry.role.length < 2 ||
      enquiry.workflow.length < 10 ||
      enquiry.message.length < 10 ||
      !Number.isInteger(enquiry.users) ||
      enquiry.users < 1 ||
      enquiry.users > 10000 ||
      !/^\S+@\S+\.\S+$/.test(enquiry.email)
    ) {
      setError(
        "Please complete every field: name, organisation and role need at least 2 characters; workflow and message need at least 10. Enter a valid email and a whole number of users from 1 to 10,000.",
      );
      return;
    }
    setPrepared(enquiry);
    setBusy(true);
    try {
      setResult(await submitEnquiry(enquiry));
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Receipt could not be confirmed. Your enquiry has not been reported as sent.",
      );
    } finally {
      setBusy(false);
    }
  }
  const draftMailto = prepared
    ? `${founderMailto}&body=${encodeURIComponent(`Name: ${prepared.name}\nWork email: ${prepared.email}\nOrganisation: ${prepared.organisation}\nJob role: ${prepared.role}\nPotential users: ${prepared.users}\nWorkflow: ${prepared.workflow}\n\n${prepared.message}`)}`
    : founderMailto;
  return (
    <section
      className="pilot-section section-wrap"
      id="pilot"
      aria-labelledby="pilot-heading"
    >
      <span id="contact" className="anchor-alias" />
      <SectionLabel number="10" right="EARLY B2B VALIDATION">
        THE PILOT PROGRAMME
      </SectionLabel>
      <div className="pilot-layout">
        <div className="pilot-copy">
          <div className="eyebrow">
            <span className="status-dot" /> BUILD WITH US
          </div>
          <h2 id="pilot-heading">
            Let’s build a more
            <br />
            intelligent way
            <br />
            to work<span className="teal">.</span>
          </h2>
          <p>
            NEUAURA is seeking a small number of B2B organisations willing to
            validate a focused business conversation intelligence workflow.
          </p>
          <div className="pilot-structure">
            <span>PROPOSED PILOT STRUCTURE</span>
            <strong>
              02—05 <span>organisations or teams</span>
            </strong>
            <ul>
              <li>One repeatable business workflow</li>
              <li>A limited user group</li>
              <li>Agreed baseline measurements</li>
              <li>Structured, honest feedback</li>
            </ul>
          </div>
          <a className="text-link" href={founderMailto}>
            <Mail size={15} /> Email the founder <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="pilot-form-wrap">
          <div className="form-heading">
            <h3>Become a pilot partner.</h3>
            <span className="state-pill">
              {site.enquiryEndpoint ? "ENQUIRY" : "DRAFT PREVIEW"}
            </span>
          </div>
          <p className="form-notice">
            {site.enquiryEndpoint
              ? "Tell us about the business workflow you would like to validate."
              : "No delivery service is connected. This form prepares a local draft; download it or open your email app to send it yourself."}
          </p>
          <form
            onSubmit={submit}
            onChange={() => {
              setResult(null);
              setError("");
            }}
          >
            <div className="form-row">
              <label>
                Your name <span>*</span>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Full name"
                  required
                  minLength={2}
                  maxLength={120}
                />
              </label>
              <label>
                Work email <span>*</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@organisation.com"
                  required
                  maxLength={254}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Organisation <span>*</span>
                <input
                  name="organisation"
                  autoComplete="organization"
                  placeholder="Organisation name"
                  required
                  minLength={2}
                  maxLength={180}
                />
              </label>
              <label>
                Job role <span>*</span>
                <input
                  name="role"
                  autoComplete="organization-title"
                  placeholder="Your role"
                  required
                  minLength={2}
                  maxLength={120}
                />
              </label>
            </div>
            <label>
              Number of potential users <span>*</span>
              <input
                name="users"
                type="number"
                inputMode="numeric"
                min={1}
                max={10000}
                step={1}
                placeholder="e.g. 5"
                required
              />
            </label>
            <label>
              Business workflow <span>*</span>
              <textarea
                name="workflow"
                rows={2}
                placeholder="e.g. Customer visit → proposal review → follow-up"
                required
                minLength={10}
                maxLength={1500}
              />
            </label>
            <label>
              Message <span>*</span>
              <textarea
                name="message"
                rows={3}
                placeholder="What would you like to validate with your team?"
                required
                minLength={10}
                maxLength={3000}
              />
            </label>
            <label className="check-label">
              <input type="checkbox" required />I understand NEUAURA is in
              development and pilot capabilities require validation.
            </label>
            <button
              className="button button-primary pilot-submit"
              type="submit"
              disabled={busy}
            >
              {busy ? (
                <>
                  <LoaderCircle className="spin" size={17} /> Preparing…
                </>
              ) : (
                <>
                  Become a pilot partner <ArrowUpRight size={17} />
                </>
              )}
            </button>
            {error && (
              <div role="alert" className="form-result error">
                {error}
              </div>
            )}
            {result && prepared && (
              <div role="status" className="form-result">
                <div>
                  <Check size={16} />
                  <p>{result.message}</p>
                </div>
                {result.status === "demo" && (
                  <div className="draft-actions">
                    <button
                      type="button"
                      onClick={() => downloadEnquiry(prepared)}
                    >
                      <Download size={14} /> Download enquiry
                    </button>
                    <a href={draftMailto}>
                      <Mail size={14} /> Open draft in email app
                    </a>
                  </div>
                )}
              </div>
            )}
            <p className="form-privacy">
              {site.enquiryEndpoint
                ? "Your details go only to the configured enquiry service."
                : "Form details stay in this browser until you download or choose to open an email draft."}{" "}
              <a href="#trust">
                Trust principles <ArrowUpRight size={10} />
              </a>
            </p>
          </form>
        </div>
      </div>
      <PilotMetrics />
    </section>
  );
}
