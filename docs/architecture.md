# Architecture

## Product boundary

Fahrklar is a client-focused learning application. It does not need accounts,
server-side persistence or external APIs.

```text
static training data
        |
        v
first-run onboarding ---> browser localStorage
        |
        v
React learning modules
        |
        +-- road-situation trainer
        +-- vehicle-check flashcards
        +-- examiner command playback
        +-- mock exam
        +-- error review
```

## Main modules

- `app/FahrklarApp.tsx` — navigation, learning flows and local progress.
- `app/data.ts` — typed scenarios, technical questions and exam material.
- `app/globals.css` — responsive desktop and mobile presentation.
- `public/scenarios/` — 40 compressed WebP training assets.
- `tests/rendered-html.test.mjs` — server-render and asset-budget checks.

## Rendering and deployment

Application uses Next.js App Router and React Server Components for initial
rendering. Interactive training modules run on client.

Two build targets remain available:

- `npm run build:vercel` — native Next.js production build for Vercel.
- `npm run build` — Vinext/Cloudflare-compatible build retained for existing
  Sites deployment.

## State

Only local learner state is persisted:

- `fahrklar-profile-v1` — optional display name, exam date, learning stage and
  focus topics;
- `fahrklar-progress-v1` — completed situations, technical cards, errors and
  mock-exam results.

No raw audio is recorded. German pronunciation uses browser
`speechSynthesis`; availability depends on device.

## Security decisions

- no authentication surface because application stores no server data;
- no API keys, cookies or third-party analytics;
- strict security headers on native Next.js deployment;
- generated images shipped locally rather than loaded from remote domains;
- all official references open with `rel="noreferrer"`.
