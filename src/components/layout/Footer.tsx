import { useContext } from "react";
import { ArrowUpRight, Pause } from "lucide-react";
import { MotionContext } from "../../context/MotionContext";
import { founderMailto, navigation, site } from "../../content/site";
import { Brand } from "./Navbar";
export default function Footer() {
  const { reduced, systemReduced, setManual } = useContext(MotionContext);
  return (
    <footer className="site-footer section-wrap">
      <div className="footer-main">
        <div className="footer-brand">
          <Brand />
          <p>
            Human Intelligence
            <br />
            Relationship Layer.
          </p>
          <span>Business Conversation Intelligence.</span>
        </div>
        <nav aria-label="Footer navigation">
          {[...navigation, { label: "Pilot programme", href: "#pilot" }].map(
            (n) => (
              <a key={n.href} href={n.href}>
                {n.label}
                <ArrowUpRight size={12} />
              </a>
            ),
          )}
        </nav>
        <div className="footer-contact">
          <span>FOUNDER</span>
          <strong>{site.founder.name}</strong>
          <a href={founderMailto}>
            {site.founder.email}
            <ArrowUpRight size={13} />
          </a>
          <button
            className="motion-toggle"
            disabled={systemReduced}
            aria-pressed={reduced}
            onClick={() => setManual(!reduced)}
          >
            <Pause size={12} />
            {systemReduced
              ? "Reduced motion (system)"
              : reduced
                ? "Reduced motion enabled"
                : "Reduce motion"}
          </button>
        </div>
      </div>
      <p className="footer-legal">
        NEUAURA — Product concepts and capabilities are subject to development
        and validation.
      </p>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NEUAURA</span>
        <span>PERMISSION. CONTEXT. REVIEW. FOLLOW-THROUGH.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
