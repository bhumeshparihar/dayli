// Vercel Node.js Function. No signup data is retained by this function.
// The configured webhook is responsible for durable storage and deletion.
export function validateSignup(body) {
  if (!body || typeof body !== "object" || Array.isArray(body))
    return "Invalid submission.";
  if (body.website) return "Unable to accept this submission.";
  if (
    typeof body.name !== "string" ||
    !body.name.trim() ||
    body.name.length > 100
  )
    return "Please enter your name (up to 100 characters).";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!email && !phone) return "Please add a phone number or email.";
  if (
    email &&
    (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  )
    return "Please enter a valid email address.";
  if (phone && !/^\+?[\d\s()-]{7,20}$/.test(phone))
    return "Please enter a valid phone number.";
  if (body.consent !== true)
    return "Please confirm your consent before joining.";
  for (const key of [
    "role",
    "joiningFor",
    "otherProblem",
    "disliked",
    "ageBand",
    "stage",
    "city",
    "interest",
  ]) {
    if (
      body[key] != null &&
      (typeof body[key] !== "string" || body[key].length > 1000)
    )
      return "An answer is too long or invalid.";
  }
  for (const key of ["problems", "tried"]) {
    if (
      body[key] != null &&
      (!Array.isArray(body[key]) ||
        body[key].length > 30 ||
        body[key].some((v) => typeof v !== "string" || v.length > 100))
    )
      return "Invalid selection.";
  }
  return null;
}
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (req.headers["content-type"]?.split(";")[0] !== "application/json")
    return res.status(415).json({ error: "Please send JSON." });
  if (Number(req.headers["content-length"]) > 20000)
    return res.status(413).json({ error: "Submission is too large." });
  // Browser requests must come from this deployment. No permissive CORS.
  const origin = req.headers.origin;
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.host)
        return res
          .status(403)
          .json({ error: "Please use the DAYLI website to join." });
    } catch {
      return res.status(403).json({ error: "Invalid origin." });
    }
  }
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid submission." });
    }
  }
  if (Buffer.byteLength(JSON.stringify(body ?? null)) > 20000)
    return res.status(413).json({ error: "Submission is too large." });
  const error = validateSignup(body);
  if (error) return res.status(400).json({ error });
  const endpoint = process.env.DAYLI_SIGNUP_WEBHOOK_URL;
  if (!endpoint)
    return res.status(503).json({
      error:
        "Registration is not connected yet. Please come back soon. Your details have not been submitted.",
    });
  // Keep live collection off until the owner confirms the published privacy notice.
  if (process.env.DAYLI_PRIVACY_READY !== "true")
    return res.status(503).json({
      error:
        "Registration is opening soon. Our privacy details are being finalised. Your details have not been submitted.",
    });
  let webhook;
  try {
    webhook = new URL(endpoint);
    if (webhook.protocol !== "https:") throw new Error();
  } catch {
    return res.status(503).json({
      error: "Registration is temporarily unavailable. Please try again later.",
    });
  }
  const payload = {};
  for (const key of [
    "name",
    "phone",
    "email",
    "role",
    "joiningFor",
    "problems",
    "otherProblem",
    "tried",
    "disliked",
    "ageBand",
    "stage",
    "city",
    "interest",
  ]) {
    const v = body[key];
    payload[key] = Array.isArray(v)
      ? v.map((x) => x.trim())
      : typeof v === "string"
        ? v.trim()
        : "";
  }
  payload.consent = true;
  payload.consentVersion = "2026-10-31";
  payload.submittedAt = new Date().toISOString();
  payload.source = "dayli-web";
  try {
    const headers = { "Content-Type": "application/json" };
    if (process.env.DAYLI_SIGNUP_WEBHOOK_TOKEN)
      headers.Authorization = `Bearer ${process.env.DAYLI_SIGNUP_WEBHOOK_TOKEN}`;
    const result = await fetch(webhook, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!result.ok)
      return res.status(502).json({
        error: "We couldn’t confirm your registration. Please try again later.",
      });
    return res.status(201).json({ ok: true });
  } catch {
    return res.status(502).json({
      error: "We couldn’t confirm your registration. Please try again later.",
    });
  }
}
