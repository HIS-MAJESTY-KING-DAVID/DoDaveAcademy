# DoDave Academy Full Migration Parity Matrix

This matrix compares Lionelle’s verified **staging-kulmapeck** Symfony application with the active DoDave Academy Next.js route tree. The comparison distinguishes between a page that merely exists and a workflow whose data access, authorization, recursive children, state transitions, and persistence behavior are implemented.

> The existing Prisma schema is treated as the database contract. This migration does not introduce a parallel schema or replace the already-migrated relational model.
>
> **Current behavioral parity score: 52% (2026-08-25).** This conservative score covers 21 capability groups and weights full parity as 1 point, partial/unverified parity as 0.5 points, and missing/unconfirmed parity as 0 points. See `FEATURE_PARITY_PRODUCTION_READINESS.md` for the calculation and production-readiness interpretation.

| Domain | Legacy source surface | DoDave Academy active surface | Current state | Required completion work |
|---|---|---|---|---|
| Public home, catalog, categories | `HomeController`, `Front/CoursesController`, `courses_category`, home/course Twig includes | `/`, `/courses`, `/courses/[slug]`, `/programs`, category APIs | Partially migrated | Verify filters, canonical slugs, enrollment CTA, media fallbacks, and course detail actions against live Prisma data. |
| Authentication and registration | Registration, security, reset-password, profile controllers | Auth pages and APIs, referral registration | Repaired and extended | Validate all session transitions, email verification expectations, profile completion, and production secrets. |
| Free and paid course enrollment | Front payment controller, student course controller, payment APIs | `/courses/[slug]/enroll`, `/api/enroll`, payment init/webhook, learning routes | Repaired in current pass | Add reliable post-payment polling/status UI and verify gateway callback idempotency against production payloads. |
| Learning recursion | Course start, lesson read, lesson finish, lecture progression, chapter quiz, course quiz | `/learn/[courseSlug]`, lesson, forum, quiz routes; progress and quiz APIs | Partially repaired | Align lesson completion with next lesson/chapter quiz/course completion; add correction persistence and robust resume behavior. |
| Chapter quizzes | Legacy proposition-index grading, `QuizLost`, `QuizResult`, `Lecture` state | Recursive chapter quiz page and runner | Repaired in current pass | Add integration tests for retry cooldown, multi-answer grading, and next-chapter progression using fixtures. |
| Instructor courses | Instructor course/chapter/lesson/quiz controllers and nested Twig pages | Instructor course pages and nested chapter/lesson/quiz APIs | Partially migrated | Verify every nested mutation, reorder behavior, media upload, publish validation, and authorization boundary. |
| Instructor evaluations | Instructor evaluation/question controllers and nested question pages | Evaluation list, create, detail editor, question CRUD APIs/pages | Repaired in current pass | Add result review/correction UI and validate random-question behavior if enabled in source data. |
| Student evaluations | Student assignment, timed attempt, result/correction pages | Student evaluation dashboard, begin/result routes, submit API | Repaired in current pass | Verify assignment by class and direct student, pass threshold, timing, and result display with real records. |
| Instructor exams | Instructor exam create/edit/publish/delete and file upload | Instructor exam list, new/edit pages, APIs | Repaired in current pass | Complete subject/correction file upload and align validation/publish state with admin workflow. |
| Public exams | Exam catalog, detail, gated subject/correction downloads | `/exams`, `/exams/[reference]`, exam APIs/file route | Partially migrated | Verify premium gating, download authorization, and source file/media path compatibility. |
| Student network | Registration hierarchy, points distribution, withdrawal | Network dashboards, referral registration, reward service, payout API | Partially repaired | Reconcile legacy point/cash semantics, withdrawal statuses, gateway response mapping, and admin approval flows. |
| Payments and subscriptions | Course/subscription payment controllers and payment history | Payment checkout, init/webhook, subscription pages, history | Partially migrated | Implement payment status polling, failed/cancelled UI, subscription expiry handling, and full history parity. |
| Forums | Global forum, course forum, subject/messages, likes, solved state | Global/course forum pages and APIs | Partially migrated | Test nested thread creation/reply/like/solve authorization and render pagination/empty states. |
| Chat and messaging | Chat, group chat, Firebase/push surfaces | Supabase/chat conversation APIs and student messages page | Partially migrated | Verify conversation creation, participant authorization, realtime delivery, unread state, and fallback behavior. |
| Notifications | Student notifications, templates, push device registration | Notification APIs, dashboard, dropdown | Partially migrated | Wire all source notification events and verify device token lifecycle/push delivery. |
| Admin catalog CRUD | Generated CRUD controllers for categories, classes, courses, FAQs, levels, plans | Admin pages/APIs for those entities | Partially migrated | Complete show/edit/new/delete recursive pages and validation error handling. |
| Admin learning CRUD | Chapters, lessons, quizzes, propositions, media | No complete active admin route family | Missing | Add recursive admin resource pages and APIs, preserving relation constraints and ownership-independent admin access. |
| Admin evaluations | Evaluation and evaluation-question controllers/templates | No complete admin evaluation route family | Missing | Add admin list/detail/question/assignment/result management. |
| Admin users and profiles | Students, instructors, people, institutions, countries, specialties, terms | Basic user/instructor pages | Partially migrated | Add full profile edit/show workflows and relation-aware CRUD. |
| Admin settings | Website, social, network, email, notification settings | Site/social/network settings | Partially migrated | Add email and notification-template settings and make all settings affect runtime behavior. |
| Blog, investor, projects, services, team, testimonials | Dedicated controllers and templates | No active parity pages | Missing or deferred | Confirm product scope with DoDave Academy stakeholders, then migrate or explicitly retire each surface. |
| Error and maintenance surfaces | 403/404/payment success/payment error/maintenance | Basic Next.js not-found and payment responses | Partially migrated | Add branded error pages and user-recoverable payment success/failure routes. |

## Immediate repair order

The next implementation order is intentionally workflow-first. First, recursive learning and assessment state must be reliable because those routes determine whether the platform is usable after enrollment. Second, instructor and administrator CRUD must be completed for the entities that feed those workflows. Third, payment, notification, chat, and file-delivery edge cases must be exercised against realistic records. Finally, lower-priority legacy surfaces such as blog, investor, project, and marketing modules should either be migrated or formally retired rather than left as broken links.

## Evidence files

The raw inventories used to create this matrix are stored in `FULL_MIGRATION_INVENTORY.txt`, `SOURCE_SURFACES.txt`, `TARGET_SURFACES_AND_GAPS.txt`, and `ACTIVE_ROUTE_TRACE.txt` in this directory.
