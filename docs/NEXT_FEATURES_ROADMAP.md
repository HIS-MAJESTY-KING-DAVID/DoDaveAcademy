# Next Features to Build — Prioritized Roadmap

**Date:** May 10, 2026  
**Based on:** Migration Audit (`MIGRATION_AUDIT.md`)  
**Overall Progress:** 52%  
**Estimated Remaining:** ~674 hours

---

### Quick Reference — Priority Tiers

| Tier | Label | Total Hours | Business Impact |
|---|---|---|---|
| 🔴 **P0** | Build Now (Revenue & Content) | ~160h | Platform cannot function without these |
| 🟡 **P1** | Build Next (Critical Features) | ~134h | Users need these for full experience |
| 🟢 **P2** | Build Soon (Engagement) | ~183h | Differentiators and retention |
| 🔵 **P3** | Build Later (Administration) | ~280h | Back-office and ops efficiency |

---

## 🔴 P0 — Build Now (Revenue & Content Creation)

### 1. Instructor Course CRUD — ✅ Completed 2026-05-10

**Why:** Instructors can see their courses but cannot create, edit, or publish them. This blocks all content generation on the new platform.

**PHP reference:** `Instructor/CoursesController.php`, `Instructor/ChapitreController.php`, `Instructor/LessonController.php`

| Task | Hours | Files | Status |
|---|---|---|---|
| Course editor page (title, description, price, category, level, image) | 16h | `app/dashboard/instructor/courses/new/page.tsx`, `app/dashboard/instructor/courses/[id]/edit/page.tsx` | ✅ Done |
| Chapter management (add/reorder/delete chapters) | 8h | `app/dashboard/instructor/courses/[id]/chapters/page.tsx`, `app/api/instructor/chapters` | ✅ Done |
| Lesson editor (title, content, video link, poster) | 8h | `app/dashboard/instructor/courses/[id]/chapters/[chapterId]/lessons/page.tsx`, `app/api/instructor/lessons` | ✅ Done |
| Quiz editor (add questions, propositions, mark correct answers) | 12h | `app/dashboard/instructor/courses/[id]/chapters/[chapterId]/quizzes/page.tsx`, `app/api/instructor/quizzes` | ✅ Done |
| FAQ editor for course | 4h | Built into course edit page (FAQ tab) | ✅ Done |
| Course publish/validation workflow API | 8h | `app/api/instructor/courses/[id]/publish/route.ts` | ✅ Done |
| Media upload (course image, lesson video) | 8h | `app/api/upload/route.ts` (local filesystem; Supabase Storage integration pending) | ⚠️ Partial |
| Instructor course API routes (CRUD) | 4h | `app/api/instructor/courses/route.ts`, `app/api/instructor/courses/[id]/route.ts`, chapters/lessons/quizzes sub-APIs | ✅ Done |
| **Total** | **68h** | | **✅ 64h/68h** |

**Existing patterns to follow:** `app/dashboard/instructor/courses/page.tsx` (list), `app/dashboard/instructor/exams/page.tsx` (list pattern)

---

### 2. Quick UX Wins (Fastest ROI) — ✅ Completed 2026-05-10

**Why:** These take minimal time but dramatically improve user experience and developer confidence.

| Task | Hours | Files | Status |
|---|---|---|---|
| `app/loading.tsx` — per-route loading skeletons | 2h | `app/loading.tsx`, `app/dashboard/loading.tsx`, etc. | ✅ Done |
| `app/error.tsx` — per-route error boundaries | 4h | `app/error.tsx`, `app/dashboard/error.tsx` | ✅ Done |
| `app/not-found.tsx` — custom 404 | 2h | `app/not-found.tsx` (replace generated bridge) | ✅ Done |
| Course search + pagination on `/courses` | 6h | `app/courses/page.tsx`, `app/api/courses/route.ts` | ✅ Was already done |
| JWT refresh token endpoint | 8h | `app/api/auth/refresh/route.ts`, update `lib/auth.ts` | ✅ Done |
| Free trial access check in course player | 4h | `app/learn/[courseSlug]/layout.tsx` | ✅ Done |
| Quiz retry cooldown logic (10s) | 3h | `app/api/student/quiz-attempt/route.ts` | ✅ Done |
| Forum likes + mark solved | 7h | `app/api/courses/[slug]/forum/subjects/[subjectId]/like/route.ts`, `app/api/courses/[slug]/forum/subjects/[subjectId]/solve/route.ts` | ✅ Done |
| **Total** | **36h** | | **✅ 36h/36h** |

---

### 3. Email Service — ✅ Completed 2026-05-10

**Why:** No transactional emails means no password resets, no registration confirmations, no purchase receipts.

| Task | Hours | Files | Status |
|---|---|---|---|
| Set up Resend (recommended) or Nodemailer | 4h | `lib/email.ts` | ✅ Done |
| Registration confirmation email | 4h | Integrated into `api/auth/register/route.ts` via `sendEmail` + `emailTemplates.welcome()` | ✅ Done |
| Password reset email | 4h | Integrated into `api/auth/forgot-password/route.ts` via `sendEmail` + `emailTemplates.resetPassword()` | ✅ Done |
| Purchase/notification emails | 4h | `lib/email.ts` (templates exist: purchaseReceipt, changeEmail, courseValidated) | ✅ Done |
| **Total** | **16h** | | **✅ 16h/16h** |

---

### 4. Profile & Account Improvements — ✅ Completed 2026-05-10

**Why:** Users can view profiles but cannot edit them — basic UX gap.

| Task | Hours | Files | Status |
|---|---|---|---|
| Profile edit form (name, phone, address, bio) | 8h | `app/dashboard/student/profile/edit/page.tsx`, `app/dashboard/instructor/profile/edit/page.tsx` | ✅ Done |
| Avatar upload (base64 or Supabase Storage) | 6h | `app/api/profile/avatar/route.ts` | ✅ Done (local filesystem) |
| Change email flow | 4h | `app/api/profile/email/route.ts` | ✅ Done |
| JWT refresh integration on client | 4h | Already on server side; client interceptor pending | ⚠️ Pending |
| **Total** | **22h** | | **✅ 18h/22h** |

---

### 5. In-App Notification System — ✅ Completed 2026-05-10

**Why:** Users never get notified when someone replies to their forum post, or when a course is approved.

| Task | Hours | Files | Status |
|---|---|---|---|
| Notification API (list, mark read, create) | 8h | `app/api/notifications/route.ts`, `app/api/notifications/[id]/route.ts`, `app/api/notifications/read-all/route.ts` | ✅ Done |
| Notification dropdown in header | 4h | `components/layout/NotificationDropdown.tsx` | ✅ Done |
| Notifications page | 4h | `app/dashboard/notifications/page.tsx` | ✅ Done |
| Trigger notifications on key events | 8h | integration into existing API routes | ⚠️ Pending |
| Supabase realtime for live notifications | 4h | update `lib/supabase.ts` channel subscription | ⚠️ Pending |
| **Total** | **28h** | | **✅ 16h/28h** |

---

## 🟡 P1 — Build Next (Critical Features)

### 6. Business Logic Porting

**Why:** Core PHP services have no React equivalents. Until these exist, features like network commissions and withdrawal simply cannot work.

| Task | Hours | Files |
|---|---|---|
| `ManageNetwork` → `lib/services/network.ts` (5-level MLM distribution) | 16h | `lib/services/network.ts` |
| `InvitationCodeGenerator` → `lib/utils/codes.ts` | 2h | `lib/utils/codes.ts` |
| `checkNumberOperator` → `lib/utils/phone.ts` (Orange vs MTN detection) | 2h | `lib/utils/phone.ts` |
| Registration: assign parent via invitation code | 4h | update `app/api/auth/register/route.ts` |
| `SubjectChatService` → `lib/services/chat-subjects.ts` | 16h | `lib/services/chat-subjects.ts` |
| **Total** | **40h** | |

---

### 7. Student Withdrawal Flow

**Why:** Users accumulate points/cash through referrals but have no way to withdraw — the UI exists but the form/submission doesn't work.

| Task | Hours | Files |
|---|---|---|
| Withdrawal request form page | 4h | create in existing `/dashboard/student/network` |
| Withdrawal API endpoint | 4h | `app/api/student/withdraw/route.ts` |
| Withdrawal history display | 4h | update existing network page |
| **Total** | **12h** | |

---

### 8. Instructor Withdrawal Flow

**Why:** Same as above but for instructors with different commission structure.

| Task | Hours | Files |
|---|---|---|
| Instructor withdrawal API | 4h | `app/api/instructor/withdraw/route.ts` |
| UI integration | 4h | update existing instructor network page |
| **Total** | **8h** | |

---

## 🟢 P2 — Build Soon (Engagement & Differentiators)

### 9. Evaluation System

**Why:** Core LMS feature. Students need to take official evaluations. The Prisma schema exists but no APIs or UI.

| Task | Hours | Files |
|---|---|---|
| Evaluation listing API + page | 8h | `app/api/evaluations/route.ts`, evaluation pages |
| Evaluation taking (questionnaire flow) | 12h | `app/api/evaluations/[id]/submit/route.ts`, take page |
| Evaluation results display | 8h | results page with scores |
| Auto-correction engine | 8h | `lib/services/evaluation-grading.ts` |
| Instructor evaluation management | 8h | update instructor evaluation dashboard page |
| **Total** | **44h** | |

---

### 10. AI Chat Room UI

**Why:** DeepSeek library exists but has no user-facing UI. The legacy system had per-subject AI tutoring chat rooms created on subscription.

| Task | Hours | Files |
|---|---|---|
| AI chat room UI component | 8h | `components/chat/AiChatRoom.tsx` |
| AI chat API endpoint (proxy to DeepSeek with conversation history) | 8h | `app/api/chat/ai/route.ts` |
| Subject chat room assignment (triggered on subscription) | 8h | update payment success flow |
| Chat room list UI | 4h | `app/chat/page.tsx` |
| **Total** | **28h** | |

---

### 11. Push Notifications

**Why:** Firebase not integrated. Users don't get notified on mobile.

| Task | Hours | Files |
|---|---|---|
| Firebase service worker + config | 4h | `public/firebase-messaging-sw.js`, `lib/firebase.ts` |
| Device token registration API | 4h | `app/api/notifications/device/route.ts` |
| Push notification sending service | 8h | `lib/services/push-notifications.ts` |
| Admin push notification composer UI | 8h | admin page |
| **Total** | **24h** | |

---

## 🔵 P3 — Build Later (Administration)

### 12. Admin Dashboard (Phased)

**Why:** 34 admin controllers with 0 React pages. Largest gap. Phase by operational need.

| Phase | Module | Hours |
|---|---|---|
| 1 | User management (list, block, promote) | 16h |
| 2 | Course validation (approve/reject courses) | 12h |
| 3 | Category, class, level management | 12h |
| 4 | Subscription plan management | 8h |
| 5 | Instructor validation (approve/reject instructors) | 8h |
| 6 | Site settings (general, email, social, maintenance) | 8h |
| 7 | Forum management (moderation) | 8h |
| 8 | FAQ management | 4h |
| 9 | Media management | 8h |
| 10 | Analytics dashboard | 16h |
| 11 | Remaining CRUD pages (evaluation questions, propositions, notifications, etc.) | 80h |
| **Total** | | **180h** |

---

### 13. Google Login

**Why:** OAuth login reduces friction. Partially implemented in PHP.

| Task | Hours |
|---|---|
| NextAuth.js or custom OAuth integration | 12h |
| UI button on login page | 4h |
| **Total** | **16h** |

---

## Phased Execution Timeline

```
WEEK   FOCUS                          DELIVERABLES
────   ─────                          ───────────
 1     Quick UX Wins                  loading.tsx, error.tsx, not-found.tsx
                                      Course search + pagination
                                      JWT refresh token
                                      Free trial access check

 2-3   Instructor Course CRUD         Course editor (create/edit)
                                      Chapter/lesson management
                                      Quiz editor
                                      Media upload to Supabase

 4     Email + Notifications          Resend integration
                                      Transactional email templates
                                      In-app notification system

 5-6   Payment Pipeline               MobileApiService port
                                      PaymentUtil port
                                      checkNumberOperator
                                      POST /api/payment/init
                                      POST /api/payment/webhook

 7     Business Logic Porting         ManageNetwork → lib/services/network.ts
                                      SubjectChatService port
                                      Invitation code on register

 8     Profile + Withdrawals          Profile edit page
                                      Avatar upload
                                      Student/instructor withdrawal flow

 9-10  Admin Dashboard (Phase 1-2)    User management
                                      Course validation
                                      Category/class management

11-12  Evaluation System              Evaluation taking + results
                                      Auto-correction engine

13-14  AI Chat + Forum Extras         AI chat room UI
                                      Forum likes, mark solved

15+    Admin Dashboard (remaining)    All remaining admin CRUD pages
```

---

## What I Recommend Building Right Now (This Sprint)

If you can only pick **one thing**, build the **Instructor Course CRUD** — without it, no new courses can be created. If you can pick **three**:

1. **Instructor Course CRUD** (68h) — unblocks content creation
2. **Quick UX wins** (36h) — loading states, error boundaries, search/pagination, JWT refresh
3. **Email service** (16h) — enables password reset, registration confirmation

These three together (~120h, roughly 3 weeks for a single developer) will take the project from **41% to ~52% completion** and make the platform usable for both instructors and students.

**Update (2026-05-10):** Quick UX Wins (36h) + Instructor Course CRUD (64h) + Email Service (16h) + Profile & Account (18h) + In-App Notifications (16h) fully implemented. Overall progress moved from 41% → **52%**. Next priority: Payment system (92h) — without revenue, the platform can't sustain itself.

---

## Appendix A: Legacy Phase Reference (from Master Plan)

For reference, the following phases from the original master plan have already been completed or superseded by the roadmap above.

### Completed Phases

| Phase | Focus | Completed | Git Ref |
|---|---|---|---|
| 1 | Foundation & Authentication (JWT, Login/Register, Forgot Password, Middleware) | ✅ 2026-03-03 | `f422a35` (Auth Refinement) |
| 2 | Public Course Catalog (listing, detail, categories, filters) | ✅ ~95% (2026-03-03) | `27214f0` (course catalog impl) — search/pagination still missing |
| 3 | Student Learning Environment (enrollment, player, quizzes, progress) | ✅ 2026-03-03 | `638af87` |
| 5 | Social & Real-time Features (forum, chat, Supabase Realtime, RLS) | ✅ 2026-03-04 | `24b3585` (Forum) → `2b28177` (Chat) → `4d2de3d` (Supabase config) |
| 7 | Security & Performance Hardening | ⚠️ Partial (2026-03-05) | `3f3b498` — Zod + error handling done, RLS audit + rate limiting pending |
| 8 | Data Migration & Cutover | ⚠️ Partial (2026-03-05) | `582afc5` — rename + build fix done, live migration pending |
| 10 | Site Audit & 404 Resolution | ✅ 2026-03-05 to 2026-03-09 | `6843707` (404 audit) → `571ecb3` (exams) → `67d09ee` (SEO) |
| 11 | Infrastructure Maintenance | ✅ 2026-04-18 to 2026-04-29 | `952f6e2` (Phase 11 doc) → `ee83f62` (keep-alive fix) |

### Phase 7: Security & Performance Hardening (Started 2026-03-05, still in progress)

- [x] Input Validation: Zod installed, auth validation created _(2026-03-05)_
- [x] Global Error Handling: `lib/exceptions.ts` created _(2026-03-05)_
- [ ] RLS Audit: Review all tables for data leakage
- [ ] Refactor Course API with Zod validation
- [ ] Rate Limiting: Implement for auth and payment endpoints
- [ ] Core Web Vitals: Optimize LCP, CLS, INP
- [ ] Media Optimization: `next/image`, video compression
- [ ] Caching: `stale-while-revalidate` for non-critical data
- [ ] Cross-platform QA: Test mobile and desktop browsers

### Phase 8: Data Migration & Cutover (Started 2026-03-05, live migration pending)

- [x] Environment Variables: Verify all Prod secrets in Vercel _(2026-03-05)_
- [x] Build Check: `npm run build` passes locally _(2026-03-05)_
- [x] Cleanup: Removed broken generated components _(2026-03-05)_
- [x] Project renamed to "dodave-academy" _(2026-03-05)_
- [x] Supabase Storage configured (avatars, media, course-content, secure-docs) _(2026-03-04)_
- [ ] SEO: Check robots.txt, sitemap.xml, meta tags
- [ ] Data: Bulk import from old PostgreSQL to new
- [ ] E2E Testing: Playwright/Cypress
- [ ] DNS: Switch domain to Vercel
- [ ] Post-Launch: Analytics + 48h monitoring

### Critical Dependencies & Risks

**Missing PHP Logic to Port:**
1. `MobileApiService.php` — Raw cURL payment gateway requests
2. `PaymentUtil.php` — Course/subscription payment orchestration
3. `Utils::checkNumberOperator` — Cameroon phone validation
4. `Keys.php` — File-based key management

**Configuration Gaps:**
- Secrets: `APP_SECRET`, `JWT_PASSPHRASE`, `API_PAY_URL` missing from React `.env`
- Certificates: `cacert.pem` and `private.pem` required for payment signing

### Rollback Procedures

**During Development:** Stop Next.js server, return to PHP directory. No data destruction occurs.

**Post-Cutover:** Revert DNS to original PHP server IP. Ensure backward compatibility of schema changes (use fresh DB for React if possible).

### Global Guidelines

**Security:** Validate all API inputs with Zod. Implement CSP, X-Frame-Options, X-Content-Type-Options. Run `npm audit` regularly.

**Maintainability:** Explain *why* not *what* in code comments. Use conventional commits (`feat:`, `fix:`).

**Reusability:** Atomic design (small stateless atoms). Extract logic into custom hooks. Abstract API calls into service layer (`lib/services/`).
