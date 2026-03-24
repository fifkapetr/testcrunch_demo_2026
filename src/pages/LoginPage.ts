import { expect, Locator, Page, test } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  // ! Fixed locator — replaced obfuscated class 'auth-action-x78' with semantic type="submit" attribute
  private readonly loginButton: Locator;
  private readonly pageHeading: Locator;
  // ! Unstable locator — utility class only; no preferred attribute available on login page subtitle
  private readonly pageSubtitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="login-username"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.pageHeading = page.locator("h1");
    this.pageSubtitle = page.locator("p.text-gray-400.text-sm");
  }

  async open() {
    await this.page.goto(process.env.APP_URL!);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await test.step("Login to the application", async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLoginButton();
    });
  }

  async assertLoginPageVisible(heading: string, subtitle: string) {
    await expect(
      this.pageHeading,
      "Login page heading should match expected text",
    ).toHaveText(heading);
    await expect(
      this.pageSubtitle,
      "Login page subtitle should match expected text",
    ).toHaveText(subtitle);
    await expect(
      this.usernameInput,
      "Username input should be visible",
    ).toBeVisible();
    await expect(
      this.passwordInput,
      "Password input should be visible",
    ).toBeVisible();
    await expect(
      this.loginButton,
      "Login button should be visible",
    ).toBeVisible();
  }

  async assertLoggedOut() {
    await expect(
      this.usernameInput,
      "Username input should be visible after logout",
    ).toBeVisible();
    await expect(
      this.passwordInput,
      "Password input should be visible after logout",
    ).toBeVisible();
  }
}
