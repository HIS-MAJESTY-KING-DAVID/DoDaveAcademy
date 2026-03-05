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
