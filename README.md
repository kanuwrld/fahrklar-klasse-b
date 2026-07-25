# Fahrklar — Klasse B

Интерактивный тренажёр для подготовки к практической `Fahrprüfung Klasse B`
в Германии.

## Что внутри

- 20 дорожных ситуаций формата «выбери безопасный вариант»;
- 40 мобильных WebP-изображений;
- 36 технических вопросов по машине;
- команды `Prüfer` с немецкой озвучкой;
- 5 манёвров `Grundfahraufgaben`;
- пробный экзамен из 12 заданий;
- отдельное повторение ошибок;
- сохранение прогресса в `localStorage`;
- адаптивный интерфейс для телефона и компьютера.

## Локальный запуск

Требование: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Открой адрес, который появится в терминале.

## Проверка

```bash
npm test
```

Команда собирает production-версию, проверяет серверный HTML, учебные модули и
размер всех изображений.

## Стек

- React 19
- Next.js 16
- Vinext / Vite
- TypeScript
- Cloudflare-compatible runtime

## Источники

- [Straßenverkehrs-Ordnung (StVO)](https://www.gesetze-im-internet.de/stvo_2013/)
- [FeV Anlage 7 — Fahrerlaubnisprüfung](https://www.gesetze-im-internet.de/fev_2010/anlage_7.html)
- [Bundesministerium für Verkehr — Fahrerlaubnisprüfung](https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/fahrerlaubnispruefung.html)

## Важно

Ситуации и изображения — учебный материал, не официальный
`TÜV/DEKRA-Fragenkatalog` и не замена занятиям с `Fahrlehrer`. Органы управления
и технические проверки нужно повторить в конкретном `Prüfungsfahrzeug`.

Проект не связан с TÜV, DEKRA или ADAC.
