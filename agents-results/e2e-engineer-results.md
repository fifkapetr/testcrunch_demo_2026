# E2E Engineer Results

---

## Session: 2026-03-23

**Task:** Create an E2E Playwright test for Defect Containment Board — full user flow.\
**Status:** ✅ PASSED (1/1 tests)

---

## Test Flow Implemented

| Step | Action                                                           | Assertions                                                                          |
| ---- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1    | Open application (`http://localhost:5173/`)                      | Heading text, subtitle text, username/password inputs visible, login button visible |
| 2    | Fill credentials and login                                       | —                                                                                   |
| 3    | Dashboard visible                                                | Heading text correct ("Dashboard")                                                  |
| 4    | Navigate to Defect List                                          | Heading text, table visible, report button visible, all 4 column headers correct    |
| 5    | Open Report Defect form                                          | Heading text, all form fields visible (title, description, severity, submit button) |
| 6    | Fill and submit defect (title, description, severity = Critical) | —                                                                                   |
| 7    | Verify defect was created                                        | Back on Defect List, new defect row visible in table                                |
| 8    | Logout                                                           | Login form (username + password inputs) visible                                     |

---

## Files Created

| File                                     | Purpose                                                            |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `.env`                                   | Sensitive credentials and base URL                                 |
| `src/data/users.json`                    | Non-sensitive user test data                                       |
| `src/i18n/en.json`                       | Text dictionary for all UI strings used in assertions              |
| `src/pages/LoginPage.ts`                 | Login page POM — open, fill, login, assertions                     |
| `src/pages/DashboardPage.ts`             | Dashboard POM — navigate to defect list, heading assertion         |
| `src/pages/DefectListPage.ts`            | Defect List POM — report button, table headers, defect row, logout |
| `src/pages/ReportDefectPage.ts`          | Report Defect form POM — fill, submit, form visibility assertions  |
| `tests/defect-containment-board.spec.ts` | E2E test following all framework guidelines                        |

---

## Locator Quality Summary

| Element                | Locator                              | Stability                                         |
| ---------------------- | ------------------------------------ | ------------------------------------------------- |
| Username input         | `[data-testid="login-username"]`     | ✅ Stable                                         |
| Password input         | `[data-testid="login-password"]`     | ✅ Stable                                         |
| Login button           | `button[type="submit"]`              | ⚠️ Fixed (replaced obfuscated `auth-action-x78`)  |
| Login page H1          | `h1`                                 | ✅ Acceptable (single H1)                         |
| Login page subtitle    | `p.text-gray-400.text-sm`            | ⚠️ Unstable — utility class only                  |
| Defect List nav button | `button:has(svg.lucide-bug)`         | ⚠️ Fixed — no data-testid; uses Lucide icon class |
| Logout nav button      | `button:has(svg.lucide-log-out)`     | ⚠️ Fixed — no data-testid; uses Lucide icon class |
| Dashboard H1           | `h1`                                 | ✅ Acceptable                                     |
| Defect List H1         | `h1`                                 | ✅ Acceptable                                     |
| Table                  | `table`                              | ✅ Acceptable                                     |
| Table header cells     | `table thead th:nth-child(n)`        | ⚠️ Unstable — positional                          |
| Report Defect button   | `button.btn-neon-purple`             | ⚠️ Unstable — CSS class only                      |
| Table rows             | `tbody tr`                           | ⚠️ Unstable — no data-testid on rows              |
| Defect title input     | `[data-testid="defect-title"]`       | ✅ Stable                                         |
| Defect description     | `[data-testid="defect-description"]` | ✅ Stable                                         |
| Severity select        | `[data-testid="defect-severity"]`    | ✅ Stable                                         |
| Submit defect button   | `[data-testid="submit-defect"]`      | ✅ Stable                                         |

---

## Recommended data-testid Improvements for Dev Team

| Priority | Element                                 | Suggested data-testid                     |
| -------- | --------------------------------------- | ----------------------------------------- |
| HIGH     | Login submit button                     | `login-submit`                            |
| HIGH     | Defect List nav button                  | `nav-defect-list`                         |
| HIGH     | Report Defect nav button                | `nav-report-defect`                       |
| HIGH     | Logout nav button                       | `nav-logout`                              |
| MEDIUM   | Report Defect button (Defect List page) | `report-defect-btn`                       |
| MEDIUM   | Table header cells                      | `col-header-id`, `col-header-title`, etc. |
| LOW      | Table rows                              | `defect-row-{id}`                         |

---

## Agents Used

- **exploratory-tester** — Explored all 4 application views (Login, Dashboard, Defect List, Report Defect form), identified all UI elements, locators, severity dropdown options, and post-submit behaviour.
- **locators-reviewer** — Reviewed all generated locators, fixed obfuscated login button class, replaced text-based nav XPaths with CSS `:has(svg.lucide-*)` selectors, and documented stability of all locators.
