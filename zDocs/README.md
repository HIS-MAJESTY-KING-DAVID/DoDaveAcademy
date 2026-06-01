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
    *   Comprehensive feature-by-feature audit comparing legacy PHP codebase against React migration target. Includes schema coverage, API endpoint status, effort estimates (~780h remaining), frontend architecture, and design system.

3.  [**Next Features Roadmap**](./NEXT_FEATURES_ROADMAP.md)
    *   Prioritized build plan (P0-P3) with hourly estimates, phased weekly timeline, legacy phase reference, rollback procedures, and global guidelines.

4.  [**Tools & Resources**](./Tools_and_Resources.md)
    *   Helper scripts and libraries used during migration.

5.  [**Vercel Operations**](./Vercel_Operations.md)
    *   Vercel CLI commands for deployment, environment management, and monitoring.

## Project Context
**DoDave Academy** is an LMS (Learning Management System) featuring:
*   **User Roles**: Students, Instructors, Admins.
*   **Course Content**: Video lessons, Quizzes, Exams.
*   **Financials**: Mobile Money payments, Instructor payouts, Network marketing (MLM) distribution.
*   **Social**: Chat, Forums, Reviews.

