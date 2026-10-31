# DAYLI

A responsive pre-launch community and education website for DAYLI, built with React, Vite and a Vercel Node.js signup function. Custom SVG illustrations and locally hosted fonts; no external image or font service is required.

## Run locally

Requires Node.js 22.12+ (tested on Node.js 24) and npm.

```sh
npm ci
npm run dev
```

Vite runs the frontend. For the serverless signup endpoint locally, use `npx vercel dev` with your Vercel project and environment variables. Plain Vite deliberately shows an honest “not connected” message on submission instead of pretending to register anyone.

```sh
npm run build       # Production files in dist/
npm run preview     # Serve the production frontend
npm test            # Five signup endpoint tests
npm run test:e2e    # Desktop and mobile browser flows
```

Browser tests use `/usr/bin/chromium` when present, otherwise Playwright’s installed Chromium. Run `npx playwright install chromium` on a new machine or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to your browser. The environment used here blocks the Playwright download domain, but includes system Chromium.

## Deploy on Vercel

1. Push this repository to GitHub and import it into Vercel.
2. If this checkout is the repository root, leave **Root Directory** empty. Framework: **Vite**. Build: `npm run build`. Output: `dist`. Install: `npm ci`.
3. Deploy. `vercel.json` preserves `/api/*` routes and serves React routes directly, including `/learn` and `/join`.
4. Set the variables below as needed, then redeploy. Public `VITE_` settings are embedded at build time; webhook secrets stay on the server.

No deployment or Git push has been performed by this implementation.

## Connect registration

The seven-step form collects one question at a time. Only name, email **or** phone, and consent are required. Other answers can be skipped. Health/contact data is not stored in localStorage, browser analytics or server logs by this application.

The serverless function at `api/join.js` validates submissions and forwards JSON to a webhook you control. The UI shows success only after the webhook responds with a successful HTTP status. No configured endpoint means a clear unavailable message; answers remain in React memory for retry and disappear on reload.

| Variable                     | Purpose                                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DAYLI_SIGNUP_WEBHOOK_URL`   | Server-only HTTPS endpoint that durably stores registrations in your chosen CMS, Google Sheet or Airtable. It must accept JSON directly and return 2xx only after storage succeeds. Redirects are rejected. Use an adapter if your provider needs redirects or a different request format. |
| `DAYLI_SIGNUP_WEBHOOK_TOKEN` | Optional server-only bearer token for an endpoint you control.                                                                                                                                                                                                                             |
| `DAYLI_PRIVACY_READY`        | Set to `true` after publishing the final privacy contact, service provider and retention details. Until then, live collection stays disabled.                                                                                                                                              |
| `VITE_CONTACT_EMAIL`         | Verified public contact/deletion email. Displays on Contact and Privacy pages.                                                                                                                                                                                                             |
| `VITE_INSTAGRAM_URL`         | Verified Instagram profile URL. When blank, the footer links to Contact instead of an invented account.                                                                                                                                                                                    |
| `VITE_JOINED_COUNT`          | Optional verified signup total. When blank, the homepage displays the brief’s founder conversation count, not a fictitious live community count.                                                                                                                                           |

See `.env.example`; never commit real credentials. The webhook must implement storage, deduplication, deletion requests and any service-specific authentication. Configure Vercel Firewall/rate limits before exposing public collection. On a timeout the UI says confirmation failed; your receiver should deduplicate retries by contact detail.

Example payload (illustrative data):

```json
{
  "name": "Example Member",
  "email": "member@example.com",
  "phone": "",
  "role": "Daughter",
  "joiningFor": "My mother",
  "problems": ["Constant tiredness"],
  "otherProblem": "",
  "tried": ["Tablets"],
  "disliked": "",
  "ageBand": "46–55",
  "stage": "Perimenopause",
  "city": "",
  "interest": "",
  "consent": true,
  "consentVersion": "2026-10-31",
  "submittedAt": "<server-generated ISO timestamp>",
  "source": "dayli-web"
}
```

## Pages and editing

- `/`: hero, founder story, three statistics, exploration doorways and movement invitation.
- `/problems`: categorized swipeable experience carousel. Familiar experiences are kept only in sessionStorage for the current browser tab and prefill the join form when matched.
- `/research`: national anaemia statistic with source, explicit unfilled research slots, founder conversations and in-development product concepts.
- `/learn`: seven life stages, five information tabs, interactive body map with tappable areas and nutrient dialogs, mood panel and expert-session interest link.
- `/join`: optional experience questions, required contact and consent, validation, error states, confirmed success, WhatsApp and copy-link sharing.
- `/privacy`, `/terms`, `/contact`: pre-launch information and contact configuration.

`src/data.js` holds education, experiences, source labels and FAQs. `src/config.js` handles optional public brand settings. Visual styles live in `src/styles.css`. `src/LifeStageIllustration.jsx` contains the life-stage scenes; `src/BodyExplorer.jsx` contains the interactive body map, area explanations and nutrient links. Shared illustrations are SVG React components in `src/components.jsx`. The chocolate packaging is a concept illustration, not final product artwork.

## Before opening registration

Publish your actual privacy contact, storage provider and retention period in `/privacy`; confirm founding subscription terms; enter verified contact/social details. Finalise clinical review and full citations before presenting pending education references as reviewed. The two missing research numbers remain blank. Education figures supplied without a full citation are explicitly labelled as awaiting verification. No reviewer, launch date, purchase price or national statistic has been invented.

The Framer reference could not be inspected because the cloud proxy denied `daylineeds.framer.website`. The implementation follows the supplied detailed brief; it is not a verified reproduction of that reference.
