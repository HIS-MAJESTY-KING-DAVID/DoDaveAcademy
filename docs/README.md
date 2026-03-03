# Kulmapeck Migration Project

## Overview
This project targets the complete migration of the **Kulmapeck E-learning Platform** from a legacy Symfony (PHP) architecture to a modern **Next.js (React/TypeScript)** stack.

## Documentation Index

1.  [**Master Implementation Plan**](./Master_Implementation_Plan.md)
    *   The central roadmap, current status, phased checklist, and rollback procedures.
    *   **Start here** to understand the migration strategy.

2.  [**System Architecture**](./System_Architecture.md)
    *   Detailed breakdown of the Database Schema, Auth flows, Entity interactions, and API mapping.

3.  [**Technical Analysis**](./Technical_Analysis.md)
    *   Deep dive into dependencies, critical PHP logic to port (Payments), and stack comparison.

4.  [**Frontend Components**](./Frontend_Components.md)
    *   Strategy for porting specific UI components from Twig to React.

5.  [**Feature Audit Checklist**](./Feature_Audit_Checklist.md)
    *   Granular tracking of every feature and its migration status.

6.  [**Tools & Resources**](./Tools_and_Resources.md)
    *   Helper scripts and libraries used during migration.

## Project Context
**Kulmapeck** is an LMS (Learning Management System) featuring:
*   **User Roles**: Students, Instructors, Admins.
*   **Course Content**: Video lessons, Quizzes, Exams.
*   **Financials**: Mobile Money payments, Instructor payouts, Network marketing (MLM) distribution.
*   **Social**: Chat, Forums, Reviews.

## Current Architecture vs. Target
*   **Old**: Symfony 6.2, API Platform, Twig, jQuery, Ratchet (WebSockets).
*   **New**: Next.js 14+ (App Router), TypeScript, Prisma, Tailwind CSS, Supabase/Pusher.
