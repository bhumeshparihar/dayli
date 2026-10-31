import PersonIllustration from "./PersonIllustration";
import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Heart,
  LoaderCircle,
  Share2,
} from "lucide-react";
import { Accordion, Botanical, Button, Eyebrow, Icon } from "./components";
import { faqs, symptomGroups } from "./data";
const roles = [
  "Woman",
  "Son",
  "Daughter",
  "Husband",
  "Boyfriend",
  "Brother",
  "Friend",
  "Other",
];
const beneficiaries = [
  "Myself",
  "My mother",
  "My wife",
  "My girlfriend",
  "My sister",
  "My daughter",
  "A friend",
  "Other",
];
const initial = {
  role: "",
  joiningFor: "",
  problems: [],
  otherProblem: "",
  tried: [],
  disliked: "",
  ageBand: "",
  stage: "",
  name: "",
  phone: "",
  email: "",
  city: "",
  consent: false,
  website: "",
};
const titles = [
  "First, a little about you.",
  "Who are you joining for?",
  "What feels familiar?",
  "What have you tried?",
  "Meet her where she is.",
  "Let’s stay in touch.",
  "One last little thing.",
];
const subtitles = [
  "Everyone who cares about a woman belongs here.",
  "Care comes in many forms.",
  "For you, or the woman you’re joining for. Choose as many as you like.",
  "Every experience helps us build something more thoughtful.",
  "Life stages help us make learning more relevant. This is optional.",
  "Only your name and one way to reach you are required.",
  "Location is optional. Your consent is essential.",
];
export default function Join() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0),
    [form, setForm] = useState(() => {
      let related = [];
      try {
        const saved = JSON.parse(
          sessionStorage.getItem("dayli-related") || "[]",
        );
        related = Array.isArray(saved) ? saved : [];
      } catch {}
      return {
        ...initial,
        problems: related.filter((t) =>
          Object.values(symptomGroups).flat().includes(t),
        ),
      };
    }),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [success, setSuccess] = useState(false),
    [copied, setCopied] = useState(false);
  const heading = useRef(null);
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const toggle = (key, value) =>
    set(
      key,
      form[key].includes(value)
        ? form[key].filter((v) => v !== value)
        : [...form[key], value],
    );
  const go = (n) => {
    setError("");
    setStep(n);
    setTimeout(() => heading.current?.focus(), 0);
  };
  const next = () => {
    if (step === 5) {
      if (!form.name.trim()) {
        setError("Please tell us your name.");
        return;
      }
      if (!form.phone.trim() && !form.email.trim()) {
        setError("Please add a phone number or email so we can reach you.");
        return;
      }
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (form.phone && !/^\+?[\d\s()-]{7,20}$/.test(form.phone)) {
        setError("Please enter a valid phone number.");
        return;
      }
    }
    go(step + 1);
  };
  async function submit(e) {
    e.preventDefault();
    if (!form.consent) {
      setError("Please confirm your consent before joining.");
      return;
    }
    if (
      window.location.protocol === "file:" ||
      window.__DAYLI_OFFLINE_PREVIEW__ === true
    ) {
      setError(
        "This is an offline preview. Registration becomes available after the live site is connected.",
      );
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          interest: params.get("interest") || "",
          consentVersion: "2026-10-31",
        }),
      });
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Registration is not connected yet. Please come back soon. Your details have not been submitted.",
        );
      }
      if (!response.ok)
        throw new Error(
          data.error || "We couldn’t submit your details. Please try again.",
        );
      setSuccess(true);
      setForm({ ...initial });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/join`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError(`Invite link: ${window.location.origin}/join`);
    }
  }
  return (
    <>
      <section className="page-intro join-intro section-wrap">
        <Eyebrow>THE DD MOVEMENT</Eyebrow>
        <h1>
          A movement built around women.
          <br />
          <em>Open to everyone who cares.</em>
        </h1>
        <p>
          Moms, daughters, sons, husbands, boyfriends, brothers, friends.
          <br />
          If a woman matters to you, you belong here.
        </p>
        <span className="outline-badge">
          <span className="status-dot" /> FREE TO JOIN · BEFORE WE LAUNCH
        </span>
      </section>
      <section className="join-form-section section-wrap" id="join-form">
        <div className="form-side">
          <Eyebrow>A SMALL STEP. A SHARED BEGINNING.</Eyebrow>
          <h2>
            {success ? "You belong" : "Let’s make"}
            <br />
            <em>{success ? "here." : "everyday better."}</em>
          </h2>
          <p>
            Don’t add another habit.
            <br />
            Upgrade an existing one.
          </p>
          <Botanical variant="sprout" />
          <small>
            Your story is yours to share.
            <br />
            Every question is optional except your
            <br />
            name, a contact detail and consent.
          </small>
        </div>
        <div className="form-card">
          {success ? (
            <div className="success-screen" role="status">
              <div className="success-burst">
                <Check size={35} />
                {Array.from({ length: 10 }, (_, i) => (
                  <i key={i} style={{ "--i": i }} />
                ))}
              </div>
              <Eyebrow>THE DD MOVEMENT</Eyebrow>
              <h2>
                Welcome to
                <br />
                <em>the Movement.</em>
              </h2>
              <p>
                Your registration is received. We’ll share community updates,
                learning opportunities and launch news using the contact details
                you provided.
              </p>
              <p>A little care is even better when it’s shared.</p>
              <h4>Invite someone who matters to you</h4>
              <div className="share-actions">
                <a
                  className="button"
                  href={`https://wa.me/?text=${encodeURIComponent(`I’m joining the DD Movement — everyday nutrition, built with women. Join me: ${window.location.origin}/join`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Share2 size={17} /> WhatsApp
                </a>
                <button className="button button-outline" onClick={copy}>
                  <Copy size={16} />
                  {copied ? "Link copied" : "Copy link"}
                </button>
              </div>
              {error && <p role="alert">{error}</p>}
            </div>
          ) : (
            <form
              onSubmit={
                step === 6
                  ? submit
                  : (e) => {
                      e.preventDefault();
                      next();
                    }
              }
              noValidate
            >
              <div className="form-progress-top">
                <span>YOUR PLACE IN THE MOVEMENT</span>
                <span>
                  0{step + 1} <span>/ 07</span>
                </span>
              </div>
              <div
                className="form-progress"
                role="progressbar"
                aria-label="Registration progress"
                aria-valuenow={step + 1}
                aria-valuemin="0"
                aria-valuemax="7"
              >
                <span style={{ width: `${((step + 1) / 7) * 100}%` }} />
              </div>
              <div className="form-step" key={step}>
                <h3 tabIndex="-1" ref={heading}>
                  {titles[step]}
                </h3>
                <p>{subtitles[step]}</p>
                {step === 0 && (
                  <div className="option-grid">
                    {roles.map((r) => (
                      <button
                        type="button"
                        key={r}
                        aria-pressed={form.role === r}
                        className={`option-card ${form.role === r ? "selected" : ""}`}
                        onClick={() => {
                          setForm((f) => ({ ...f, role: r, joiningFor: "" }));
                          go(1);
                        }}
                      >
                        <PersonIllustration role={r} />
                        <span>{r}</span>
                        {form.role === r && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <div className="option-grid">
                    {beneficiaries.map((r) => (
                      <button
                        type="button"
                        key={r}
                        aria-pressed={form.joiningFor === r}
                        className={`option-card ${form.joiningFor === r ? "selected" : ""}`}
                        onClick={() => {
                          set("joiningFor", r);
                          go(2);
                        }}
                      >
                        <PersonIllustration
                          role={r === "Myself" ? form.role : r}
                        />
                        <span>{r}</span>
                        {form.joiningFor === r && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="symptom-options">
                    {Object.entries(symptomGroups).map(([group, items]) => (
                      <fieldset key={group}>
                        <legend>{group}</legend>
                        <div className="chip-group">
                          {items.map((p) => (
                            <button
                              type="button"
                              key={p}
                              className={`chip ${form.problems.includes(p) ? "selected" : ""}`}
                              aria-pressed={form.problems.includes(p)}
                              onClick={() => toggle("problems", p)}
                            >
                              {form.problems.includes(p) && <Check size={12} />}{" "}
                              {p}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    ))}
                    {form.problems.includes("Other") && (
                      <label className="field">
                        Anything else you’d like to share?
                        <input
                          value={form.otherProblem}
                          onChange={(e) => set("otherProblem", e.target.value)}
                          maxLength={500}
                        />
                      </label>
                    )}
                  </div>
                )}
                {step === 3 && (
                  <>
                    <div className="option-grid tried-grid">
                      {[
                        "Tablets",
                        "Powders",
                        "Gummies",
                        "Syrups",
                        "Nothing yet",
                        "Other",
                      ].map((t) => (
                        <button
                          type="button"
                          key={t}
                          className={`option-card ${form.tried.includes(t) ? "selected" : ""}`}
                          aria-pressed={form.tried.includes(t)}
                          onClick={() => {
                            if (t === "Nothing yet")
                              set("tried", form.tried.includes(t) ? [] : [t]);
                            else
                              set(
                                "tried",
                                form.tried.includes(t)
                                  ? form.tried.filter((x) => x !== t)
                                  : [
                                      ...form.tried.filter(
                                        (x) => x !== "Nothing yet",
                                      ),
                                      t,
                                    ],
                              );
                          }}
                        >
                          <Icon name="leaf" size={22} />
                          <span>{t}</span>
                        </button>
                      ))}
                    </div>
                    <label className="field">
                      What did you dislike? <span>(optional)</span>
                      <textarea
                        rows="2"
                        maxLength={1000}
                        value={form.disliked}
                        onChange={(e) => set("disliked", e.target.value)}
                        placeholder="Your honest experience is welcome."
                      />
                    </label>
                  </>
                )}
                {step === 4 && (
                  <>
                    <fieldset className="age-options">
                      <legend>
                        Age band <span>(optional)</span>
                      </legend>
                      <div className="chip-group">
                        {["18–25", "26–35", "36–45", "46–55", "55+"].map(
                          (t) => (
                            <button
                              type="button"
                              key={t}
                              className={`chip ${form.ageBand === t ? "selected" : ""}`}
                              aria-pressed={form.ageBand === t}
                              onClick={() =>
                                set("ageBand", form.ageBand === t ? "" : t)
                              }
                            >
                              {t}
                            </button>
                          ),
                        )}
                      </div>
                    </fieldset>
                    <label className="field">
                      Life stage <span>(optional)</span>
                      <select
                        value={form.stage}
                        onChange={(e) => set("stage", e.target.value)}
                      >
                        <option value="">Choose a stage</option>
                        {[
                          "18+ and menstruating",
                          "Planning pregnancy",
                          "Pregnant",
                          "New mom (breastfeeding)",
                          "Perimenopause",
                          "Menopause",
                          "Post-menopause",
                          "Prefer not to say",
                        ].map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </label>
                    <p className="fine-print">
                      Learning about someone else? Please share only what you
                      have permission to share.
                    </p>
                  </>
                )}
                {step === 5 && (
                  <>
                    <label className="field">
                      Your name <span>(required)</span>
                      <input
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        maxLength={100}
                        placeholder="What should we call you?"
                        required
                      />
                    </label>
                    <div className="contact-or">
                      <label className="field">
                        Phone number
                        <input
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          maxLength={24}
                          placeholder="+91"
                        />
                      </label>
                      <span>or</span>
                      <label className="field">
                        Email address
                        <input
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          maxLength={254}
                          placeholder="you@example.com"
                        />
                      </label>
                    </div>
                    <p className="fine-print">
                      One way to reach you is enough. We’ll use it for DAYLI
                      community updates.
                    </p>
                  </>
                )}
                {step === 6 && (
                  <>
                    <label className="field">
                      City or location <span>(optional)</span>
                      <input
                        autoComplete="address-level2"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                        maxLength={100}
                        placeholder="Where are you joining from?"
                      />
                    </label>
                    <button
                      type="button"
                      className="text-link skip-location"
                      onClick={() => set("city", "")}
                    >
                      {form.city ? "Skip location & clear" : "Skip location"}{" "}
                      <ArrowRight size={14} />
                    </button>
                    <label className="consent">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        required
                      />
                      <span>
                        I agree to share this information with DAYLI to help
                        shape products for Indian women. I understand I can ask
                        for deletion any time.{" "}
                        <Link to="/privacy" target="_blank">
                          Read our Privacy notice.
                        </Link>
                      </span>
                    </label>
                    <p className="fine-print">
                      Please don’t share someone else’s identifiable health
                      information without their permission.
                    </p>
                  </>
                )}
              </div>
              <label className="honeypot" aria-hidden="true">
                Leave this empty
                <input
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                />
              </label>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <div className="form-actions">
                {step > 0 ? (
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => go(step - 1)}
                    disabled={busy}
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                ) : (
                  <span />
                )}
                <div>
                  {step < 5 && (
                    <button
                      type="button"
                      className="skip-button"
                      onClick={() => {
                        if (step === 0)
                          setForm((f) => ({ ...f, role: "", joiningFor: "" }));
                        if (step === 1) set("joiningFor", "");
                        if (step === 2)
                          setForm((f) => ({
                            ...f,
                            problems: [],
                            otherProblem: "",
                          }));
                        if (step === 3)
                          setForm((f) => ({ ...f, tried: [], disliked: "" }));
                        if (step === 4)
                          setForm((f) => ({ ...f, ageBand: "", stage: "" }));
                        go(step + 1);
                      }}
                    >
                      Skip
                    </button>
                  )}
                  <button
                    type={step === 6 ? "submit" : "button"}
                    onClick={step === 6 ? undefined : next}
                    className="button"
                    disabled={busy}
                  >
                    {busy ? (
                      <>
                        <LoaderCircle className="spin" size={17} /> Sending…
                      </>
                    ) : step === 6 ? (
                      <>
                        Join the Movement <ArrowRight size={16} />
                      </>
                    ) : (
                      <>
                        Continue <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
      <section className="perks section-wrap">
        {[
          ["flower", "Founding member", "A DAYLI subscription at launch."],
          [
            "spark",
            "Learn, together",
            "Doctor and expert-led sessions, guides and Q&As.",
          ],
          [
            "heart",
            "Your voice matters",
            "First access to samples. Feedback that shapes the product.",
          ],
          [
            "sprout",
            "Build with us",
            "Help shape everyday health products for Indian women.",
          ],
        ].map(([i, t, d]) => (
          <div key={t}>
            <Icon name={i} size={26} />
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
        <small>Founding perks are limited to early members.</small>
      </section>
      <section className="faq section-wrap">
        <div>
          <Eyebrow>A LITTLE MORE CLARITY</Eyebrow>
          <h2>
            Good questions.
            <br />
            <em>Honest answers.</em>
          </h2>
        </div>
        <div>
          {faqs.map(([q, a]) => (
            <Accordion key={q} title={q}>
              <p>{a}</p>
            </Accordion>
          ))}
        </div>
      </section>
    </>
  );
}
