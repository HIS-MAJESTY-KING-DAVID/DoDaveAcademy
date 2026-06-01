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
- Migration progress: **68% → ~72%**
- Pushed to `origin/main` (2 commits)
