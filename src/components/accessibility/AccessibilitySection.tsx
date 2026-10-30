import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Hand,
  Languages,
  MessageCircle,
  ScanLine,
  Type,
} from "lucide-react";

function ConnectionArt() {
  return (
    <div className="connection-art" aria-hidden="true">
      <div className="connection-circle circle-one" />
      <div className="connection-circle circle-two" />
      <div className="hand-illustration">
        <svg viewBox="0 0 280 300" fill="none">
          <defs>
            <linearGradient
              id="hand-stroke"
              x1="50"
              y1="40"
              x2="240"
              y2="280"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c9ded6" />
              <stop offset="1" stopColor="#778f86" />
            </linearGradient>
          </defs>
          <path
            d="M92 275l-17-61-36-53c-13-20 5-33 19-19l28 29-14-102c-3-22 18-24 22-4l17 82-5-113c-1-22 21-23 23-1l8 112 9-108c2-21 24-18 22 4l-5 109 21-81c6-21 27-14 22 6l-18 94 28-25c17-16 34 1 19 17l-31 36-29 76-5 27"
            stroke="url(#hand-stroke)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M90 171c12-20 38-28 67-19m-62 47c18-21 42-27 59-21m-23 66c6-19 19-42 44-48"
            stroke="#a7bfb4"
            strokeOpacity=".5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {[
            [72, 69],
            [109, 36],
            [155, 39],
            [198, 83],
            [238, 151],
            [88, 171],
            [134, 149],
            [181, 151],
            [116, 200],
            [154, 225],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#d7e7df" />
          ))}
        </svg>
      </div>
      <div className="art-message art-message-top">
        <MessageCircle size={14} />
        <span>Understanding starts here.</span>
      </div>
      <div className="art-message art-message-bottom">
        <AudioLines size={15} />
        <span>In your own language.</span>
      </div>
      <span className="art-caption">A CONCEPT FOR MORE HUMAN CONNECTION</span>
    </div>
  );
}
export default function AccessibilitySection() {
  const [direction, setDirection] = useState<"sign" | "speech">("sign");
  const flow =
    direction === "sign"
      ? [
          { icon: Hand, title: "Sign language" },
          { icon: ScanLine, title: "Vision / landmarks" },
          { icon: Languages, title: "Local AI interpretation" },
          { icon: Type, title: "Text / speech output" },
        ]
      : [
          { icon: AudioLines, title: "Speech" },
          { icon: Languages, title: "Speech recognition" },
          { icon: Type, title: "Text output" },
          { icon: MessageCircle, title: "User display" },
        ];
  return (
    <section
      className="accessibility-section section-wrap"
      id="accessibility"
      aria-labelledby="accessibility-heading"
    >
      <div className="section-kicker">
        <span>04 — A MORE CONNECTED WORLD</span>
        <span>ACCESSIBILITY VISION</span>
      </div>
      <div className="accessibility-layout">
        <ConnectionArt />
        <div className="accessibility-copy">
          <span className="outline-badge">
            RESEARCH & DEVELOPMENT DIRECTION
          </span>
          <h2 id="accessibility-heading">
            Technology that
            <br />
            brings people
            <br />
            closer<span className="teal">.</span>
          </h2>
          <p>
            Connection should be for everyone. We are exploring communication
            assistance for Deaf and Hard-of-Hearing people, with Indian Sign
            Language and language accessibility as important development
            directions.
          </p>
          <p className="accessibility-caveat">
            These capabilities require development and pilot validation. They
            are not production-ready, and do not promise universal translation
            or guaranteed recognition accuracy.
          </p>
          <a
            href="https://sign-language.ai4bharat.org/"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Explore Indian Sign Language research <ArrowUpRight size={15} />
          </a>
          <span className="research-note">
            External research context · no partnership or implemented capability
            implied
          </span>
        </div>
      </div>
      <div className="communication-path">
        <div className="communication-heading">
          <span>UNDERSTANDING, IN BOTH DIRECTIONS.</span>
          <div aria-label="Communication direction">
            <button
              aria-pressed={direction === "sign"}
              className={direction === "sign" ? "active" : ""}
              onClick={() => setDirection("sign")}
            >
              Sign → text / speech
            </button>
            <button
              aria-pressed={direction === "speech"}
              className={direction === "speech" ? "active" : ""}
              onClick={() => setDirection("speech")}
            >
              Speech → text
            </button>
          </div>
        </div>
        <div className="communication-flow" aria-live="polite">
          {flow.map((item, i) => (
            <div key={item.title}>
              <span>
                <item.icon size={22} />
                {item.title}
              </span>
              {i < 3 && <ArrowRight size={17} />}
            </div>
          ))}
        </div>
        <span className="communication-disclaimer">
          CONCEPTUAL PROCESS · LOCAL INTERPRETATION IS A RESEARCH GOAL, NOT AN
          OFFLINE GUARANTEE
        </span>
      </div>
    </section>
  );
}
