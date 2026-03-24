import { expect, Locator, Page, test } from "@playwright/test";

export class ReportDefectPage {
  private readonly page: Page;
  private readonly pageHeading: Locator;
  private readonly titleInput: Locator;
  private readonly descriptionTextarea: Locator;
  private readonly severitySelect: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator("h1");
    this.titleInput = page.locator('[data-testid="defect-title"]');
    this.descriptionTextarea = page.locator(
      '[data-testid="defect-description"]',
    );
    this.severitySelect = page.locator('[data-testid="defect-severity"]');
    this.submitButton = page.locator('[data-testid="submit-defect"]');
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async fillDescription(description: string) {
    await this.descriptionTextarea.fill(description);
  }

  async selectSeverity(severity: string) {
    await this.severitySelect.selectOption(severity);
  }

  async submitDefectReport() {
    await this.submitButton.click();
  }

  async reportNewDefect(title: string, description: string, severity: string) {
    await test.step("Fill and submit defect report", async () => {
      await this.fillTitle(title);
      await this.fillDescription(description);
      await this.selectSeverity(severity);
      await this.submitDefectReport();
    });
  }

  async assertPageVisible(heading: string) {
    await expect(
      this.pageHeading,
      "Report Defect heading should match expected text",
    ).toHaveText(heading);
    await expect(
      this.titleInput,
      "Title input should be visible",
    ).toBeVisible();
    await expect(
      this.descriptionTextarea,
      "Description textarea should be visible",
    ).toBeVisible();
    await expect(
      this.severitySelect,
      "Severity select should be visible",
    ).toBeVisible();
    await expect(
      this.submitButton,
      "Submit button should be visible",
    ).toBeVisible();
  }
}
