# DoDave Academy: Feature Parity and Production-Readiness Analysis

## Executive conclusion

**No, the Next.js application does not yet contain every feature present in Lionelle’s authoritative PHP project.** The migrated application has a substantial and functioning LMS foundation, but it is not a complete behavioral replacement for the PHP system. The largest confirmed parity gap is the PHP **subject-chat product**. Next.js currently contains an authenticated course discussion/forum with subjects and replies, plus a separate basic one-to-one conversation messenger. It does **not** yet reproduce the PHP subject-chat experience: profile-aware subject-room provisioning, premium gating, unread counts, WebSocket token/session flow, real-time subject-room messaging, edit/delete events, AI response hooks, and the associated mobile chat behavior.

**The deployment is operationally healthy but should be described as conditionally production-ready, not feature-complete production parity.** The public site builds and serves real database-backed content, the main public routes and APIs returned HTTP 200 in the latest smoke check, and the recent migration fixes passed the local release gates. However, several authenticated workflows still need security hardening and end-to-end acceptance testing before the application can be considered fully production-ready for all learner, instructor, administrator, payment, and chat use cases.

This assessment compares the current Next.js repository at release commits `1c95cd3` and `ab12a7c` with the complete GitHub checkout of Lionelle’s `adjimi-lionelle/staging-kulmapeck` repository at the inspected `main` revision `82fc346d` (`update chat function`). Evidence is also recorded in `NEXTJS_FEATURE_INVENTORY.txt`, `FEATURE_SURFACE_COMPARISON.txt`, `PHP_CHAT_AUTHORITATIVE.txt`, and `PHP_SUBJECT_CHAT_COMPONENTS.txt`.

## Current implementation baseline

The Next.js application currently exposes **73 page routes**, **82 API route handlers**, and a Prisma schema containing **76 models**. The implemented product surface includes public course discovery, course details and enrollment, learner course playback, lessons, quizzes, exams, evaluations, course forums, direct conversations, student and instructor dashboards, administration, subscriptions, payments, referrals/network withdrawals, notifications, profiles, contact, authentication, and bilingual English/French UI coverage.

The latest local release validation produced the following results:

> **Deployment prerequisite:** Run `npm run db:migrate` against the target Supabase database before enabling `/dashboard/student/subject-chat`. The migration creates the additive `dodave_subject_chat` and `dodave_subject_chat_message` tables, enables message RLS, and adds the message table to the Supabase realtime publication when available. This release does not apply the migration automatically and does not change the future payment provider.

| Validation area | Result |
|---|---|
| TypeScript | Passed with `npx tsc --noEmit` |
| Automated regression suite | 111 tests passed across 19 files after the current parity work |
| Lint | 0 errors; 34 warnings remain, including existing unused-variable/image warnings and the Next middleware deprecation warning |
| Production build | Passed |
| Locale JSON parsing | English, French, and runtime French catalog passed parsing |
| Static link audit | 73 active page routes; 0 unresolved internal links |
| Locale-key parity | 0 missing English keys; 0 missing French keys |
| Production smoke | HTTP 200 for public pages and tested course/category/exam APIs |

The last live smoke check returned HTTP 200 for `/`, `/courses`, `/exams`, `/forum`, `/plan`, `/faq`, `/contact`, `/become-teacher`, `/privacy`, `/terms`, `/api/courses`, `/api/categories`, and `/api/exams`. The cache-busted browser check also confirmed that the latest footer-link repairs and French runtime localization were deployed.

These results establish a healthy deployment baseline. They do **not**, by themselves, prove that every authenticated workflow, payment callback, role boundary, realtime channel, or legacy feature is production-complete.

## Measured behavioral parity score

The current conservative parity score is **57%** as of 2026-08-25. This is a feature-group score, not a percentage of source files or routes. The denominator is the 21 user-visible or operational capability groups in the matrix below. A fully behaviorally migrated group receives 1 point, a partial or unverified group receives 0.5 points, and a missing or intentionally unconfirmed group receives 0 points. The current result is **7 fully migrated groups + 10 partial groups × 0.5 = 12 / 21 = 57.1%, rounded to 57%**.

| Scoring category | Groups | Points |
|---|---:|---:|
| Full behavioral parity | 7 | 7.0 |
| Partial or unverified parity | 10 | 5.0 |
| Missing or not confirmed | 4 | 0.0 |
| **Total** | **21** | **12.0 / 21 = 57%** |

This score supersedes older historical figures such as the 68%, 72%, and 54% progress values in dated migration notes. Those figures used different denominators and implementation-counting rules and must not be presented as the current PHP behavioral-parity score. The score increased from 52% to 57% because the current release adds a partial PHP-equivalent subject-chat workflow and a partial admin recursive course-content workflow, including per-learner rooms, premium gating, unread counts, Supabase realtime with polling fallback, mobile switching, and message edit/delete. Full parity remains incomplete because exact teacher-persona assignment, legacy WebSocket event compatibility, profile-setup exceptions, and the AI response pipeline are not yet migrated. The future payment-provider integration is intentionally deferred and is not included in this release.

## Subject chat: exact parity finding

### What the PHP application provides

The PHP application’s `/chat` feature is a dedicated subject-room chat system. `ChatController.php` gates the feature on authentication, student profile completeness, and premium status, while allowing instructors a different access path. `SubjectChatService.php` provisions subject-chat rooms based on a learner’s class, cycle, specialty, and academic profile. The system exposes endpoints for listing the learner’s subject rooms and unread counts, loading message history, generating a short-lived WebSocket token, updating learner profile information needed for chat access, and editing messages.

The PHP frontend in `templates/student/chat/subject_chat.html.twig` and `public/js/chat.js` provides a two-pane chat UI with subject search, room selection, unread indicators, mobile pane switching, optimistic message rendering, WebSocket reconnect behavior, incoming-message handling, typing/AI indicators, and copy/edit-related actions. The PHP repository also contains `ChatServer.php`, `WebSocketPusher.php`, `AIMessageHandler.php`, `DeepSeekAIService.php`, `MessageChat.php`, and `SubjectChat.php`, confirming that this was more than a conventional forum thread.

### What Next.js currently provides

Next.js has two related but different experiences:

| Next.js surface | Current behavior | Parity assessment |
|---|---|---|
| `/learn/[courseSlug]/forum` | Authenticated, enrolled learners can view a course’s discussion subjects and create new discussions | Partial equivalent to a course forum, not equivalent to PHP subject chat |
| `/learn/[courseSlug]/forum/[subjectId]` | Displays a subject and ordered replies through `ReplyForm` | Threaded forum replies exist, but no live room transport or subject-chat semantics |
| `/api/courses/[slug]/forum/subjects` | Lists and creates course subjects | Read and create paths now require course instructor ownership or student enrollment |
| `/api/courses/[slug]/forum/subjects/[subjectId]/messages` | Reads and creates forum replies | Course ownership and enrollment/instructor authorization are now enforced on read and write |
| `/dashboard/student/subject-chat` | Dedicated subject-room UI with room search, unread badges, mobile switching, polling/realtime, and message edit/delete | Partial PHP subject-chat parity; production migration and full staging acceptance remain |
| `/dashboard/student/messages` | Displays direct conversations backed by `/api/chat/conversations*` and Supabase realtime | Direct messaging has trusted identity, recipient discovery, exact conversation reuse, read-state, and bounded messages |
| `components/chat/SubjectChatWindow.tsx` | Dedicated room/message client with realtime subscription and polling fallback | Missing legacy teacher persona, AI behavior, and full WebSocket compatibility |

Therefore, **subject discussions and a partial PHP-equivalent subject-chat workflow now exist, but the PHP subject-chat feature is not fully migrated**. If by “subject chat” the requirement means exact PHP parity, including teacher personas, WebSocket token compatibility, AI behavior, and all profile-aware provisioning rules, the answer remains no.

### Subject-chat gaps that must be closed

The highest-impact missing capabilities are:

1. **Profile-aware room provisioning.** Next.js now provisions `SubjectChat` rooms per learner and enrolled course category, with a cycle value derived from the learner’s skill level. Exact PHP specialty/cycle eligibility and teacher-persona assignment still need parity work.
2. **Realtime transport compatibility.** Next.js now uses Supabase Realtime with polling fallback and exposes a short-lived Supabase token endpoint. Exact compatibility with the PHP WebSocket server, reconnect protocol, and event names remains to be verified.
3. **Premium and profile gating.** Premium entitlement and student-profile requirements are enforced. Legacy teacher exceptions and complete profile-setup workflow remain to be migrated.
4. **Unread/read state.** Subject-room unread counts are returned and incoming messages are marked read when history loads. Cross-device read synchronization and authenticated staging acceptance remain.
5. **Message operations.** Subject-room send, edit, soft-delete, and mobile list/detail behavior are implemented. AI-generated messages, moderation events, and legacy copy/edit event compatibility remain.
6. **AI subject-chat behavior.** The PHP repository contains AI message handling and DeepSeek integration hooks. Next.js still needs a provider-neutral AI service and explicit product decision before implementing this dependency.
7. **Mobile chat behavior.** Subject-room list/detail switching is implemented for mobile, with realtime plus polling fallback. Full legacy UI parity and reconnect acceptance remain.

## Broader feature-parity analysis

The PHP source contains more than the LMS core. Some legacy controllers are clearly internal CRUD or infrastructure concerns, while others represent user-visible product areas. The following matrix distinguishes confirmed parity, partial parity, and missing or unverified parity.

| Legacy capability | Next.js status | Assessment |
|---|---|---|
| Public home, courses, categories, course detail | Present | Core parity is present and live data is served |
| Course enrollment and paid checkout | Present, hardened during audit | Requires real payment-provider acceptance tests and signed callback verification before full production sign-off |
| Lessons, chapters, course playback, progress | Present | Core flow exists; continue testing sequence edge cases and authorization |
| Recursive quizzes and quiz attempts | Present | Requires deeper parity acceptance against all legacy scoring and retry rules |
| Exams and exam files | Present | Instructor/admin/student paths exist; needs role-based acceptance testing and file-security review |
| Evaluations and results | Present | Core routes/components exist; needs broader behavioral parity testing |
| Course forum subjects/replies | Hardened partial parity | Write authorization and visible like/solve controls are present; nested moderation and authenticated acceptance remain |
| PHP subject chat rooms | Partial parity now implemented | Dedicated per-learner rooms, premium gating, unread state, realtime/polling, mobile UX, and edit/delete are present; teacher persona, WebSocket token compatibility, AI, and production migration application remain |
| Direct user-to-user messenger | Hardened partial parity | Session identity, recipient discovery, exact conversation reuse, read-state, and bounded messages are present; realtime/RLS acceptance remains |
| Course reviews/likes | Partial | Review and like APIs exist in areas, but UI coverage and moderation behavior need confirmation |
| Notifications and device/push features | Partial/present | Routes exist, but delivery, device registration, and production credentials require acceptance testing |
| Student profile and instructor profile | Present | Needs full update, avatar, email, and role-boundary testing |
| Referral/network points and withdrawals | Present | Requires financial-control review, idempotency, and manual approval acceptance tests |
| Subscription plans and premium status | Present | Subscription entitlement must be reconciled with legacy chat and course-access rules |
| Admin users, instructors, categories, classes, levels, courses, exams, FAQs, settings | Present in broad form | Need a role matrix and destructive-action tests; recursive course chapter/lesson creation is now available, while edit/delete and quiz/proposition/media management remain |
| Blog | No corresponding active Next.js route found | Missing or intentionally deferred; confirm product requirement |
| Project/investor/team/testimony areas | No corresponding active Next.js route found | Missing or intentionally deferred; confirm product requirement |
| Firebase/social/Google integrations | Not confirmed as equivalent | Legacy infrastructure exists; current Next.js parity and credentials need explicit decision |
| Legacy analytics/message analytics commands | Not confirmed | Operational parity is missing unless intentionally replaced by another analytics system |
| Legacy WebSocket server and AI services | Not migrated as a subject-chat equivalent | High-priority if the PHP chat is still a required feature |
| Legacy file conversion and upload behavior | Partially represented by upload APIs | Requires MIME, size, authorization, storage, and download-security acceptance testing |

The presence of a Next.js route or Prisma model is not enough to establish parity. A feature is only parity-complete when its authorization, validation, persistence, side effects, UI states, error handling, and role-specific behavior match the legacy product requirements.

## Production-readiness assessment

### What is ready or substantially ready

The public production surface is currently healthy. The database connectivity incident was resolved by prioritizing the Supabase transaction pooler connection, and the deployed API now returns real data rather than generic database failures. Public navigation and internal route scanning are clean. The latest audit also removed fake social-auth anchors, removed the unsupported Add to Cart dead-end, repaired footer links, wired header search, and added bilingual runtime coverage.

Authentication session consistency was improved: login now hydrates the application authentication context, refresh rotates the refresh-token cookie, and logout clears both authentication cookies. Contact submissions no longer use invalid foreign-key ID `0` for anonymous visitors. Payment initialization now validates server-side pricing and prevents duplicate course enrollment. Lesson progress only advances after a successful response. These are meaningful production-hardening improvements.

### What prevents a full production-ready declaration

The following issues remain material:

| Priority | Remaining issue | Why it matters | Recommended treatment |
|---|---|---|---|
| P0 | Subject-chat parity is partial, not complete | The core learner room workflow is present, but legacy teacher persona, WebSocket token compatibility, AI, and migration rollout remain | Apply the additive migration, verify Supabase realtime/RLS in staging, then implement the remaining persona/token/AI capabilities if launch-required |
| P0 | Future payment-provider integration is intentionally deferred | The current payment adapter is not the final provider and should not be treated as the completed payment-parity implementation | Select and integrate the replacement provider later; preserve server-authoritative amounts and callback verification requirements |
| P0 | Forum subject/reply authorization was hardened in code | The shared helper now requires course instructor ownership or student enrollment on reads and writes | Complete UI moderation controls and retain negative cross-course/non-enrolled regression tests |
| P0 | Direct chat identity and conversation creation were repaired in code | The UI now receives the trusted session user ID, supports recipient discovery, rejects self-chat, and reuses only exact two-person conversations | Run authenticated browser acceptance with Supabase realtime/RLS and add read-state semantics |
| P1 | Payment callback and reward fulfillment need stronger idempotency and reconciliation | Duplicate callbacks, delayed callbacks, or inconsistent gateway states can create entitlement/reward errors | Add unique provider transaction constraints, a payment-event table or equivalent, state-transition rules, and reconciliation tooling |
| P1 | Authenticated workflows have not all been browser-tested with real accounts | Unit tests and public HTTP 200 checks do not prove role redirects, cookies, protected mutations, or database side effects | Run a staging acceptance matrix for student, instructor, and admin accounts, including failure and refresh cases |
| P1 | Forum interaction controls are incomplete | Like/solve/edit/delete APIs or legacy behaviors are not consistently visible in the UI | Map every API to an intended UI action, or remove unsupported endpoints; add ownership/moderation tests |
| P1 | Production observability is limited | Generic error responses protect details but can hide failure trends | Add structured server logs, request IDs, payment/webhook alerts, and uptime/error monitoring without exposing secrets |
| P1 | Runtime localization is pragmatic rather than structurally complete | DOM literal translation can miss dynamic interpolation, database content, metadata, and newly added text | Keep explicit `useTranslation` for critical UI; gradually replace runtime mapping in authenticated workflows and translate metadata where needed |
| P1 | File upload/download security needs a dedicated review | Upload routes and exam files are high-risk boundaries | Enforce size/MIME/content validation, ownership, private storage where appropriate, signed downloads, and malware scanning policy |
| P2 | Legacy public product areas are absent | Blog, projects, investor, team, and testimony functionality may still be expected by users | Confirm scope with the product owner; migrate, redirect, or formally retire each area |
| P2 | Legacy analytics and scheduled operational jobs are not fully confirmed | Message analytics, notifications, and scheduled maintenance may silently regress | Inventory required jobs, schedule them safely, and add operational runbooks |
| P2 | Lint warnings and middleware deprecation remain | They do not currently block deployment but increase maintenance noise | Clean warnings and migrate middleware convention when supported by the project’s Next.js version |

## Recommended action plan

### Phase 0: Decide the launch contract

Before more migration work, explicitly classify the PHP feature set into three groups: **launch-required**, **post-launch**, and **retired**. The subject-chat product must be named explicitly in this decision. If it is launch-required, do not describe the current course forum as parity; reserve a separate implementation track for subject chat.

The same decision is needed for Blog, Project, Investor, Team, Testimony, legacy Firebase/social login, AI chat, and analytics jobs. This prevents indefinite migration scope while ensuring that omitted features are intentional rather than accidental.

### Phase 1: Close P0 security and integrity risks

First create a shared authorization service for course membership, instructor ownership, admin role, and forum subject ownership. Apply it to subject creation, reply creation, subject retrieval, like, solve, review, and related mutation routes. Add tests for unauthenticated, authenticated-but-not-enrolled, wrong-course, wrong-owner, instructor, and admin cases.

Next secure payment callbacks with the gateway’s actual signing mechanism. Validate the reference, provider transaction ID, amount, currency, payment state transition, and associated course/subscription before fulfillment. Make the callback idempotent under retries and ensure network rewards cannot be distributed twice.

Finally replace the direct-chat placeholder identity with a trusted session identity and build a recipient-selection flow. Enforce exact participant-set matching and add database uniqueness or transactional protection against duplicate conversations.

### Phase 2: Implement true PHP subject-chat parity

If required for launch, add a dedicated subject-chat model or a clearly documented mapping that preserves the PHP semantics. Provision eligible rooms from learner academic profile and subscription status. Add subject-chat list and unread counts, message history, message send/edit/delete semantics, read state, mobile UX, and a realtime transport.

A sensible implementation sequence is: domain model and eligibility provisioning; server authorization and room listing; message history/send/read state; realtime subscription and reconnect behavior; edit/delete events; UI search/mobile behavior; then AI integration if AI responses are still part of the product requirement. Do not begin with AI; first make authenticated human-to-human chat reliable.

### Phase 3: Complete feature acceptance against the PHP behavior

Build a traceability matrix with one row per legacy user-visible workflow and columns for route, authorization, validation, database side effects, notifications, failure states, and Next.js acceptance test. The matrix should cover student enrollment, payment, subscription expiry, lesson completion, quiz scoring, evaluation submission, exam publication, instructor course editing, moderation, withdrawals, notifications, profiles, chat, and admin destructive actions.

Use seeded staging data and three test identities: student, instructor, and administrator. For every workflow, test the happy path, refresh/retry path, invalid input, unauthorized access, missing related record, and network/API failure. Payment and withdrawal flows require manual reconciliation checks in addition to automated tests.

### Phase 4: Operational hardening and release controls

Add production monitoring for API 5xx responses, payment callback failures, authentication failures, database pool exhaustion, upload failures, and realtime disconnects. Establish a rollback procedure and a database migration policy. Keep production migrations additive and reversible where possible, and never apply an unreviewed schema change directly to the live database.

Document environment variables, provider callback URLs, Supabase realtime/RLS policy, storage permissions, cron jobs, and support procedures. Add a release checklist requiring local gates, staging acceptance, smoke tests, and post-deployment verification.

### Phase 5: Deliberate scope closure

For every legacy area not migrated, choose one of three outcomes: implement it, redirect it to an existing equivalent, or mark it retired in product documentation. This is especially important for Blog, Project, Investor, Team, Testimony, legacy AI/chat infrastructure, and analytics commands. Only after these decisions are recorded can the application be called feature-complete relative to the PHP project.

## Final readiness rating

| Dimension | Rating | Interpretation |
|---|---|---|
| Public availability | Green | Public pages and tested APIs are live and returning successfully |
| Build and code health | Green with minor warnings | Build, TypeScript, tests, and lint errors are clear; warnings remain |
| LMS core | Amber-green | Courses, enrollment, learning, quizzes, exams, evaluations, dashboards, and administration are broadly present, but full behavioral parity is not yet proven |
| Authentication | Amber | Core cookie/session alignment was repaired; real-account role and refresh acceptance testing remains |
| Payments | Amber-red | Initialization is improved, but callback signature verification and reconciliation are still required |
| Forum/discussion | Amber-red | Threaded forum exists, but mutation authorization and moderation UI are incomplete |
| PHP subject chat parity | Amber | Core learner subject rooms are implemented; teacher persona, WebSocket token compatibility, AI, migration rollout, and full staging acceptance remain |
| Direct messaging | Amber | Identity and conversation-start workflows were repaired; realtime/RLS/read-state acceptance remains |
| Localization | Amber | Shared EN/FR coverage is strong for audited literals; runtime translation remains a transitional strategy and does not translate database content automatically |
| Overall | **Amber / conditionally production-ready** | Suitable for continued public operation of the validated surface, but not for claiming complete PHP feature parity or unrestricted production readiness across all workflows |

## Bottom line

The application is **not yet a complete replacement for the PHP project**, and the answer to the subject-chat question is **no for true parity**. It does have a usable course discussion thread system and a separate partial direct messenger, but those are not equivalent to the PHP subject-chat rooms.

The application is **production-operational for the validated public surface**, and the learner subject-chat workflow is now partially migrated. I still would not sign off the application as a complete PHP replacement until the subject-chat migration is applied to the production database, Supabase realtime/RLS is accepted with real accounts, the remaining legacy chat capabilities are scoped, and role-based authenticated acceptance testing is completed. The payment-provider replacement remains deliberately deferred.
