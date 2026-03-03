# Technical Stack Mapping

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
