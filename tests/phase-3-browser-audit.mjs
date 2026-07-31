import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const playwrightPath = process.env.PLAYWRIGHT_MODULE_PATH;
const chromePath = process.env.CHROME_EXECUTABLE_PATH;

if (!playwrightPath || !chromePath) {
  throw new Error("PLAYWRIGHT_MODULE_PATH and CHROME_EXECUTABLE_PATH are required.");
}

const { chromium } = await import(playwrightPath);

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
const allRoutes = [
  "/",
  "/experiences",
  "/experiences/coffee-bar",
  "/experiences/sweet-cart",
  "/experiences/seating-rentals",
  "/events",
  "/events/weddings",
  "/events/corporate-events",
  "/events/brand-activations",
  "/events/baby-showers",
  "/events/bridal-showers",
  "/events/birthdays",
  "/events/private-events",
  "/gallery",
  "/faq",
  "/inquire",
];
const routes = process.env.AUDIT_ROUTE
  ? allRoutes.filter((route) => route === process.env.AUDIT_ROUTE)
  : allRoutes;

const primaryCtas = {
  "/": "Plan Your Event",
  "/experiences": "Explore an Experience",
  "/experiences/coffee-bar": "Inquire About Coffee Service",
  "/experiences/sweet-cart": "Inquire About a Dessert Experience",
  "/experiences/seating-rentals": "Discuss Your Rental Requirements",
  "/events": "Find Your Event Experience",
  "/events/weddings": "Plan Your Wedding Experience",
  "/events/corporate-events": "Discuss a Corporate Event",
  "/events/brand-activations": "Create a Branded Experience",
  "/events/baby-showers": "Plan a Baby Shower",
  "/events/bridal-showers": "Plan a Bridal Shower",
  "/events/birthdays": "Plan a Birthday Experience",
  "/events/private-events": "Discuss Your Event",
  "/gallery": "Start Planning Your Event",
  "/faq": "Ask About Your Event",
  "/inquire": "Begin Your Inquiry",
};

const allViewports = [
  { name: "small-mobile", width: 320, height: 568, isMobile: true, hasTouch: true },
  { name: "standard-mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "large-mobile-hidpi", width: 430, height: 932, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: "tablet-portrait", width: 768, height: 1024, hasTouch: true },
  { name: "tablet-landscape", width: 1024, height: 768, hasTouch: true },
  { name: "standard-laptop", width: 1280, height: 720 },
  { name: "large-desktop", width: 1440, height: 900 },
  { name: "ultrawide", width: 1920, height: 1080 },
];
const viewports = process.env.AUDIT_VIEWPORT
  ? allViewports.filter((viewport) => viewport.name === process.env.AUDIT_VIEWPORT)
  : allViewports;

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const results = [];
const failures = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.deviceScaleFactor ?? 1,
      isMobile: viewport.isMobile ?? false,
      hasTouch: viewport.hasTouch ?? false,
      reducedMotion: "reduce",
    });

    for (const route of routes) {
      const page = await context.newPage();
      const runtimeErrors = [];
      const isLocalCanonicalFaviconRequest = (url) =>
        /^https?:\/\/localhost(?::\d+)?/.test(baseUrl) &&
        url.startsWith("https://luxeeventco.ca/favicon.ico");
      page.on("console", (message) => {
        if (message.type() === "error") {
          const location = message.location();
          if (isLocalCanonicalFaviconRequest(location.url)) return;
          runtimeErrors.push(
            location.url ? `${message.text()} (${location.url})` : message.text(),
          );
        }
      });
      page.on("response", (response) => {
        if (
          response.status() >= 400 &&
          !isLocalCanonicalFaviconRequest(response.url())
        ) {
          runtimeErrors.push(`${response.status()} ${response.url()}`);
        }
      });
      page.on("pageerror", (error) => runtimeErrors.push(error.message));
      await page.addInitScript(() => {
        window.__luxeCls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__luxeCls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });

      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 45_000,
      });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);

      const audit = await page.evaluate((ctaLabel) => {
        const isVisible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          const closedDisclosure = element.closest("details:not([open])");
          const hiddenDisclosureContent =
            closedDisclosure && element !== closedDisclosure.querySelector("summary");
          const visuallyHidden =
            ["absolute", "fixed"].includes(style.position) &&
            rect.width <= 1 &&
            rect.height <= 1 &&
            style.clipPath !== "none";
          return (
            !hiddenDisclosureContent &&
            !visuallyHidden &&
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number(style.opacity) !== 0 &&
            rect.width > 0 &&
            rect.height > 0
          );
        };
        const allIds = [...document.querySelectorAll("[id]")].map((element) => element.id);
        const duplicateIds = [...new Set(allIds.filter((id, index) => allIds.indexOf(id) !== index))];
        const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
        const headingLevels = headings.map((heading) => Number(heading.tagName.slice(1)));
        const headingSkips = headingLevels
          .slice(1)
          .filter((level, index) => level > headingLevels[index] + 1);
        const images = [...document.images];
        const brokenImages = images
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src);
        const missingAlt = images
          .filter((image) => !image.hasAttribute("alt"))
          .map((image) => image.currentSrc || image.src);
        const visibleControls = [...document.querySelectorAll("a,button,summary")].filter(isVisible);
        const tinyTargets = visibleControls
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width < 24 || rect.height < 24;
          })
          .map((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            const matchingRules = [...document.styleSheets].flatMap((sheet) => {
              try {
                return [...sheet.cssRules]
                  .filter(
                    (rule) =>
                      "selectorText" in rule &&
                      element.matches(rule.selectorText) &&
                      (rule.style.display || rule.style.minHeight),
                  )
                  .map((rule) => `${rule.selectorText}{display:${rule.style.display};min-height:${rule.style.minHeight}}`);
              } catch {
                return [];
              }
            });
            return {
              label: (element.textContent ?? element.getAttribute("aria-label") ?? "").trim().slice(0, 80),
              width: Number(rect.width.toFixed(2)),
              height: Number(rect.height.toFixed(2)),
              display: style.display,
              minHeight: style.minHeight,
              matchingRules,
              outerHtml: element.outerHTML,
              parentClass: element.parentElement?.className ?? "",
              inCorporateOverview: element.matches(".corporate-overview a"),
              ancestorClasses: [...element.parentElement?.closest("nav,section,header,footer")?.classList ?? []],
            };
          });
        const emptyLinks = [...document.querySelectorAll("a")].filter(
          (link) => !(link.textContent ?? "").trim() && !link.getAttribute("aria-label"),
        ).length;
        const cta = [...document.querySelectorAll("a,button")].find(
          (element) => (element.textContent ?? "").replace(/\s+/g, " ").trim().includes(ctaLabel),
        );
        const h1 = document.querySelector("h1");
        const h1Rect = h1?.getBoundingClientRect();
        const main = document.querySelector("main");
        const mainText = (main?.textContent ?? "")
          .replace(/\bSkip intro\b/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        const visibleMainText = (main?.innerText ?? "")
          .replace(/\bSkip intro\b/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        const mainLinks = [...(main?.querySelectorAll("a[href]") ?? [])]
          .map((link) => link.getAttribute("href"))
          .filter(Boolean)
          .sort();
        const clippedText = [
          ...document.querySelectorAll(
            "h1,h2,h3,h4,h5,h6,p,li,dt,dd,figcaption,a,button,summary",
          ),
        ]
          .filter(
            (element) =>
              isVisible(element) &&
              (element.textContent ?? "").replace(/\s+/g, " ").trim().length > 0,
          )
          .filter((element) => {
            const style = getComputedStyle(element);
            const horizontallyClipped =
              element.scrollWidth > element.clientWidth + 1 &&
              style.overflowX !== "visible";
            const verticallyClipped =
              element.scrollHeight > element.clientHeight + 1 &&
              style.overflowY !== "visible";
            return horizontallyClipped || verticallyClipped;
          })
          .map((element) => ({
            tag: element.tagName,
            className:
              typeof element.className === "string"
                ? element.className.slice(0, 100)
                : "",
            text: (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100),
          }));
        const narrowTextColumns = [...document.querySelectorAll("main p,main li,main dd")]
          .filter(
            (element) =>
              isVisible(element) &&
              (element.textContent ?? "").replace(/\s+/g, " ").trim().length >= 120 &&
              element.getBoundingClientRect().width < 160,
          )
          .map((element) => ({
            width: Number(element.getBoundingClientRect().width.toFixed(2)),
            className:
              typeof element.className === "string"
                ? element.className.slice(0, 100)
                : "",
            parentClass:
              typeof element.parentElement?.className === "string"
                ? element.parentElement.className.slice(0, 100)
                : "",
            text: (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100),
          }));
        const topLevelBlocks = [...(main?.children ?? [])].filter(
          (element) =>
            isVisible(element) &&
            ["static", "relative"].includes(getComputedStyle(element).position),
        );
        const overlappingSections = topLevelBlocks
          .slice(1)
          .map((element, index) => {
            const previous = topLevelBlocks[index];
            const previousRect = previous.getBoundingClientRect();
            const currentRect = element.getBoundingClientRect();
            const horizontalOverlap =
              Math.min(previousRect.right, currentRect.right) -
              Math.max(previousRect.left, currentRect.left);
            const verticalOverlap =
              Math.min(previousRect.bottom, currentRect.bottom) -
              Math.max(previousRect.top, currentRect.top);
            return {
              previous:
                typeof previous.className === "string"
                  ? previous.className.slice(0, 100)
                  : previous.tagName,
              current:
                typeof element.className === "string"
                  ? element.className.slice(0, 100)
                  : element.tagName,
              horizontalOverlap,
              verticalOverlap,
            };
          })
          .filter(
            (overlap) =>
              overlap.horizontalOverlap > 8 && overlap.verticalOverlap > 8,
          );
        const coarsePointer = matchMedia("(pointer: coarse)").matches;
        const undersizedTapTargets = coarsePointer
          ? visibleControls
              .filter(
                (element) =>
                  !element.closest(".page-breadcrumbs") &&
                  ["BUTTON", "SUMMARY"].includes(element.tagName) ||
                  Boolean(
                    (!element.closest(".page-breadcrumbs") &&
                      element.closest("nav")) ||
                      element.getAttribute("data-event-name") ||
                      (typeof element.className === "string" &&
                        /(?:button|cta)/i.test(element.className)),
                  ),
              )
              .filter((element) => {
                const rect = element.getBoundingClientRect();
                return ["BUTTON", "SUMMARY"].includes(element.tagName)
                  ? rect.width < 44 || rect.height < 44
                  : rect.width < 24 || rect.height < 44;
              })
              .map((element) => {
                const rect = element.getBoundingClientRect();
                return {
                  label: (element.textContent ?? element.getAttribute("aria-label") ?? "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .slice(0, 80),
                  width: Number(rect.width.toFixed(2)),
                  height: Number(rect.height.toFixed(2)),
                };
              })
          : [];

        return {
          title: document.title,
          h1Count: document.querySelectorAll("h1").length,
          h1Visible: Boolean(h1 && h1.getBoundingClientRect().width && h1.getBoundingClientRect().height),
          mainExists: Boolean(document.querySelector("main")),
          skipLinkExists: Boolean(document.querySelector('a[href="#main-content"]')),
          inquiryPathExists: Boolean(document.querySelector('a[href="/inquire"]')),
          ctaExists: Boolean(cta),
          ctaVisible: Boolean(cta && isVisible(cta)),
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          duplicateIds,
          headingSkips,
          brokenImages,
          missingAlt,
          tinyTargets,
          undersizedTapTargets,
          emptyLinks,
          clippedText,
          narrowTextColumns,
          overlappingSections,
          oversizedHeading: Boolean(
            h1 &&
              h1Rect &&
              ((innerWidth <= 700 &&
                Number.parseFloat(getComputedStyle(h1).fontSize) > 72) ||
                h1Rect.height > innerHeight * 0.8),
          ),
          mainText,
          visibleMainText,
          mainLinks,
          cls: window.__luxeCls ?? 0,
        };
      }, primaryCtas[route]);

      const contentHash = createHash("sha256")
        .update(audit.mainText)
        .digest("hex");
      const linkHash = createHash("sha256")
        .update(JSON.stringify(audit.mainLinks))
        .digest("hex");
      const visibleContentHash = createHash("sha256")
        .update(audit.visibleMainText)
        .digest("hex");
      delete audit.mainText;
      delete audit.visibleMainText;
      delete audit.mainLinks;
      const record = {
        viewport: viewport.name,
        route,
        status: response?.status() ?? null,
        runtimeErrors,
        contentHash,
        visibleContentHash,
        linkHash,
        ...audit,
      };
      results.push(record);

      if (
        record.status !== 200 ||
        record.runtimeErrors.length ||
        record.h1Count !== 1 ||
        !record.h1Visible ||
        !record.mainExists ||
        !record.skipLinkExists ||
        !record.inquiryPathExists ||
        !record.ctaExists ||
        !record.ctaVisible ||
        record.overflow ||
        record.duplicateIds.length ||
        record.headingSkips.length ||
        record.brokenImages.length ||
        record.missingAlt.length ||
        record.tinyTargets.length ||
        record.undersizedTapTargets.length ||
        record.emptyLinks ||
        record.clippedText.length ||
        record.narrowTextColumns.length ||
        record.overlappingSections.length ||
        record.oversizedHeading ||
        record.cls > 0.1
      ) {
        failures.push(record);
      }

      await page.close();
    }

    await context.close();
  }

  for (const route of routes) {
    const routeResults = results.filter((result) => result.route === route);
    const baseline = routeResults[0];
    const mismatch = routeResults.find(
      (result) =>
        result.contentHash !== baseline.contentHash ||
        result.linkHash !== baseline.linkHash,
    );

    if (mismatch) {
      failures.push({
        route,
        viewport: mismatch.viewport,
        type: "responsive-content-parity",
        baselineViewport: baseline.viewport,
        contentHashMatches: mismatch.contentHash === baseline.contentHash,
        linkHashMatches: mismatch.linkHash === baseline.linkHash,
        baselineContentHash: baseline.contentHash,
        mismatchContentHash: mismatch.contentHash,
        baselineLinkHash: baseline.linkHash,
        mismatchLinkHash: mismatch.linkHash,
      });
    }
  }

  const desktop = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  const desktopPage = await desktop.newPage();
  await desktopPage.goto(`${baseUrl}/experiences`, { waitUntil: "domcontentloaded" });
  await desktopPage.waitForTimeout(200);
  const desktopSummary = desktopPage.locator(".foundation-desktop-nav details summary").first();
  await desktopSummary.focus();
  await desktopSummary.press("Enter");
  assert.equal(await desktopPage.locator(".foundation-desktop-nav details").first().getAttribute("open"), "");
  await desktopSummary.press("Escape");
  assert.equal(await desktopPage.locator(".foundation-desktop-nav details").first().getAttribute("open"), null);
  assert.equal(await desktopPage.evaluate(() => document.activeElement?.tagName), "SUMMARY");
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${baseUrl}/gallery`, { waitUntil: "domcontentloaded" });
  await mobilePage.waitForTimeout(200);
  const mobileMenu = mobilePage.locator(".foundation-mobile-nav > summary");
  await mobileMenu.tap();
  assert.equal(await mobilePage.locator(".foundation-mobile-nav").getAttribute("open"), "");
  assert.equal(await mobilePage.evaluate(() => document.body.style.overflow), "hidden");
  await mobileMenu.press("Escape");
  assert.equal(await mobilePage.locator(".foundation-mobile-nav").getAttribute("open"), null);
  assert.equal(await mobilePage.evaluate(() => document.body.style.overflow), "");

  const coffeeFilter = mobilePage.getByRole("button", { name: "Coffee Bar" });
  await coffeeFilter.tap();
  assert.equal(await coffeeFilter.getAttribute("aria-pressed"), "true");
  assert.match(await mobilePage.getByRole("status").first().innerText(), /Showing [1-9]/i);
  assert.ok(await mobilePage.locator(".gallery-group:not([hidden])").count());

  await mobilePage.goto(`${baseUrl}/inquire`, { waitUntil: "domcontentloaded" });
  const handoff = mobilePage.locator('[data-handoff-status="email-fallback"]').first();
  assert.match(await handoff.getAttribute("href"), /^mailto:bookings@luxeeventco\.ca/);
  await mobile.close();

  const noScript = await browser.newContext({
    viewport: { width: 390, height: 844 },
    javaScriptEnabled: false,
  });
  for (const route of ["/", "/gallery", "/faq", "/inquire"]) {
    const page = await noScript.newPage();
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    assert.equal(response?.status(), 200);
    assert.equal(await page.locator("h1").count(), 1);
    assert.ok(await page.locator('a[href="/inquire"]').count());
    if (route === "/gallery") assert.ok(await page.locator(".gallery-group").count());
    if (route === "/faq") assert.ok(await page.locator("details").count());
    await page.close();
  }
  await noScript.close();

  const motion = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const motionPage = await motion.newPage();
  await motionPage.addInitScript(() => {
    window.__luxeCls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__luxeCls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await motionPage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await motionPage.waitForTimeout(8_200);
  assert.equal(await motionPage.locator(".home-cinematic-hero").getAttribute("data-phase"), "together");
  assert.ok(
    await motionPage.locator(".home-cinematic-actions").getByRole("button", { name: /Plan Your Event/i }).isVisible(),
  );
  await motionPage
    .locator(".home-cinematic-actions")
    .getByRole("button", { name: /Plan Your Event/i })
    .click();
  assert.ok(
    await motionPage.getByRole("dialog", { name: /Your quote will begin here/i }).isVisible(),
  );
  assert.match(
    await motionPage.getByRole("dialog").innerText(),
    /Flashquotes quote form|similar quote platform/i,
  );
  assert.ok((await motionPage.evaluate(() => window.__luxeCls ?? 0)) <= 0.1);
  await motion.close();
} finally {
  await browser.close();
}

const summary = {
  pagesChecked: results.length,
  viewports: viewports.map((viewport) => viewport.name),
  maxCls: Math.max(...results.map((result) => result.cls)),
  failures,
};

console.log(JSON.stringify(summary, null, 2));
assert.equal(failures.length, 0, `${failures.length} responsive page checks failed`);
