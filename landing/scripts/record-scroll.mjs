/* Record the scroll.html camera flow to a video file (webm) using Playwright.
 * Loads scroll.html?auto=N which drives the camera 0→1 on its own, captures the
 * viewport for the full timeline, saves to public/qalan-scroll.webm (servable).
 * Run (dev server must be on :5173):  node landing/scripts/record-scroll.mjs
 */
import { chromium } from "playwright";
import { join } from "node:path";
import { renameSync, rmSync } from "node:fs";

const DUR = 16;            // seconds of camera travel
const DELAY = 900;         // ms hold on the opening frame before it starts
const W = 600, H = 1040;   // portrait stage
const OUT = join(process.cwd(), "landing", "public");
const FINAL = join(OUT, "qalan-scroll.webm");

const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 2,
  reducedMotion: "no-preference",
  recordVideo: { dir: OUT, size: { width: W, height: H } },
});
const page = await ctx.newPage();
await page.goto(`http://localhost:5173/scroll.html?auto=${DUR}&delay=${DELAY}`, { waitUntil: "load" });
await page.waitForTimeout(DELAY + DUR * 1000 + 2500); // delay + travel + tail
const video = page.video();
await ctx.close();         // finalizes the webm
const tmp = await video.path();
await browser.close();
try { rmSync(FINAL, { force: true }); } catch {}
renameSync(tmp, FINAL);
console.log("VIDEO", FINAL);
