import { useId } from "react";
import type { ProductMode } from "../content/site";
export function ModeIcon({
  mode,
  size = 23,
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
      strokeWidth="1.3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {mode === "pendant" ? (
        <>
          <path d="M6 3c0 7 6 11 10 13C20 14 26 10 26 3" />
          <rect x="12" y="16" width="8" height="13" rx="3" />
          <path d="M15 20h2" />
        </>
      ) : (
        <>
          <path d="M12 9l1-6h6l1 6m-8 14l1 6h6l1-6" />
          <rect x="9" y="9" width="14" height="14" rx="4" />
          <path d="M14 13h4" />
        </>
      )}
    </svg>
  );
}
export function ProductDrawing({
  mode = "pendant",
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
      viewBox="0 0 600 460"
      role="img"
      aria-label={`NEUAURA ${mode} industrial design concept${includeCore ? "" : " with empty cradle"}`}
    >
      <defs>
        <linearGradient id={`${id}metal`}>
          <stop stopColor="#aeb8c1" />
          <stop offset=".2" stopColor="#5f6d78" />
          <stop offset=".55" stopColor="#293740" />
          <stop offset="1" stopColor="#929fa8" />
        </linearGradient>
        <linearGradient id={`${id}body`} x2=".8" y2="1">
          <stop stopColor="#39454e" />
          <stop offset="1" stopColor="#101b23" />
        </linearGradient>
      </defs>
      {mode === "pendant" ? (
        <g transform="translate(300 260) rotate(12)">
          <path
            d="M0-75C-30-120-120-218-95-250C-70-280 70-280 95-250C120-218 30-120 0-75"
            fill="none"
            stroke="#7b8994"
            strokeWidth="4"
            strokeDasharray="3 3"
          />
          <ellipse
            cy="-74"
            rx="9"
            ry="13"
            fill="none"
            stroke="#a3b1bc"
            strokeWidth="4"
          />
          <rect
            x="-34"
            y="-63"
            width="68"
            height="170"
            rx="27"
            fill={`url(#${id}metal)`}
          />
          <rect
            x="-27"
            y="-57"
            width="54"
            height="158"
            rx="23"
            fill="#101a21"
          />
          {includeCore && (
            <>
              <rect
                x="-22"
                y="-51"
                width="44"
                height="146"
                rx="20"
                fill={`url(#${id}body)`}
              />
              <circle
                cy="-27"
                r="7"
                fill="#0b1520"
                stroke="#738797"
                strokeWidth="2"
              />
              <path d="M-5 72h10" stroke="#66e0ce" strokeWidth="2" />
              <path d="M27-8v20" stroke="#aeb8c1" strokeWidth="3" />
            </>
          )}
        </g>
      ) : (
        <g transform="translate(300 235) rotate(-27)">
          <ellipse
            cy="25"
            rx="88"
            ry="130"
            fill="#0c151c"
            stroke="#3e4b55"
            strokeWidth="30"
          />
          <ellipse
            cy="25"
            rx="69"
            ry="111"
            fill="none"
            stroke="#202c35"
            strokeWidth="6"
          />
          <path
            d="M-80-25Q-80-102-38-126h76q42 24 42 101"
            fill={`url(#${id}body)`}
          />
          <rect
            x="-35"
            y="-139"
            width="70"
            height="146"
            rx="25"
            fill={`url(#${id}metal)`}
          />
          <rect
            x="-27"
            y="-132"
            width="54"
            height="132"
            rx="19"
            fill="#0a151d"
          />
          {includeCore && (
            <>
              <rect
                x="-22"
                y="-126"
                width="44"
                height="120"
                rx="17"
                fill={`url(#${id}body)`}
              />
              <circle
                cy="-105"
                r="7"
                fill="#0a1621"
                stroke="#6b8293"
                strokeWidth="2"
              />
              <path d="M-5-30h10" stroke="#66e0ce" strokeWidth="2" />
            </>
          )}
          <path d="M-37 126h74" stroke="#98a5af" strokeWidth="6" />
        </g>
      )}
    </svg>
  );
}
