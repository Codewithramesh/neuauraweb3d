import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "../../content/site";

export function Brand() {
  return (
    <a href="#home" className="brand" aria-label="NEUAURA home">
      <svg
        width="24"
        height="26"
        viewBox="0 0 24 26"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 22V4h4l14 18V4M3 4l18 18"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>NEUAURA</span>
    </a>
  );
}
export default function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">
          Discuss a pilot <ArrowUpRight size={15} />
        </a>
        <button
          className="mobile-menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ...navigation,
              { label: "Privacy", href: "#privacy" },
              { label: "Discuss a pilot", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
