# Supabase Best Practices Checklist

This document tracks the setup and configuration of our Supabase project ("DoDave Academy") against industry best practices.

## 1. Security & Access Control
- [x] **Enable Row Level Security (RLS)**
  - [x] Enable RLS on all tables (`ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`).
  - [x] Create policies for SELECT, INSERT, UPDATE, DELETE.
  - [x] Ensure no tables are "public" unless explicitly intended.
- [x] **Service Role Key Management**: The `service_role` key allows bypassing RLS. It must NEVER be exposed to the client.
    - *Status*: Done. It is stored in `.env.local` and only used in server-side API routes (`lib/supabase-admin.ts`).
- [x] **Secure API Keys**: `anon` key is public, `service_role` is private.
    - *Status*: Done. Configured in `.env.local`.
- [ ] **Disable unused extensions**: Reduce attack surface by disabling PostgreSQL extensions we don't use.
    - *Status*: Pending. We should review `pg_stat_statements`, `pgcrypto`, etc.
- [ ] **Network Restrictions**: Restrict database access to known IPs if possible (Supabase currently allows all 0.0.0.0/0 by default unless configured).
    - *Status*: Pending check.

## 2. Database Design & Performance
- [x] **Use Connection Pooling**
  - [x] Use Supabase Transaction Pooler (Port 6543) for serverless environments (e.g., Vercel, Edge Functions).
  - [x] Append `?pgbouncer=true` to the connection string.
  - [x] Verify `DIRECT_URL` uses port 5432 for migrations.
- [x] **Indexing**: Ensure foreign keys and frequently queried columns are indexed.
    - *Status*: Done. Prisma schema automatically creates indexes on foreign keys.
- [ ] **Database Webhooks**: Use webhooks to trigger Edge Functions for side effects (e.g., sending emails on signup) instead of heavy triggers.
    - *Status*: Pending.

- [x] **Storage Access Control**
  - [x] Create storage buckets: `avatars`, `media` (public), `course-content`, `secure-docs` (private).
  - [x] Implement RLS policies for each bucket.
  - [x] Ensure `service_role` is NOT used for client uploads.

## 3. Realtime & Performance
- [x] **Enable Realtime selectively**
  - [x] Enable Realtime only for tables that need it: `chat_message`, `conversation`, `participant`, `notification`, `forum_message`.
  - [x] Verify `supabase_realtime` publication contains these tables.

- [x] **Database Backups & Recovery**
  - [x] Verify automatic daily backups (Free Plan includes 1 day retention).
  - [ ] Configure Point-in-Time Recovery (PITR) (Requires Pro Plan - Skipped).
  - [ ] Set up Database Webhooks (Pending specific use case).

## 4. Authentication & User Management
- [x] **Custom Claims**: Use custom claims in JWTs to handle application-specific roles (e.g., `app_user_id`).
    - *Status*: Done. Implemented in `lib/supabase-admin.ts`.
- [ ] **Auth Hooks**: Use triggers to sync `auth.users` with our public `users` table (if we were using Supabase Auth, but we are using custom auth).
    - *Status*: N/A (We manage our own user table via Prisma).

## 5. Operations & Reliability
- [ ] **Point-in-Time Recovery (PITR)**: Enable for production databases to recover from accidental data loss.
    - *Status*: Pending (Supabase Pro plan feature).
- [ ] **Database Backups**: Ensure automated daily backups are running.
    - *Status*: Pending verification.
- [ ] **Observability**: Set up logging for slow queries (`pg_stat_statements`).
    - *Status*: Pending.

## 6. Development Workflow
- [x] **Local Development**: Use `supabase start` for local dev (Docker).
    - *Status*: Partial. We are using a remote dev DB. Ideally, we should use local Supabase CLI for offline dev.
- [x] **Migrations**: Use version-controlled SQL migrations.
    - *Status*: Done. We are using Prisma Migrations (`prisma/migrations`).
- [ ] **Seed Data**: Have a script to seed the database with test data.
    - *Status*: Pending.

---

## Action Plan (Remaining Items)
1.  **Switch to Transaction Pooler (Port 6543)**: Better for Next.js.
2.  **Configure Storage**: Create buckets for course content and apply RLS.
3.  **Review Extensions**: Disable unused ones.
