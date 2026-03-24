# Locators Reviewer Results

---

## Session: 2026-03-23

**Reviewed By:** Locators Reviewer Agent  
**Source Report:** `agents-results/exploratory-tester-results.md`  
**Guidelines Reference:** `.github/copilot-instructions.md`

---

## Review Summary

The exploratory testing session identified elements across 4 views: Login, Dashboard, Defect List, and Report Defect form. This review validates each proposed locator against the project guidelines and provides final recommended locators suitable for Page Object implementation.

**Guideline Priority:**  
`data-testid` > `id` > `name` > `class` (CSS/XPath) > text-based (unstable, must be tagged)

---

## 1. Login Page — Reviewed Locators

| Element             | Original Locator                 | Status      | Final Recommended Locator        | Notes                                                                                                                                             |
| ------------------- | -------------------------------- | ----------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Username input      | `[data-testid="login-username"]` | ✅ Pass     | `[data-testid="login-username"]` | Stable                                                                                                                                            |
| Password input      | `[data-testid="login-password"]` | ✅ Pass     | `[data-testid="login-password"]` | Stable                                                                                                                                            |
| Login submit button | `button.auth-action-x78`         | ⚠️ Fixed    | `button[type="submit"]`          | Fixed — `auth-action-x78` appears to be an obfuscated class likely to change; `type="submit"` is semantically stable for a single-form login page |
| Page heading H1     | `h1.text-2xl`                    | ⚠️ Unstable | `h1`                             | Acceptable — single H1 on login page; note: utility class `text-2xl` could change                                                                 |
| Subtitle paragraph  | `p.text-gray-400.text-sm`        | ⚠️ Unstable | `p.text-gray-400.text-sm`        | Unstable — utility class chain only; no preferred attribute available                                                                             |

### TypeScript Locator Declarations (LoginPage)

```typescript
// Stable — data-testid
private readonly usernameInput: Locator = page.locator('[data-testid="login-username"]');
private readonly passwordInput: Locator = page.locator('[data-testid="login-password"]');

// ! Fixed locator — replaced auth-action-x78 class (obfuscated, likely to change) with type="submit" attribute
private readonly loginButton: Locator = page.locator('button[type="submit"]');

// ! Unstable locator — no stable identifier; utility class only; single H1 on page is acceptable
private readonly pageHeading: Locator = page.locator('h1');

// ! Unstable locator — utility class only; no preferred attribute available
private readonly pageSubtitle: Locator = page.locator('p.text-gray-400.text-sm');
```

---

## 2. Navigation — Reviewed Locators

No navigation button has a `data-testid`, `id`, or `name`. The best stable approach without text is to use the unique Lucide icon SVG class within each button via the CSS `:has()` selector (max 2 inheritance levels — compliant with guidelines).

| Element                  | Original Locator | Status   | Final Recommended Locator                 | Notes                                                                                |
| ------------------------ | ---------------- | -------- | ----------------------------------------- | ------------------------------------------------------------------------------------ |
| Dashboard nav button     | XPath text-based | ⚠️ Fixed | `button:has(svg.lucide-layout-dashboard)` | Fixed — replaced text-based with CSS `:has()` using icon class; 2 inheritance levels |
| Defect List nav button   | XPath text-based | ⚠️ Fixed | `button:has(svg.lucide-bug)`              | Fixed — same approach                                                                |
| Report Defect nav button | XPath text-based | ⚠️ Fixed | `button:has(svg.lucide-file-plus)`        | Fixed — same approach                                                                |
| Logout button            | XPath text-based | ⚠️ Fixed | `button:has(svg.lucide-log-out)`          | Fixed — same approach                                                                |

### TypeScript Locator Declarations (NavigationComponent)

```typescript
// ! Fixed locator — no data-testid on nav buttons; using icon class via :has() (2 levels max, icon class is semantic)
private readonly dashboardNavButton: Locator = page.locator('button:has(svg.lucide-layout-dashboard)');

// ! Fixed locator — no data-testid on nav buttons; using icon class via :has() (2 levels max, icon class is semantic)
private readonly defectListNavButton: Locator = page.locator('button:has(svg.lucide-bug)');

// ! Fixed locator — no data-testid on nav buttons; using icon class via :has() (2 levels max, icon class is semantic)
private readonly reportDefectNavButton: Locator = page.locator('button:has(svg.lucide-file-plus)');

// ! Fixed locator — no data-testid on nav buttons; using icon class via :has() (2 levels max, icon class is semantic)
private readonly logoutButton: Locator = page.locator('button:has(svg.lucide-log-out)');
```

---

## 3. Dashboard — Reviewed Locators

| Element                | Original Locator                   | Status      | Final Recommended Locator                     | Notes                                                                |
| ---------------------- | ---------------------------------- | ----------- | --------------------------------------------- | -------------------------------------------------------------------- |
| Page heading           | `h1.text-3xl`                      | ⚠️ Fixed    | `h1`                                          | Fixed — utility class unnecessarily narrows; single H1 is sufficient |
| Total defect count     | `[data-testid="defect-count"]`     | ✅ Pass     | `[data-testid="defect-count"]`                | Stable                                                               |
| Critical count value   | `p.text-red-400.text-3xl`          | ⚠️ Unstable | `p[class*="text-red-400"][class*="text-3xl"]` | Unstable — utility class only; no preferred attribute available      |
| Containment Rate value | `p.text-electric-blue`             | ⚠️ Unstable | `p[class*="text-electric-blue"]`              | Unstable — custom class only; no preferred attribute available       |
| DO NOT TOUCH button    | `[data-testid="do-not-touch-btn"]` | ✅ Pass     | `[data-testid="do-not-touch-btn"]`            | Stable                                                               |
| Reset Data button      | `[data-testid="reset-data"]`       | ✅ Pass     | `[data-testid="reset-data"]`                  | Stable                                                               |

### TypeScript Locator Declarations (DashboardPage)

```typescript
// Stable — data-testid
private readonly totalDefectCount: Locator = page.locator('[data-testid="defect-count"]');
private readonly doNotTouchButton: Locator = page.locator('[data-testid="do-not-touch-btn"]');
private readonly resetDataButton: Locator = page.locator('[data-testid="reset-data"]');

// ! Fixed locator — removed utility class; single H1 on dashboard page is sufficient
private readonly pageHeading: Locator = page.locator('h1');

// ! Unstable locator — no data-testid; utility class only; class names could change with design updates
private readonly criticalCount: Locator = page.locator('p[class*="text-red-400"][class*="text-3xl"]');

// ! Unstable locator — no data-testid; custom utility class only
private readonly containmentRate: Locator = page.locator('p[class*="text-electric-blue"]');
```

---

## 4. Defect List Page — Reviewed Locators

| Element                         | Original Locator                    | Status      | Final Recommended Locator                                                                  | Notes                                                                                                         |
| ------------------------------- | ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Page heading                    | `h1`                                | ✅ Pass     | `h1`                                                                                       | Acceptable — single H1 per view                                                                               |
| Defect total subtitle           | `p.text-gray-400`                   | ⚠️ Fixed    | `p.text-gray-400:has-text` → use `//p[contains(text(),"total")]`                           | Fixed — multiple `p.text-gray-400` exist; XPath with partial text is the only option                          |
| + Report Defect button          | `button.btn-neon-purple`            | ⚠️ Unstable | `button.btn-neon-purple`                                                                   | Unstable — CSS class; unique class name makes this acceptable but prone to redesign changes                   |
| Table element                   | `table`                             | ✅ Pass     | `table`                                                                                    | Acceptable — single table assumed                                                                             |
| Table column header (ID)        | `table th:nth-child(1)`             | ⚠️ Unstable | `table thead th:nth-child(1)`                                                              | Unstable — positional; no preferred attribute                                                                 |
| Severity badge (Critical)       | `span.text-red-400.rounded-full`    | ⚠️ Unstable | `span[class*="text-red-400"][class*="rounded-full"]`                                       | Unstable — utility class only                                                                                 |
| Severity badge (Major)          | `span.text-yellow-400.rounded-full` | ⚠️ Unstable | `span[class*="text-yellow-400"][class*="rounded-full"]`                                    | Unstable — utility class only                                                                                 |
| Severity badge (Minor)          | `span.text-xs.rounded-full`         | ⚠️ Unstable | `span[class*="rounded-full"]:not([class*="text-red-400"]):not([class*="text-yellow-400"])` | Unstable — no unique class; negation selector is fragile                                                      |
| Resolve button (any)            | `[data-testid="resolve-btn"]`       | ⚠️ Unstable | `[data-testid="resolve-btn"]` + row scoping                                                | Unstable — same data-testid on all rows; must be scoped to a specific row via positional nth-of-type or XPath |
| Specific row by ID              | XPath text-based                    | ⚠️ Unstable | `//tbody/tr[td[normalize-space()="#1"]]`                                                   | Unstable — text-based; no preferred identifier on rows                                                        |
| Resolve button for specific row | XPath combo                         | ⚠️ Unstable | `//tbody/tr[td[normalize-space()="#1"]]//button[@data-testid="resolve-btn"]`               | Unstable — combines text content with data-testid                                                             |

### TypeScript Locator Declarations (DefectListPage)

```typescript
// Stable
private readonly pageHeading: Locator = page.locator('h1');
private readonly table: Locator = page.locator('table');

// ! Unstable locator — no data-testid; CSS class only; unique class name makes it acceptable
private readonly reportDefectButton: Locator = page.locator('button.btn-neon-purple');

// ! Unstable locator — text-based (only way to distinguish from other p.text-gray-400 elements)
private readonly defectCountSubtitle: Locator = page.locator('//p[contains(normalize-space(),"total")]');

// ! Unstable locator — shared data-testid across all rows; use .nth(n) or row-scoped locator
private readonly resolveButton: Locator = page.locator('[data-testid="resolve-btn"]');

// ! Unstable locator — no data-testid on rows; positional only
private readonly tableRows: Locator = page.locator('tbody tr');

// ! Unstable locator — no data-testid; utility class only
private readonly severityBadgeCritical: Locator = page.locator('span[class*="text-red-400"][class*="rounded-full"]');

// ! Unstable locator — no data-testid; utility class only
private readonly severityBadgeMajor: Locator = page.locator('span[class*="text-yellow-400"][class*="rounded-full"]');
```

---

## 5. Report Defect Form — Reviewed Locators

| Element              | Original Locator                     | Status      | Final Recommended Locator                                       | Notes                                                       |
| -------------------- | ------------------------------------ | ----------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| Page heading         | `h1`                                 | ✅ Pass     | `h1`                                                            | Acceptable                                                  |
| Title input          | `[data-testid="defect-title"]`       | ✅ Pass     | `[data-testid="defect-title"]`                                  | Stable                                                      |
| Description textarea | `[data-testid="defect-description"]` | ✅ Pass     | `[data-testid="defect-description"]`                            | Stable                                                      |
| Severity select      | `[data-testid="defect-severity"]`    | ✅ Pass     | `[data-testid="defect-severity"]`                               | Stable                                                      |
| Submit button        | `[data-testid="submit-defect"]`      | ✅ Pass     | `[data-testid="submit-defect"]`                                 | Stable                                                      |
| Legacy mode checkbox | `[data-testid="legacy-checkbox"]`    | ✅ Pass     | `[data-testid="legacy-checkbox"]`                               | Stable                                                      |
| Legacy label text    | XPath text-based                     | ⚠️ Unstable | `[data-testid="legacy-checkbox"] + span` (if adjacent) or XPath | Unstable — text-based; no preferred attribute on label span |

### TypeScript Locator Declarations (ReportDefectPage)

```typescript
// Stable — data-testid
private readonly defectTitleInput: Locator = page.locator('[data-testid="defect-title"]');
private readonly defectDescriptionTextarea: Locator = page.locator('[data-testid="defect-description"]');
private readonly defectSeveritySelect: Locator = page.locator('[data-testid="defect-severity"]');
private readonly submitButton: Locator = page.locator('[data-testid="submit-defect"]');
private readonly legacyCheckbox: Locator = page.locator('[data-testid="legacy-checkbox"]');

// Acceptable — single H1 per view
private readonly pageHeading: Locator = page.locator('h1');
```

---

## 6. Issues Found & Fixes Applied

| #   | Issue                                                       | Fix Applied                                                                                                           |
| --- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Login button uses obfuscated class `auth-action-x78`        | ✅ Fixed — changed to `button[type="submit"]`                                                                         |
| 2   | Navigation buttons use text-based XPath                     | ✅ Fixed — changed to CSS `:has(svg.lucide-*)` with icon class                                                        |
| 3   | Dashboard H1 selector included utility class unnecessarily  | ✅ Fixed — simplified to `h1`                                                                                         |
| 4   | `defect-count-subtitle` used a non-unique `p.text-gray-400` | ✅ Fixed — changed to XPath with partial text `contains(normalize-space(),"total")` (text-based — tagged as unstable) |
| 5   | `resolve-btn` shared across all rows                        | ⚠️ Noted — no fix possible without data-testid on rows; must be scoped per test                                       |

---

## 7. Final Verdict: Missing data-testid that SHOULD be added

These elements are blocking stable locator creation. The development team should be notified:

| Priority  | Element                                   | Suggested data-testid                                      |
| --------- | ----------------------------------------- | ---------------------------------------------------------- |
| 🔴 High   | Login submit button                       | `login-submit`                                             |
| 🔴 High   | Navbar: Dashboard button                  | `nav-dashboard`                                            |
| 🔴 High   | Navbar: Defect List button                | `nav-defect-list`                                          |
| 🔴 High   | Navbar: Report Defect button              | `nav-report-defect`                                        |
| 🔴 High   | Navbar: Logout button                     | `nav-logout`                                               |
| 🔴 High   | + Report Defect button (Defect List view) | `report-defect-btn`                                        |
| 🔴 High   | Table rows (`tbody tr`)                   | `defect-row` (+ unique `data-id` attribute with defect ID) |
| 🟡 Medium | Severity badge `<span>`                   | `severity-badge`                                           |
| 🟡 Medium | Defect count subtitle                     | `defect-list-subtitle`                                     |
| 🟡 Medium | Critical stat value (Dashboard)           | `critical-count`                                           |
| 🟡 Medium | Containment Rate value (Dashboard)        | `containment-rate`                                         |
