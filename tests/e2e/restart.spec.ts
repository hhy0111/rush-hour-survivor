import { expect, test } from "@playwright/test";

test("forced fail updates best score and allows restart", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start Run" }).click();

  await page.evaluate(
    () => (window as typeof window & { advanceTime: (ms: number) => void }).advanceTime(1500)
  );
  await page.evaluate(
    () =>
      (window as typeof window & {
        __rushHourDebugForceFail: (kind: "health" | "stress") => void;
      }).__rushHourDebugForceFail("stress")
  );

  await expect(page.locator("#gameover-overlay")).toBeVisible();
  await expect(page.locator("#gameover-best")).not.toHaveText("0");

  await page.getByRole("button", { name: "Restart Run" }).click();
  await expect(page.locator("#hud")).toBeVisible();

  const storedBestScore = await page.evaluate(() => {
    const raw = window.localStorage.getItem("rush-hour-survivor/profile");
    return raw ? JSON.parse(raw).bestScore : 0;
  });

  expect(storedBestScore).toBeGreaterThan(0);
});
