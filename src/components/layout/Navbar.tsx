import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "../../content/site";
export function Brand() {
  return (
    <a href="#home" className="brand" aria-label="NEUAURA home">
      <svg
        width="22"
        height="26"
        viewBox="0 0 24 26"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 22V4h4l14 18V4M3 4l18 18"
          stroke="currentColor"
          strokeWidth="1.9"
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
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#pilot">
          Request a pilot <ArrowUpRight size={15} />
        </a>
        <button
          className="mobile-menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        {open && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {[...navigation, { label: "Pilot programme", href: "#pilot" }].map(
              (n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                  <ArrowUpRight size={16} />
                </a>
              ),
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
