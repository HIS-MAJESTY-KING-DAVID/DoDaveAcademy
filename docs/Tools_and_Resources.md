# Migration Tools & Resources

This document outlines the tools and libraries recommended for automating parts of the migration from Symfony (PHP) to React (Next.js/TypeScript).

## 1. Database Migration: Prisma ORM

**Goal**: Automatically generate a TypeScript schema and database client from the existing PostgreSQL database.

*   **Tool**: [Prisma](https://www.prisma.io/)
*   **Command**: `npx prisma db pull`
*   **Process**:
    1.  Install Prisma in the new Next.js project: `npm install prisma --save-dev`
    2.  Initialize Prisma: `npx prisma init`
    3.  Configure `DATABASE_URL` in `.env` to point to the existing PostgreSQL database.
    4.  Run `npx prisma db pull` to introspect the DB and generate `schema.prisma`.
    5.  Run `npx prisma generate` to create the TypeScript client.

## 2. PHP to TypeScript Interface Conversion

**Goal**: Convert existing PHP Entities and DTOs into TypeScript interfaces to ensure type safety across the stack.

*   **Tool**: `snakedove/php-to-typescript-converter` (or similar)
*   **Repository**: [snakedove/php-to-typescript-converter](https://github.com/snakedove/php-to-typescript-converter)
*   **Usage**:
    1.  Install via Composer: `composer require snakedove/php-to-typescript-converter`
    2.  Run the command: `php bin/console ts-create-all src/Entity To_React_TSX/interfaces`
    3.  This will recursively scan `src/Entity` and output `.ts` files in the target folder.

*   **Alternative**: `spatie/typescript-transformer` is more robust but requires more configuration (attributes on PHP classes).

## 3. Twig to JSX Conversion

**Goal**: Automate the syntax conversion of Twig templates to React (JSX) components.

*   **Tool**: `twig2react`
*   **Repository**: [twig2react](https://packagist.org/packages/twig2react/twig2react)
*   **Usage**:
    1.  Install globally: `composer global require "twig2react/twig2react"`
    2.  Run batch conversion: `twig2react generate templates/ To_React_TSX/components/`
*   **Note**: This tool handles syntax (e.g., `{{ var }}` -> `{var}`, `class="..."` -> `className="..."`). Logic structures (`{% for %}`, `{% if %}`) will likely need manual refactoring to `.map()` and conditional rendering.

## 4. Frontend Component Library

**Goal**: Speed up UI development with pre-built, accessible components.

*   **Library**: [shadcn/ui](https://ui.shadcn.com/)
*   **Stack**: Radix UI + Tailwind CSS.
*   **Why**: It provides copy-pasteable components that you own and can customize, perfectly matching the "modernization" goal.

## 5. API Client Generation (Optional)

**Goal**: If keeping Symfony as a backend API, generate a typed API client.

*   **Tool**: [Orval](https://orval.dev/) or [openapi-typescript-codegen](https://github.com/feross/openapi-typescript-codegen)
*   **Process**:
    1.  Export OpenAPI spec from API Platform: `http://localhost:8000/api/docs.json`
    2.  Run generator to create React Query hooks and TypeScript interfaces.
