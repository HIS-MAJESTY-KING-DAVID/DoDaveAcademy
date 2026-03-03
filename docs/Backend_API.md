# Backend API & Business Logic

## Current Implementation
The project uses **API Platform** for RESTful APIs. Most logic is encapsulated in:
1.  **API Resources**: Defined in `src/Entity` via `#[ApiResource]` attributes.
2.  **Custom Controllers**: Located in `src/Controller/Api/Controller`.
3.  **Data Providers/Persisters**: (Implicit in API Platform or custom services).

## Key API Endpoints (Mapped from Controllers)

### Course Operations
- `GET /api/cours`: List courses (Filters: category, level, price).
- `GET /api/cours/{id}`: Course details.
- `GET /api/cours/{id}/details`: Custom endpoint (increments view count).
- `GET /api/cours/{id}/start`: Start a course (enrollment check).
- `GET /api/student/{id}/courses`: List enrolled courses.

### User Operations
- `POST /api/users`: Register.
- `GET /api/users/me`: Current user profile.
- `PUT /api/users/{id}`: Update profile.

### Assessment
- `GET /api/cours/{id}/quizzes`: Get course quizzes.
- `POST /api/evaluations`: Submit evaluation.

### Payment
- `POST /api/payments`: Initiate payment.
- `GET /api/abonnements`: List subscription plans.

## Migration Strategy (to Node.js/Next.js API)

### Option A: Keep Symfony as Headless CMS/API
- **Pros**: Less work, logic already exists.
- **Cons**: Maintaining PHP runtime.

### Option B: Migrate to Next.js API Routes / Server Actions (Recommended)
- **Framework**: Next.js 14+ (App Router).
- **ORM**: Prisma or Drizzle.
- **Validation**: Zod.
- **Logic Migration**:
    - **Controllers** -> **Server Actions** or **Route Handlers**.
    - **Services** (e.g., `FileUploader`) -> **Utility functions** / **AWS S3 SDK**.
    - **Security** -> **Middleware** + **NextAuth**.

## Specific Logic to Migrate
1.  **View Counting**: Move from `DetailsController` to a server action that updates DB and revalidates cache.
2.  **File Uploads**: Use Vercel Blob or AWS S3 directly from the client (presigned URLs) or server actions.
3.  **Real-time Chat**: Move from Ratchet (PHP WebSocket) to **Supabase Realtime** or **Pusher**.
