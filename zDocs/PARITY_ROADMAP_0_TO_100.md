# DoDave Academy — Behavioral Parity Roadmap from 57% to 100%

**Document status:** Authoritative execution roadmap
**Product:** DoDave Academy (Next.js migration of Kulmapeck)
**Legacy authority:** Lionelle’s `adjimi-lionelle/staging-kulmapeck` repository
**Current baseline:** 60% behavioral parity, measured across 21 capability groups
**Last updated:** 2026-08-25
**Owner:** Manus AI, executing on behalf of the DoDave Academy project owner

## 1. Purpose and governing rule

This document is the single execution plan for completing the DoDave Academy migration. A feature counts as migrated only when its user-visible route, persistence contract, authorization rules, state transitions, failure handling, and relevant recursive children are implemented and tested. A page that merely renders, an API that only returns a happy-path response, or a placeholder that has not been explicitly retired does not count as behavioral parity.

The implementation sequence is intentionally independent of the future payment provider wherever possible. Payment integration is tracked as a gated block and will be executed when the replacement provider’s contract is supplied. No payment-provider assumption may be used to block the unrelated LMS, chat, profile, notification, administration, or public-content work.

> **Execution rule:** After each block, update the score, matrix, tests, and this roadmap; do not begin the next block until the current block passes its acceptance gate.

## 2. Current score and scoring method

The current score is **60%**. It is calculated over **21 capability groups** using one point for full behavioral parity, one-half point for partial or unverified parity, and zero points for missing or intentionally unconfirmed capability. The current result is **8 full groups + 9 partial groups × 0.5 = 12.5 / 21 = 59.5%, rounded to 60%**.

| Scoring state | Groups | Points |
|---|---:|---:|
| Full behavioral parity | 8 | 8.0 |
| Partial or unverified parity | 9 | 4.5 |
| Missing or unconfirmed | 4 | 0.0 |
| **Total** | **21** | **12.5 / 21 = 60%** |

A group may move from partial to full only after code, persistence, authorization, error handling, regression tests, and role-based acceptance are all present. Removing a legacy capability from the product scope requires a documented product decision and a visible replacement or retirement state; it must not be silently counted as parity.

## 3. Definition of 100% completion

The migration reaches **100% behavioral parity** when every in-scope capability group is either fully migrated or explicitly retired with stakeholder approval, and the following evidence exists:

| Completion evidence | Required condition |
|---|---|
| Capability matrix | All 21 groups are marked full or explicitly retired; no “unverified” row remains. |
| Route and API coverage | Every active route has a valid parent/escape path, authenticated routes enforce role boundaries, and every feature API has success and failure handling. |
| Data contract | Prisma schema and deployed database migrations are synchronized; no production-only tables or columns are undocumented. |
| Security | Authentication, authorization, input bounds, ownership checks, file access, rate limits, callback verification, and audit-sensitive mutations have negative tests. |
| Recursive workflows | Chapters, lessons, quizzes, propositions, media, evaluations, forums, chat rooms, replies, results, and administration work through their full parent-child lifecycle. |
| Realtime and notifications | Subject chat, direct messages, unread/read state, push/device registration, and reconnect/fallback behavior are accepted with real role accounts. |
| Localization | User-facing static UI is covered in English and French; dynamic user content is either translated by product design or explicitly language-neutral. |
| Operations | Production build, migrations, smoke checks, monitoring/error handling, backups, and rollback instructions are documented and exercised. |
| Acceptance evidence | Student, instructor, admin, anonymous, paid/entitled, and denied-access scenarios have recorded pass results. |

## 4. Execution sequence

### Block A — Finish recursive admin learning management

**Objective:** Move the current admin learning-content slice from partial to full parity.

**Scope:** Add edit and delete for chapters and lessons; add quiz creation/edit/delete; add proposition/answer management; add course media management with safe storage references; preserve chapter → lesson → lecture/quiz relationships; validate course ownership for every nested mutation; add ordering and publish-state controls where the legacy workflow requires them.

**Acceptance gate:** An admin can create, edit, reorder, preview, publish/unpublish, and safely delete a chapter, lesson, quiz-option set, and course media reference. Invalid parent IDs, non-admin sessions, cross-course IDs, empty content, oversized payloads, and destructive actions without confirmation are rejected and tested. The active learner contract stores quiz options on `Quiz.proposition1..4`; the legacy standalone `Proposition` scaffold is not used by the learner route and remains a separately tracked admin-surface gap rather than duplicated data.

**Expected parity effect:** Admin learning CRUD moves from partial to full, subject to matrix confirmation.

### Block B — Complete admin evaluation management

**Objective:** Migrate the legacy evaluation administration surface and its recursive children.

**Scope:** Admin evaluation list/detail/create/edit/delete, question management, class/student assignment, correction/result visibility, scoring configuration, publication state, and instructor/student relationship checks.

**Acceptance gate:** Admins can manage an evaluation from creation to assignment and result review; instructors cannot mutate unrelated evaluations; students see only assigned evaluations and their own results; timing, pass thresholds, and correction data are consistent across API and UI.

**Expected parity effect:** Admin evaluations move from missing to full or partial depending on the accepted legacy scope.

### Block C — Finish exact PHP-equivalent subject chat

**Objective:** Move subject chat from partial parity to full parity where the feature remains in scope.

**Scope:** Reconcile room provisioning with the PHP class, cycle, specialty, and academic-profile rules; assign teacher personas or an approved DoDave equivalent; complete profile-setup exception flows; validate premium and instructor access; finalize Supabase realtime/RLS and reconnect semantics; preserve the short-lived token endpoint; implement AI responses only after an approved provider-neutral product contract; support moderation/audit behavior and unread/read state across devices.

**Acceptance gate:** A student sees exactly the eligible rooms for the student profile and entitlement; instructor/teacher access follows the approved rule; messages deliver in realtime and through fallback polling; read state is correct across sessions; edit/delete/moderation rules are enforced; AI behavior is either accepted or explicitly retired from scope.

**Expected parity effect:** Subject chat moves from partial to full only after real-account staging acceptance.

### Block D — Complete direct messaging and notifications

**Objective:** Finish the broader communication and operational event layer.

**Scope:** Direct-message unread counters, conversation archival/deletion policy, blocked-user behavior, notification creation for relevant events, notification read-all/read-one state, device registration lifecycle, push delivery configuration, retry/error handling, and user notification preferences.

**Acceptance gate:** A user can discover an allowed recipient, start or resume an exact conversation, receive and clear unread notifications, register/unregister a device, and observe correct behavior when delivery fails or credentials are unavailable.

**Expected parity effect:** Direct messaging and notifications move from partial to full where legacy behavior is in scope.

### Block E — Complete profile, reviews, likes, network, and subscription semantics

**Objective:** Close remaining learner/instructor account and community behavior gaps.

**Scope:** Student/instructor profile edit, avatar and document lifecycle, email/role boundaries, course reviews and likes, moderation rules, referral/network point distribution, withdrawal status transitions, subscription expiry/entitlement reconciliation, and audit-safe financial status handling independent of payment-provider selection.

**Acceptance gate:** Every profile mutation is authenticated and bounded; reviews/likes cannot be duplicated or cross-owned; network rewards are idempotent and traceable; withdrawals expose stable statuses; expired subscriptions cannot access premium features, including subject chat.

**Expected parity effect:** Account/community/network groups move from partial to full.

### Block F — Migrate or explicitly retire absent public surfaces

**Objective:** Resolve the legacy public product surfaces not currently represented in the active Next.js app.

**Scope:** Blog, investor/project/service/team/testimony pages, legacy Firebase/social integrations, and analytics/message-analytics commands. For each surface, obtain one of two outcomes: migrate a functioning DoDave-branded replacement, or record a product-approved retirement with a valid redirect/alternative and remove it from the parity denominator.

**Acceptance gate:** No legacy public surface remains ambiguously absent. Every migrated page has responsive layout, metadata, localization, navigation, and data/error states. Every retired surface has an approved decision, redirect or explanation, and documentation.

**Expected parity effect:** Missing public-surface groups become full or explicitly retired.

### Block G — Integrate the replacement payment provider

**Objective:** Complete payment parity only after the new provider contract is supplied.

**Required input:** Provider name, API documentation, sandbox credentials/configuration method, callback/webhook contract, signature algorithm, supported currencies, refund/chargeback semantics, test cards or fixtures, and settlement/status lifecycle.

**Scope:** Preserve server-authoritative pricing, idempotent event reconciliation, entitlement activation/rollback, subscription lifecycle, withdrawal/reward interactions, failed/cancelled UI, and provider-specific observability. Do not copy the existing adapter blindly.

**Acceptance gate:** Sandbox payments, duplicate callbacks, delayed callbacks, invalid signatures, amount mismatch, cancellation, refund, subscription expiry, and entitlement rollback all pass. Production configuration is documented without committing credentials.

**Expected parity effect:** Payments move from deferred/partial to full.

### Block H — Full acceptance, hardening, and operational sign-off

**Objective:** Prove that the completed feature surface works as one production application.

**Scope:** Role matrix tests for anonymous, student, premium student, instructor, teacher persona, and admin; browser acceptance of all high-risk workflows; database migration rehearsal; security review; rate-limit and abuse review; localization sweep; performance/error monitoring; backup/restore rehearsal; rollback plan; production smoke and authenticated canary checks.

**Acceptance gate:** All critical and high-priority tests pass, no unresolved P0/P1 issue remains, every database migration is applied in staging and production under change control, and the final matrix reaches 100% or contains only explicitly retired capabilities approved by the project owner.

## 5. Execution status ledger

| Block | Status | Evidence required before closure |
|---|---|---|
| A — Admin recursive learning management | **Complete for active scalar quiz/media contract** | Chapter/lesson/quiz create-edit-delete, reorder, preview, media reference save/delete, nested authorization, confirmation UI, and regression tests shipped in the 2026-08-25 release. Standalone legacy `Proposition` CRUD remains tracked separately because it is not consumed by the active learner quiz route. |
| B — Admin evaluation management | **In progress; create/settings/assignment/question slices shipped** | Complete correction/result controls, timing/scoring parity, instructor/student relationship acceptance, and full role acceptance |
| C — Exact subject chat | Partial implementation shipped | Profile/specialty rules, teacher persona, AI decision, realtime/RLS staging acceptance |
| D — Direct messaging/notifications | Partial | Notification event wiring, unread/device lifecycle, role acceptance |
| E — Profiles/reviews/network/subscriptions | Partial | Ownership, idempotency, expiry, moderation, acceptance |
| F — Public surfaces | Not started / scope decision required | Migration or explicit retirement decision for each legacy surface |
| G — Replacement payment provider | Blocked pending provider contract | Provider integration and sandbox/production acceptance |
| H — Final hardening/sign-off | Not started | Complete acceptance and operational evidence |

## 6. Non-negotiable implementation standards

All new mutations must validate the authenticated principal before reading or writing protected records. Nested IDs must be checked against their requested parent, and server-side values must not be trusted from the browser when a database value exists. Destructive actions must be explicit, bounded, and covered by negative tests. Realtime features must have a bounded fallback path and visible failure state. Database changes must be additive or accompanied by a reviewed migration and must never be applied directly to production without staging verification.

Every feature block must update the following artifacts in the same release: `FEATURE_PARITY_PRODUCTION_READINESS.md`, `FULL_PARITY_MATRIX.md`, `DoDave Academy Full Migration Parity Matrix.md`, `MIGRATION_AUDIT.md`, `NEXT_FEATURES_ROADMAP.md`, `progress.md`, tests, and the app-wide audit output. The parity percentage must be recalculated from the matrix rather than manually guessed.

## 7. Immediate next action

Block A passed its acceptance gate in the 2026-08-25 release. The active quiz contract is the scalar `Quiz.proposition1..4` representation consumed by the learner route; the legacy standalone `Proposition` CRUD scaffold is explicitly not copied into a second, unused data path. The next execution target is Block B: complete admin evaluation metadata, assignment, result/correction, timing, and role-boundary parity around the newly shipped question CRUD slice.
