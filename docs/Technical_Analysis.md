# Technical Analysis & Migration Reports

This document consolidates technical assessments regarding dependencies, folder structure, and stack mapping.

## 1. Migration Dependencies Analysis

### Business Logic Gaps
The following PHP classes contain logic that has **not yet been ported** and is critical for platform function:

1.  **Payment Processing (`src/Utils`)**:
    *   **`MobileApiService.php`**: Handles low-level cURL requests to the payment gateway (`/api/pay/in`, `/api/pay/out`). Requires `private.pem` and `cacert.pem`.
    *   **`PaymentUtil.php`**: Orchestrates payments for Subscriptions (`initierPaymentPlan`) and Courses (`initierPayment`).
    *   **`Keys.php`**: Retrieves API keys from the filesystem.

2.  **Validation (`src/Utils`)**:
    *   **`Utils::checkNumberOperator($number)`**: Validates Cameroon phone numbers (Orange/MTN) and detects the operator. This is **critical** for payment routing.

3.  **Communication**:
    *   **`emailSender`**: Uses PHPMailer. Needs replacement with Nodemailer or Resend.

### Configuration & Secrets
-   **Environment Variables**: Missing `APP_SECRET`, `JWT_PASSPHRASE`, and `API_PAY_URL` in the new `.env`.
-   **Key Files**: `cacert.pem` and `private.pem` must be securely located in `private/keys/` (Not public!).

### Assets
-   **CKEditor**: The legacy CKEditor 4 in `public/assets/ckeditor` may need replacement with a React-native editor (TipTap, CKEditor 5 React).
-   **Images**: Ensure paths like `/assets/img/...` vs `/assets/images/...` are consistent in the new code.

## 2. Folder Relocation Assessment (Completed)

### Summary
The project was successfully relocated from a nested structure (`To_React_TSX/dodave-academy`) to a clean root structure at `DoDave-Academy-React`.

### Changes Made
-   **Root**: Established at `c:\Users\KDave237\Projects\Kulmatest\DoDave-Academy-React`.
-   **Code**: Merged `app`, `components`, `lib`, `entities`, `public` into the new root.
-   **Config**: Consolidated `package.json`, `tsconfig.json`, `tailwind.config.ts`.
-   **Data**: Moved `prisma/schema.prisma` and `.env`.
-   **Legacy**: Deleted the old `To_React_TSX` directory.

## 3. Technical Stack Mapping

| Component | Current (Symfony) | Target (React/Next.js) | Notes |
|-----------|-------------------|------------------------|-------|
| **Language** | PHP 8.1 | TypeScript | Strict typing for better maintainability. |
| **Framework** | Symfony 6.2 | Next.js 14+ (App Router) | Server Components for performance. |
| **Frontend** | Twig Templates | React Components (TSX) | Reusable UI components. |
| **Styling** | Bootstrap / Custom CSS | Tailwind CSS | Utility-first, faster development. |
| **State** | None / jQuery | Zustand / React Query | Better client-side data handling. |
| **API** | API Platform | Next.js Route Handlers / Server Actions | Integrated API within the frontend app. |
| **Database** | PostgreSQL (Doctrine) | PostgreSQL (Prisma/Drizzle) | Prisma provides excellent TS support. |
| **Real-time** | Ratchet (PHP WebSocket) | Supabase Realtime / Pusher | Managed services are easier to scale. |
| **Auth** | Symfony Security / JWT | NextAuth.js (Auth.js) | Supports OAuth and Credentials. |
| **Forms** | Symfony Forms | React Hook Form + Zod | Client-side validation + Type safety. |
| **Uploads** | VichUploaderBundle | Vercel Blob / AWS S3 | Cloud-native storage. |
| **Hosting** | VPS / Dedicated | Vercel / Edge | Serverless, globally distributed. |
