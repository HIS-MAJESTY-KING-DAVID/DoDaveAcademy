# Progress Log

## June 1, 2026 — Phase 4.5: Missing Pages, Contact Refactor, Vercel Fix

### A: Fixed Broken Routes & Missing Pages
- **/logout** — created page + `POST /api/auth/logout` (clears JWT cookie, redirects to login) — was causing 404
- **/admin/users/[id]** — full user detail page (account, person, instructor, payments, withdrawals, notifications) — was causing 404
- **/api/enroll** — paid enrollment now returns `{ redirectTo: '/payment?courseId=X' }` with status 402 (was stubbed TODO)
- **/faq** — fixed prerender error (missing `force-dynamic`)

### B: New Admin Management Pages
| Page | API Routes | Features |
|---|---|---|
| `/admin/classes` | `POST /api/admin/classes`, `DELETE /api/admin/classes/[id]/delete` | List + create/delete CRUD |
| `/admin/subscription-plans` | `POST /api/admin/subscription-plans`, `DELETE /api/admin/subscription-plans/[id]/delete` | List + create/delete CRUD (label, amount, duration, recommended) |
| `/admin/faq` | `POST /api/admin/faq`, `DELETE /api/admin/faq/[id]/delete` | Course-specific FAQ listing with course selector + create/delete |
| `/admin/exams` | `POST /api/admin/exams/[id]/validate` | List with validate action |
| `/admin/levels` | `POST /api/admin/levels`, `DELETE /api/admin/levels/[id]/delete` | List + create/delete CRUD |
| **Admin sidebar** | — | Updated with links to Classes, Levels, Exams, FAQ, Plans |

### C: Student & Instructor Withdrawal Flow
- **`/dashboard/student/network/retrait`** — withdrawal request form (amount, phone, payment method dropdown)
- **`/dashboard/student/network/retraits`** — withdrawal history table
- **`/api/student/withdraw`** — creates Withdrawal record, decrements user cash, validates minimum/balance
- **`/api/payment-methods`** — GET endpoint for dropdown population
- **Student + Instructor network pages** — updated with withdrawal links

### D: Vercel Deployment Fix
- Replaced broken `DATABASE_URL_IPV4` (Supabase pooler rejected tenant) with `DATABASE_URL` pointing to `db.qpxjcuvlyvaopexqdthb.supabase.co:5432` (direct connection)
- Build now passes with 0 Prisma errors; site live at https://academy.dodave.tech

### E: Contact Info Centralized
- **`lib/contacts.ts`** — single source of truth for `{ phone, email, domain, fromEmail }`
- Updated: Footer, ContactClient, Terms page, email service, register route, all generated legacy contact files
- Future contact updates: edit ONE file

### Build
- **71 pages, 0 errors** (was 68)
- **27 new files** created
- Historical implementation progress at this snapshot: **68% → ~72%**
- Current behavioral parity reference: **60%** across 21 PHP capability groups after accepted Block A admin recursive-content parity and partial subject-chat implementation; see `FEATURE_PARITY_PRODUCTION_READINESS.md`.
- Pushed to `origin/main` (2 commits)


## August 25, 2026 — Parity roadmap Block A accepted; Block B started

The authoritative parity roadmap is now the single execution plan in `zDocs/PARITY_ROADMAP_0_TO_100.md`. Block A passed for the active DoDave data contract and shipped to `main`: recursive admin chapter/lesson create-edit-delete, chapter/lesson reorder, learner-preview link, quiz question/option create-edit-delete using `Quiz.proposition1..4` plus `correctPropositions`, safe course media-reference save/delete, nested parent authorization, bounded payload validation, and explicit delete confirmation UI. The legacy standalone `Proposition` scaffold was not duplicated because the active learner quiz route does not consume that relation; it remains a separately documented admin-surface gap.

Block B is in progress. Admin evaluation question list/create/update/delete routes and a lock-aware UI are now present, with parent scoping, option validation, passed-evaluation protection, and regression tests. Evaluation metadata, assignment mutation, correction/scoring configuration, timing parity, and full role acceptance remain next.

The measured score moved from **57% to 60%**: 8 full groups + 9 partial groups × 0.5 = 12.5/21 = 59.5%, rounded to 60%. Release validation passed with **123 tests across 20 files**, TypeScript, Prisma schema validation using a local non-secret placeholder URL, production build, locale parsing, `git diff --check`, and static audit (`73` active page routes, `0` unresolved internal links, `0` missing EN keys, `0` missing FR keys). Lint has `0` errors and `34` existing warnings. No database migration was applied without controlled credentials. Payment-provider replacement remains deferred pending the new provider contract.


## August 25, 2026 — Block B evaluation administration expanded

Block B remains in progress but now includes an admin evaluation creation page and API, metadata/settings editing, schedule validation, publication and random-question controls, instructor assignment, class/student assignment with class-derived students, lock-aware deletion, and recursive evaluation question create/update/delete management. The admin detail page now exposes settings, questions, assignments, and result summaries.

The measured score remains **60%** because the roadmap only promotes a capability group after its full acceptance gate. Remaining Block B work is correction/result actions, timing and scoring parity against the legacy behavior, and real-account role acceptance. Payment-provider replacement remains deferred.

The release validation passed with **126 tests across 20 files**, TypeScript, Prisma schema validation with a local non-secret placeholder URL, production build, locale parsing, `git diff --check`, and static audit (`74` active page routes, `0` unresolved internal links, `0` missing EN keys, `0` missing FR keys). Lint has `0` errors and `34` existing warnings. No database migration was applied without controlled credentials.
