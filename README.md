# Fahrklar

[![CI](https://github.com/kanuwrld/fahrklar-klasse-b/actions/workflows/ci.yml/badge.svg)](https://github.com/kanuwrld/fahrklar-klasse-b/actions/workflows/ci.yml)
[![Live on Vercel](https://img.shields.io/badge/live-Vercel-000000?logo=vercel)](https://fahrklar-klasse-b.vercel.app)
[![Security](https://img.shields.io/badge/npm%20audit-0%20vulnerabilities-2ea44f)](SECURITY.md)

[Live demo](https://fahrklar-klasse-b.vercel.app) ·
[Deutsch](README.de.md) ·
[Русский](README.ru.md) ·
[Project management](PROJECT_MANAGEMENT.md) ·
[Architecture](docs/architecture.md) ·
[Security](SECURITY.md)

![Fahrklar social preview](public/og.png)

Fahrklar is a mobile-first training product for the German practical driving
test (`Fahrprüfung Klasse B`). It combines German examiner language with clear
Russian explanations, visual decision exercises and vehicle-check preparation.

Product targets multilingual learners in Germany. Repository documentation is
available in English, German and Russian for international review.

## Live product

**Production:** [fahrklar-klasse-b.vercel.app](https://fahrklar-klasse-b.vercel.app)

No account required. Progress stays on current device.

## Product scope

- first-run onboarding for exam date, preparation stage and weak topics;
- 20 visual road situations with safe/unsafe decisions;
- 40 compressed, mobile-friendly WebP assets;
- 36 vehicle-check and technical questions;
- German examiner commands with browser speech playback;
- five `Grundfahraufgaben` manoeuvre guides;
- timed 12-question mock exam;
- automatic error-review queue;
- local progress tracking;
- responsive desktop and mobile interface;
- readable type scale with stronger secondary-text contrast.

## Engineering highlights

- typed learning content and reusable React training modules;
- Next.js App Router with server-rendered metadata;
- native Next.js production build for Vercel;
- retained Vinext build for Cloudflare-compatible deployment;
- no backend, accounts, cookies or analytics;
- Content Security Policy and defensive HTTP headers;
- CI covering lint, TypeScript, both production builds, tests and audit;
- asset-budget test keeps every scenario image below 100 KB;
- zero known npm vulnerabilities at last validation.

## Local development

Requirements: Node.js `>=22.13.0`.

```bash
npm ci
npm run dev:vercel
```

Open `http://localhost:3000`.

## Validation

```bash
npm run check
```

This runs linting, TypeScript checks, Vinext build and render tests, native
Next.js build, plus production dependency audit.

## Architecture

```text
typed training data
        |
        v
React learning modules ---> browser localStorage
        |
        +-- situations
        +-- vehicle checks
        +-- examiner commands
        +-- mock exam
        +-- error review
```

Detailed decisions: [docs/architecture.md](docs/architecture.md).

## Privacy and security

Fahrklar sends no learner profile or progress to a server. Optional display
name, exam date, focus topics and results use `localStorage` only. Repository
requires no runtime secrets. See [SECURITY.md](SECURITY.md) for reporting and
controls.

## Official references

- [German Road Traffic Regulations — StVO](https://www.gesetze-im-internet.de/stvo_2013/)
- [FeV Annex 7 — driving licence examination](https://www.gesetze-im-internet.de/fev_2010/anlage_7.html)
- [Federal Ministry of Transport — driving licence examination](https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/fahrerlaubnispruefung.html)

## Disclaimer

Training scenarios and images are educational material. Fahrklar is not an
official TÜV/DEKRA question catalogue, is not affiliated with TÜV, DEKRA or
ADAC, and does not replace lessons with a qualified driving instructor.
