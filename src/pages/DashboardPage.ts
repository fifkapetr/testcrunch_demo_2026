import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  private readonly page: Page;
  private readonly pageHeading: Locator;
  // ! Fixed locator — no data-testid on nav buttons; using Lucide icon class via :has() (max 2 inheritance levels)
  private readonly defectListNavButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator("h1");
    this.defectListNavButton = page.locator("button:has(svg.lucide-bug)");
  }

  async navigateToDefectList() {
    await this.defectListNavButton.click();
  }

  async assertPageVisible(heading: string) {
    await expect(
      this.pageHeading,
      "Dashboard heading should match expected text",
    ).toHaveText(heading);
  }
}
