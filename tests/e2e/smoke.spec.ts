import { expect, test } from "@playwright/test";

test("menu to playable run smoke flow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Start Run" })).toBeVisible();
  await page.getByRole("button", { name: "Start Run" }).click();

  await expect(page.locator("#hud")).toBeVisible();

  const before = JSON.parse(
    await page.evaluate(() => (window as typeof window & { render_game_to_text: () => string }).render_game_to_text())
  );

  expect(before.mode).toBe("playing");

  await page.evaluate(
    () => (window as typeof window & { advanceTime: (ms: number) => void }).advanceTime(2500)
  );

  const after = JSON.parse(
    await page.evaluate(() => (window as typeof window & { render_game_to_text: () => string }).render_game_to_text())
  );

  expect(after.elapsedMs).toBeGreaterThan(before.elapsedMs);
  expect(after.score).toBeGreaterThanOrEqual(before.score);
});
