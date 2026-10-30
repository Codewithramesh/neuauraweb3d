import { ArrowUpRight } from "lucide-react";
import { founderMailto, founderStatement, site } from "../../content/site";
import { SectionLabel } from "../ui/Primitives";
export default function FounderSection() {
  return (
    <section
      className="founder-section light-section"
      id="founder"
      aria-labelledby="founder-heading"
    >
      <div className="section-wrap">
        <SectionLabel number="11" right="A NOTE FROM THE FOUNDER">
          BUILT WITH INTENTION
        </SectionLabel>
        <h2 id="founder-heading">
          Built with a vision to make
          <br />
          business conversations
          <br />
          <span>more actionable.</span>
        </h2>
        <div className="founder-layout">
          <div className="founder-identity">
            <div className="founder-monogram" aria-hidden="true">
              <span>R</span>
              <span>B</span>
              <i />
            </div>
            <h3>{site.founder.name}</h3>
            <span>{site.founder.role}</span>
            <div className="founder-contact">
              <span>LET’S START A CONVERSATION</span>
              <a href={`mailto:${site.founder.email}`}>
                {site.founder.email}
                <ArrowUpRight size={14} />
              </a>
              <a className="button button-dark" href={founderMailto}>
                Contact the founder <ArrowUpRight size={17} />
              </a>
              <small>Opens your configured email app.</small>
            </div>
          </div>
          <blockquote className="founder-note">
            {founderStatement.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0 ? "founder-opening" : i === 2 ? "founder-belief" : ""
                }
              >
                {p}
              </p>
            ))}
            <footer>
              <span className="founder-signature">Ramesh Babu</span>
              <span>FOUNDER — NEUAURA</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
