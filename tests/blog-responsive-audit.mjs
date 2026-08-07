const playwrightModulePath = process.env.PLAYWRIGHT_MODULE_PATH;
const chromeExecutablePath = process.env.CHROME_EXECUTABLE_PATH;

if (!playwrightModulePath || !chromeExecutablePath) {
  throw new Error("PLAYWRIGHT_MODULE_PATH and CHROME_EXECUTABLE_PATH are required.");
}

const { chromium } = await import(playwrightModulePath);
const browser = await chromium.launch({ headless: true, executablePath: chromeExecutablePath });
const page = await browser.newPage();
const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => consoleErrors.push(error.message));

const widths = [1440, 1024, 430, 390, 375];
const results = [];

try {
  for (const width of widths) {
    await page.setViewportSize({ width, height: width > 500 ? 900 : 844 });
    await page.goto("http://localhost:3000/blog/what-to-share-before-requesting-an-event-proposal", {
      waitUntil: "networkidle",
    });
    results.push(await page.evaluate((viewportWidth) => {
      const root = document.documentElement;
      const heading = document.querySelector("h1");
      return {
        width: viewportWidth,
        title: document.title,
        article: Boolean(document.querySelector("article")),
        heading: Boolean(heading),
        headingOverflow: heading ? heading.scrollWidth > heading.clientWidth + 1 : null,
        horizontalOverflow: root.scrollWidth > root.clientWidth + 1,
      };
    }, width));
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ results, consoleErrors }, null, 2));

if (consoleErrors.length || results.some((result) => !result.article || !result.heading || result.headingOverflow || result.horizontalOverflow)) {
  process.exitCode = 1;
}
