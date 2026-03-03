# Migration Plan & Checklist

## Phase 1: Preparation & Setup
- [ ] **Repo Setup**: Initialize Next.js project with TypeScript, Tailwind, ESLint.
- [ ] **Database**: Set up PostgreSQL instance (Supabase/Neon/Local).
- [ ] **Schema Migration**:
    - [ ] Export current schema (SQL dump).
    - [ ] Import to new DB or create Prisma schema.
    - [ ] Verify data types and relationships.
- [ ] **Dependencies**: Install key libraries (Prisma, NextAuth, Axios/Ky, Zustand, React Query).

## Phase 2: Backend Logic Migration (API)
- [ ] **Auth**: Implement Login/Register endpoints using NextAuth + Prisma.
- [ ] **Core Entities**: Create CRUD actions for Users, Courses, Categories.
- [ ] **File Upload**: Set up S3/Blob storage for course media.
- [ ] **Public API**: Implement `GET /courses` with filtering.

## Phase 3: Frontend Implementation (Public Pages)
- [ ] **Components**: Build UI Kit (Buttons, Inputs, Cards).
- [ ] **Landing Page**: Port `home/index.html.twig`.
- [ ] **Course Catalog**: Port `course/index.html.twig`.
- [ ] **Course Details**: Port `course/show.html.twig`.

## Phase 4: Student Dashboard & Learning
- [ ] **Dashboard**: Enrolled courses view.
- [ ] **Player**: Video player, lesson navigation, progress tracking.
- [ ] **Quizzes**: Interactive quiz component.

## Phase 5: Instructor & Admin Dashboards
- [ ] **Course Builder**: Form for creating courses/lessons.
- [ ] **User Management**: Admin tables.
- [ ] **Analytics**: Charts and reports.

## Phase 6: Data Migration & Cutover
- [ ] **Users**: Migrate user accounts (handle password hashes).
- [ ] **Content**: Move media files to cloud storage.
- [ ] **Data**: Bulk import from old Postgres to new Postgres.
- [ ] **Testing**: Full E2E testing (Playwright/Cypress).
- [ ] **Deployment**: Deploy to Vercel.
- [ ] **DNS**: Switch domain to Vercel app.

## Risk Assessment
- **Data Loss**: Backup DB before migration.
- **SEO Drop**: Ensure 301 redirects for old URLs (e.g., `/cours/{id}` -> `/courses/{slug}`).
- **Auth Issues**: Users might need to reset passwords if hashes are incompatible (unlikely if using standard bcrypt).
