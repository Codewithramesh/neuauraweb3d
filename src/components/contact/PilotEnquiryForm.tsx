import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Download,
  LoaderCircle,
  Send,
} from "lucide-react";
import { site } from "../../content/site";
import {
  downloadEnquiry,
  submitEnquiry,
  type Enquiry,
  type EnquiryResult,
} from "../../lib/enquiry";

export default function PilotEnquiryForm() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [error, setError] = useState("");
  const [prepared, setPrepared] = useState<Enquiry | null>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(null);
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const enquiry = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      organisation: String(data.get("organisation") || "").trim(),
      interest: String(data.get("interest") || ""),
      message: String(data.get("message") || "").trim(),
    };
    if (
      enquiry.name.length < 2 ||
      enquiry.organisation.length < 2 ||
      enquiry.message.length < 10
    ) {
      setError(
        "Please enter your name, organisation and a message of at least 10 characters.",
      );
      return;
    }
    setBusy(true);
    setPrepared(enquiry);
    try {
      setResult(await submitEnquiry(enquiry));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Your enquiry could not be confirmed. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      className="contact-section section-wrap"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="contact-copy">
        <div className="eyebrow">
          <span className="status-dot" /> START A CONVERSATION
        </div>
        <h2 id="contact-heading">
          The future is
          <br />
          better, together<span className="teal">.</span>
        </h2>
        <p>
          Exploring a pilot, a research collaboration,
          <br className="desktop-break" /> or what modular intelligence could
          mean
          <br className="desktop-break" /> for your organisation? Let’s begin
          there.
        </p>
        <div className="contact-development">
          <span className="small-square" />
          <span>
            NEUAURA is in development.
            <br />
            Early conversations help shape what comes next.
          </span>
        </div>
      </div>
      <div className="contact-form-wrap">
        <div className="form-heading">
          <h3>Discuss an early pilot</h3>
          <span className="outline-badge">
            {site.enquiryEndpoint ? "ENQUIRY" : "PREVIEW MODE"}
          </span>
        </div>
        {!site.enquiryEndpoint && (
          <p className="form-demo-notice">
            Enquiries are not sent in this preview. Prepare and download your
            interest below.
          </p>
        )}
        <form
          onSubmit={submit}
          onChange={() => {
            if (result) setResult(null);
            if (error) setError("");
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
              Interest area <span>*</span>
              <select name="interest" required defaultValue="">
                <option value="" disabled>
                  Select an area
                </option>
                <option>Business pilot</option>
                <option>Hardware & product</option>
                <option>Accessibility research</option>
                <option>Software & integrations</option>
                <option>General interest</option>
              </select>
            </label>
          </div>
          <label>
            What would you like to explore? <span>*</span>
            <textarea
              name="message"
              placeholder="Tell us a little about your ideas or use case…"
              required
              minLength={10}
              maxLength={3000}
              rows={3}
            />
          </label>
          <label className="form-checkbox">
            <input type="checkbox" required />
            <span>
              I understand this product is in development and pilot capabilities
              require validation.
            </span>
          </label>
          <button
            type="submit"
            className="button button-primary form-submit"
            disabled={busy}
          >
            {busy ? (
              <>
                <LoaderCircle className="spin" size={16} /> Preparing…
              </>
            ) : (
              <>
                {site.enquiryEndpoint ? "Send enquiry" : "Prepare enquiry"}{" "}
                {site.enquiryEndpoint ? (
                  <Send size={16} />
                ) : (
                  <ArrowUpRight size={17} />
                )}
              </>
            )}
          </button>
          {error && (
            <div className="form-result error" role="alert">
              {error}
              {prepared && (
                <button type="button" onClick={() => downloadEnquiry(prepared)}>
                  <Download size={14} /> Download a copy
                </button>
              )}
            </div>
          )}
          {result && (
            <div className="form-result" role="status">
              <div>
                <Check size={16} />
                <p>{result.message}</p>
              </div>
              {result.status === "demo" && prepared && (
                <button type="button" onClick={() => downloadEnquiry(prepared)}>
                  <Download size={14} /> Download your enquiry
                </button>
              )}
            </div>
          )}
          <p className="form-privacy">
            {site.enquiryEndpoint
              ? "Details are sent only to the configured enquiry service."
              : "Your details stay in your browser. Nothing is stored or sent."}{" "}
            <a href="#privacy">
              Our privacy principles <ArrowUpRight size={11} />
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
