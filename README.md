# Demo Playwright Project with AI agents

This is a demo Playwright project for TestCrunch 2026 conference. It includes AI agents that can assist with test generation and execution.

**Disclaimer**: All data in this project is fictional and stored locally. No real user data is used or stored out of the local environment.

## Setup

1. You need to install and run this repo (app under test) locally: https://github.com/fifkapetr/ai_test_auto_training_app
2. Clone this repository and navigate to the project directory.
3. Install the dependencies:

```bash
npm install
```

4. Install Playwright MCP: https://github.com/microsoft/playwright-mcp

5. Create a `.env` file in the root of the project and add the following environment variable:

```env
APP_URL=http://localhost:5173/
USER_PASSWORD=password123
```

6. Run the tests:

```bash
npx playwright test
```

## AI Agents

Custom AI agents are defined in `.github/agents/` and can be invoked from VS Code Copilot Chat.
Some agents are designed to call another agent to perform specific tasks, such as exploring app via Playwright MCP or triaging test failures.

### Exploratory Tester

Explores the application via Playwright MCP, identifies UI elements, and generates robust locators (CSS/XPath).

**Example prompts:**

- `@exploratory-tester Explore the login page and generate locators for all interactive elements.`
- `@exploratory-tester Identify key elements on the dashboard and document their attributes.`

### E2E Engineer

Generates or fixes Playwright tests following the project guidelines and coding principles defined in `copilot-instructions.md`.

**Example prompts:**

- `@e2e-engineer Generate Playwright tests for the defect reporting workflow.`
- `@e2e-engineer Fix the failing login test in defect-containment-board.spec.ts.`

### Locators Reviewer

Reviews generated locators across Page Objects to ensure they are robust, maintainable, and follow the locator guidelines.

**Example prompts:**

- `@locators-reviewer Review all locators in the src/pages/ directory.`
- `@locators-reviewer Check the locators in LoginPage.ts and suggest improvements.`

### Triage Specialist

Triages test failures, identifies root causes, suggests and applies fixes, and re-runs tests to verify the resolution.

**Example prompts:**

- `@triage-specialist Triage the failing tests and identify the root causes.`
- `@triage-specialist Investigate why the defect list test is timing out.`
