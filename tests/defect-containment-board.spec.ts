import { test } from "@playwright/test";
import { DashboardPage } from "../src/pages/DashboardPage";
import { DefectListPage } from "../src/pages/DefectListPage";
import { LoginPage } from "../src/pages/LoginPage";
import { ReportDefectPage } from "../src/pages/ReportDefectPage";
import dictionary from "../src/i18n/en.json";
import users from "../src/data/users.json";

test.describe("Defect Containment Board - E2E Flow", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let defectListPage: DefectListPage;
  let reportDefectPage: ReportDefectPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    defectListPage = new DefectListPage(page);
    reportDefectPage = new ReportDefectPage(page);
    await loginPage.open();
  });

  test("E2E: Login, report a defect and logout", async () => {
    const defectTitle = `E2E Test Defect ${Date.now()}`;

    await loginPage.assertLoginPageVisible(
      dictionary.login.pageHeading,
      dictionary.login.pageSubtitle,
    );
    await loginPage.login(users.standard.username, process.env.USER_PASSWORD!);

    await dashboardPage.assertPageVisible(dictionary.dashboard.pageHeading);
    await dashboardPage.navigateToDefectList();

    await defectListPage.assertPageVisible(dictionary.defectList.pageHeading);
    await defectListPage.assertTableHeadersVisible(
      dictionary.defectList.columnId,
      dictionary.defectList.columnTitle,
      dictionary.defectList.columnSeverity,
      dictionary.defectList.columnActions,
    );

    await defectListPage.clickReportDefectButton();

    await reportDefectPage.assertPageVisible(
      dictionary.reportDefect.pageHeading,
    );
    await reportDefectPage.reportNewDefect(
      defectTitle,
      "Automated E2E test defect description",
      "Critical",
    );

    await defectListPage.assertPageVisible(dictionary.defectList.pageHeading);
    await defectListPage.assertDefectExists(defectTitle);

    await defectListPage.logout();
    await loginPage.assertLoggedOut();
  });
});
