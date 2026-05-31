# DoDave Academy

Next.js 16 e-learning platform (migrated from Symfony/Kulmapeck).

## Status

- **Build**: ✅ Passes (68 pages, 0 errors)
- **Tests**: 59/59 passing (Vitest)
- **DB**: ⚠️ Supabase PostgreSQL unreachable (IPv6) — `prisma db push` pending
- **Content parity**: 78% vs legacy

## Routes

### Public Pages

| Route | Description |
|---|---|
| `/` | Home — hero, stats, course grid, categories, testimonials |
| `/about` | About Us |
| `/contact` | Contact form (WhatsApp/MTN/Orange) |
| `/faq` | FAQs by course |
| `/terms` | Terms & Conditions |
| `/plan` | Subscription pricing plans |
| `/courses` | Course catalog — paginated, filterable, sortable |
| `/courses/[slug]` | Course detail — chapters, lessons, reviews, instructor |
| `/programs` | Learning programs |
| `/exams` | Exam catalog — filtered by category/class/level |
| `/exams/[reference]` | Exam viewer (premium-gated) |
| `/forum` | Community forum |
| `/become-teacher` | Instructor application form |

### Auth Pages

| Route | Description |
|---|---|
| `/login` | Sign in |
| `/register` | Create account |
| `/forgot-password` | Password reset request |
| `/reset-password` | Set new password |

### Student Dashboard

| Route | Description |
|---|---|
| `/dashboard/student` | Home — enrolled courses grid |
| `/dashboard/student/courses` | My courses |
| `/dashboard/student/profile` | View profile |
| `/dashboard/student/profile/edit` | Edit profile |
| `/dashboard/student/network` | Referral network, points, cash |
| `/dashboard/student/payments` | Payment history |
| `/dashboard/student/subscriptions` | Subscription plans |
| `/dashboard/student/messages` | Chat (Supabase Realtime) |

### Instructor Dashboard

| Route | Description |
|---|---|
| `/dashboard/instructor` | Home — stats dashboard |
| `/dashboard/instructor/courses` | My courses table |
| `/dashboard/instructor/courses/new` | Create course |
| `/dashboard/instructor/courses/[id]/edit` | Edit course (details, chapters, FAQs) |
| `/dashboard/instructor/courses/[id]/chapters` | Manage chapters & lessons |
| `/dashboard/instructor/courses/[id]/chapters/[chapterId]/lessons` | Manage lessons |
| `/dashboard/instructor/courses/[id]/chapters/[chapterId]/quizzes` | Manage quizzes |
| `/dashboard/instructor/profile` | View instructor profile |
| `/dashboard/instructor/profile/edit` | Edit profile |
| `/dashboard/instructor/orders` | Orders & earnings |
| `/dashboard/instructor/exams` | My exams |
| `/dashboard/instructor/reviews` | Student reviews |
| `/dashboard/instructor/evaluations` | Evaluations |
| `/dashboard/instructor/network` | Referral network |

### Shared Dashboard

| Route | Description |
|---|---|
| `/dashboard/notifications` | Notifications list |

### Learning Pages

| Route | Description |
|---|---|
| `/learn/[courseSlug]` | Course entry — redirects to first lesson |
| `/learn/[courseSlug]/[lessonSlug]` | Lesson player — video + content |
| `/learn/[courseSlug]/forum` | Course discussion forum |
| `/learn/[courseSlug]/forum/[subjectId]` | Forum thread |
| `/learn/[courseSlug]/quiz/[chapterId]` | Chapter quiz |
| `/evaluation/[slug]/begin` | Begin evaluation (timed) |
| `/evaluation/[slug]/result` | Evaluation score |

### Admin Pages

| Route | Description |
|---|---|
| `/admin` | Admin dashboard — stats overview |
| `/admin/users` | User management |
| `/admin/courses` | Course management — validate action |
| `/admin/instructors` | Instructor management — validate/reject |
| `/admin/categories` | Category CRUD |
| `/admin/settings` | Site settings, social links, network config |

### API Routes

**Auth:** `POST /api/auth/login`, `/register`, `/refresh`, `/forgot-password`, `/reset-password`, `/become-teacher`

**Profile:** `GET|PUT /api/profile`, `PUT /api/profile/email`, `/avatar`

**Courses:** `GET /api/courses`, `/api/courses/[slug]`, `POST /api/courses/[slug]/start`, `/review`, `/api/categories`

**Forum:** `GET|POST /api/courses/[slug]/forum/subjects`, `GET|POST /api/courses/[slug]/forum/subjects/[subjectId]/messages`, `POST .../solve`, `.../like`

**Instructor:** `GET|POST /api/instructor/courses`, `GET|PUT /api/instructor/courses/[id]`, `POST .../publish`, `POST /api/instructor/chapters`, `PUT|DELETE /api/instructor/chapters/[id]`, `POST /api/instructor/lessons`, `PUT|DELETE /api/instructor/lessons/[id]`, `POST /api/instructor/quizzes`, `PUT|DELETE /api/instructor/quizzes/[id]`

**Student:** `GET|POST /api/student/enrollments`, `POST /api/student/quiz-attempt`, `/api/student/progress`

**Notifications:** `GET /api/notifications`, `PUT|DELETE /api/notifications/[id]`, `POST /api/notifications/read-all`, `/api/notifications/device`

**Chat:** `GET|POST /api/chat/conversations`, `GET|POST /api/chat/conversations/[id]/messages`

**Exams:** `GET /api/exams`, `/api/exams/[reference]`, `/api/exams/file/[filename]`

**Evaluation:** `POST /api/evaluation/submit`

**Payments:** `POST /api/payment/init`, `/api/payment/webhook`

**Admin:** `GET|POST /api/admin/categories`, `POST /api/admin/categories/[id]/delete`, `POST /api/admin/courses/[id]/validate`, `POST /api/admin/instructors/[id]/validate`, `/reject`, `POST /api/admin/settings/site`, `/social`, `/social/[id]/delete`, `/network`

**Other:** `POST /api/contact`, `/api/upload`

## Known Issues

- **DB unreachable** — Supabase IPv6 issue. All server-rendered pages that query the DB will return 500 until resolved.
- **Become-teacher** — Fixed `userId: 0` FK bug. Now looks up user by email and returns 404 if unregistered.
- **`/admin/users/[id]`** — Link exists in admin dashboard but page not yet implemented.
- **Social link migration** — SQL in `prisma/migrations/add_social_links.sql` needs to be applied when DB is reachable.

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm test         # Run tests (Vitest)
npm run lint     # Lint check
```

Stack: Next.js 16, Prisma, PostgreSQL (Supabase), Tailwind CSS, react-i18next, Vitest.
