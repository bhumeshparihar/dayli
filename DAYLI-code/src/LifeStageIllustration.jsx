// Recognisable life-stage scenes rather than decorative wellness symbols.
export default function LifeStageIllustration({ stage }) {
  const portrait = stage === "menstruating" || stage === "post";
  const calendar =
    stage === "menstruating" ||
    stage === "perimenopause" ||
    stage === "menopause";
  return (
    <svg
      className="life-stage-illustration"
      viewBox="0 0 80 80"
      width="64"
      height="64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle
        cx="40"
        cy="40"
        r="36"
        fill="var(--sage)"
        fillOpacity=".08"
        stroke="none"
      />
      {portrait && (
        <g transform={stage === "post" ? "translate(8 0)" : "translate(-10 0)"}>
          <path
            d="M24 43V29a14 14 0 0 1 28 0v19H24Z"
            fill="var(--rose)"
            fillOpacity=".16"
          />
          <ellipse cx="38" cy="33" rx="11" ry="14" fill="var(--ivory)" />
          <path d="M27 29q1-12 12-12 11 0 11 13-9-1-13-9-1 6-10 8M19 66q1-19 19-19t19 19M33 47l5 7 5-7" />
          <path d="M33 34h.1M43 34h.1" strokeWidth="2.8" />
          <path d="M35 40q3 3 6 0" />
          {stage === "post" && (
            <>
              <path d="M27 30h8v7h-8zM40 30h8v7h-8zM35 32h5" />
              <path d="M29 21q-7-8 0-11 7-3 8 6M34 55l4 4 4-4" />
            </>
          )}
        </g>
      )}
      {calendar && (
        <g
          transform={
            stage === "menstruating"
              ? "translate(43 36) scale(.65)"
              : "translate(14 17)"
          }
        >
          <rect x="0" y="3" width="51" height="47" rx="6" fill="var(--ivory)" />
          <path d="M0 16h51M12 0v9M39 0v9" />
          {stage === "menstruating" ? (
            <path
              d="M25 23s-8 10-8 15a8 8 0 0 0 16 0c0-5-8-15-8-15Z"
              fill="var(--rose)"
              fillOpacity=".22"
            />
          ) : stage === "perimenopause" ? (
            <>
              <path d="M10 27h4M23 27h4M36 27h4M10 38h4M23 38h4" />
              <circle cx="38" cy="38" r="8" fill="var(--ivory)" />
              <path d="M38 33v5l3 2" />
            </>
          ) : (
            <>
              <text
                x="25.5"
                y="37"
                textAnchor="middle"
                fontFamily="var(--sans)"
                fontSize="17"
                fill="currentColor"
                stroke="none"
              >
                12
              </text>
              <path d="M16 43h19" />
            </>
          )}
        </g>
      )}
      {stage === "planning" && (
        <>
          <path
            d="M16 28q0-10 9-10t9 10v11H16ZM46 27q0-9 9-9t9 9"
            fill="var(--rose)"
            fillOpacity=".12"
          />
          <ellipse cx="25" cy="30" rx="8" ry="10" />
          <ellipse cx="55" cy="30" rx="8" ry="10" />
          <path d="M8 61q0-17 17-17 9 0 15 6 6-6 15-6 17 0 17 17M50 22l10 3M21 31h.1M29 31h.1M51 31h.1M59 31h.1" />
          <rect
            x="28"
            y="51"
            width="24"
            height="20"
            rx="4"
            fill="var(--ivory)"
          />
          <path d="M40 56v10M35 61h10" stroke="var(--rose)" />
        </>
      )}
      {stage === "pregnant" && (
        <>
          <path
            d="M29 28V20q2-9 10-8 10 0 11 12v13"
            fill="var(--rose)"
            fillOpacity=".16"
          />
          <ellipse cx="39" cy="24" rx="9" ry="11" />
          <path
            d="M34 35q-11 6-13 18l-3 16h40l-3-10q11-4 8-14-3-10-17-11M32 42l8 12q10 5 17 0M29 68l-2 6M50 68l2 6"
            fill="var(--sage)"
            fillOpacity=".12"
          />
          <path d="M35 24h.1M43 24h.1M37 29q3 2 5-1" />
          <path d="M45 41q13 0 14 10" stroke="var(--rose)" />
        </>
      )}
      {stage === "new-mom" && (
        <>
          <path
            d="M18 35V22q0-12 13-12t13 12v15"
            fill="var(--rose)"
            fillOpacity=".16"
          />
          <ellipse cx="31" cy="25" rx="10" ry="12" />
          <path d="M10 68q0-26 21-27 19 0 25 27M27 24h.1M35 24h.1M28 31q3 2 6 0" />
          <g transform="rotate(-28 48 50)">
            <rect
              x="37"
              y="35"
              width="23"
              height="33"
              rx="11"
              fill="var(--ivory)"
            />
            <circle cx="48.5" cy="43" r="7" />
            <path d="M42 55l13 6M39 62l8 4M46 43h.1M51 43h.1" />
          </g>
          <path d="M20 48q3 16 20 17M59 50q6 17-15 17" />
        </>
      )}
    </svg>
  );
}
