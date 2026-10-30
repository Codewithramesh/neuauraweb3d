import { useContext } from "react";
import { MotionContext } from "../../context/MotionContext";
import { ArrowUpRight, Pause } from "lucide-react";
import { Brand } from "./Navbar";
import { navigation, site } from "../../content/site";

export default function Footer() {
  const { reduced, systemReduced, setManual } = useContext(MotionContext);
  return (
    <footer className="site-footer section-wrap">
      <div className="footer-main">
        <div>
          <Brand />
          <p>
            Human Intelligence
            <br />
            Relationship Layer.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {[
            ...navigation,
            { label: "Accessibility", href: "#accessibility" },
            { label: "Privacy", href: "#privacy" },
            { label: "Contact", href: "#contact" },
          ]
            .filter((x) => x.label !== "Our vision")
            .map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
                <ArrowUpRight size={12} />
              </a>
            ))}
        </nav>
        {site.socialLinks.length > 0 && (
          <div className="social-links">
            {site.socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        )}
        <div className="footer-status">
          <span className="status-dot" /> Concept. In development.
          <span>Thoughtfully building what comes next.</span>
          <button
            className="motion-toggle"
            aria-pressed={reduced}
            disabled={systemReduced}
            onClick={() => setManual(!reduced)}
          >
            <Pause size={11} />
            {systemReduced
              ? "Reduced motion (system)"
              : reduced
                ? "Reduced motion enabled"
                : "Reduce motion"}
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NEUAURA</span>
        <span>ONE CORE. THREE WAYS TO WEAR.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
