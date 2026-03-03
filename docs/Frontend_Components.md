# Frontend Components Documentation

## Current Structure (Twig)
The frontend is built with Twig templates in `templates/`.
- `base.html.twig`: Main layout (Header, Footer, Scripts).
- `home/`: Landing page.
- `course/`: Course listing and details.
- `student/`: Student dashboard.
- `instructor/`: Instructor dashboard.
- `admin/`: Admin panel.

## Target Structure (React/Next.js)

### Layouts (`app/layout.tsx`)
- **RootLayout**: Global providers (Theme, Auth, Toast).
- **DashboardLayout**: Sidebar, Header for authenticated users (Student/Instructor).
- **AdminLayout**: Specific layout for admins.

### Pages & Components Mapping

| Current Twig Template | React Component (Target) | Features |
|-----------------------|--------------------------|----------|
| `base.html.twig` | `components/layout/MainLayout.tsx` | Navbar, Footer, SEO Head |
| `home/index.html.twig` | `app/page.tsx` | Hero section, Featured courses, Testimonials |
| `course/index.html.twig` | `app/courses/page.tsx` | Course Grid, Filters, Search |
| `course/show.html.twig` | `app/courses/[slug]/page.tsx` | Course info, Syllabus, Enroll button |
| `student/index.html.twig`| `app/dashboard/student/page.tsx` | Progress, Enrolled courses |
| `lesson/show.html.twig` | `app/learn/[courseId]/[lessonId]/page.tsx` | Video player, PDF viewer, Next/Prev navigation |
| `chat/index.html.twig` | `components/chat/ChatWindow.tsx` | Real-time messaging UI |

### Shared Components (`components/ui`)
- **Button**: Variants (primary, secondary, outline).
- **Card**: For courses, blogs.
- **Modal**: Login, Confirmations.
- **Form**: Input, Select, Checkbox (use `react-hook-form` + `zod`).
- **Table**: Data tables for dashboards.

### State Management
- **Server State**: React Query (TanStack Query) or SWR (for data fetching).
- **Client State**: Zustand or React Context (for UI state like Sidebar toggle, Auth user).
- **Forms**: React Hook Form.

### Styling
- **Framework**: Tailwind CSS (recommended) or Styled Components.
- **UI Library**: Shadcn/ui (highly recommended for speed) or Material UI.
