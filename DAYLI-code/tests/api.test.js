import test from "node:test";
import assert from "node:assert/strict";
import handler, { validateSignup } from "../api/join.js";
const valid = {
  name: "Test Member",
  email: "member@example.com",
  consent: true,
};
function response() {
  return {
    code: 200,
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(n) {
      this.code = n;
      return this;
    },
    json(data) {
      this.data = data;
      return this;
    },
  };
}
function request(body = valid) {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "dayli.example",
      origin: "https://dayli.example",
    },
    body,
  };
}
test("Only name, one contact detail and consent are required", () => {
  assert.equal(validateSignup(valid), null);
  assert.equal(
    validateSignup({ name: "Member", phone: "+91 98765 43210", consent: true }),
    null,
  );
});
test("Rejects missing consent, malformed contacts, oversized and invalid optional fields", () => {
  for (const data of [
    { ...valid, name: "" },
    { ...valid, consent: false },
    { ...valid, email: "invalid" },
    { ...valid, email: "", phone: "" },
    { ...valid, problems: "Hair fall" },
    { ...valid, tried: [8] },
    { ...valid, website: "spam" },
    { ...valid, city: "x".repeat(1001) },
  ])
    assert.ok(validateSignup(data));
});
test("Unconfigured backend never claims a successful registration", async () => {
  const old = process.env.DAYLI_SIGNUP_WEBHOOK_URL;
  delete process.env.DAYLI_SIGNUP_WEBHOOK_URL;
  try {
    const res = response();
    await handler(request(), res);
    assert.equal(res.code, 503);
    assert.match(res.data.error, /not connected/);
  } finally {
    if (old !== undefined) process.env.DAYLI_SIGNUP_WEBHOOK_URL = old;
  }
});
test("Rejects cross-origin requests and unsupported methods", async () => {
  const req = request();
  req.headers.origin = "https://elsewhere.example";
  let res = response();
  await handler(req, res);
  assert.equal(res.code, 403);
  res = response();
  await handler({ ...request(), method: "GET" }, res);
  assert.equal(res.code, 405);
});
test("Webhook success is required before returning success, and only selected fields are sent", async () => {
  const oldFetch = globalThis.fetch,
    oldUrl = process.env.DAYLI_SIGNUP_WEBHOOK_URL,
    oldReady = process.env.DAYLI_PRIVACY_READY;
  process.env.DAYLI_SIGNUP_WEBHOOK_URL = "https://hooks.example/signup";
  process.env.DAYLI_PRIVACY_READY = "true";
  try {
    let sent;
    globalThis.fetch = async (url, opts) => {
      sent = JSON.parse(opts.body);
      return { ok: true };
    };
    let res = response();
    await handler(request({ ...valid, unknown: "not forwarded" }), res);
    assert.equal(res.code, 201);
    assert.equal(sent.name, "Test Member");
    assert.equal(sent.consent, true);
    assert.equal(sent.unknown, undefined);
    globalThis.fetch = async () => ({ ok: false });
    res = response();
    await handler(request(), res);
    assert.equal(res.code, 502);
    globalThis.fetch = async () => {
      throw new Error("timeout");
    };
    res = response();
    await handler(request(), res);
    assert.equal(res.code, 502);
  } finally {
    globalThis.fetch = oldFetch;
    if (oldUrl === undefined) delete process.env.DAYLI_SIGNUP_WEBHOOK_URL;
    else process.env.DAYLI_SIGNUP_WEBHOOK_URL = oldUrl;
    if (oldReady === undefined) delete process.env.DAYLI_PRIVACY_READY;
    else process.env.DAYLI_PRIVACY_READY = oldReady;
  }
});
