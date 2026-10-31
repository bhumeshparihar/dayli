// Simple, consistent portraits for the community form. Labels carry the meaning.
export default function PersonIllustration({ role }) {
  const female = [
    "Woman",
    "Daughter",
    "My mother",
    "My wife",
    "My girlfriend",
    "My sister",
    "My daughter",
  ].includes(role);
  const young = ["Son", "Daughter", "My daughter"].includes(role);
  const glasses = ["Brother", "My mother"].includes(role);
  const pair = ["Friend", "A friend", "Other"].includes(role);
  const portrait = (x = 0, y = 0, scale = 1) => (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {female && (
        <path
          d="M19 35V24a13 13 0 0 1 26 0v18H19Z"
          fill="var(--rose)"
          fillOpacity=".16"
        />
      )}
      <path
        d="M11 59c1-12 9-18 21-18s20 6 21 18"
        fill="var(--sage)"
        fillOpacity=".16"
      />
      <path d="M11 59c1-12 9-18 21-18s20 6 21 18M26 40v5l6 5 6-5v-5" />
      <ellipse
        cx="32"
        cy={young ? 29 : 28}
        rx={young ? 10 : 11}
        ry="13"
        fill="var(--ivory)"
      />
      <path
        d={
          female
            ? "M21 26c1-9 6-13 12-13 7 0 11 5 11 13-6 0-11-4-13-8-1 5-5 7-10 8Z"
            : "M21 24c-1-8 5-12 12-12 8 0 12 5 11 13l-5-6-12 2-6 3Z"
        }
        fill="var(--mulberry)"
        fillOpacity=".18"
      />
      <path d="M27 29h.1M37 29h.1" strokeWidth="2.6" />
      <path d="M29 35q3 3 6 0" />
      {female && <path d="M20 25v18M44 25v18" />}
      {glasses && (
        <>
          <rect x="23" y="26" width="7" height="6" rx="2" />
          <rect x="34" y="26" width="7" height="6" rx="2" />
          <path d="M30 28h4" />
        </>
      )}
      {role === "Husband" && <path d="M23 34q9 13 18 0" strokeOpacity=".55" />}
      {young && <path d="M27 16l-2-3M32 14v-3" />}
    </g>
  );
  return (
    <svg
      className="person-illustration"
      viewBox="0 0 64 64"
      width="52"
      height="52"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {pair ? (
        <>
          {portrait(-9, 10, 0.8)}
          {portrait(23, 0, 0.8)}
        </>
      ) : (
        portrait()
      )}
    </svg>
  );
}
