# SEO Maintenance & Verification Checklist

This document outlines the SEO implementation and provides a checklist for future maintenance to ensure DoDave Academy remains properly indexed and ranked by search engines.

## 1. Implementation Overview

### Global Meta Tags
- **Title Template**: `%s | DoDave Academy` (ensures consistent branding).
- **Description**: Optimized global description (150-160 characters).
- **Open Graph / Twitter**: Comprehensive social sharing tags with fallback logo.
- **Verification**: Placeholder for Google Search Console verification in `app/layout.tsx`.
- **Viewport**: Mobile-optimized viewport settings.
- **Robots**: Global indexing allowed, sensitive paths (API, Dashboard) disallowed via `app/robots.ts`.
- **Canonical URLs**: Automatically handled by Next.js `metadataBase` and `alternates`.

### Structured Data (JSON-LD)
- **Organization**: Branding, logo, social profiles, and contact points.
- **WebSite**: Sitelinks Searchbox integration for course searching.
- **Course/Exam Details**: Metadata generated dynamically from database content.

### Multilingual Support
- **hreflang**: Implemented in `app/layout.tsx` for English (`/en`) and French (`/fr`).

## 2. Verification Checklist

- [ ] **GSC Verification**: Replace `GSC_VERIFICATION_CODE_PLACEHOLDER` in `app/layout.tsx` with the actual code from Google Search Console.
- [ ] **Rich Results Test**: Test course and exam URLs using [Google's Rich Results Test](https://search.google.com/test/rich-results).
- [ ] **Sitemap Validation**: Ensure [sitemap.xml](https://academy.dodave.tech/sitemap.xml) is accessible and contains all published courses/exams.
- [ ] **Robots.txt Validation**: Ensure [robots.txt](https://academy.dodave.tech/robots.txt) correctly points to the sitemap.
- [ ] **Broken Links**: Periodically crawl the site (e.g., using Screaming Frog or GSC) to find and fix broken links.
- [ ] **Page Speed**: Monitor Core Web Vitals via PageSpeed Insights to maintain high search rankings.

## 3. Future Maintenance

- When adding new modules:
  - Ensure `export const metadata` is defined in the `page.tsx` (Server Component).
  - Descriptions should be between 150-160 characters.
  - Titles should be under 60 characters.
- When updating branding:
  - Update `GlobalStructuredData.tsx` with new social links or logo.
  - Update `layout.tsx` global metadata.
- When expanding to new regions:
  - Update `hreflang` tags in `layout.tsx`.
