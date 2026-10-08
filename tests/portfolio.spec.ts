import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("dashboard carousel: three rows, pause controls and reduced motion", async ({ page }) => {
  await page.goto("/");
  const carousel = page.locator("#work #service-examples");
  await expect(carousel).toBeVisible();
  await expect(carousel.locator(".dashboard-marquee-row")).toHaveCount(3);
  await carousel.getByRole("button", { name: "Pause dashboard animation" }).click();
  const track = carousel.locator(".dashboard-marquee-track").first();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  const pausedTransform = await track.evaluate(element => getComputedStyle(element).transform);
  await carousel.getByRole("button", { name: "Resume dashboard animation" }).click();
  await expect(track).toHaveCSS("animation-play-state", "running");
  await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe(pausedTransform);
  await expect(carousel.locator(".dashboard-marquee-track").nth(1)).toHaveCSS("animation-direction", "reverse");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
  await expect(carousel.getByRole("button", { name: "Pause dashboard animation" })).toBeHidden();
  await expect(carousel.locator(".dashboard-marquee-group").nth(1)).toBeHidden();
  await expect(carousel.getByRole("img")).toHaveCount(8);
  for (const image of await carousel.getByRole("img").all()) {
    await expect(image).toBeVisible();
  }
});

test("website gallery: live links, screenshot previews and keyboard controls", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const gallery = page.locator("#work");
  await expect(gallery.getByRole("heading", { level: 2 })).toHaveText("From an idea to a live store.");
  await expect(gallery.locator(".website-card")).toHaveCount(3);
  await expect(gallery.getByRole("link", { name: "Visit Atheen website (opens in a new tab)" })).toHaveAttribute("href", "https://www.atheen-eg.com/");
  await expect(gallery.getByRole("link", { name: "Visit Next & Go website (opens in a new tab)" })).toHaveAttribute("href", "https://www.nexttgo.com/");
  await expect(gallery.getByRole("link", { name: "Visit Orakit website (opens in a new tab)" })).toHaveAttribute("href", "https://orakit.myshopify.com/");
  const preview = gallery.getByRole("button", { name: "Preview Atheen website screenshot" });
  await preview.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Atheen" })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close screenshot preview" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading", { name: "Next & Go" })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading", { name: "Orakit" })).toBeVisible();
  await expect(dialog.locator("img")).toHaveJSProperty("complete", true);
  expect(await dialog.locator("img").evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading", { name: "Atheen" })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await dialog.getByRole("button", { name: "Previous website" }).click();
  await expect(dialog.getByRole("heading", { name: "Atheen" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(preview).toBeFocused();
  for (const width of [320, 390, 768, 1024, 1100, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await gallery.getByRole("button", { name: "Preview Orakit website screenshot" }).click();
  await expect(dialog).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  await dialog.getByRole("button", { name: "Close screenshot preview" }).click();
  await expect(dialog).toBeHidden();
});

test("desktop: content, anchors, loaded images, accessible markup and case studies", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Turn more Shopify");
  for (const id of ["home", "work", "services", "service-examples", "problems", "process", "contact"]) await expect(page.locator(`#${id}`)).toHaveCount(1);
  await expect(page.locator("#home img")).toHaveCount(0);
  await expect(page.locator("#results, #testimonials, .stats-section")).toHaveCount(0);
  await expect(page.locator('#home a[data-cta="hero"]')).toHaveAttribute("href", "#contact");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).locator("a:not(.mobile-nav-cta)")).toHaveCount(3);
  await page.evaluate(async () => { for (const img of Array.from(document.images)) { img.loading = "eager"; if (!img.complete) await new Promise(resolve => { img.onload = resolve; img.onerror = resolve; }); } });
  expect(await page.locator("img").evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "artifacts/desktop.png", fullPage: true, caret: "initial" });
  await page.screenshot({ path: "artifacts/desktop-hero.png", caret: "initial" });
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  for (const slug of ["forma-storefront", "ritual-growth", "stride-performance"]) {
    await page.goto(`/work/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".case-demo-notice")).toContainText("fictional brand");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/work/${slug}$`));
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Concept Case Study/);
    const og = await page.request.get(`/work/${slug}/opengraph-image`); expect(og.ok()).toBe(true); expect(og.headers()["content-type"]).toContain("image/png");
  }
  expect(errors).toEqual([]);
});

test("mobile: menu, keyboard, form validation and responsive widths", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" }); await toggle.click();
  await expect(page.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape"); await expect(toggle).toBeFocused();
  await toggle.click(); await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Work with me", exact: true }).click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false"); await expect(page.locator(".contact-form")).toBeVisible();
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.getByRole("textbox", { name: "Name *", exact: true })).toBeFocused();
  await expect(page.locator(".field-error")).toHaveCount(4);
  await page.getByRole("textbox", { name: "Name *", exact: true }).fill("Test visitor"); await page.getByLabel("Email", { exact: false }).fill("test@example.com");
  await page.getByLabel("Service needed").selectOption("Shopify + Media Buying"); await page.getByLabel("Tell me about your project").fill("I would like to build a Shopify store and connect my campaigns.");
  await page.getByRole("button", { name: "Send project inquiry" }).click(); await expect(page.locator(".contact-form").getByRole("alert")).toContainText("isn’t connected yet");
  await page.screenshot({ path: "artifacts/mobile-contact.png", caret: "initial" });
  await page.goto("/"); await page.screenshot({ path: "artifacts/mobile.png", fullPage: true, caret: "initial" });
  await page.screenshot({ path: "artifacts/mobile-hero.png", caret: "initial" });
  for (const width of [320, 390, 768, 1024, 1440]) { await page.setViewportSize({ width, height: 900 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true); }
  await page.setViewportSize({ width: 390, height: 844 });
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze(); expect(accessibility.violations.map(v => v.id)).toEqual([]);
});

test("inquiry path: optional fields, tracking, and mobile contact visibility", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => {
    const events: unknown[] = [];
    Object.assign(window, { conversionEvents: events });
    window.addEventListener("portfolio:conversion", event => events.push((event as CustomEvent).detail));
  });
  const sticky = page.locator(".mobile-contact-bar");
  await expect(sticky).toBeHidden();
  await page.locator("#work .website-gallery").scrollIntoViewIfNeeded();
  await expect(sticky).toBeVisible();
  await sticky.getByRole("link", { name: "Work with me" }).click();
  await expect(sticky).toBeHidden();
  await expect(page.getByLabel("Website (optional)", { exact: true })).toBeHidden();
  await page.getByLabel("Name *", { exact: true }).fill("Test visitor");
  await page.getByLabel("Email *", { exact: true }).fill("test@example.com");
  await page.getByLabel("Service needed").selectOption("CRO");
  await page.getByLabel("Tell me about your project").fill("Please review my store’s mobile shopping experience.");
  await page.locator(".form-optional summary").click();
  await page.getByLabel("Website (optional)", { exact: true }).fill("invalid-url");
  await page.locator(".form-optional summary").click();
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.getByLabel("Website (optional)", { exact: true })).toBeFocused();
  await expect(page.locator(".form-optional")).toHaveAttribute("open", "");
  await page.getByLabel("Website (optional)", { exact: true }).fill("");
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.locator(".contact-form").getByRole("alert")).toContainText("cannot send inquiries");
  const events = await page.evaluate(() => (window as unknown as { conversionEvents: { event: string; placement: string }[] }).conversionEvents);
  expect(events).toEqual([
    { event: "cta_click", placement: "mobile-sticky" },
    { event: "form_start", placement: "contact-form" },
  ]);
});

test("contact API rejects invalid requests and never claims undelivered success", async ({ request }) => {
  const invalid = await request.post("/api/contact", { data: { name: "A", email: "bad", message: "Short", service: "Invalid" } }); expect(invalid.status()).toBe(422);
  const wrongOrigin = await request.post("/api/contact", { headers: { origin: "https://example.invalid" }, data: {} }); expect(wrongOrigin.status()).toBe(403);
  const unavailable = await request.post("/api/contact", { data: { name: "Test visitor", email: "test@example.com", service: "Shopify Development", message: "This is a valid test inquiry for the portfolio website." } }); expect(unavailable.status()).toBe(503);
  const wrongTypes = await request.post("/api/contact", { data: { name: 12 } }); expect(wrongTypes.status()).toBe(400);
  expect((await request.get("/sitemap.xml")).ok()).toBe(true); expect((await request.get("/robots.txt")).ok()).toBe(true);
  const image = await request.get("/opengraph-image"); expect(image.ok()).toBe(true);
});
