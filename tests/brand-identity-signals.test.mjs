import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { render } from "./test-worker.mjs";

const [contract, icon, appleIcon, favicon] = await Promise.all([
  readFile(new URL("../app/brand-identity-signals.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/icon.png", import.meta.url)),
  readFile(new URL("../app/apple-icon.png", import.meta.url)),
  readFile(new URL("../app/favicon.ico", import.meta.url)),
]);

function pngDimensions(file) {
  assert.equal(file.subarray(1, 4).toString("ascii"), "PNG");
  return {
    width: file.readUInt32BE(16),
    height: file.readUInt32BE(20),
  };
}

function jsonLd(html) {
  return [...html.matchAll(
    /<script type="application\/ld\+json">([^<]+)<\/script>/g,
  )].map((match) => JSON.parse(match[1]));
}

test("keeps preferred and alternate site names consistent in initial Home HTML", async () => {
  const response = await render("/");
  const html = await response.text();
  const documents = jsonLd(html);
  const graph = documents.find((document) => Array.isArray(document["@graph"]))?.["@graph"];
  const website = graph?.find(
    (node) => node["@id"] === "https://luxeeventco.ca/#website",
  );

  assert.equal(response.status, 200);
  assert.equal(website?.["@type"], "WebSite");
  assert.equal(website?.name, "Luxe Event Co.");
  assert.deepEqual(website?.alternateName, ["Luxe Event Co", "luxeeventco.ca"]);
  assert.equal(website?.url, "https://luxeeventco.ca");
  assert.match(html, /<meta property="og:site_name" content="Luxe Event Co\."/);
  assert.match(html, /<meta name="application-name" content="Luxe Event Co\."/);
  assert.match(html, /<h1(?:\s|>)/);
  assert.match(html, /Luxe Event Co\./);
  assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/i);
});

test("declares stable favicon and Apple touch icon assets", async () => {
  const html = await (await render("/")).text();

  assert.match(
    html,
    /<link rel="icon" href="https:\/\/luxeeventco\.ca\/favicon\.ico(?:\?[^"]+)?"/,
  );
  assert.match(html, /<link rel="icon" href="https:\/\/luxeeventco\.ca\/icon\.png"/);
  assert.match(
    html,
    /<link rel="apple-touch-icon" href="https:\/\/luxeeventco\.ca\/apple-icon\.png"/,
  );

  assert.deepEqual(pngDimensions(icon), { width: 1254, height: 1254 });
  assert.deepEqual(pngDimensions(appleIcon), { width: 180, height: 180 });
  assert.ok(favicon.length > 0);
  assert.equal(favicon.readUInt16LE(0), 0);
  assert.equal(favicon.readUInt16LE(2), 1);

  for (const path of ["/icon.png", "/apple-icon.png", "/favicon.ico"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
});

test("uses one high-resolution organization logo identity", async () => {
  const html = await (await render("/")).text();
  const documents = jsonLd(html);
  const graph = documents.find((document) => Array.isArray(document["@graph"]))?.["@graph"];
  const organization = graph?.find(
    (node) => node["@id"] === "https://luxeeventco.ca/#organization",
  );
  const logo = graph?.find(
    (node) => node["@id"] === "https://luxeeventco.ca/#logo",
  );

  assert.deepEqual(organization?.logo, {
    "@id": "https://luxeeventco.ca/#logo",
  });
  assert.equal(logo?.["@type"], "ImageObject");
  assert.equal(logo?.url, "https://luxeeventco.ca/google-thumbnail.png");
  assert.equal(logo?.width, 1200);
  assert.equal(logo?.height, 1200);
  assert.match(
    contract,
    /does not guarantee the site name or favicon Google displays/i,
  );
});
