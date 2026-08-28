# DoDave Academy Migration Project

## Overview
This project targets the complete migration of the **DoDave Academy E-learning Platform** from a legacy Symfony (PHP) architecture to a modern **Next.js (React/TypeScript)** stack.

## Current Architecture vs. Target
*   **Old**: Symfony 6.2, API Platform, Twig, jQuery, Ratchet (WebSockets).
*   **New**: Next.js 14+ (App Router), TypeScript, Prisma, Tailwind CSS, Supabase/Pusher.

## Core Features to Migrate
1.  **User Management**: Students, Instructors, Admins.
2.  **Course Management**: Creation, publishing, categories, tags.
3.  **Learning Process**: Lessons, Quizzes, Exams, Evaluations.
4.  **Subscriptions & Payments**: Plans, Payment integration.
5.  **Social/Communication**: Chat (Private/Group), Forums, Notifications.
6.  **Content Delivery**: Video lessons, documents.

## Documentation Index

1.  [**System Architecture**](./System_Architecture.md)
    *   Architecture overview, tech stack mapping, entity relationships, auth flows, SEO maintenance, and Supabase infrastructure.
    *   **Start here** to understand the system.

2.  [**Migration Audit Report**](./MIGRATION_AUDIT.md)
    *   Unified feature-by-feature and page-by-page audit comparing legacy Symfony/PHP code and Twig views against React/Next.js pages and API route handlers.

3.  [**Parity Roadmap (0 to 100)**](./PARITY_ROADMAP_0_TO_100.md)
    *   Authoritative execution roadmap from the 60% baseline to 100% completion (Block A through H), with an appendix containing detailed priority tasks and hourly estimates.

4.  [**Full Parity Matrix**](./FULL_PARITY_MATRIX.md)
    *   Authoritative parity checklist matrix comparing Symfony source surfaces with Next.js active surfaces.

5.  [**Feature Parity & Production-Readiness Analysis**](./FEATURE_PARITY_PRODUCTION_READINESS.md)
    *   Comprehensive analysis comparing Next.js implementation gaps (especially Chat/Messaging) against PHP, with validation baseline and RLS audit findings.

6.  [**Tools & Resources**](./Tools_and_Resources.md)
    *   Helper scripts and libraries used during migration.

7.  [**Vercel Operations**](./Vercel_Operations.md)
    *   Vercel CLI commands for deployment, environment management, and monitoring.

8.  [**Progress Log**](./progress.md)
    *   Historical progress logs showing implemented phases, updates, and release status ledger.

9.  [**Legacy / Archive**](./legacy/)
    *   Subfolder containing obsolete trace files, redundant documents, and old audit reports.

## Project Context
**DoDave Academy** is an LMS (Learning Management System) featuring:
*   **User Roles**: Students, Instructors, Admins.
*   **Course Content**: Video lessons, Quizzes, Exams.
*   **Financials**: Mobile Money payments, Instructor payouts, Network marketing (MLM) distribution.
*   **Social**: Chat, Forums, Reviews.

