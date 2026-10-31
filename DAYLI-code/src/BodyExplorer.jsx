import { useState } from "react";
import {
  Brain,
  Droplet,
  Bone,
  Dumbbell,
  Eye,
  EyeOff,
  Plus,
} from "lucide-react";
import { Source } from "./components";
import { nutrients, sources } from "./data";
const areas = {
  brain: {
    label: "Brain & nerves",
    short: "Nerves",
    icon: Brain,
    x: 50,
    y: 12,
    description:
      "B12 supports nerves. Magnesium contributes to normal nerve function. Mood and sleep changes have many causes; nutrients do not treat hormonal changes.",
    nutrients: ["Folate & B12", "Magnesium"],
  },
  blood: {
    label: "Blood & oxygen",
    short: "Blood",
    icon: Droplet,
    x: 50,
    y: 33,
    description:
      "Iron carries oxygen in blood. Folate and B12 help make red blood cells. Symptoms alone cannot tell you whether you have a deficiency.",
    nutrients: ["Iron", "Folate & B12"],
  },
  bone: {
    label: "Bones & strength",
    short: "Bones",
    icon: Bone,
    x: 50,
    y: 59,
    description:
      "Calcium supports bones. Vitamin D helps absorb calcium. Protein contributes to muscle and bone maintenance.",
    nutrients: ["Calcium", "Vitamin D", "Protein"],
  },
  muscle: {
    label: "Muscles & movement",
    short: "Muscles",
    icon: Dumbbell,
    x: 36,
    y: 79,
    description:
      "Protein maintains muscle. Calcium and magnesium contribute to normal muscle function.",
    nutrients: ["Protein", "Calcium", "Magnesium"],
  },
};
export default function BodyExplorer({ stage, onNutrient }) {
  const [selected, setSelected] = useState(stage.points[0] || "blood");
  const [hovered, setHovered] = useState(null),
    [anatomy, setAnatomy] = useState(true);
  const active = hovered || selected,
    area = areas[selected];
  const relevant = area.nutrients.filter((name) =>
    stage.nutrients.includes(name),
  );
  return (
    <aside className="body-explorer" aria-label="Interactive body map">
      <div className="body-explorer-heading">
        <span>YOUR BODY, A LITTLE CLOSER</span>
        <button
          type="button"
          className="anatomy-toggle"
          onClick={() => setAnatomy(!anatomy)}
          aria-pressed={anatomy}
        >
          {anatomy ? <Eye size={14} /> : <EyeOff size={14} />} Anatomy
        </button>
      </div>
      <p className="body-explorer-hint">
        Tap a point to explore. Brighter points are in focus at this stage.
      </p>
      <div className="body-canvas">
        <svg
          className="interactive-anatomy"
          viewBox="0 0 240 380"
          aria-hidden="true"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse
            cx="120"
            cy="365"
            rx="57"
            ry="7"
            fill="var(--sage)"
            fillOpacity=".1"
            stroke="none"
          />
          <path
            d="M103 70v16q-33 3-41 32l-22 89q-3 14 8 17 11 2 15-12l18-60-2 74-10 114q-1 16 12 17 12 0 15-14l24-103 24 103q3 14 15 14 13-1 12-17l-10-114-2-74 18 60q4 14 15 12 11-3 8-17l-22-89q-8-29-41-32V70"
            fill="var(--sage)"
            fillOpacity=".1"
            stroke="var(--sage)"
            strokeWidth="1.7"
          />
          <ellipse
            cx="120"
            cy="45"
            rx="25"
            ry="30"
            fill="var(--ivory)"
            stroke="var(--sage)"
            strokeWidth="1.7"
          />
          <path
            d="M96 41q-4-34 24-34 30 0 26 40M101 26q18-1 24-12 5 14 18 16"
            stroke="var(--mulberry)"
            strokeOpacity=".35"
            strokeWidth="1.4"
          />
          <path
            d="M110 53q10 7 20 0M112 43h.1M128 43h.1"
            stroke="var(--sage)"
            strokeWidth="1.7"
          />
          {anatomy && (
            <g className="anatomy-organs">
              <g
                className={`anatomy-organ ${active === "brain" ? "highlighted" : ""}`}
                data-area="brain"
              >
                <path d="M120 26q-9-11-14 0-8 0-7 8-4 7 4 10 0 8 10 6 4 5 7-1 4 6 8 1 10 2 10-6 8-3 4-10 1-8-7-8-5-11-15 0ZM120 27v20M109 30q-6 7 2 9M130 30q6 7-2 9" />
              </g>
              <g
                className={`anatomy-organ ${active === "blood" ? "highlighted" : ""}`}
                data-area="blood"
              >
                <path d="M120 120q-14-18-23-3-9 16 23 37 32-21 23-37-9-15-23 3Z" />
                <path d="M120 153v62M120 170l-17 30M120 170l17 30M103 110l-10-9M137 110l10-9M102 197l-10 38M138 197l10 38" />
              </g>
              <g
                className={`anatomy-organ ${active === "bone" ? "highlighted" : ""}`}
                data-area="bone"
              >
                <path d="M120 86v26M120 157v58M94 104l26-8 26 8M101 165q19 15 38 0M98 177q22 17 44 0M100 213q20 18 40 0M102 231l-15 99M138 231l15 99M80 127l-24 75M160 127l24 75" />
              </g>
              <g
                className={`anatomy-organ ${active === "muscle" ? "highlighted" : ""}`}
                data-area="muscle"
              >
                <path d="M95 249q11 13-1 44-11 9-11-3l7-35ZM145 249q-11 13 1 44 11 9 11-3l-7-35ZM74 137q-9 13-8 29M166 137q9 13 8 29" />
              </g>
            </g>
          )}
        </svg>
        {Object.entries(areas).map(([id, a]) => (
          <button
            type="button"
            key={id}
            className={`body-hotspot ${stage.points.includes(id) ? "stage-focus" : ""} ${active === id ? "active" : ""}`}
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
            aria-label={`Explore ${a.label.toLowerCase()}`}
            aria-pressed={selected === id}
            aria-controls="body-area-details"
            onClick={() => setSelected(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="hotspot-ring" />
            <span className="hotspot-core" />
            <span className="hotspot-label">{a.short}</span>
          </button>
        ))}
      </div>
      <div className="body-area-controls" aria-label="Body areas">
        {Object.entries(areas).map(([id, a]) => {
          const I = a.icon;
          return (
            <button
              type="button"
              key={id}
              onClick={() => setSelected(id)}
              aria-pressed={selected === id}
            >
              <I size={14} />
              {a.short}
            </button>
          );
        })}
      </div>
      <div
        className="body-area-details"
        id="body-area-details"
        role="region"
        aria-label="Selected body area"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="body-focus-label">
          {stage.points.includes(selected)
            ? "IN FOCUS AT THIS STAGE"
            : "EXPLORE THE BASICS"}
        </span>
        <h4>{area.label}</h4>
        <p>{area.description}</p>
        {relevant.length > 0 && (
          <>
            <small>Explore nutrients for your stage</small>
            <div className="body-nutrient-links">
              {relevant.map((name) => (
                <button
                  type="button"
                  key={name}
                  aria-label={`Learn about ${name} for ${stage.title}`}
                  onClick={() =>
                    onNutrient(nutrients.find((n) => n.name === name))
                  }
                >
                  {name}
                  <Plus size={12} />
                </button>
              ))}
            </div>
          </>
        )}
        <Source {...sources.nin} />
        <small className="body-map-note">
          A learning map, not a diagnosis.
        </small>
      </div>
    </aside>
  );
}
