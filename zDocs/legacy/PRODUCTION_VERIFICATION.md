# Production Verification

## Incident

On 24 August 2026, `academy.dodave.tech` rendered the generic Next.js 500 page after hydration. The live API response identified the failure as an unreachable Supabase direct database endpoint at `db.qpxjcuvlyvaopexqdthb.supabase.co:5432`.

## Root cause

The deployment was using the Supabase direct IPv6 database connection from a Vercel serverless runtime. Vercel could not reach the direct endpoint. The project’s Supabase transaction-pooler URI was available in the supplied environment file under the existing `DATABASE_URL` value.

## Remediation

The Vercel Production environment for `academy.dodave` was configured with `DATABASE_URL_POOLER` using the supplied Supavisor transaction-pooler URI. The application code already prioritizes `DATABASE_URL_POOLER`, then `DATABASE_URL_IPV4`, then `DATABASE_URL`. A production redeployment was triggered and completed successfully.

## Verification

After deployment, the following live endpoints returned HTTP 200 and real Prisma data:

- `/api/courses`
- `/api/categories`
- `/api/exams`
- `/`

The homepage rendered the DoDave Academy hero, course counts, categories, and real course cards instead of the 500 error screen.

No passwords, connection strings, or tokens are stored in this report.
