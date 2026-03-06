# Frontend Components Documentation

## 1. Current Structure (Twig)
The frontend is built with Twig templates in `templates/`.
- `base.html.twig`: Main layout (Header, Footer, Scripts).
- `home/`: Landing page.
- `course/`: Course listing and details.
- `student/`: Student dashboard.
- `instructor/`: Instructor dashboard.
- `admin/`: Admin panel.

## 2. Target Structure (React/Next.js)

### 2.1 Layouts (`app/layout.tsx`)
- **RootLayout**: Global providers (Theme, Auth, Toast).
- **DashboardLayout**: Sidebar, Header for authenticated users (Student/Instructor).
- **AdminLayout**: Specific layout for admins.

### 2.2 Pages & Components Mapping

| Current Twig Template | React Component (Target) | Features |
|-----------------------|--------------------------|----------|
| `base.html.twig` | `components/layout/MainLayout.tsx` | Navbar, Footer, SEO Head |
| `home/index.html.twig` | `app/page.tsx` | Hero section, Featured courses, Testimonials |
| `course/index.html.twig` | `app/courses/page.tsx` | Course Grid, Filters, Search |
| `course/show.html.twig` | `app/courses/[slug]/page.tsx` | Course info, Syllabus, Enroll button |
| `student/index.html.twig`| `app/dashboard/student/page.tsx` | Progress, Enrolled courses |
| `lesson/show.html.twig` | `app/learn/[courseId]/[lessonId]/page.tsx` | Video player, PDF viewer, Next/Prev navigation |
| `chat/index.html.twig` | `components/chat/ChatWindow.tsx` | Real-time messaging UI |

### 2.3 Shared Components (`components/ui`)
- **Button**: Variants (primary, secondary, outline).
- **Card**: For courses, blogs.
- **Modal**: Login, Confirmations.
- **Form**: Input, Select, Checkbox (use `react-hook-form` + `zod`).
- **Table**: Data tables for dashboards.

## 3. Design System & Style Guide

### 3.1 Brand Foundations
- **Primary Color**: `#1E3D59` (Brand text, primary links).
- **Secondary Color**: `#00B4D8` (Buttons, focus rings).
- **Accent Color**: `#FFB703` (Badges, sale tags).
- **Typography**:
    - **Headings**: Montserrat (sans-serif, 600-700).
    - **Body**: Roboto (sans-serif, 300-500).
    - **Brand Mark**: Pacifico (cursive).

### 3.2 UI Specifications

#### Header
- **Height**: 80px (Desktop), 64px (Mobile).
- **Background**: White (#FFFFFF).
- **Navigation**: Home, Services, Training, Portfolio, Blog, About, Contact.
- **Actions**: "Get Started" (Primary Button), Language Switcher.

#### Footer
- **Background**: Gray 800 (#1F2937).
- **Text**: White.
- **Columns**: Brand & Social, Quick Links, Services, Contact Info.

#### Buttons & Interaction
- **Primary**: Background `#00B4D8`, Text White, Rounded-pill.
- **States**: Hover (90% opacity), Focus (2px ring `#00B4D8`).

### 3.3 Accessibility
- Ensure **4.5:1** contrast for body text.
- Ensure **3:1** contrast for large text and UI elements.
- Maintain visible focus states for keyboard navigation.

## 4. Course View Hierarchy & MVP Architecture

This section provides a technical mapping of the Course view hierarchy from the main Course Listing page. It follows the **MVP (Model-View-Presenter)** pattern in the Next.js architecture (Server Components and Route Handlers as Presenters).

### 4.1 Implementation Progress

| Feature | Status | Path/Route | Notes |
| :--- | :--- | :--- | :--- |
| **Course Listing** | ✅ Completed | `app/courses/page.tsx` | Filters & Pagination implemented. |
| **Course Details** | ✅ Completed | `app/courses/[slug]/page.tsx` | Overview, Curriculum, Instructor info. |
| **Start Course Logic** | ✅ Completed | `app/api/courses/[slug]/start/route.ts` | Handles enrollment check & redirect. |
| **Lesson Player** | ✅ Completed | `app/learn/[courseSlug]/[lessonSlug]/page.tsx` | Video & Text content. |
| **Lesson Progress** | ✅ Completed | `app/api/student/progress/route.ts` | Mark lesson as finished. |
| **Quiz Interface** | ✅ Completed | `app/learn/[courseSlug]/quiz/[chapterId]/page.tsx` | Rendering questions. |
| **Quiz Submission** | ✅ Completed | `app/api/student/quiz-attempt/route.ts` | Scores, saves result, updates `QuizLost` & `Lecture`. |
| **Forum Index** | ✅ Completed | `app/learn/[courseSlug]/forum/page.tsx` | List subjects. |
| **Forum Thread** | ✅ Completed | `app/learn/[courseSlug]/forum/[subjectId]/page.tsx` | View discussion. |
| **Create Topic** | ✅ Completed | `app/api/courses/[slug]/forum/subjects/route.ts` | Create new subject. |
| **Reply Topic** | ✅ Completed | `app/api/courses/[slug]/forum/subjects/[subjectId]/messages/route.ts` | Post reply. |
| **Add Review** | ✅ Completed | `app/api/courses/[slug]/review/route.ts` | Submit course review. |

### 4.2 High-Level Architecture (MVP)

In this Next.js application:
- **Model**: Prisma Schema (`prisma/schema.prisma`) representing the database schema.
- **View**: React Components (`components/*`) rendering the UI.
- **Presenter**: Next.js Server Components & API Routes (`app/*`) handling user requests, data fetching, and business logic.

#### Navigation Flow Diagram

```mermaid
graph TD
    Home[Home Page] -->|Click 'Courses'| Listing[**Course Listing**<br/>/courses]
    
    Listing -->|Select Filters| Listing
    Listing -->|Click Course| Details[**Course Details**<br/>/courses/{slug}]
    
    Details -->|Click 'Start Learning'| StartLogic[**Start Course Logic**<br/>API /start]
    Details -->|Submit Review| AddReview[Add Review API]
    Details -->|Create Forum Topic| AddTopic[Add Topic API]
    
    StartLogic -->|Redirect| Player[**Lesson Player**<br/>/learn/{slug}/{lesson}]
    
    Player -->|Next Lesson| Player
    Player -->|Finish Chapter| Quiz[**Quiz View**<br/>/learn/.../quiz/{id}]
    Player -->|Post Forum Message| ForumMsg[Forum Message API]
    
    Details -->|View Forum| ForumIndex[**Forum Index**<br/>/learn/{slug}/forum]
    ForumIndex -->|Select Topic| ForumThread[**Forum Thread**<br/>/learn/{slug}/forum/{id}]
    ForumThread -->|Reply| ForumMsg
    
    Quiz -->|Submit| QuizResult[Quiz Result/Correction]
    Quiz -->|Pass| Player
    Quiz -->|Fail| QuizLost[Quiz Lost (Retry Delay)]
```

### 4.3 Detailed View Hierarchy

#### 4.3.1 Course Listing
- **Route**: `/courses`
- **Presenter**: `app/courses/page.tsx`
- **View Components**: `components/courses/CourseCard.tsx`, `components/courses/CourseFilter.tsx`
- **Model**: `Course`, `Category`, `SkillLevel`

#### 4.3.2 Course Details
- **Route**: `/courses/[slug]`
- **Presenter**: `app/courses/[slug]/page.tsx`
- **View Components**: Details tabs for Overview, Curriculum, Reviews
- **Model**: `Course`, `Chapter`, `Lesson`, `Review`, `Instructor`

#### 4.3.3 Lesson Player
- **Route**: `/learn/[courseSlug]/[lessonSlug]`
- **Presenter**: `app/learn/[courseSlug]/[lessonSlug]/page.tsx`
- **View Component**: `components/player/LessonPlayer.tsx`
- **Model**: `Lesson`, `Chapter`, `Course`

#### 4.3.4 Quiz Interface
- **Route**: `/learn/[courseSlug]/quiz/[chapterId]`
- **Presenter**: `app/learn/[courseSlug]/quiz/[chapterId]/page.tsx`
- **View Component**: `components/quiz/QuizRunner.tsx`
- **Model**: `Chapter`, `Quiz`, `Proposition`

#### 4.3.5 Course Forum
- **Routes**: `/learn/[courseSlug]/forum` and `/learn/[courseSlug]/forum/[subjectId]`
- **Presenter**: Server pages in `app/learn/[courseSlug]/forum/*`
- **View Components**: `CreateSubjectModal`, `ReplyForm`
- **Model**: `Forum`, `Subject`, `ForumMessage`

### 4.4 Database Dependency Matrix

| View Context | Primary Entity | Direct Relations | Key Fields Accessed |
|--------------|----------------|------------------|---------------------|
| **Listing** | `Course` | `Category`, `Instructor`, `Media` | `title`, `slug`, `isFree`, `skillLevel` |
| **Details** | `Course` | `Chapter` -> `Lesson`, `Review` | `description`, `goals`, `requirements`, `rating`, `content` |
| **Player** | `Lesson` | `Chapter`, `Course` | `content`, `videoLink` |
| **Quiz** | `Quiz` | `Chapter` | `question`, `propositions` |
| **Forum** | `Forum` | `Course`, `Subject` | `subjects`, `messages` |

### 4.5 Related API Endpoints

- `POST /api/student/quiz-attempt`
- `POST /api/courses/[slug]/forum/subjects`
- `POST /api/courses/[slug]/forum/subjects/[subjectId]/messages`
- `POST /api/courses/[slug]/start`
- `POST /api/student/progress`
- `POST /api/courses/[slug]/review`

## 5. Exam View Hierarchy & MVP Architecture

This section maps the Exam feature hierarchy for the React/Next.js project. It follows the **MVP (Model-View-Presenter)** pattern where Server Components and Route Handlers act as Presenters.

### 5.1 Implementation Progress

| Feature | Status | Path/Route | Notes |
| :--- | :--- | :--- | :--- |
| **Exam Listing Shell** | ✅ Completed | `app/exams/page.tsx` | Full page structure shipped. |
| **Exam Listing Data Query** | ✅ Completed | `app/exams/page.tsx` | Prisma listing query with filters and pagination implemented. |
| **Exam Filters UI** | ✅ Completed | `app/exams/page.tsx` | Search + category + class + level + language filters implemented. |
| **Exam Details Page** | ✅ Completed | `app/exams/[reference]/page.tsx` | Details route implemented. |
| **Subject/Correction Toggle** | ✅ Completed | `app/exams/[reference]/page.tsx` | `display` query mode implemented. |
| **Secure Exam File Endpoint** | ✅ Completed | `app/api/exams/file/[filename]/route.ts` | Streams PDF inline with safe headers. |
| **Premium Access Guard** | ✅ Completed | `app/exams/[reference]/page.tsx` + API guards | Premium/privileged checks enforced on page and file route. |
| **Exam Public API** | ✅ Completed | `app/api/exams/route.ts` + `app/api/exams/[reference]/route.ts` | Listing and details APIs available for client-driven fetching. |

### 5.2 High-Level Architecture (MVP)

In this Next.js application:
- **Model**: Prisma models in `prisma/schema.prisma` (`Exam`, `Category`, `Class`, `SkillLevel`, `User`, `Person`, `Student`).
- **View**: React components in `app/**` and `components/**`.
- **Presenter**: Next.js Server Components (`app/**/page.tsx`) and Route Handlers (`app/api/**/route.ts`).

#### Navigation Flow Diagram

```mermaid
graph TD
    Home[Home Page] -->|Click 'Exams'| Listing[**Exam Listing**<br/>/exams]
    
    Listing -->|Filter & Pagination| Listing
    Listing -->|Click Exam| Details[**Exam Details / Viewer**<br/>/exams/{reference}]
    
    Details -->|display=subject| SubjectView[Subject PDF View]
    Details -->|display=correction| CorrectionView[Correction PDF View]
    
    SubjectView -->|Fetch file| FileServe[**File Route Handler**<br/>/api/exams/file/{filename}]
    CorrectionView -->|Fetch file| FileServe
```

### 5.3 Detailed View Hierarchy

#### 5.3.1 Exam Listing
- **Route**: `/exams`
- **Presenter**: `app/exams/page.tsx`
- **View**: Listing UI (exam cards + filters + pagination)
- **Model**: `Exam`, `Category`, `Class`, `SkillLevel`

#### 5.3.2 Exam Details / Viewer
- **Route**: `/exams/[reference]`
- **Presenter**: `app/exams/[reference]/page.tsx`
- **View**: Metadata panel + PDF rendering container
- **Model**: `Exam`, `User`, `Person`, `Student`

#### 5.3.3 Access Rules
- Requires authenticated session.
- Requires student profile for learner accounts.
- Requires `Student.isPremium === true` before serving protected exam files.

#### 5.3.4 Secure File Serving
- **Route**: `/api/exams/file/[filename]`
- **Presenter**: `app/api/exams/file/[filename]/route.ts`
- **View**: None (binary file response)
- **Model**: File storage + auth/session + `Exam` ownership/entitlement checks.

### 5.4 Database Dependency Matrix

| View Context | Primary Entity | Direct Relations | Key Fields Accessed |
|--------------|----------------|------------------|---------------------|
| **Listing** | `Exam` | `Category`, `Class` -> `SkillLevel` | `title`, `description`, `publishedAt`, `language`, `reference` |
| **Details** | `Exam` | `User` -> `Person` | `subject`, `correction`, `imageFile` |
| **Access** | `Student` | `User` | `isPremium` |

### 5.5 Related API Endpoints

- `GET /api/exams` (public list API with filters + pagination)
- `GET /api/exams/[reference]` (public details API)
- `GET /api/exams/file/[filename]` (secure file stream for viewer)
