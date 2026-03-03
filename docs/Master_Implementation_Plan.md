# Master Implementation Plan: Kulmapeck Migration to Next.js

This document serves as the central roadmap for migrating the Kulmapeck platform from Symfony/PHP to Next.js/React. It synthesizes all technical analysis, feature audits, and entity flows into a sequential execution strategy.

## Phase 1: Foundation & Authentication (Current Status: ~90% Complete)
**Goal**: Secure user access and stable environment.

- [x] **Project Setup**: Next.js App Router, TypeScript, Prisma, Bootstrap 5.
- [x] **Database**: Schema migration (Prisma), English renaming.
- [x] **Auth API**: Login/Register endpoints (`/api/auth/*`) with JWT.
- [x] **Auth UI**: Login and Register forms with validation.
- [ ] **Auth Refinement**:
    - [ ] Implement `NextAuth.js` or custom middleware for route protection.
    - [ ] Add "Forgot Password" flow (API + UI).
    - [ ] Create `UserContext` or Hook for global auth state.

## Phase 2: Public Course Catalog (The Storefront) (Current Status: ~95% Complete)
**Goal**: Users can browse and view courses (read-only).

- [x] **Course Entities**: Ensure `Course`, `Category`, `Instructor` types are robust.
- [x] **API Routes**:
    - [x] `GET /api/courses`: List with pagination and filters.
    - [x] `GET /api/courses/[slug]`: Detailed course info.
    - [x] `GET /api/categories`: Taxonomy tree.
- [x] **UI Components**:
    - [x] Refine `CourseCard` (already started).
    - [x] Build `CourseFilter` sidebar (Price, Level, Category).
    - [x] Build `CourseDetailPage`:
        - [x] Header (Video trailer placeholder, Title).
        - [x] Syllabus Accordion (`Chapter` -> `Lesson` list).
        - [x] Instructor Bio section.
        - [x] Reviews list.

## Phase 3: Student Learning Environment (The Classroom)
**Goal**: Enrolled students can watch videos and track progress.

- [ ] **Enrollment Logic**:
    - [ ] API: `POST /api/enroll` (Handle free/paid enrollment).
    - [ ] API: `GET /api/student/enrollments`.
    - [ ] UI: "My Learning" dashboard page.
- [ ] **Course Player (Core Feature)**:
    - [ ] Layout: Sidebar (Curriculum) + Main Content (Video/Text).
    - [ ] Component: `VideoPlayer` (support existing video sources).
    - [ ] Logic: Auto-mark lesson as complete on finish.
    - [ ] API: `POST /api/student/progress` (Update `Lecture` entity).
- [ ] **Quizzes**:
    - [ ] Component: `QuizRunner` (Question -> Options -> Submit).
    - [ ] Logic: Calculate score locally, then submit.
    - [ ] API: `POST /api/student/quiz-attempt`.

## Phase 4: Financial Engine (Payments & Subscriptions)
**Goal**: Securely process payments and manage instructor payouts.

- [ ] **Dependencies**:
    - [ ] Port `MobileApiService` (PHP) to `lib/services/payment.ts` (Node.js).
    - [ ] Port `PaymentUtil` and `Utils::checkNumberOperator` (Cameroon phone validation).
    - [ ] Secure `private/keys/` access in Next.js.
- [ ] **Checkout Flow**:
    - [ ] UI: Payment Modal (Mobile Money / Orange Money).
    - [ ] API: `POST /api/payment/init` (Initiate transaction).
    - [ ] Webhook: `POST /api/payment/webhook` (Handle callbacks).
- [ ] **Instructor Payouts**:
    - [ ] Admin UI: List pending withdrawals.
    - [ ] API: `POST /api/admin/payout` (Execute PayOut).

## Phase 5: Social & Real-time Features
**Goal**: Enable communication between students and instructors.

- [ ] **Forum**:
    - [ ] Course-specific discussion boards.
    - [ ] API: CRUD for Subjects and Messages.
- [ ] **Chat**:
    - [ ] Migrate from Ratchet (PHP WebSocket) to Supabase Realtime or Pusher.
    - [ ] UI: Chat widget.
- [ ] **Notifications**:
    - [ ] System alerts (Course validation, New message).
    - [ ] Push notifications (Firebase/FCM).

## Phase 6: Admin Dashboard
**Goal**: Full platform management.

- [ ] **Course Validation**: Review and publish courses.
- [ ] **User Management**: Ban/Promote users.
- [ ] **Financials**: View transaction logs and process withdrawals.
- [ ] **Settings**: Global site configuration.

## Phase 7: Data Migration & Cutover
**Goal**: Move production data and switch traffic.

- [ ] **Data**: Bulk import from old PostgreSQL to new PostgreSQL.
- [ ] **Assets**: Move media files (Vercel Blob / S3).
- [ ] **Testing**: Full E2E testing (Playwright/Cypress).
- [ ] **DNS**: Switch domain to Vercel app.

---

## Critical Dependencies & Risks

### Missing PHP Dependencies
The following logic MUST be ported from PHP to maintain parity:
1.  **MobileApiService.php**: Raw cURL requests for payment gateway.
2.  **PaymentUtil.php**: Orchestration of course/subscription payments.
3.  **Utils::checkNumberOperator**: Critical validation for Cameroon phone numbers.
4.  **Keys.php**: File-based key management (needs migration to secure server-side file handling).

### Configuration Gaps
-   **Secrets**: `APP_SECRET`, `JWT_PASSPHRASE`, `API_PAY_URL` missing from React `.env`.
-   **Certificates**: `cacert.pem` and `private.pem` required for payment signing.

## Rollback Procedures

### Immediate Rollback (During Development)
Since the React app is built in a separate directory (`Kulmapeck-React`):
1.  Stop the Next.js server.
2.  Developers return to the `Kulmatest` (PHP) directory.
3.  No data destruction occurs in the old system.

### Deployment Rollback (Post-Cutover)
1.  **DNS Reversion**: Switch DNS records back to the original PHP server IP.
2.  **Database**: If the new app writes to the *same* database, ensure backward compatibility of schema changes. Ideally, use a fresh database for React and sync data until cutover.
