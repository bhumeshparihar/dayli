import LifeStageIllustration from "./LifeStageIllustration";
import BodyExplorer from "./BodyExplorer";
import { contactEmail, joinedCount } from "./config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Check,
  Plus,
  MoveUpRight,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  Botanical,
  Button,
  Chocolate,
  Count,
  Disclaimer,
  Eyebrow,
  Icon,
  JoinBand,
  Reveal,
  Source,
} from "./components";
import { experiences, nutrients, sources, stages } from "./data";

export function Home() {
  return (
    <>
      <section
        className="hero"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty(
            "--cursor-x",
            `${e.clientX - r.left}px`,
          );
          e.currentTarget.style.setProperty(
            "--cursor-y",
            `${e.clientY - r.top}px`,
          );
        }}
      >
        <div className="hero-glow" />
        <div className="orb orb-hero" />
        <div className="hero-inner">
          <div className="hero-copy">
            <Eyebrow light>EVERYDAY NUTRITION, REIMAGINED</Eyebrow>
            <h1>
              Nutrition
              <br />
              shouldn’t feel
              <br />
              like <em>medicine.</em>
            </h1>
            <p className="hero-sub">
              A daily chocolate ritual to support everyday nutrition for Indian
              women. Built with them, before we launch.
            </p>
            <div className="hero-actions">
              <Button light />
              <Link className="text-link" to="/#story">
                Our story <ArrowRight size={15} />
              </Link>
            </div>
            <div className="hero-community">
              <div className="community-seals" aria-hidden="true">
                <Icon name="flower" />
                <Icon name="heart" />
                <Icon name="leaf" />
              </div>
              <p>
                <strong>
                  {joinedCount !== null
                    ? `${joinedCount.toLocaleString("en-IN")} women and families have joined`
                    : "100+ conversations. One shared purpose."}
                </strong>
                <span>Building with women, not just for them.</span>
              </p>
            </div>
          </div>
          <Chocolate />
        </div>
      </section>
      <section className="story" id="story">
        <div className="story-content">
          <Reveal>
            <h2>
              It started with
              <br />
              <em>my mother.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p>
              She struggled to stay consistent with everyday nutrition. Tablets
              and powders felt like treatment, <em>not something to enjoy.</em>
            </p>
          </Reveal>
          <Reveal>
            <p>
              So I started asking other women.
              <br />
              Ten conversations became 100+.
              <br />
              <span>Her problem was not unique.</span>
            </p>
          </Reveal>
          <Reveal>
            <div className="story-count">
              10 <span>→</span> <Count value={100} suffix="+" />
            </div>
            <small>CONVERSATIONS WITH WOMEN</small>
            <h3>
              A problem noticed at home.
              <br />A solution for Indian women.
            </h3>
            <p className="signature">
              Bhumesh<span>FOUNDER, DAYLI</span>
            </p>
          </Reveal>
        </div>
        <div className="story-end">A little listening can change a lot.</div>
      </section>
      <section className="numbers section-wrap">
        <Reveal>
          <div className="section-top">
            <Eyebrow>THE REASON WE’RE HERE</Eyebrow>
            <Link className="text-link" to="/research">
              See the research <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="stats">
            <div>
              <strong>
                <Count value={57} suffix="%" />
              </strong>
              <p>
                of Indian women aged 15–49
                <br />
                were anaemic.
              </p>
              <Source {...sources.nfhs} />
            </div>
            <div>
              <strong>
                <Count value={100} suffix="+" />
              </strong>
              <p>
                women. Real conversations.
                <br />A shared need for everyday care.
              </p>
              <small>DAYLI founder conversations · self-reported</small>
            </div>
            <div>
              <strong>
                1
                <span className="stat-flower">
                  <Icon name="flower" size={42} />
                </span>
              </strong>
              <p>
                daily chocolate ritual.
                <br />
                One less habit to remember.
              </p>
              <small>Our idea · in development</small>
            </div>
          </div>
          <Disclaimer />
        </Reveal>
      </section>
      <section className="explore section-wrap">
        <Reveal>
          <div className="section-top">
            <div>
              <Eyebrow>A LITTLE UNDERSTANDING GOES A LONG WAY</Eyebrow>
              <h2>
                Let’s start with <em>you.</em>
              </h2>
            </div>
            <p>
              Real experiences. Thoughtful science.
              <br />A gentler way to learn.
            </p>
          </div>
          <div className="doorways">
            {[
              {
                n: "01",
                title: "What women face",
                italic: "every day.",
                text: "The little things that deserve to be heard.",
                to: "/problems",
                icon: "flower",
              },
              {
                n: "02",
                title: "What your body needs",
                italic: "at your stage.",
                text: "Because your needs change with you.",
                to: "/learn",
                icon: "sprout",
              },
              {
                n: "03",
                title: "The research",
                italic: "behind DAYLI.",
                text: "What we know. And what we’re still asking.",
                to: "/research",
                icon: "spark",
              },
            ].map((d) => (
              <Link className="doorway" key={d.n} to={d.to}>
                <div className="doorway-top">
                  <span>{d.n} / EXPLORE</span>
                  <ArrowUpRight size={23} />
                </div>
                <Botanical variant={d.icon} />
                <h3>
                  {d.title}
                  <br />
                  <em>{d.italic}</em>
                </h3>
                <p>{d.text}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
      <JoinBand />
    </>
  );
}

export function Problems() {
  const [category, setCategory] = useState("Energy"),
    [index, setIndex] = useState(0),
    [related, setRelated] = useState(() => {
      try {
        const saved = JSON.parse(
          sessionStorage.getItem("dayli-related") || "[]",
        );
        return Array.isArray(saved) ? saved : [];
      } catch {
        return [];
      }
    });
  const items = experiences[category];
  const [title, desc] = items[index];
  const change = (d) => setIndex((index + d + items.length) % items.length);
  const toggle = () => {
    const next = related.includes(title)
      ? related.filter((x) => x !== title)
      : [...related, title];
    setRelated(next);
    sessionStorage.setItem("dayli-related", JSON.stringify(next));
  };
  let touchX = 0;
  return (
    <>
      <section className="page-intro section-wrap">
        <Eyebrow>THE EXPERIENCES BEHIND THE NUMBERS</Eyebrow>
        <h1>
          Every day, women feel it.
          <br />
          <em>Few talk about it.</em>
        </h1>
        <p>
          Sometimes it’s a feeling you can’t quite put into words.
          <br />
          Sometimes it’s something you’ve been living with for years.
        </p>
      </section>
      <section className="problem-experience section-wrap">
        <div className="category-tabs" aria-label="Experience categories">
          {Object.keys(experiences).map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              className={category === c ? "selected" : ""}
              onClick={() => {
                setCategory(c);
                setIndex(0);
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="experience-layout">
          <button
            className="circle-button prev"
            onClick={() => change(-1)}
            aria-label="Previous experience"
          >
            <ChevronLeft />
          </button>
          <article
            className="experience-card"
            key={title}
            onTouchStart={(e) => (touchX = e.changedTouches[0].clientX)}
            onTouchEnd={(e) => {
              const d = touchX - e.changedTouches[0].clientX;
              if (Math.abs(d) > 45) change(d > 0 ? 1 : -1);
            }}
          >
            <span className="card-index">
              {category.toUpperCase()} · {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
            <Botanical
              variant={
                category === "Energy"
                  ? "sun"
                  : category === "Mind"
                    ? "moon"
                    : category === "Routine"
                      ? "sprout"
                      : "flower"
              }
            />
            <h2>{title}</h2>
            <p>{desc}</p>
            <button
              className={`relate-button ${related.includes(title) ? "related" : ""}`}
              onClick={toggle}
              aria-pressed={related.includes(title)}
            >
              {related.includes(title) ? (
                <Check size={17} />
              ) : (
                <Heart size={17} />
              )}{" "}
              {related.includes(title)
                ? "This feels familiar"
                : "Tap if this is familiar"}
            </button>
          </article>
          <button
            className="circle-button next"
            onClick={() => change(1)}
            aria-label="Next experience"
          >
            <ChevronRight />
          </button>
        </div>
        <div className="carousel-dots">
          {items.map(([t], i) => (
            <button
              key={t}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
              aria-label={`Experience ${i + 1}: ${t}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
        <div className="related-summary" aria-live="polite">
          {related.length > 0 ? (
            <>
              <span>You related to {related.length}. You’re not alone.</span>
              <Button>Share this with the Movement</Button>
            </>
          ) : (
            <span>Take your time. There’s no right answer.</span>
          )}
        </div>
        <Disclaimer />
        <p className="fine-print">
          These are common experiences, not a diagnosis. Please consult a
          doctor.
        </p>
      </section>
      <section className="care-callout section-wrap">
        <Icon name="heart" size={36} />
        <h2>
          Do you see this in your
          <br />
          <em>mother, wife, sister or friend?</em>
        </h2>
        <p>Care starts with paying attention. You can join for her, too.</p>
        <Button />
      </section>
    </>
  );
}

export function Research() {
  return (
    <>
      <section className="research-hero section-wrap">
        <Eyebrow light>SCIENCE, WITH HONESTY</Eyebrow>
        <h1>
          What the
          <br />
          <em>research says.</em>
        </h1>
        <p>
          Every number has a source.
          <br />
          Every unanswered question deserves one.
        </p>
        <Disclaimer />
      </section>
      <section className="research-stat section-wrap">
        <div>
          <span className="eyebrow gold">01 / THE EVERYDAY GAP</span>
          <div className="big-number">
            <Count value={57} suffix="%" />
          </div>
        </div>
        <div>
          <h2>
            of Indian women aged 15–49
            <br />
            were <em>anaemic.</em>
          </h2>
          <p>
            A national number. Millions of individual stories.
            <br />
            It’s a reason to listen, learn and ask better questions.
          </p>
          <Source {...sources.nfhs} />
          <Disclaimer />
        </div>
      </section>
      <section className="pending-research section-wrap">
        <Eyebrow>MORE QUESTIONS. CAREFULLY VERIFIED ANSWERS.</Eyebrow>
        <div className="pending-row">
          {["Vitamin D & B12", "Calcium intake"].map((t, i) => (
            <div className="pending-item" key={t}>
              <span>0{i + 2} / RESEARCH IN PROGRESS</span>
              <strong>—</strong>
              <h3>{t}</h3>
              <p>
                Verified data and source coming soon.
                <br />
                We won’t fill a gap with a guess.
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="heard section-wrap">
        <Reveal>
          <Eyebrow>WHAT WE HEARD</Eyebrow>
          <h2>
            Behind every response,
            <br />
            <em>a real person.</em>
          </h2>
          <div className="heard-detail">
            <strong>
              100<span>+</span>
            </strong>
            <div>
              <h3>women we spoke to.</h3>
              <p>
                About 70% self-reported a doctor-identified nutritional
                deficiency.
              </p>
              <small>
                DAYLI founder conversations · self-reported, not verified.
                <br />
                An informal sample, not representative national research.
              </small>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="product-development section-wrap">
        <div className="section-top">
          <div>
            <Eyebrow>BEING BUILT, WITH YOU</Eyebrow>
            <h2>
              A ritual for your
              <br />
              <em>kind of everyday.</em>
            </h2>
          </div>
          <span className="outline-badge">IN DEVELOPMENT</span>
        </div>
        <div className="product-pair">
          {[
            [
              "Daily Essential",
              "Women 18–35",
              "Foundational micronutrient support.",
              "flower",
            ],
            [
              "Daily Balance",
              "Women 40–55",
              "Nutrition for changing life-stage needs.",
              "leaf",
            ],
          ].map(([n, a, d, i]) => (
            <article key={n}>
              <Botanical variant={i} />
              <div>
                <span className="eyebrow">{a}</span>
                <h3>{n}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="fine-print">
          In development. Launching after community validation. Nutrients and
          amounts depend on formulation, safety testing and regulation.
        </p>
      </section>
      <section className="why-ask section-wrap">
        <Eyebrow>WHY WE ASK</Eyebrow>
        <h2>
          Better listening.
          <br />
          <em>More thoughtful nutrition.</em>
        </h2>
        <p>
          Your responses help us understand Indian women’s everyday health
          problems, so we build something that fits. Used only with your
          consent.
        </p>
        <Button />
        <Disclaimer />
        <p className="fine-print">
          Health context only. DAYLI does not claim to treat any condition or
          replace prescribed supplements.
        </p>
      </section>
    </>
  );
}

export function Learn() {
  const [selected, setSelected] = useState(0),
    [tab, setTab] = useState(0),
    [nutrient, setNutrient] = useState(null),
    [learningFor, setLearningFor] = useState(false);
  const s = stages[selected];
  const tabs = [
    "Your body",
    "Key nutrients",
    "Common feelings",
    "Food first",
    "Ask your doctor",
  ];
  return (
    <>
      <section className="page-intro learn-intro section-wrap">
        <Eyebrow>KNOW YOUR STAGE</Eyebrow>
        <h1>
          Your body changes.
          <br />
          <em>Your nutrition should too.</em>
        </h1>
        <p>
          Meet your body where it is. A little understanding
          <br />
          is a good place to start.
        </p>
        <Disclaimer />
      </section>
      <section className="stage-section section-wrap">
        <div className="section-top">
          <h3>Where are you in life?</h3>
          <span className="fine-print">Choose a stage to explore</span>
        </div>
        <div className="stage-selector">
          {stages.map((stage, i) => (
            <button
              key={stage.id}
              className={`stage-card ${selected === i ? "selected" : ""}`}
              aria-pressed={selected === i}
              onClick={() => {
                setSelected(i);
                setTab(0);
              }}
            >
              <LifeStageIllustration stage={stage.id} />
              <span>{stage.title}</span>
              <small>{stage.short}</small>
              {selected === i && <Check className="stage-check" size={14} />}
            </button>
          ))}
        </div>
        <label className="learning-for">
          <input
            type="checkbox"
            checked={learningFor}
            onChange={(e) => setLearningFor(e.target.checked)}
          />{" "}
          I’m learning for my mother, wife, sister or daughter.
        </label>
        {learningFor && (
          <p className="fine-print">
            You’re welcome here. Choose her stage above to learn with her.
          </p>
        )}
        <div className="stage-panel" key={s.id}>
          <div className="stage-panel-top">
            <div>
              <Eyebrow>YOUR STAGE, UNDERSTOOD</Eyebrow>
              <h2>{s.title}</h2>
            </div>
            <span className="stage-label">{selected + 1} / 7</span>
          </div>
          <div
            className="panel-tabs"
            role="tablist"
            aria-label="Stage information"
          >
            {tabs.map((t, i) => (
              <button
                role="tab"
                aria-selected={tab === i}
                aria-controls="stage-tab-content"
                id={`stage-tab-${i}`}
                tabIndex={tab === i ? 0 : -1}
                key={t}
                onKeyDown={(e) => {
                  const next =
                    e.key === "ArrowRight"
                      ? (i + 1) % tabs.length
                      : e.key === "ArrowLeft"
                        ? (i + tabs.length - 1) % tabs.length
                        : e.key === "Home"
                          ? 0
                          : e.key === "End"
                            ? tabs.length - 1
                            : null;
                  if (next !== null) {
                    e.preventDefault();
                    setTab(next);
                    document.getElementById(`stage-tab-${next}`)?.focus();
                  }
                }}
                onClick={() => setTab(i)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="stage-content">
            <div
              className="stage-text"
              role="tabpanel"
              id="stage-tab-content"
              aria-labelledby={`stage-tab-${tab}`}
              key={tab}
            >
              <h3>
                {
                  [
                    "What’s happening in your body",
                    "Nutrients that matter most",
                    "A little context for how you feel",
                    "Food-first tips",
                    "A conversation worth having",
                  ][tab]
                }
              </h3>
              {tab === 1 ? (
                <>
                  <p>Tap a nutrient to understand its everyday role.</p>
                  <div className="nutrient-pills">
                    {s.nutrients.map((n) => (
                      <button
                        key={n}
                        onClick={() =>
                          setNutrient(nutrients.find((x) => x.name === n))
                        }
                      >
                        {n}
                        <Plus size={14} />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p>{[s.body, "", s.feelings, s.tips, s.doctor][tab]}</p>
              )}
              <Source {...sources[s.source]} />
              {s.id === "menstruating" && tab === 0 && (
                <Accordion title="India context: a closer look">
                  <p>
                    A study found vitamin D deficiency in 70–90% of adult women,
                    and young urban women eating about 480 mg calcium a day.
                  </p>
                  <small>
                    Source: Scientific Reports, 2025 · full citation awaiting
                    verification.
                  </small>
                  <p>
                    A health-screening report of 31,000+ people found 44% of
                    women had haemoglobin below 12 g/dL.
                  </p>
                  <small>
                    One screening report, not national data. Report citation
                    awaiting verification.
                  </small>
                  <p>
                    These figures are from the supplied educational brief. They
                    have not yet been independently verified by DAYLI’s clinical
                    reviewer.
                  </p>
                </Accordion>
              )}
              {s.id === "post" && (
                <>
                  <Source {...sources.nin} />
                  <Accordion title="An honest note about supplements">
                    <p>
                      Large trials showed calcium and vitamin D tablets give at
                      best a modest reduction in hip fracture, and some analyses
                      question high-dose calcium supplements and heart risk.
                    </p>
                    <p>
                      Food first, supplements only to fill gaps, with your
                      doctor.
                    </p>
                    <small>
                      Evidence summary from the supplied educational brief ·
                      full trial references and clinical review pending.
                    </small>
                  </Accordion>
                </>
              )}
              <Disclaimer />
              {s.id === "pregnant" && tab !== 4 && (
                <p className="medical-note">
                  Do not start or change supplements in pregnancy without your
                  doctor. DAYLI products are not prenatal supplements.
                </p>
              )}
            </div>
            <BodyExplorer key={s.id} stage={s} onNutrient={setNutrient} />
          </div>
          <Accordion title="Mood swings and nutrition: what we know.">
            <p>
              Calcium, vitamin B6 and zinc: some trial evidence for easing
              psychological symptoms of PMS.
            </p>
            <p>
              Magnesium and vitamin D: evidence is not strong enough, so we
              don’t claim they help.
            </p>
            <p>
              Low iron or B12 can cause tiredness and low mood. Get a blood test
              to find out.
            </p>
            <small>
              Evidence summary from the supplied educational brief · exact study
              references and clinical review pending.
            </small>
            <Disclaimer />
            <p>
              PMS and mood changes have many causes. Please see a doctor if they
              affect your life.
            </p>
          </Accordion>
          <Button>Join the Movement for stage-wise guides</Button>
        </div>
      </section>
      <section className="glossary section-wrap">
        <Eyebrow>SMALL NUTRIENTS. ESSENTIAL ROLES.</Eyebrow>
        <h2>
          Get to know <em>the essentials.</em>
        </h2>
        <div className="glossary-row">
          {nutrients.slice(0, 6).map((n) => (
            <button key={n.name} onClick={() => setNutrient(n)}>
              <Icon name={n.icon} size={35} />
              <h3>{n.name}</h3>
              <p>{n.subtitle}</p>
              <span>
                Explore <Plus size={14} />
              </span>
            </button>
          ))}
        </div>
        <Source {...sources.nin} />
        <Disclaimer />
      </section>
      <section className="trust-block section-wrap">
        <div>
          <div className="review-avatar">
            <Icon name="heart" size={28} />
          </div>
          <Eyebrow>EXPERT REVIEW</Eyebrow>
          <h3>
            Thoughtful information.
            <br />
            <em>Expert eyes, coming soon.</em>
          </h3>
          <p>
            Clinical reviewer to be announced.
            <br />
            This content has not yet been medically reviewed.
          </p>
        </div>
        <div>
          <Eyebrow>UPCOMING EXPERT SESSIONS</Eyebrow>
          <h3>
            Let’s make room
            <br />
            for your questions.
          </h3>
          <p>
            Dates, topics and qualified speakers
            <br />
            will be announced when confirmed.
          </p>
          <div
            className="expert-carousel"
            aria-label="Planned expert session themes"
          >
            {[
              [
                "Everyday nutrition",
                "Understanding the essentials",
                "nutrition",
              ],
              [
                "Your changing body",
                "Questions for every life stage",
                "life-stages",
              ],
              [
                "Food-first conversations",
                "Making everyday meals count",
                "food-first",
              ],
            ].map(([title, subtitle, id]) => (
              <article className="expert-session" key={id}>
                <span>PLANNED THEME · DETAILS TO COME</span>
                <h4>{title}</h4>
                <p>{subtitle}</p>
                <Button to={`/join?interest=${id}`}>
                  Notify me <span className="sr-only">about {title}</span>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
      {nutrient && (
        <NutrientModal nutrient={nutrient} close={() => setNutrient(null)} />
      )}
    </>
  );
}
function NutrientModal({ nutrient: n, close }) {
  useEffect(() => {
    const old = document.activeElement;
    const dialog = document.querySelector(".nutrient-dialog");
    dialog.showModal();
    return () => {
      dialog.close();
      old?.focus();
    };
  }, []);
  return (
    <dialog
      className="nutrient-dialog"
      aria-labelledby="nutrient-dialog-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button
        className="dialog-close circle-button"
        onClick={close}
        aria-label="Close nutrient details"
      >
        ×
      </button>
      <Icon name={n.icon} size={42} />
      <Eyebrow>THE NUTRIENT GLOSSARY</Eyebrow>
      <h2 id="nutrient-dialog-title">{n.name}</h2>
      {[
        ["What it does", n.does],
        ["Where your body uses it", n.where],
        ["Indian vegetarian food sources", n.food],
      ].map(([h, p]) => (
        <div key={h}>
          <h4>{h}</h4>
          <p>{p}</p>
        </div>
      ))}
      <Source {...sources.nin} />
      <Disclaimer />
    </dialog>
  );
}
export function Legal({ type }) {
  const privacy = type === "privacy";
  return (
    <section className="legal section-wrap">
      <Eyebrow>CARE INCLUDES CLARITY</Eyebrow>
      <h1>{privacy ? "Your privacy matters." : "A few clear terms."}</h1>
      {privacy ? (
        <>
          <h3>What we collect</h3>
          <p>
            If you submit the join form, DAYLI receives your name, contact
            details, consent and any optional experiences you choose to share.
            Please do not share another person’s identifiable health information
            without their permission.
          </p>
          <h3>Why we ask</h3>
          <p>
            Your answers help us understand everyday nutrition experiences,
            shape products and contact you about the DD Movement. Optional
            answers can be skipped. We do not sell your responses.
          </p>
          <h3>Where your data goes</h3>
          <p>
            The signup form sends information to DAYLI’s connected registration
            service only when that service is configured. An unconnected form
            will display an error and will not claim registration. No health or
            contact information is saved in your browser. Your selected
            experiences on the Problem page stay in this browser tab until it
            closes.
          </p>
          <h3>Consent and deletion</h3>
          <p>
            You may withdraw consent or ask for deletion. A verified privacy
            contact, data retention period and service provider details must be
            published before live registration is enabled. Until then,
            registration must remain disabled.
          </p>
          {contactEmail && (
            <p>
              Privacy and deletion requests:{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          )}
          <p className="medical-note">
            Pre-launch privacy notice. Registration is awaiting a verified
            privacy contact and final data handling details.
          </p>
        </>
      ) : (
        <>
          <h3>About DAYLI</h3>
          <p>
            DAYLI is a pre-launch everyday nutrition concept. Products,
            ingredients, amounts, availability and launch dates are in
            development. This site does not sell products.
          </p>
          <h3>Educational information</h3>
          <p>
            Content is general education, not medical advice, diagnosis or
            treatment. DAYLI does not replace prescribed treatment or
            supplements. Consult your doctor about individual needs,
            particularly during pregnancy.
          </p>
          <h3>The DD Movement</h3>
          <p>
            Joining is free. Founding perks are limited to early members and
            subject to launch availability. Product details and the scope of the
            founding subscription will be confirmed before launch. No payment is
            collected here.
          </p>
          <h3>Get in touch</h3>
          <p>
            Contact details will be published before registration opens. Read
            our <Link to="/privacy">Privacy notice</Link> before sharing
            information.
          </p>
        </>
      )}
    </section>
  );
}
export function Contact() {
  return (
    <section className="legal contact-page section-wrap">
      <Eyebrow>LET’S KEEP THE CONVERSATION GOING</Eyebrow>
      <h1>
        Good things start
        <br />
        with <em>a conversation.</em>
      </h1>
      <Botanical variant="heart" />
      {contactEmail ? (
        <p>
          Questions about DAYLI, the community or your data?
          <br />
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      ) : (
        <p>
          Our verified contact and social details are coming soon.
          <br />
          This page will be updated before registration opens.
        </p>
      )}
      <Button to="/">Back to DAYLI</Button>
    </section>
  );
}
