import { test, expect } from "@playwright/test";
test("Main pages render without errors or horizontal overflow", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of [
    "/",
    "/problems",
    "/research",
    "/learn",
    "/join",
    "/privacy",
    "/terms",
    "/contact",
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test("Experience carousel and learning interactions work", async ({ page }) => {
  await page.goto("/problems");
  await page.getByRole("button", { name: "Tap if this is familiar" }).click();
  await expect(page.getByText("You related to 1.")).toBeVisible();
  await page.getByRole("button", { name: "Next experience" }).click();
  await expect(
    page.getByRole("heading", { name: "Low energy by evening" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Mind", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Brain fog" })).toBeVisible();
  await page.goto("/learn");
  await page.getByRole("button", { name: "Pregnant Growing together" }).click();
  await page.getByRole("tab", { name: "Ask your doctor" }).click();
  await expect(
    page.getByText(
      "Do not start or change supplements in pregnancy without your doctor. DAYLI products are not prenatal supplements.",
      { exact: true },
    ),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Key nutrients" }).click();
  await page.getByRole("button", { name: "Iron", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
async function fillJoin(page) {
  await page.goto("/join");
  await page.getByRole("button", { name: "Woman", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Who are you joining for?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Myself", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "What feels familiar?" }),
  ).toBeVisible();
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Skip", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("name");
  await page.getByLabel("Your name").fill("Test Member");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByRole("button", { name: "Join the Movement", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("consent");
  await page.getByRole("checkbox").check();
}
test("Registration succeeds only after confirmed backend response", async ({
  page,
}) => {
  await page.route("**/api/join", (route) =>
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: '{"ok":true}',
    }),
  );
  await fillJoin(page);
  await page
    .getByRole("button", { name: "Join the Movement", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Welcome to the Movement." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
    "href",
    /^https:\/\/wa.me\//,
  );
});
test("Unconnected registration shows an honest error and preserves answers", async ({
  page,
}) => {
  await page.route("**/api/join", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        error:
          "Registration is not connected yet. Your details have not been submitted.",
      }),
    }),
  );
  await fillJoin(page);
  await page
    .getByRole("button", { name: "Join the Movement", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("not connected");
  await expect(
    page.getByRole("heading", { name: "Welcome to the Movement." }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("Test Member");
});

test("Primary pages pass automated WCAG A/AA checks", async ({ page }) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/problems", "/research", "/learn", "/join"]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(result.violations, `Accessibility issues on ${path}`).toEqual([]);
  }
});

test("Navigation, story anchor and reduced-motion statistics work", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Story" })
    .click();
  await expect(page).toHaveURL(/#story$/);
  await expect(
    page.getByRole("heading", { name: "It started with my mother." }),
  ).toBeVisible();
  await expect(page.getByText("57%", { exact: true })).toHaveText("57%");
});

test("Learn layout stays contained on small phones, tablets and laptops", async ({
  page,
}) => {
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/learn");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow at ${width}px`,
    ).toBe(true);
    expect(
      await page
        .locator(".expert-carousel")
        .evaluate((el) => el.scrollWidth > el.clientWidth),
    ).toBe(true);
  }
});

test("Role portraits automatically advance and Continue moves multi-select questions", async ({
  page,
}) => {
  for (const role of [
    "Woman",
    "Son",
    "Daughter",
    "Husband",
    "Boyfriend",
    "Brother",
    "Friend",
    "Other",
  ]) {
    await page.goto("/join");
    await page.getByRole("button", { name: role, exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Who are you joining for?" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "My mother", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "What feels familiar?" }),
    ).toBeVisible();
  }
  await page
    .getByRole("button", { name: "Constant tiredness", exact: true })
    .click();
  await page.getByRole("button", { name: "Hair fall", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "What feels familiar?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "What have you tried?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Constant tiredness", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("Ivory sections, form placement and uncropped footer match the revised design", async ({
  page,
}) => {
  await page.goto("/join");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".join-intro + #join-form")).toHaveCount(1);
  expect(
    await page
      .locator("#join-form .form-card")
      .evaluate((e) => getComputedStyle(e).order),
  ).toBe("-1");
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const selector of [".hero", ".story", ".join-band", "footer"]) {
    const styles = await page.locator(selector).evaluate((e) => ({
      bg: getComputedStyle(e).backgroundColor,
      image: getComputedStyle(e).backgroundImage,
    }));
    expect(styles).toEqual({ bg: "rgb(247, 239, 232)", image: "none" });
  }
  const logo = page.locator(".giant-wordmark");
  await logo.scrollIntoViewIfNeeded();
  const bounds = await logo.boundingBox(),
    footer = await page.locator("footer").boundingBox();
  expect(bounds.y).toBeGreaterThan(footer.y);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(
    footer.y + footer.height + 1,
  );
  await expect(logo).toHaveCSS("color", "rgb(247, 239, 232)");
  await expect(logo).toHaveCSS("background-color", "rgb(84, 46, 66)");
  expect(bounds.width).toBeGreaterThan(
    await page.evaluate(() => innerWidth * 0.98),
  );
  const ink = await logo.locator("text").evaluate((el) => {
    const b = el.getBBox();
    // SVG font boxes include unused ascender space. Check the actual capital ink.
    const ctx = document.createElement("canvas").getContext("2d");
    const style = getComputedStyle(el);
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const metrics = ctx.measureText(el.textContent.trim());
    const baseline = Number(el.getAttribute("y"));
    return {
      x: b.x,
      right: b.x + b.width,
      y: baseline - metrics.actualBoundingBoxAscent,
      bottom: baseline + metrics.actualBoundingBoxDescent,
    };
  });
  expect(ink.x).toBeGreaterThanOrEqual(0);
  expect(ink.right).toBeLessThanOrEqual(1000);
  expect(ink.y).toBeGreaterThanOrEqual(0);
  expect(ink.bottom).toBeLessThanOrEqual(300);
  expect(
    await logo.evaluate((e) => parseFloat(getComputedStyle(e).marginBottom)),
  ).toBeGreaterThanOrEqual(0);
});

test("Every page stays ivory inside a dark preview host", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  for (const path of ["/", "/problems", "/research", "/learn", "/join"]) {
    await page.goto(path);
    // The embedding app can supply a black canvas and suppress the root canvas.
    await page.addStyleTag({
      content:
        "html,body,#root{background:transparent!important}html{background:#000!important}",
    });
    await expect(page.locator("main")).toHaveCSS(
      "background-color",
      "rgb(247, 239, 232)",
    );
    for (const el of await page.locator("main > section").all()) {
      await expect(el).toHaveCSS("background-color", "rgb(247, 239, 232)");
      await expect(el).toHaveCSS("background-image", "none");
    }
    for (const el of await page
      .locator(
        ".stage-card,.stage-panel,.experience-card,.glossary-row > button,.doorway,.form-card",
      )
      .all()) {
      await expect(el).toHaveCSS("background-color", "rgb(247, 239, 232)");
      await expect(el).toHaveCSS("background-image", "none");
    }
  }
});

test("Life-stage scenes and body map respond to touch, keyboard and stage changes", async ({
  page,
}) => {
  await page.goto("/learn");
  await expect(
    page.locator(".stage-card .life-stage-illustration"),
  ).toHaveCount(7);
  await expect(
    page.locator(
      ".stage-card .lucide-flower-2,.stage-card .lucide-heart,.stage-card .lucide-moon,.stage-card .lucide-sprout",
    ),
  ).toHaveCount(0);
  const map = page.getByRole("complementary", { name: "Interactive body map" });
  await map
    .getByRole("button", { name: "Explore bones & strength", exact: true })
    .click();
  await expect(
    map.getByRole("heading", { name: "Bones & strength", exact: true }),
  ).toBeVisible();
  await map
    .getByRole("button", {
      name: "Learn about Calcium for 18+ & menstruating",
      exact: true,
    })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "Calcium", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close nutrient details" }).click();
  const nerves = map.getByRole("button", { name: "Nerves", exact: true });
  await nerves.focus();
  await page.keyboard.press("Enter");
  await expect(
    map.getByRole("heading", { name: "Brain & nerves", exact: true }),
  ).toBeVisible();
  await map.getByRole("button", { name: "Anatomy", exact: true }).click();
  await expect(map.locator(".anatomy-organs")).toHaveCount(0);
  await map.getByRole("button", { name: "Anatomy", exact: true }).click();
  await expect(map.locator(".anatomy-organs")).toBeVisible();
  await page
    .getByRole("button", {
      name: "Post-menopause Strong for what’s next",
      exact: true,
    })
    .click();
  await expect(
    map.getByRole("heading", { name: "Bones & strength", exact: true }),
  ).toBeVisible();
  await expect(
    map.getByRole("button", { name: "Bones", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
