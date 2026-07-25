import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://fahrklar.test/", {
      headers: {
        accept: "text/html",
        host: "fahrklar.test",
        "x-forwarded-host": "fahrklar.test",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Fahrklar product and social metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Fahrklar — German Practical Driving Test Trainer<\/title>/i,
  );
  assert.match(html, /FAHRKLAR/);
  assert.match(html, /Не угадывай/);
  assert.match(html, /PRAKTISCHE FAHRPRÜFUNG/);
  assert.match(html, /https:\/\/fahrklar\.test\/og\.png/);
  assert.match(html, /name="robots" content="index, follow"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("ships all generated scenarios and interactive learning modules", async () => {
  const scenarioRoot = new URL("../public/scenarios/", import.meta.url);
  const files = (await readdir(scenarioRoot)).sort();
  assert.equal(files.length, 40);
  assert.ok(files.every((file) => file.endsWith(".webp")));

  for (const file of files) {
    const fileStat = await stat(new URL(file, scenarioRoot));
    assert.ok(fileStat.size < 100_000, `${file} should stay mobile-friendly`);
  }

  const [app, data, packageJson] = await Promise.all([
    readFile(new URL("../app/FahrklarApp.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(app, /localStorage/);
  assert.match(app, /speechSynthesis/);
  assert.match(app, /ScenarioTrainer/);
  assert.match(app, /TechTrainer/);
  assert.match(app, /ExamMode/);
  assert.match(data, /railway-crossing/);
  assert.match(data, /tram-stop-passengers/);
  assert.match(data, /bremskraftverstaerker/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});
