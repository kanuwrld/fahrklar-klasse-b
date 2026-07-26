# Fahrklar

[![CI](https://github.com/kanuwrld/fahrklar-klasse-b/actions/workflows/ci.yml/badge.svg)](https://github.com/kanuwrld/fahrklar-klasse-b/actions/workflows/ci.yml)
[![Live auf Vercel](https://img.shields.io/badge/live-Vercel-000000?logo=vercel)](https://fahrklar-klasse-b.vercel.app)

[Live-Demo](https://fahrklar-klasse-b.vercel.app) ·
[English](README.md) ·
[Русский](README.ru.md) ·
[Projektmanagement](PROJECT_MANAGEMENT.md) ·
[Architektur](docs/architecture.md) ·
[Sicherheit](SECURITY.md)

![Fahrklar Vorschau](public/og.png)

Fahrklar ist ein mobiler interaktiver Trainer für die praktische
Fahrerlaubnisprüfung der Klasse B in Deutschland. Deutsche Prüfungsbegriffe
werden mit verständlichen russischen Erklärungen, visuellen
Entscheidungssituationen und technischen Kontrollfragen verbunden.

Das Produkt richtet sich an mehrsprachige Fahrschülerinnen und Fahrschüler in
Deutschland. Die Repository-Dokumentation steht auf Englisch, Deutsch und
Russisch zur Verfügung.

## Live-Produkt

**Produktion:** [fahrklar-klasse-b.vercel.app](https://fahrklar-klasse-b.vercel.app)

Keine Anmeldung erforderlich. Der Lernfortschritt bleibt auf dem jeweiligen
Gerät.

## Funktionsumfang

- 20 visuelle Verkehrssituationen mit sicherer und gefährlicher Entscheidung;
- 40 komprimierte WebP-Bilder für mobile Geräte;
- 36 technische Fragen und Fahrzeugkontrollen;
- deutsche Prüferanweisungen mit Sprachausgabe im Browser;
- fünf Anleitungen zu den `Grundfahraufgaben`;
- zeitlich begrenzte Prüfungssimulation mit 12 Aufgaben;
- gezielte Wiederholung falsch beantworteter Situationen;
- lokaler Lernfortschritt;
- responsive Oberfläche für Smartphone und Desktop.

## Technische Qualität

- typisierte Lerninhalte und wiederverwendbare React-Module;
- Next.js App Router und serverseitig erzeugte Metadaten;
- nativer Next.js-Build für Vercel;
- zusätzlicher Vinext-Build für Cloudflare-kompatible Umgebungen;
- keine Benutzerkonten, Cookies, Analyse-SDKs oder Datenbank;
- Content Security Policy und defensive HTTP-Header;
- CI für Linting, TypeScript, Tests, beide Builds und Dependency-Audit;
- jede Situationsgrafik bleibt unter 100 KB;
- keine bekannten npm-Schwachstellen bei der letzten Prüfung.

## Lokal starten

Voraussetzung: Node.js `>=22.13.0`.

```bash
npm ci
npm run dev:vercel
```

Danach `http://localhost:3000` öffnen.

## Vollständige Prüfung

```bash
npm run check
```

Weitere technische Entscheidungen:
[docs/architecture.md](docs/architecture.md).

## Datenschutz und Sicherheit

Der Lernfortschritt wird ausschließlich in `localStorage` gespeichert und
nicht an einen Server gesendet. Für das Repository sind keine API-Schlüssel
oder Laufzeit-Secrets erforderlich. Details stehen in
[SECURITY.md](SECURITY.md).

## Offizielle Quellen

- [Straßenverkehrs-Ordnung — StVO](https://www.gesetze-im-internet.de/stvo_2013/)
- [FeV Anlage 7 — Fahrerlaubnisprüfung](https://www.gesetze-im-internet.de/fev_2010/anlage_7.html)
- [Bundesministerium für Verkehr — Fahrerlaubnisprüfung](https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/fahrerlaubnispruefung.html)

## Hinweis

Die Situationen und Bilder sind Lernmaterial. Fahrklar ist kein offizieller
TÜV-/DEKRA-Fragenkatalog, steht in keiner Verbindung zu TÜV, DEKRA oder ADAC
und ersetzt keine Fahrstunden.
