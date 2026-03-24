# Exploratory Tester Results

---

## Session: 2026-03-23

**Application URL:** http://localhost:5173/  
**Application Title:** Defect Containment Board  
**Tested By:** Exploratory Testing Agent

---

## 1. Login Page

**URL:** http://localhost:5173/  
**Screenshot:** `support-files/01-login-page.png`

### Elements

| Element Description   | Visible Text / Label                    | Recommended Locator                | Locator Type | Stability                                  |
| --------------------- | --------------------------------------- | ---------------------------------- | ------------ | ------------------------------------------ |
| App logo icon         | _(SVG shield icon)_                     | `'svg.lucide-shield'`              | CSS class    | ⚠️ Unstable — class-based SVG              |
| Page heading (H1)     | "Defect Containment Board"              | `'h1.text-2xl'`                    | CSS class    | ⚠️ Unstable — utility class only           |
| Subtitle paragraph    | "Internal QA Portal"                    | `'p.text-gray-400.text-sm'`        | CSS class    | ⚠️ Unstable — utility class only           |
| Username label        | "Username"                              | `'label.block.text-sm'` (first)    | CSS class    | ⚠️ Unstable — no unique identifier         |
| Username input        | placeholder: "Enter username"           | `'[data-testid="login-username"]'` | data-testid  | ✅ Stable                                  |
| Password label        | "Password"                              | `'label.block.text-sm'` (second)   | CSS class    | ⚠️ Unstable — no unique identifier         |
| Password input        | placeholder: "Enter password"           | `'[data-testid="login-password"]'` | data-testid  | ✅ Stable                                  |
| Submit / login button | "Access Containment System"             | `'button.auth-action-x78'`         | CSS class    | ⚠️ Unstable — obfuscated class, may change |
| Version text          | "v3.14.159 — Authorized Personnel Only" | `'p.text-gray-600.text-xs'`        | CSS class    | ⚠️ Unstable — utility class only           |

### Notes & Observations

- The login submit button has **no `data-testid`** and uses class `auth-action-x78` — this looks intentionally obfuscated; it is also `type="submit"` which can be used as a fallback selector: `'button[type="submit"]'`.
- Username and password inputs have clean `data-testid` attributes — stable and ready for automation.
- Labels are not linked to inputs via `for`/`id` attributes — accessibility gap.

---

## 2. Dashboard (Post-Login)

**URL:** http://localhost:5173/  
**Screenshot:** `support-files/02-dashboard.png`

### Navigation Elements

| Element Description           | Visible Text    | Recommended Locator                                       | Locator Type | Stability                                                 |
| ----------------------------- | --------------- | --------------------------------------------------------- | ------------ | --------------------------------------------------------- |
| App brand / logo text         | "DCB"           | `'span.font-bold.text-white.text-sm'`                     | CSS class    | ⚠️ Unstable — utility class only                          |
| Dashboard nav button (active) | "Dashboard"     | `'button.text-neon-purple'`                               | CSS class    | ⚠️ Unstable — active-state class, changes per active page |
| Defect List nav button        | "Defect List"   | `'//button[contains(normalize-space(),"Defect List")]'`   | XPath text   | ⚠️ Unstable — text-based locator                          |
| Report Defect nav button      | "Report Defect" | `'//button[contains(normalize-space(),"Report Defect")]'` | XPath text   | ⚠️ Unstable — text-based locator                          |
| Logout button                 | "Logout"        | `'button.hover\\:text-red-400'`                           | CSS class    | ⚠️ Unstable — utility class only                          |

> **Note:** Navigation buttons have **no `data-testid`** and no `id` attributes. XPath using normalized text content is the most reliable available option but is still text-based.

### Dashboard Content Elements

| Element Description        | Visible Text / Value                                     | Recommended Locator                     | Locator Type | Stability                          |
| -------------------------- | -------------------------------------------------------- | --------------------------------------- | ------------ | ---------------------------------- |
| Page heading               | "Dashboard"                                              | `'h1.text-3xl'`                         | CSS class    | ⚠️ Unstable — utility class only   |
| Page subtitle              | "Mission Control for Defect Containment"                 | `'p.text-gray-400'` (first `p` in main) | CSS class    | ⚠️ Unstable — shared class         |
| Total Defects label        | "Total Contained Defects"                                | `'p.text-gray-400.text-sm'` (first)     | CSS class    | ⚠️ Unstable — shared class         |
| Total Defects count        | e.g., "5"                                                | `'[data-testid="defect-count"]'`        | data-testid  | ✅ Stable                          |
| Critical count label       | "Critical"                                               | `'p.text-gray-400.text-sm'` (second)    | CSS class    | ⚠️ Unstable — shared class         |
| Critical count value       | e.g., "3"                                                | `'p.text-red-400.text-3xl'`             | CSS class    | ⚠️ Unstable — utility class only   |
| Containment Rate label     | "Containment Rate"                                       | `'p.text-gray-400.text-sm'` (third)     | CSS class    | ⚠️ Unstable — shared class         |
| Containment Rate value     | "98.7%"                                                  | `'p.text-electric-blue'`                | CSS class    | ⚠️ Unstable — custom utility class |
| "DO NOT TOUCH" button      | "DO NOT TOUCH"                                           | `'[data-testid="do-not-touch-btn"]'`    | data-testid  | ✅ Stable                          |
| Reset Data button (footer) | "Reset Data"                                             | `'[data-testid="reset-data"]'`          | data-testid  | ✅ Stable                          |
| Footer text                | "Defect Containment Board v3.14.159 — Internal Use Only" | `'p.text-gray-700.text-xs'`             | CSS class    | ⚠️ Unstable — utility class only   |

---

## 3. Defect List Page

**URL:** http://localhost:5173/ (SPA — same URL)  
**Screenshot:** `support-files/03-defect-list.png`

### Page Elements

| Element Description              | Visible Text                      | Recommended Locator                   | Locator Type  | Stability                                                                                 |
| -------------------------------- | --------------------------------- | ------------------------------------- | ------------- | ----------------------------------------------------------------------------------------- |
| Page heading (H1)                | "Defect List"                     | `'h1'` (within main content)          | CSS tag       | ⚠️ Unstable — no unique identifier                                                        |
| Defect total count subtitle      | "All contained defects — X total" | `'p.text-gray-400'` (first in main)   | CSS class     | ⚠️ Unstable — shared class                                                                |
| Report Defect button (top right) | "+ Report Defect"                 | `'button.btn-neon-purple'`            | CSS class     | ⚠️ Unstable — no data-testid                                                              |
| Defects table                    | _(container)_                     | `'table'`                             | CSS tag       | ⚠️ Unstable — single table assumption                                                     |
| Table header — ID                | "ID"                              | `'table th:nth-child(1)'`             | CSS nth-child | ⚠️ Unstable — positional                                                                  |
| Table header — Title             | "Title"                           | `'table th:nth-child(2)'`             | CSS nth-child | ⚠️ Unstable — positional                                                                  |
| Table header — Severity          | "Severity"                        | `'table th:nth-child(3)'`             | CSS nth-child | ⚠️ Unstable — positional                                                                  |
| Table header — Actions           | "Actions"                         | `'table th:nth-child(4)'`             | CSS nth-child | ⚠️ Unstable — positional                                                                  |
| Table row (any)                  | _(row content)_                   | `'tbody tr'`                          | CSS           | ⚠️ Unstable — positional, no data-testid                                                  |
| Severity badge — Critical        | "Critical"                        | `'span.text-red-400.rounded-full'`    | CSS class     | ⚠️ Unstable — utility class only                                                          |
| Severity badge — Major           | "Major"                           | `'span.text-yellow-400.rounded-full'` | CSS class     | ⚠️ Unstable — utility class only                                                          |
| Severity badge — Minor           | "Minor"                           | `'span.rounded-full.text-xs'`         | CSS class     | ⚠️ Unstable — shared class                                                                |
| Resolve button                   | "Resolve"                         | `'[data-testid="resolve-btn"]'`       | data-testid   | ⚠️ Unstable — multiple elements share same `data-testid`; use `.first()` or filter by row |

### Table Structure

```
table
  thead
    tr > th[ID] th[Title] th[Severity] th[Actions]
  tbody
    tr.border-b.border-white/5
      td > div "#N"
      td > div > svg + div "Title text"
      td > span.rounded-full "Severity badge"
      td > button[data-testid="resolve-btn"] "Resolve"
```

### Notes

- Table rows (`tbody tr`) have **no `data-testid`** — identifying a specific row requires combining text content with CSS/XPath, e.g.: `'//tbody/tr[td[contains(text(),"#1")]]'`
- The `resolve-btn` `data-testid` is **shared across all rows** — scoping to a specific row is required: `'//tbody/tr[td[normalize-space()="#1"]]//button[@data-testid="resolve-btn"]'`

---

## 4. Report Defect Form

**URL:** http://localhost:5173/ (SPA — same URL)  
**Screenshot:** `support-files/04-report-defect-form.png`

### Form Elements

| Element Description        | Visible Text / Placeholder                      | Recommended Locator                                              | Locator Type | Stability                           |
| -------------------------- | ----------------------------------------------- | ---------------------------------------------------------------- | ------------ | ----------------------------------- |
| Page heading (H1)          | "Report Defect"                                 | `'h1'`                                                           | CSS tag      | ⚠️ Unstable — no unique identifier  |
| Page subtitle              | "Document a new containment breach"             | `'p.text-gray-400'`                                              | CSS class    | ⚠️ Unstable — shared class          |
| Title label                | "Title"                                         | `'label.block.text-sm'` (first)                                  | CSS class    | ⚠️ Unstable — shared class          |
| Title input                | placeholder: "e.g., Button achieves sentience"  | `'[data-testid="defect-title"]'`                                 | data-testid  | ✅ Stable                           |
| Description label          | "Description"                                   | `'label.block.text-sm'` (second)                                 | CSS class    | ⚠️ Unstable — shared class          |
| Description textarea       | placeholder: "Describe the defect in detail..." | `'[data-testid="defect-description"]'`                           | data-testid  | ✅ Stable                           |
| Severity label             | "Severity"                                      | `'label.block.text-sm'` (third)                                  | CSS class    | ⚠️ Unstable — shared class          |
| Severity select dropdown   | options: Critical / Major / Minor               | `'[data-testid="defect-severity"]'`                              | data-testid  | ✅ Stable                           |
| Submit button              | "Submit Defect Report"                          | `'[data-testid="submit-defect"]'`                                | data-testid  | ✅ Stable                           |
| Legacy checkbox            | _(unchecked)_                                   | `'[data-testid="legacy-checkbox"]'`                              | data-testid  | ✅ Stable                           |
| Legacy checkbox label text | "Enable legacy compatibility mode"              | `'//span[normalize-space()="Enable legacy compatibility mode"]'` | XPath text   | ⚠️ Unstable — text-based locator    |
| Legacy module warning text | "Legacy Module: No need to test this"           | `'p.text-yellow-400'` _(approx)_                                 | CSS class    | ⚠️ Unstable — inspect class details |

### Severity Dropdown Options

| Option Value | Option Text | Default Selected  |
| ------------ | ----------- | ----------------- |
| `Critical`   | Critical    | No                |
| `Major`      | Major       | **Yes (default)** |
| `Minor`      | Minor       | No                |

---

## 5. Post-Submission Behaviour

**Screenshot:** `support-files/05-after-submit.png`

| Observation                      | Details                                                               |
| -------------------------------- | --------------------------------------------------------------------- |
| Redirect destination             | Automatically navigates to **Defect List** page                       |
| Success notification / toast     | **None observed** — no toast, no alert, no `role="alert"` element     |
| New defect placement             | Appended at the **bottom** of the table                               |
| Defect counter subtitle update   | Updates to reflect new total, e.g., "All contained defects — 6 total" |
| Total defects count on Dashboard | Updates accordingly (visible via `[data-testid="defect-count"]`)      |

---

## 6. Logout

**Screenshot:** `support-files/06-after-logout.png`

| Element Description        | Visible Text            | Recommended Locator                                 | Locator Type | Stability                        |
| -------------------------- | ----------------------- | --------------------------------------------------- | ------------ | -------------------------------- |
| Logout button (navigation) | "Logout"                | `'//button[normalize-space()="Logout"]'`            | XPath text   | ⚠️ Unstable — text-based locator |
| Post-logout state          | Redirects to Login page | _(N/A — verify by asserting login form visibility)_ | —            | —                                |

### Notes

- After clicking Logout, the application redirects to the Login page.
- There is no logout confirmation dialog.
- Login form fields are cleared/empty on return.

---

## 7. Summary: data-testid Coverage

| Element                            | data-testid          | Stability                                              |
| ---------------------------------- | -------------------- | ------------------------------------------------------ |
| Username input (login)             | `login-username`     | ✅                                                     |
| Password input (login)             | `login-password`     | ✅                                                     |
| Login submit button                | ❌ None              | ⚠️ `button[type="submit"]` or `button.auth-action-x78` |
| Dashboard nav button               | ❌ None              | ⚠️ XPath text                                          |
| Defect List nav button             | ❌ None              | ⚠️ XPath text                                          |
| Report Defect nav button           | ❌ None              | ⚠️ XPath text                                          |
| Logout button                      | ❌ None              | ⚠️ XPath text                                          |
| Total defects count (dashboard)    | `defect-count`       | ✅                                                     |
| DO NOT TOUCH button                | `do-not-touch-btn`   | ✅                                                     |
| Reset Data button                  | `reset-data`         | ✅                                                     |
| + Report Defect button (list)      | ❌ None              | ⚠️ `button.btn-neon-purple`                            |
| Table rows                         | ❌ None              | ⚠️ XPath with text content                             |
| Severity badge spans               | ❌ None              | ⚠️ CSS colour class                                    |
| Resolve button                     | `resolve-btn`        | ⚠️ Shared across all rows                              |
| Defect title input (form)          | `defect-title`       | ✅                                                     |
| Defect description textarea (form) | `defect-description` | ✅                                                     |
| Severity select (form)             | `defect-severity`    | ✅                                                     |
| Submit defect button (form)        | `submit-defect`      | ✅                                                     |
| Legacy mode checkbox (form)        | `legacy-checkbox`    | ✅                                                     |

---

## 8. Missing data-testid — Recommendations

The following elements are missing `data-testid` attributes and require unstable locators:

1. **Login submit button** — add `data-testid="login-submit"`
2. **Navigation: Dashboard button** — add `data-testid="nav-dashboard"`
3. **Navigation: Defect List button** — add `data-testid="nav-defect-list"`
4. **Navigation: Report Defect button** — add `data-testid="nav-report-defect"`
5. **Navigation: Logout button** — add `data-testid="nav-logout"`
6. **+ Report Defect button** (in Defect List view) — add `data-testid="report-defect-btn"`
7. **Table `tbody tr`** rows — add `data-testid="defect-row"` or `data-testid="defect-row-{id}"`
8. **Severity badge** `<span>` — add `data-testid="severity-badge"`
9. **Defect count subtitle** paragraph — add `data-testid="defect-list-count"`
10. **Critical stat value** (dashboard card) — add `data-testid="critical-count"`
11. **Containment Rate value** (dashboard card) — add `data-testid="containment-rate"`
