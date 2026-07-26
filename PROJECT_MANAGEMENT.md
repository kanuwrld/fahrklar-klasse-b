# Project management

## Objective

Help multilingual learners practise for the German practical driving test
(`Fahrprüfung Klasse B`) while presenting a credible European portfolio
project.

Target date for current learning cycle: **7 August 2026**.

Fahrklar is supplementary training. It cannot guarantee an exam result and
does not replace a qualified `Fahrlehrer`, official rules or real driving
practice.

## Current stage

`M1 — Public training baseline` is complete:

- 20 visual decision situations and 40 mobile WebP assets;
- 36 vehicle-check and technical questions;
- examiner commands and five `Grundfahraufgaben`;
- timed mock exam, error review and local progress;
- responsive public Vercel deployment;
- English, German and Russian documentation;
- automated build, test and dependency checks.

Current milestone: `M2 — Exam readiness`.

## Workstreams

| ID | Workstream | Outcome | State |
| --- | --- | --- | --- |
| W1 | Content | Broader high-risk situation coverage | In progress |
| W2 | Accuracy | Every rule traceable to current official guidance | In progress |
| W3 | Practice | Weak topics become visible and repeatable | Baseline complete |
| W4 | Product | Fast mobile sessions without account setup | Baseline complete |
| W5 | Platform | Protected, reproducible GitHub-to-Vercel delivery | In progress |

## Delivery workflow

1. `Inbox` — idea, rule change or reported ambiguity.
2. `Ready` — source, acceptance criteria and risk defined.
3. `In progress` — one content batch or one product change.
4. `Review` — CI green; rule and mobile review pending.
5. `Done` — merged, deployed and checked against evidence.

Recommended labels:

- `type:content`, `type:bug`, `type:feature`, `type:security`;
- `area:situations`, `area:vehicle-checks`, `area:mock-exam`, `area:platform`;
- `priority:p0`, `priority:p1`, `priority:p2`;
- `status:blocked`, `needs:source`.

## Issue contract

Every issue must contain:

- learner problem;
- German term or rule involved;
- authoritative source;
- observable acceptance criteria;
- mobile/accessibility impact;
- test evidence;
- deployment and rollback note.

## Definition of done

- wording is clear in German and Russian;
- safety answer and explanation agree;
- current StVO/FeV or instructor evidence is linked;
- image contains no misleading sign, marking or priority;
- keyboard and phone interaction work;
- `npm run check` passes;
- no secret or personal data enters Git or deployment input;
- production URL is checked after merge.

## CI/CD

- Pull requests and `main` run read-only GitHub Actions.
- CI validates repository safety, lint, TypeScript, rendered output, both
  production builds and production dependencies.
- GitHub Actions dependencies use immutable commit SHAs.
- `main` requires pull requests, green CI and CodeQL.
- Vercel creates previews from pull requests and production from `main`.
- `.vercelignore` blocks local environment files and generated local state.

## Exam-readiness gate

Before 7 August 2026:

- complete three blind 12-question mock sessions at 100%;
- repeat every failed situation until answered correctly twice;
- rehearse every technical question aloud in German;
- validate ambiguous content with a `Fahrlehrer`;
- practise observation, speed choice and priority in real traffic.

## Risk register

| Risk | Severity | Control |
| --- | --- | --- |
| Incorrect or outdated traffic guidance | Critical | Official source plus instructor review |
| Generated image implies wrong right-of-way | Critical | Manual visual review and written explanation |
| False confidence from repeated questions | High | Random mock exam and real driving practice |
| Secret reaches public Git or Vercel upload | High | Ignore rules, CI scanner, GitHub push protection |
| Dependency compromise | High | Locked install, SHA-pinned Actions, audit, Dependabot |
| Mobile regression | Medium | 390 px and desktop checks before release |

## Next milestone

`M2 — Exam readiness`:

- add more urban, Autobahn, rural-road, cyclist and pedestrian situations;
- cross-check content against current official sources;
- run three blind exam simulations;
- record remaining weak topics;
- keep production stable until exam date.
