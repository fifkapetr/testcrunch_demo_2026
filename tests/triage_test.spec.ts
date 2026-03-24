import { expect, test } from "@playwright/test";

/*
 * To test the triage specialist agent, run agent: triage-specialist. 

 Tested on low cost models and results are as follows:
 - Good results (without issues): Gemini 3 Flash (0.33x), Grok Code Fast 1 (0.25x), GPT-5.4 Mini (0.33x) - without any issues, identified root cause correctly and suggested proper fixes.
 - Mediocre results: Claude Haiku (0.33x), Raptor Mini (0.33x) - both changed good locators to unstable ones without reason and fixed locators which were broken too.
*/
test("Triage test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.locator(`[data-testid="login-username"]`).fill("testuser");
  await page.locator(`[data-testid="login-password"]`).fill("password123");
  await page.locator(`[data-testid="login-submit"]`).click();
  await expect(page.locator('h1[data-testid="page-title"]')).toHaveText(
    "Dashboard",
  );
});
