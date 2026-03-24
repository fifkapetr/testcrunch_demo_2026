import { expect, Locator, Page } from "@playwright/test";

export class DefectListPage {
  private readonly page: Page;
  private readonly pageHeading: Locator;
  private readonly table: Locator;
  private readonly tableRows: Locator;
  // ! Unstable locator — CSS class only; unique class name makes it acceptable but prone to redesign changes
  private readonly reportDefectButton: Locator;
  // ! Fixed locator — no data-testid on nav buttons; using Lucide icon class via :has() (max 2 inheritance levels)
  private readonly logoutNavButton: Locator;
  // ! Unstable locator — positional; no data-testid on table header cells
  private readonly idColumnHeader: Locator;
  // ! Unstable locator — positional; no data-testid on table header cells
  private readonly titleColumnHeader: Locator;
  // ! Unstable locator — positional; no data-testid on table header cells
  private readonly severityColumnHeader: Locator;
  // ! Unstable locator — positional; no data-testid on table header cells
  private readonly actionsColumnHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator("h1");
    this.table = page.locator("table");
    this.tableRows = page.locator("tbody tr");
    this.reportDefectButton = page.locator("button.btn-neon-purple");
    this.logoutNavButton = page.locator("button:has(svg.lucide-log-out)");
    this.idColumnHeader = page.locator("table thead th:nth-child(1)");
    this.titleColumnHeader = page.locator("table thead th:nth-child(2)");
    this.severityColumnHeader = page.locator("table thead th:nth-child(3)");
    this.actionsColumnHeader = page.locator("table thead th:nth-child(4)");
  }

  async clickReportDefectButton() {
    await this.reportDefectButton.click();
  }

  async logout() {
    await this.logoutNavButton.click();
  }

  async assertPageVisible(heading: string) {
    await expect(
      this.pageHeading,
      "Defect List heading should match expected text",
    ).toHaveText(heading);
    await expect(this.table, "Defects table should be visible").toBeVisible();
    await expect(
      this.reportDefectButton,
      "Report Defect button should be visible",
    ).toBeVisible();
  }

  async assertTableHeadersVisible(
    idHeader: string,
    titleHeader: string,
    severityHeader: string,
    actionsHeader: string,
  ) {
    await expect(
      this.idColumnHeader,
      "ID column header should match expected text",
    ).toHaveText(idHeader);
    await expect(
      this.titleColumnHeader,
      "Title column header should match expected text",
    ).toHaveText(titleHeader);
    await expect(
      this.severityColumnHeader,
      "Severity column header should match expected text",
    ).toHaveText(severityHeader);
    await expect(
      this.actionsColumnHeader,
      "Actions column header should match expected text",
    ).toHaveText(actionsHeader);
  }

  async assertDefectExists(title: string) {
    const defectRow = this.tableRows.filter({ hasText: title });
    await expect(
      defectRow,
      `Defect with title "${title}" should be visible in the list`,
    ).toBeVisible();
  }
}
