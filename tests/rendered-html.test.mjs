import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the FourNineEight specification schedule", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>FourNineEight \| Apartment 1 Interior Specifications<\/title>/i);
  assert.match(html, /Apartment 1 Interior Specifications/);
  assert.match(html, /Search item, location or specification/);
  assert.match(html, /Download PDF/);
});

test("includes all specification rows and the downloadable source PDF", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const rowCount = (source.match(/^\s+r\(/gm) ?? []).length;

  assert.equal(rowCount, 70);
  assert.match(source, /role="dialog"/);
  assert.match(source, /ArrowLeft/);
  assert.match(source, /ArrowRight/);
  await access(new URL("../public/fournineeight-apartment-1-specifications.pdf", import.meta.url));
});
