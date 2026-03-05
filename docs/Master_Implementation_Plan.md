# Master Implementation Plan: DoDave Academy Migration to Next.js

This document serves as the central roadmap for migrating the DoDave Academy platform from Symfony/PHP to Next.js/React. It synthesizes all technical analysis, feature audits, and entity flows into a sequential execution strategy.

## 1. Global Guidelines & Standards

### 1.1 Security Best Practices
-   **Input Validation**: Validate all API inputs using libraries like `zod`. Never trust client-side data.
-   **Secure Headers**: Implement `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`.
-   **Vulnerability Management**: Run `npm audit` regularly.

### 1.2 Maintainability Guidelines
-   **Code Comments**: Explain *why*, not *what*, for complex logic.
-   **READMEs**: Maintain a `README.md` in complex directories (`/lib`, `/hooks`).
-   **Commit Messages**: Use conventional commits (e.g., `feat: add offline support`, `fix: resolve hydration error`).

### 1.3 Reusability Principles
-   **Atomic Design**: Build small, stateless atoms (Buttons, Icons) before complex molecules.
-   **Custom Hooks**: Extract logic (fetching, state) into hooks to separate UI from logic.
-   **Service Layer**: Abstract API calls into services (e.g., `lib/services/supabase.ts`) rather than calling `fetch` directly in components.

---

## Phase 1: Foundation & Authentication (Current Status: 100% Complete)
**Goal**: Secure user access and stable environment.

- [x] **Project Setup**: Next.js App Router, TypeScript, Prisma, Bootstrap 5.
- [x] **Database**: Schema migration (Prisma), English renaming.
- [x] **Auth API**: Login/Register endpoints (`/api/auth/*`) with JWT.
- [x] **Auth UI**: Login and Register forms with validation.
- [x] **Auth Refinement**:
    - [x] Implement custom middleware for route protection.
    - [x] Add "Forgot Password" flow (API + UI).
    - [x] Create `UserContext` or Hook for global auth state.

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

## Phase 3: Student Learning Environment (The Classroom) (Current Status: 100% Complete)
**Goal**: Enrolled students can watch videos and track progress.

- [x] **Enrollment Logic**:
    - [x] API: `POST /api/enroll` (Handle free/paid enrollment).
    - [x] API: `GET /api/student/enrollments`.
    - [x] UI: "My Learning" dashboard page.
- [x] **Course Player (Core Feature)**:
    - [x] Layout: Sidebar (Curriculum) + Main Content (Video/Text).
    - [x] Component: `VideoPlayer` (support existing video sources).
    - [x] Logic: Auto-mark lesson as complete on finish.
    - [x] API: `POST /api/student/progress` (Update `Lecture` entity).
- [x] **Quizzes**:
    - [x] Component: `QuizRunner` (Question -> Options -> Submit).
    - [x] Logic: Calculate score locally, then submit.
    - [x] API: `POST /api/student/quiz-attempt`.

## Phase 4: Financial Engine (Payments & Subscriptions) (Skipped for now)
**Goal**: Securely process payments and manage instructor payouts.
**Status**: Skipped by user request to focus on Social Features.

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

## Phase 5: Social & Real-time Features (Current Focus)
**Goal**: Enable communication between students and instructors.

- [x] **Forum**:
    - [x] Course-specific discussion boards.
    - [x] API: CRUD for Subjects and Messages.
- [x] **Chat**:
    - [x] Schema: Conversation and ChatMessage models (Prisma).
    - [x] API: Conversations and Messages endpoints (REST).
    - [x] UI: Chat widget with polling simulation.
    - [x] Real-time: Configure Supabase Realtime (enabled for `chat_message`, `conversation`, `participant`, `notification`, `forum_message`).
    - [x] RLS: Implemented policies for Conversation, Participant, and ChatMessage.
    - [x] Refinement: Fixed state updates and linting errors.
- [ ] **Notifications**:
    - [ ] System alerts (Course validation, New message).
    - [ ] Push notifications (Firebase/FCM).

## Phase 6: Admin Dashboard
**Goal**: Full platform management.

- [ ] **Course Validation**: Review and publish courses.
- [ ] **User Management**: Ban/Promote users.
- [ ] **Financials**: View transaction logs and process withdrawals.
- [ ] **Settings**: Global site configuration.

## Phase 7: Security & Performance Hardening (New)
**Goal**: Ensure the platform is secure, fast, and scalable before launch.

- [ ] **Security Audit**:
    - [ ] **RLS Audit**: Review all tables against Supabase dashboard to ensure no data leakage.
    - [x] **Input Validation**: Install `zod` and validate all API routes.
        - [x] Install Zod.
        - [x] Create `lib/validations/auth.ts`.
        - [x] Refactor Auth API (`/register`, `/login`) to use Zod.
        - [ ] Refactor Course API.
    - [x] **Global Error Handling**: Create `lib/exceptions.ts` and standard response wrappers.
    - [ ] **Rate Limiting**: Implement rate limiting for critical endpoints (auth, payment).
- [ ] **Performance Optimization**:
    - [ ] **Core Web Vitals**: Optimize LCP (Hero images), CLS (Layout shifts), and INP.
    - [ ] **Media Optimization**: Ensure all images use `next/image` and videos are compressed.
    - [ ] **Caching**: Implement `stale-while-revalidate` caching for non-critical data.
- [ ] **Cross-Platform QA**:
    - [ ] Test on Mobile (iOS Safari, Android Chrome).
    - [ ] Test on Desktop (Firefox, Edge, Chrome).

## Phase 8: Data Migration & Cutover
**Goal**: Move production data and switch traffic.

- [ ] **Pre-Flight Checks**:
    - [ ] **Environment Variables**: Verify all Prod secrets are set in Vercel.
    - [ ] **SEO**: Check `robots.txt`, `sitemap.xml`, and Meta tags.
    - [x] **Build Check**: Run `npm run build` locally to catch static generation errors.
    - [x] **Cleanup**: Removed broken generated components and fixed linting errors.
    - [x] **Renaming**: Project renamed to "dodave-academy".
- [ ] **Data**: Bulk import from old PostgreSQL to new PostgreSQL.
- [x] **Assets**: Supabase Storage Configured (`avatars`, `media`, `course-content`, `secure-docs`).
- [ ] **Testing**: Full E2E testing (Playwright/Cypress).
- [ ] **DNS**: Switch domain to Vercel app.
- [ ] **Post-Launch**:
    - [ ] Set up Analytics (Vercel Analytics / Google Analytics).
    - [ ] Monitor for 48 hours for 500 errors.

---

## Critical Dependencies & Risks

### Risks & Mitigation
-   **Data Loss**: Backup DB before migration.
-   **SEO Drop**: Ensure 301 redirects for old URLs (e.g., `/cours/{id}` -> `/courses/{slug}`).
-   **Auth Issues**: Users might need to reset passwords if hashes are incompatible (unlikely if using standard bcrypt).

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
Since the React app is built in a separate directory (`DoDave-Academy-React`):
1.  Stop the Next.js server.
2.  Developers return to the `Kulmatest` (PHP) directory.
3.  No data destruction occurs in the old system.

### Deployment Rollback (Post-Cutover)
1.  **DNS Reversion**: Switch DNS records back to the original PHP server IP.
2.  **Database**: If the new app writes to the *same* database, ensure backward compatibility of schema changes. Ideally, use a fresh database for React and sync data until cutover.

## Phase 9: Legacy Modernization (New)
**Goal**: Remove technical debt and standardize UI.

- [ ] **Component Audit**:
    - [ ] Catalog all `components/generated` usage.
    - [ ] Identify high-priority components (e.g., `CourseCard`, `Navbar`).
- [ ] **Modernization Strategy (Strangler Fig)**:
    - [ ] Create `components/ui` (Shadcn/UI or similar) for base atoms.
    - [ ] Replace one legacy page at a time with new components.
    - [ ] Delete `components/generated` files as they become unused.
- [ ] **CSS Cleanup**:
    - [ ] Remove Bootstrap CSS dependency.
    - [ ] Ensure full Tailwind coverage.

---

## Appendix A: Detailed Feature Audit

### 1. Authentication & User Management
| Feature | Priority | Status | Description | Action Items | Functional Requirement Traceability |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **User Registration** | Primary | **Completed** | Student and Instructor sign-up flows. | - [x] Create Register UI<br>- [x] Create API Route (`/api/auth/register`)<br>- [ ] Implement Instructor specific fields<br>- [ ] Add email verification | **F-001**: `POST /api/register` (RegistrationController) |
| **User Login** | Primary | **Completed** | JWT-based authentication. | - [x] Create Login UI<br>- [x] Create API Route (`/api/auth/login`)<br>- [ ] Implement Refresh Token logic<br>- [ ] Persist session (NextAuth or custom) | **F-001**: `POST /api/login` (SecurityController) |
| **Password Reset** | Primary | Pending | Request and reset password flow via email. | - [ ] Create "Forgot Password" UI<br>- [ ] Create API Route for request<br>- [ ] Create API Route for reset<br>- [ ] Integrate Email Service | **F-001**: `POST /api/reset-password` |
| **Role Management** | Primary | In Progress | Role-based access (Student, Instructor, Admin). | - [x] Define User Roles in Schema<br>- [ ] Implement Middleware for protected routes<br>- [ ] Add "Switch Role" feature for Admin/Instructor | - |
| **User Profile** | Secondary | Pending | Edit profile, avatar, and personal info. | - [ ] Create Profile Page<br>- [ ] File Upload for Avatar<br>- [ ] Update User API | **F-001**: `PUT /api/users/{id}` |

### 2. Course Management
| Feature | Priority | Status | Description | Action Items | Functional Requirement Traceability |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Course Listing** | Primary | In Progress | Public catalog of courses with filters. | - [x] Create Course List Component<br>- [x] Create Course Card<br>- [ ] Implement Filters (Category, Price, Level)<br>- [ ] Pagination | **F-002**: `GET /api/courses` (CoursesController) |
| **Course Details** | Primary | Pending | Detailed view of a course (syllabus, instructor, price). | - [ ] Create Course Detail Page<br>- [ ] Display Curriculum (Chapters/Lessons)<br>- [ ] Show Instructor Info | **F-002**: `GET /api/courses/{slug}` (DetailsController) |
| **Course Consumption (Player)** | Primary | Pending | Video player and lesson content viewer. | - [ ] Create Video Player Component<br>- [ ] Track Lesson Progress (`Lecture` entity)<br>- [ ] Mark as Complete logic | **F-003**: `GET /api/lesson/{id}` (StudentLectureController) |
| **Course Creation (Instructor)** | Primary | Pending | Form to create/edit courses, chapters, and lessons. | - [ ] Create Instructor Dashboard<br>- [ ] Course Editor (Forms)<br>- [ ] Chapter/Lesson Management<br>- [ ] Media Uploads (Video/Images) | - |
| **Categories & Taxonomy** | Secondary | Pending | Manage Categories, Specialties, Classes. | - [ ] Admin Management UI<br>- [ ] Public Navigation Menu | **F-002**: `GET /api/categories` |

### 3. Payments & Subscriptions
| Feature | Priority | Status | Description | Action Items | Functional Requirement Traceability |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Course Purchase** | Primary | Pending | Buy individual courses via Mobile Money. | - [ ] Integrate Mobile Money API (Port `MobileApiService`)<br>- [ ] Checkout UI<br>- [ ] Payment Confirmation Webhook/Poller | **F-006**: `POST /api/payment/init` |

---

## Appendix B: Entity & Terminology Matrix

This section maps the core entities from the legacy system (French) to the new architecture (English), ensuring consistent terminology across the implementation.

| English Entity (New) | Legacy Entity (French) | Description | Key Relationships |
| :--- | :--- | :--- | :--- |
| **User** | `Utilisateur` | Central authentication entity. | 1:1 with `Profile`, `Student`, `Instructor`. |
| **Profile** | `Personne` | Extended user details (bio, avatar). | Child of `User`. |
| **Student** | `Eleve` | Learner profile with enrollments. | N:N with `Course` (via `StudentCourse`). |
| **Instructor** | `Enseignant` | Content creator and teacher. | 1:N with `Course`. |
| **Course** | `Cours` | The core learning product. | Contains `Chapters`, `Lessons`. |
| **Chapter** | `Chapitre` | Section of a course. | Child of `Course`. |
| **Lesson** | `Lecon` | Atomic learning unit (Video/Quiz). | Child of `Chapter`. |
| **Program** | `Formation` | Collection of courses/curriculum. | N:N with `Course`. |
| **Assessment** | `Evaluation` | Official graded test. | Linked to `Class` or `Course`. |
| **Quiz** | `Quiz` | Auto-graded practice test. | Linked to `Lesson` or `Chapter`. |
| **Forum** | `Forum` | Discussion board. | 1:1 with `Course`. |
| **Topic** | `Sujet` | Discussion thread. | Child of `Forum`. |
| **Payment** | `Paiement` | Financial transaction. | Linked to `Student` and `Course`/`Subscription`. |
