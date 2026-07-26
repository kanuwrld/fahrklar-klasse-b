# Security Policy

## Supported version

Security fixes are applied to the latest commit on `main`.

## Reporting a vulnerability

Please use
[GitHub Private Vulnerability Reporting](https://github.com/kanuwrld/fahrklar-klasse-b/security/advisories/new).
Do not disclose a suspected vulnerability in a public issue.

Include:

- affected page or component;
- reproduction steps;
- expected and actual behaviour;
- potential impact;
- screenshots or proof-of-concept code when useful.

## Data and privacy model

Fahrklar has no accounts, backend database, analytics SDK or advertising
tracker. Training progress stays in the browser through `localStorage`.

The repository requires no API keys or runtime secrets. Generated road-scene
images are static assets. External links open official reference pages only.

## Security controls

- GitHub secret scanning and push protection;
- Dependabot alerts and automated security updates;
- read-only GitHub Actions permissions;
- immutable commit pins for third-party GitHub Actions;
- public-repository and Vercel-upload boundary checks in CI;
- production dependency audit in CI;
- Content Security Policy and defensive HTTP headers;
- no collection or transmission of learner progress.
