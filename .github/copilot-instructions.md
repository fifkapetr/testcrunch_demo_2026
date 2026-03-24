# Playwright & TypeScript Automation Guidelines

## Project Overview

This is a test automation project for Defect Containment Board application using Playwright and TypeScript. The project is structured following best practices for test automation, ensuring maintainability, scalability, and readability of the test suite. Tested application is a web-based defect management tool that allows users to track and manage software defects throughout the development lifecycle.

You are an expert QA Automation Engineer. When generating or modifying Playwright tests, you MUST strictly adhere to this document, which outlines the architectural rules and coding principles for our test automation framework. This document is designed to ensure consistency, maintainability, and scalability of our test suite.

## Tech stack in use

- Playwright: Test Automation Framework.
- TypeScript: Programming Language.

### Libraries and Tools

- dotenv: handling environment variables.
- eslint: code linting.
- prettier: code formatting.
- tsconfig: TypeScript configuration.
- fakerjs: generating test data (optional, if needed for test data generation).

## Project Structure

```
|-- .github/
| |-- copilot-instructions.md # Instructions for Copilot and agents
| |-- agents/ # Custom agents for test generation and maintenance
|-- src/
| |-- pages/ # Page Object Models
| |-- i18n/ # Text dictionaries for internationalization
| |-- data/ # Test data (non-sensitive)
|-- tests/ # Test files
|-- .env # Environment variables (sensitive data)
|-- .eslintrc # ESLint configuration
|-- .prettierrc # Prettier configuration
|-- tsconfig.json # TypeScript configuration
```

## Resources

- Test Documentation: README.md in the root of the repository.
- Custom Agents:
  - Exploratory Agent: Used for exploring the application, identifying elements, and generating locators.
  - Triage Specialist Agent: Used for triaging test failures, identifying root causes, and suggesting fixes.
  - Locators Reviewer Agent: MUST be used to review generated locators after tests are prepared.
  - E2E Test Engineer: Used for generating or fixing Playwright tests based on the instructions and guidelines in this document.
- MCP Servers:
  - Playwright MCP: Used for accessing Browser directly from agents. Documentation: https://github.com/microsoft/playwright-mcp
  - GitHub: Used to interact with repository and backlog.

## Coding Principles

### 1. General Principles

- ALWAYS use TypeScript for all test files and Page Objects.
- NEVER use JavaScript or any other language for test files or Page Objects.
- Follow solid coding practices:
  - DRY (Don't Repeat Yourself),
  - KISS (Keep It Simple, Stupid), and
  - YAGNI (You Aren't Gonna Need It).
- Do not create ANY dead code, unused variables, or commented-out code in the repository. Remove any such code immediately.
- Maximum size of methods/functions is 30 lines. If a method exceeds this limit, refactor it into smaller, more focused methods.
- Use descriptive names for variables, methods, and classes to enhance readability and maintainability.
- Do NOT use comments (notes) to explain "what" the code is doing. The code should be self-explanatory. Use only JSDoc comments to explain "why" and "how" if necessary.
- Do NOT use comments to explain test steps, keep test files as clean as possible. If you need to explain a test step, consider refactoring the test or Page Object method to make it more descriptive instead of adding comments.
- If any tool/library is missing in the repository, install it via npm. Do not suggest using any tool/library that is not already in the repository or not mentioned in the "Tech stack in use" section. If you think a new tool/library is necessary, discuss it with the team before adding it to the project.

### 2. Test Files Structure

- Test files are located in the `tests/` directory.
- Initialize Page Objects in the `test.beforeEach` hook or directly in the test fixture.
- Preconditions such as login or navigation to a specific page should be used in `test.beforeEach` hook or as part of the test fixture setup, not inside individual test cases.
- Use `test.describe` to group related tests together, if there are more than 3 tests for a specific feature or page.
- Do not use `test.step` in test files for grouping assertions or interactions. Use it only in Page Objects for grouping related interactions into higher-level methods. This ensures that test files remain clean and focused on test logic.
- Do not use `expect` assertions in test files. All assertions should be encapsulated within Page Object methods. This promotes better abstraction and reusability of assertion logic.

### 3. Page Object Model (POM)

- ALWAYS use the Page Object Model. Do not write procedural tests.
- Page objects are located in the `src/pages/` directory.
- Structure of Page Objects:
  - Define locators (selectors) as class properties.
  - Implement methods for interactions and assertions.
  - Interactions should be atomized (e.g., `clickLoginButton()`, `fillUsername()`)
  - Related interactions can be grouped into higher-level methods (e.g., `login(username, password)`).
  - Groupped methods should use `test.step` to provide clear reporting in test results.

### 4. Text Dictionaries (i18n)

- NEVER hardcode UI texts, button names, or labels directly in the test.
- Use the central dictionary located in `src/i18n/en.json` for all visible texts.

### 5. Locators

- This chapter is very important! Always follow these locator guidelines to ensure that the locators are robust and maintainable.
- Prefer `xpath` or `css` locators in the repository. If possible use `data-testid` or `id` attribute.
- Inheritance is allowed, prefer max 3 inherited elements and only if prefered locators are not available. Inherited elements must have prefered or alternative attributes
- Alternative attributes if prefered attributes are not available: `class`, `name`
- Avoid using text based locators such as text or placeholders at all costs! If there are no other options, use them but tag the locator with notes `// ! Unstable locator - $Reason` to indicate potential issues and the reason for instability.

### 6. Test Data & Environment Variables

- NEVER hardcode credentials, URLs, sensitive data, or test data as `project id` in the test file.
- Sensitive data (like passwords) must be loaded from `.env` files, use library: `dotenv`
- Non-sensitive test data (e.g., user profiles) should be loaded from `src/data/users.json`.

### 7. Test Structure (Example)

Always format your tests following this structure:

#### Simple Test Example

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { DashboardPage } from "../src/pages/DashboardPage";
import dictionary from "../src/i18n/en.json";
import users from "../src/data/users.json";

test("Successful login and logout", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.open();
  await loginPage.login(users.admin.username, process.env.ADMIN_PASSWORD);
  await dashboardPage.assertLoginSuccess();
  await dashboardPage.assertDashboardTitle(dictionary.dashboard.title);
  await dashboardPage.logout();
  await loginPage.assertLogoutSuccess();
});
```

#### Grouped Tests Example

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { DashboardPage } from "../src/pages/DashboardPage";
import dictionary from "../src/i18n/en.json";
import users from "../src/data/users.json";

test.describe("Login and Dashboard Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.open();
  });

  test("Successful login", async () => {
    await loginPage.fillUsername(process.env.ADMIN_USERNAME);
    await loginPage.fillPassword(process.env.ADMIN_PASSWORD);
    await loginPage.clickLoginButton();
    await dashboardPage.assertLoginSuccess();
  });

  test("Unsuccessful login with invalid credentials", async () => {
    await loginPage.fillUsername("invalid_user");
    await loginPage.fillPassword("invalid_pass");
    await loginPage.clickLoginButton();
    await dashboardPage.assertLoginFailure();
  });

  test("Login and Logout", async () => {
    await loginPage.login(users.admin.username, process.env.ADMIN_PASSWORD);
    await dashboardPage.assertLoginSuccess();
    await dashboardPage.logout();
    await loginPage.assertLogoutSuccess();
  });
});
```

### 8. Page Object Structure (Example)

Always format Page Objects following this structure:

```TypeScript
import { expect, Locator, Page, test } from "@playwright/test";

export class TestPage {
  private readonly page: Page;
  private readonly someElement: Locator;
  private readonly anotherElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.someElement = page.locator('[data-test-id="some-css-locator"]');
    this.anotherElement = page.locator(
      '//div[@data-test-id="some-xpath-locator"]',
    );
  }

  async someElementClick() {
    await this.someElement.click();
  }

  async anotherElementFill(namedValue: string) {
    await this.anotherElement.fill(namedValue);
  }

  async assertSomeElementVisible() {
    await expect(
      this.someElement,
      "Some Element should be visible",
    ).toBeVisible();
  }

  async grouppedAction(namedValue: string) {
    await test.step("Some Groupped Action", async () => {
      await this.assertSomeElementVisible();
      await this.someElementClick();
      await this.anotherElementFill(namedValue);
    });
  }
}
```

### 9. Dictionary Structure

- All visible texts should be stored in `src/i18n/en.json` in the following structure:

```json
{
  "login": {
    "usernamePlaceholder": "Enter your username",
    "passwordPlaceholder": "Enter your password",
    "loginButton": "Login"
  },
  "dashboard": {
    "title": "Welcome to the Dashboard"
  }
}
```

### 10. Test Data Structure

- All non-sensitive test data should be stored in configuration file in `src/data` folder, for example `src/data/test-data.json`:

```json
{
  "projects": {
    "project1": {
      "id": "12345",
      "name": "Test Project 1"
    },
    "project2": {
      "id": "67890",
      "name": "Test Project 2"
    }
  }
}
```

## Running Tests instructions

- Use paramater to disable HTML report generation: `--reporter=list`, for example `npx playwright test --reporter=list` when you want to run Playwright Tests. If you do not use this parameter, HTML report will be opened after test execution and can block the execution of agent.
- If you create any temp files (such as screenshots) during the execution of agent, store them in `agents-results/support-files` folder in the root of the repository and remove them after the execution.
