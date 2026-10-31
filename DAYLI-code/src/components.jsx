import { instagramUrl } from "./config";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Heart,
  Flower2,
  Sprout,
  Moon,
  Sun,
  Leaf,
  Droplet,
  Sparkles,
  Bone,
  Check,
  ChevronDown,
} from "lucide-react";
export const icons = {
  heart: Heart,
  flower: Flower2,
  sprout: Sprout,
  moon: Moon,
  sun: Sun,
  leaf: Leaf,
  drop: Droplet,
  spark: Sparkles,
  bone: Bone,
};
export function Icon({ name = "flower", ...props }) {
  const I = icons[name] || Flower2;
  return <I strokeWidth={1.3} {...props} />;
}
export function Button({
  to = "/join",
  children = "Join the DAYLI Movement now",
  light = false,
  className = "",
  ...props
}) {
  return (
    <Link
      to={to}
      className={`button ${light ? "button-light" : ""} ${className}`}
      {...props}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Eyebrow({ children, light = false }) {
  return (
    <div className={`eyebrow ${light ? "gold" : ""}`}>
      <span />
      {children}
    </div>
  );
}
export function Disclaimer() {
  return (
    <p className="disclaimer">
      Educational information, not medical advice. Please consult a doctor.
    </p>
  );
}
export function Source({ name, url }) {
  return (
    <a className="source" href={url} target="_blank" rel="noreferrer">
      Source: {name} <ArrowUpRight size={11} />
    </a>
  );
}
export function Reveal({ children, className = "", ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("visible");
            observer.unobserve(el);
          }
        }),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} {...props}>
      {children}
    </div>
  );
}
export function Count({ value, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? value : 0,
  );
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setN(value);
      return;
    }
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1200);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
export function Header() {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [loc]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <Link className="wordmark" to="/" aria-label="DAYLI home">
        DAYLI
        <span aria-hidden="true">
          <Icon name="flower" size={8} />
        </span>
      </Link>
      <nav aria-label="Main navigation" className={open ? "nav open" : "nav"}>
        <Link to="/#story">Story</Link>
        <NavLink to="/problems">Problem</NavLink>
        <NavLink to="/research">Research</NavLink>
        <NavLink to="/learn">Learn</NavLink>
        <NavLink to="/join">Movement</NavLink>
      </nav>
      <Button className="nav-cta">Join the Movement</Button>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Link className="wordmark" to="/">
            DAYLI
            <span aria-hidden="true">
              <Icon name="flower" size={8} />
            </span>
          </Link>
          <p>
            A little ritual.
            <br />A lot of care.
          </p>
        </div>
        <div className="footer-note">
          Made for everyday life.
          <br />
          Built with Indian women.
        </div>
        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
          <a
            href={
              instagramUrl ||
              (window.location.protocol === "file:" ||
              window.__DAYLI_OFFLINE_PREVIEW__ === true
                ? "#/contact"
                : "/contact")
            }
            target={instagramUrl ? "_blank" : undefined}
            rel={instagramUrl ? "noreferrer" : undefined}
          >
            Instagram <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
      <div className="footer-small">
        <span>© {new Date().getFullYear()} DAYLI. All care, every day.</span>
        <span>
          DAYLI supports everyday nutrition and is not a substitute for medical
          advice or prescribed treatment.
        </span>
      </div>
      <Link className="giant-wordmark" to="/" aria-label="DAYLI home">
        <svg viewBox="0 0 1000 300" aria-hidden="true" focusable="false">
          <text
            x="500"
            y="242"
            textAnchor="middle"
            textLength="940"
            lengthAdjust="spacingAndGlyphs"
          >
            {"DAYLI".split("").map((letter, i) => (
              <tspan key={i} style={{ "--i": i }}>
                {letter}
              </tspan>
            ))}
          </text>
        </svg>
      </Link>
    </footer>
  );
}
export function MobileJoin() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const fn = () => setShow(window.scrollY > window.innerHeight * 0.65);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [pathname]);
  return show && pathname != "/join" ? (
    <Button className="mobile-join">Join the Movement</Button>
  ) : null;
}
export function Chocolate() {
  return (
    <div
      className="chocolate-scene"
      tabIndex="0"
      aria-label="Illustration of DAYLI daily functional chocolate. Focus or hover to reveal the chocolate."
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <span className="nutrient-float n-b12">
        <Sparkles size={19} />
        <span>
          B12<small>THE EVERYDAY ESSENTIALS</small>
        </span>
      </span>
      <span className="nutrient-float n-d">
        <Sun size={23} />
        <span>
          D<small>A LITTLE SUNSHINE</small>
        </span>
      </span>
      <span className="nutrient-float n-fe">
        <Droplet size={20} />
        <span>
          Iron<small>CARE FROM WITHIN</small>
        </span>
      </span>
      <span className="nutrient-float n-folate">
        <Sprout size={22} />
        <span>
          Folate<small>SMALL BUT ESSENTIAL</small>
        </span>
      </span>
      <svg
        className="chocolate"
        viewBox="0 0 390 560"
        role="img"
        aria-label="DAYLI chocolate bar in an ivory and rose wrapper"
      >
        <defs>
          <linearGradient id="cacao" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#542E42" />
            <stop offset="1" stopColor="#B86D78" />
          </linearGradient>
          <linearGradient id="paper" x1="0" x2="1" y2="1">
            <stop stopColor="#F7EFE8" />
            <stop offset="1" stopColor="#C69B69" stopOpacity=".75" />
          </linearGradient>
          <linearGradient id="rose" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#B86D78" />
            <stop offset="1" stopColor="#542E42" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow
              dx="12"
              dy="22"
              stdDeviation="16"
              floodColor="#542E42"
              floodOpacity=".5"
            />
          </filter>
        </defs>
        <g
          transform="translate(66 32) rotate(-12 128 230)"
          filter="url(#shadow)"
        >
          <rect
            x="6"
            y="0"
            width="240"
            height="454"
            rx="8"
            fill="url(#cacao)"
            stroke="#C69B69"
            strokeWidth="1"
          />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <g key={`${r}${c}`}>
                <rect
                  x={16 + c * 75}
                  y={12 + r * 69}
                  width="66"
                  height="60"
                  rx="4"
                  fill="#542E42"
                  stroke="#B86D78"
                  strokeWidth="1.5"
                />
                <rect
                  x={23 + c * 75}
                  y={19 + r * 69}
                  width="52"
                  height="46"
                  rx="3"
                  fill="url(#cacao)"
                />
                <path
                  d={`M${42 + c * 75} ${48 + r * 69}q10 -23 16 -10q-2 18 -16 10Z`}
                  fill="none"
                  stroke="#C69B69"
                  strokeOpacity=".45"
                />
              </g>
            )),
          )}
          <g className="wrapper">
            <path
              d="M0 169 L45 177 L76 166 L115 176 L158 167 L201 178 L252 167 L252 473 L0 473Z"
              fill="url(#paper)"
            />
            <path
              d="M0 368 Q110 318 252 371 L252 473 L0 473Z"
              fill="url(#rose)"
            />
            <path
              d="M0 411 Q130 355 252 418"
              fill="none"
              stroke="#C69B69"
              strokeOpacity=".6"
            />
            <path
              d="M0 452h252M0 458h252M0 464h252"
              stroke="#F7EFE8"
              strokeOpacity=".2"
            />
            <text
              x="126"
              y="224"
              textAnchor="middle"
              fill="#542E42"
              fontFamily="Georgia,serif"
              fontSize="52"
              letterSpacing="-2"
            >
              DAYLI
            </text>
            <text
              x="126"
              y="249"
              textAnchor="middle"
              fill="#542E42"
              fontFamily="sans-serif"
              fontSize="8"
              letterSpacing="3.3"
            >
              A LITTLE RITUAL. A LOT OF CARE.
            </text>
            <g fill="none" stroke="#84958A" strokeWidth="1.2">
              <path d="M119 340q-6-43 14-70M126 309q-31 2-31-22q26-2 31 22M125 302q26 2 28-21q-23-2-28 21M122 324q-29 3-31-18q25-2 31 18M122 326q28 4 32-16q-25-5-32 16" />
            </g>
            <text
              x="126"
              y="390"
              textAnchor="middle"
              fill="#F7EFE8"
              fontFamily="Georgia,serif"
              fontSize="22"
              fontStyle="italic"
            >
              daily essential
            </text>
            <text
              x="126"
              y="414"
              textAnchor="middle"
              fill="#F7EFE8"
              fontFamily="sans-serif"
              fontSize="8"
              letterSpacing="2"
            >
              FUNCTIONAL CHOCOLATE
            </text>
            <text
              x="126"
              y="438"
              textAnchor="middle"
              fill="#F7EFE8"
              fontFamily="sans-serif"
              fontSize="7"
              letterSpacing="1.3"
            >
              THOUGHTFULLY MADE FOR YOUR EVERYDAY
            </text>
          </g>
        </g>
      </svg>
      <p className="product-caption">
        A little goodness. Every day.
        <span>ILLUSTRATIVE CONCEPT · IN DEVELOPMENT</span>
      </p>
      <span className="scene-star star-one">
        <Icon name="flower" size={30} />
      </span>
      <span className="scene-star star-two">✧</span>
    </div>
  );
}
export function Botanical({ variant = "flower", className = "" }) {
  return (
    <div className={`botanical ${className}`} aria-hidden="true">
      <div className="botanical-orbit" />
      <Icon name={variant} size={104} />
      <span className="botanical-dot" />
      <span className="botanical-star">✧</span>
    </div>
  );
}
export function Accordion({ title, children, defaultOpen = false }) {
  return (
    <details className="accordion" open={defaultOpen || undefined}>
      <summary>
        {title}
        <ChevronDown size={18} />
      </summary>
      <div>{children}</div>
    </details>
  );
}
export function JoinBand() {
  return (
    <section className="join-band">
      <div className="orb" />
      <Reveal>
        <Eyebrow light>THE DD MOVEMENT</Eyebrow>
        <h2>
          Good things start
          <br />
          with <em>all of us.</em>
        </h2>
        <p>Before we launch. Free. Open to everyone who cares about a woman.</p>
        <Button light>Join the DAYLI Movement now</Button>
        <small>Founding members get a DAYLI subscription at launch.</small>
      </Reveal>
      <div className="band-flower" aria-hidden="true">
        <Flower2 />
      </div>
    </section>
  );
}
