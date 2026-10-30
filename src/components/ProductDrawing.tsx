import { useId } from "react";
import type { ProductMode } from "../content/site";

export function ModeIcon({
  mode,
  size = 22,
}: {
  mode: ProductMode;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {mode === "glasses" ? (
        <>
          <path d="M3 14l2-4m24 4l-2-4M2 15h11m6 0h11M13 17c2-2 4-2 6 0" />
          <path d="M3 15l1.5 7h7l1.5-7m6 0l1.5 7h7l1.5-7" />
        </>
      ) : mode === "wristband" ? (
        <>
          <path d="M12 9l1-6h6l1 6m-8 14l1 6h6l1-6" />
          <rect x="9" y="9" width="14" height="14" rx="4" />
          <path d="M14 13h4" />
        </>
      ) : (
        <>
          <path d="M6 3c0 7 6 11 10 13C20 14 26 10 26 3" />
          <rect x="12" y="16" width="8" height="13" rx="3" />
          <path d="M15 20h2" />
        </>
      )}
    </svg>
  );
}

export function ProductDrawing({
  mode = "glasses",
  className = "",
  includeCore = true,
}: {
  mode?: ProductMode;
  className?: string;
  includeCore?: boolean;
}) {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      className={`product-drawing ${className}`}
      viewBox="0 0 800 450"
      role="img"
      aria-label={`Original NEUAURA ${mode} ${includeCore ? "concept" : "empty cradle concept"} illustration`}
    >
      <defs>
        <linearGradient id={`${id}metal`} x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#8a98a2" />
          <stop offset=".25" stopColor="#3c4851" />
          <stop offset=".65" stopColor="#171f27" />
          <stop offset="1" stopColor="#77828b" />
        </linearGradient>
        <linearGradient id={`${id}lens`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5d707c" stopOpacity=".55" />
          <stop offset=".6" stopColor="#1d2b35" stopOpacity=".5" />
          <stop offset="1" stopColor="#67727a" stopOpacity=".3" />
        </linearGradient>
        <linearGradient id={`${id}core`}>
          <stop stopColor="#59656e" />
          <stop offset=".45" stopColor="#aeb8c1" />
          <stop offset=".53" stopColor="#3e4850" />
          <stop offset="1" stopColor="#1a242c" />
        </linearGradient>
        <radialGradient id={`${id}shadow`}>
          <stop stopColor="#000" stopOpacity=".5" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="408" cy="355" rx="270" ry="45" fill={`url(#${id}shadow)`} />
      {mode === "glasses" ? (
        <g transform="translate(25 5) rotate(-9 390 220)">
          <path
            d="M150 209L365 89q18-11 32 3l26 35"
            fill="none"
            stroke={`url(#${id}metal)`}
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M624 235L706 117q10-20-8-27l-34 2"
            fill="none"
            stroke={`url(#${id}metal)`}
            strokeWidth="19"
            strokeLinecap="round"
          />
          {includeCore && (
            <>
              <path
                d="M626 230l52-78"
                stroke="#aeb8c1"
                strokeWidth="23"
                strokeLinecap="round"
              />
              <path
                d="M626 230l52-78"
                stroke="#35424b"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path d="M638 210l7-11" stroke="#66e0ce" strokeWidth="2" />
              <ellipse
                cx="625"
                cy="232"
                rx="8"
                ry="10"
                fill="#0b141c"
                stroke="#aeb8c1"
                strokeWidth="3"
              />
            </>
          )}
          <path
            d="M127 196q79-30 204 1l-12 105q-75 44-152-9z"
            fill={`url(#${id}lens)`}
            stroke={`url(#${id}metal)`}
            strokeWidth="15"
            strokeLinejoin="round"
          />
          <path
            d="M393 206q108-25 228 25l-43 109q-76 26-167-22z"
            fill={`url(#${id}lens)`}
            stroke={`url(#${id}metal)`}
            strokeWidth="15"
            strokeLinejoin="round"
          />
          <path
            d="M335 217q26-23 57 4"
            fill="none"
            stroke={`url(#${id}metal)`}
            strokeWidth="14"
          />
          <path
            d="M149 199q73-19 155 4M412 210q88-12 183 26"
            fill="none"
            stroke="#b2c0c9"
            strokeOpacity=".5"
            strokeWidth="2"
          />
          <path
            d="M173 215l106 73m147-61l114 89"
            fill="none"
            stroke="#9aadb9"
            strokeOpacity=".10"
            strokeWidth="28"
          />
          <path d="M139 204h11m449 36l10 2" stroke="#b7c0c7" strokeWidth="3" />
        </g>
      ) : mode === "wristband" ? (
        <g transform="translate(400 225) rotate(-27)">
          <ellipse
            cy="28"
            rx="100"
            ry="144"
            fill="#11191e"
            stroke={`url(#${id}metal)`}
            strokeWidth="34"
          />
          <ellipse
            cy="28"
            rx="79"
            ry="124"
            fill="none"
            stroke="#252f36"
            strokeWidth="9"
          />
          <path
            d="M-89-27q-3-84 47-105h85q49 25 45 103"
            fill="#2b353d"
            stroke="#53616c"
            strokeWidth="1"
          />
          <rect
            x="-42"
            y="-151"
            width="84"
            height="153"
            rx="26"
            fill={`url(#${id}core)`}
            stroke="#96a2ab"
            strokeWidth="1"
          />
          <rect
            x="-33"
            y="-144"
            width="66"
            height="139"
            rx="21"
            fill="#29343d"
          />
          <rect
            x="-25"
            y="-135"
            width="50"
            height="120"
            rx="16"
            fill="#1a252d"
          />
          <circle
            cy="-124"
            r="10"
            fill="#0b121a"
            stroke="#8799a7"
            strokeWidth="3"
          />
          <circle cy="-124" r="4" fill="#294655" />
          <path d="M-5-35h10" stroke="#66e0ce" strokeWidth="2" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cy={90 + i * 16} r="3" fill="#111a20" />
          ))}
        </g>
      ) : (
        <g transform="translate(400 250) rotate(15)">
          <path
            d="M0-71C-30-120-145-228-119-267C-95-310 96-309 120-267C144-227 29-116 0-71"
            fill="none"
            stroke="#7f8c96"
            strokeWidth="5"
            strokeDasharray="2 4"
          />
          <ellipse
            cy="-73"
            rx="10"
            ry="14"
            fill="none"
            stroke="#a0adb6"
            strokeWidth="5"
          />
          <rect
            x="-32"
            y="-62"
            width="64"
            height="169"
            rx="26"
            fill={`url(#${id}core)`}
            stroke="#a3aeb6"
          />
          <rect
            x="-25"
            y="-56"
            width="50"
            height="156"
            rx="21"
            fill="#1f2b34"
          />
          {includeCore && (
            <>
              <rect
                x="-17"
                y="-46"
                width="34"
                height="133"
                rx="13"
                fill="#15212a"
              />
              <circle
                cy="-39"
                r="9"
                fill="#09131d"
                stroke="#9baab6"
                strokeWidth="2.5"
              />
              <circle cy="-39" r="4" fill="#274556" />
              <path d="M-5 69h10" stroke="#66e0ce" strokeWidth="2" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}
