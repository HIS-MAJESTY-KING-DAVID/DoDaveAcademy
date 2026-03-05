# System Architecture

This document outlines the architecture of the DoDave Academy platform, mapping the legacy Symfony implementation to the new Next.js structure.

## 1. High-Level Architecture

| Component | Current (Symfony) | Target (React/Next.js) | Notes |
|-----------|-------------------|------------------------|-------|
| **Language** | PHP 8.1 | TypeScript | Strict typing for better maintainability. |
| **Framework** | Symfony 6.2 | Next.js 14+ (App Router) | Server Components for performance. |
| **Frontend** | Twig Templates | React Components (TSX) | Reusable UI components. |
| **API** | API Platform | Next.js Route Handlers / Server Actions | Integrated API within the frontend app. |
| **Database** | PostgreSQL (Doctrine) | PostgreSQL (Prisma) | Prisma provides excellent TS support. |
| **Real-time** | Ratchet (PHP WebSocket) | Supabase Realtime / Pusher | Managed services are easier to scale. |
| **Auth** | Symfony Security / JWT | NextAuth.js / Custom JWT | Supports OAuth and Credentials. |

## 2. Authentication & Security

### Current Implementation
- **Mechanisms**: Session-based (Twig) + JWT (API).
- **User Provider**: `App\Entity\User`.
- **Roles**: `ROLE_USER`, `ROLE_STUDENT`, `ROLE_INSTRUCTOR`, `ROLE_ADMIN`.

### Target Implementation
- **Solution**: Custom JWT implementation (parity with existing) or NextAuth.js.
- **Flow**:
    1.  **Login**: User submits credentials -> Backend verifies -> Returns JWT.
    2.  **Session**: Stored in HTTP-only cookies or NextAuth session.
    3.  **Protection**: Middleware (`middleware.ts`) checks tokens on protected routes.

## 3. Database Schema Overview

### Core Entities
- **User** (`kulmapeck_user`): Identity (Email, Password, Roles).
    - **OneToOne** with `Student` (`Eleve`) and `Instructor` (`Enseignant`).
- **Course** (`Cours`):
    - Fields: Title, Description, Price, Published status.
    - **ManyToOne** with `Category`, `Level` (`Classe`).
- **Content**:
    - **Chapter** (`Chapitre`): Groups lessons.
    - **Lesson** (`Lecon`): Video/Text content.
- **Learning**:
    - **Lecture**: Tracks student progress (`startAt`, `endAt`, `isFinished`).
    - **Quiz/Exam**: Assessment entities.

### Key Relationships
- `Student` <-> `Course` (Enrollment).
- `Instructor` <-> `Course` (Authorship).
- `Course` <-> `Forum` (Discussion).

## 4. Entity Interaction Flows

### Course Enrollment
1.  **Trigger**: Student initiates payment.
2.  **Process**: `PaymentUtil` calls `MobileApiService`.
3.  **Success**:
    - `Payment` record created.
    - Student added to `Course.eleves`.
    - Network points distributed to referrers (`ManageNetwork`).

### Learning Progress
1.  **Start**: Opening a lesson creates a `Lecture` record.
2.  **Finish**: Completing a video updates `Lecture` (`isFinished = true`).
3.  **Course Completion**: Aggregation of all `Lecture` statuses.

### Instructor Payouts
1.  **Request**: Instructor requests `Retrait`.
2.  **Process**: Admin approves -> `MobileApiService` sends money -> Status updated.

## 5. Backend API Migration

### Endpoint Mapping
| Feature | Symfony Route | Next.js Route |
| :--- | :--- | :--- |
| **List Courses** | `GET /api/cours` | `GET /api/courses` |
| **Course Detail** | `GET /api/cours/{id}` | `GET /api/courses/[slug]` |
| **Register** | `POST /api/users` | `POST /api/auth/register` |
| **Profile** | `GET /api/users/me` | `GET /api/user/profile` |
| **Payment** | `POST /api/payments` | `POST /api/payment/init` |

### Logic Migration
- **Controllers** become **Route Handlers** (`app/api/.../route.ts`) or **Server Actions**.
- **Services** (File Upload, Email) become utility modules in `lib/`.
- **Validation** moves from Symfony Constraints to **Zod**.
