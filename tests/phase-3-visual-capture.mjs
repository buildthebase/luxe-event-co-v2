const playwrightPath = process.env.PLAYWRIGHT_MODULE_PATH;
const chromePath = process.env.CHROME_EXECUTABLE_PATH;

if (!playwrightPath || !chromePath) {
  throw new Error("PLAYWRIGHT_MODULE_PATH and CHROME_EXECUTABLE_PATH are required.");
}

const { chromium } = await import(playwrightPath);
const baseUrl = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
const outputDirectory = process.env.CAPTURE_OUTPUT_DIR ?? "/private/tmp";
const captures = [
  { name: "home-mobile", route: "/", width: 390, height: 844 },
  { name: "home-desktop", route: "/", width: 1440, height: 900 },
  { name: "experiences-tablet", route: "/experiences", width: 1024, height: 768 },
  { name: "coffee-mobile", route: "/experiences/coffee-bar", width: 390, height: 844 },
  { name: "events-laptop", route: "/events", width: 1280, height: 720 },
  { name: "corporate-desktop", route: "/events/corporate-events", width: 1440, height: 900 },
  { name: "gallery-mobile", route: "/gallery", width: 390, height: 844 },
  { name: "inquire-tablet", route: "/inquire", width: 768, height: 1024 },
];

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const capture of captures) {
    const context = await browser.newContext({
      viewport: { width: capture.width, height: capture.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${baseUrl}${capture.route}`, {
      waitUntil: "networkidle",
      timeout: 45_000,
    });
    await page.screenshot({
      fullPage: true,
      path: `${outputDirectory}/luxe-phase3-${capture.name}.png`,
    });
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(`Created ${captures.length} Phase 3 visual captures in ${outputDirectory}.`);
