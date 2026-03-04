# WorldConquestMusic (WCM) Comprehensive Development Checklist

This document serves as a master checklist for the WorldConquestMusic project, covering the entire lifecycle from planning to deployment. It incorporates specific guidelines for security, maintainability, and reusability, aligned with the project's mission and technical architecture.

**Last Updated:** 2026-03-02
**Status:** Pre-Launch Optimization Phase

## 📚 Section 1: Core Guidelines & Standards

Before executing the chronological checklist, strictly adhere to these standards throughout development.

### 🛡️ Security Best Practices
- [x] **Authentication & Authorization**
    - [x] **RLS (Row Level Security):** Ensure *every* Supabase table has RLS enabled.
        - *Verified:* `src/lib/schema.sql` confirms RLS on all tables (`tracks`, `albums`, `profiles`, etc.) with specific policies.
    - [x] **Secure Audio:** Prevent direct MP3 downloads. Use signed URLs with short TTLs (Time-To-Live) or blob streaming via Service Worker.
        - *Verified:* `public/service-worker.js` handles `/api/secure-audio/` requests; `supabaseService.ts` generates signed URLs.
    - [x] **Input Validation:** Validate all API inputs using libraries like `zod`. Never trust client-side data.
        - *Verified:* API routes use validation; Rate limiting implemented in `src/lib/rateLimiter.ts`.
- [x] **Data Protection**
    - [x] **Encryption:** Ensure sensitive data (emails, tokens) is encrypted at rest and in transit (HTTPS).
    - [x] **Backup Strategy:** Schedule regular database dumps (Supabase) and code backups (GitHub).
- [x] **Vulnerability Management**
    - [x] Run `npm audit` regularly to catch vulnerable dependencies.
    - [x] Implement headers: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`.

### 🏗️ Maintainability Guidelines
- [x] **Code Organization**
    - [x] **Directory Structure:** Follow Next.js App Router conventions (`src/app`, `src/components`, `src/lib`).
    - [x] **Colocation:** Keep related styles and tests close to components (e.g., `Player.tsx`, `Player.module.css`, `Player.test.ts`).
- [x] **Documentation Standards**
    - [x] **Code Comments:** Explain *why*, not *what*, for complex logic (especially in `AudioPlayer` and `ServiceWorker`).
    - [x] **READMEs:** Maintain a `README.md` in complex directories (`/lib`, `/hooks`) explaining their purpose.
    - [x] **Change Logs:** Update `WCProgress.md` after every significant task (5+ lines of code).
- [x] **Version Control**
    - [x] **Commit Messages:** Use conventional commits (e.g., `feat: add offline support`, `fix: resolve hydration error`).
    - [x] **Branching:** Use feature branches (`feat/player-ui`) and PRs for all changes. Never push directly to `main`.

### ♻️ Reusability Principles
- [x] **Component Design**
    - [x] **Atomic Design:** Build small, stateless atoms (Buttons, Icons) before complex molecules (PlayerControls).
    - [x] **Props Interface:** Define strict TypeScript interfaces for all components.
- [x] **Modular Architecture**
    - [x] **Custom Hooks:** Extract logic (audio state, fetching) into hooks (`useAudio`, `useTracks`) to separate UI from logic.
    - [x] **Service Layer:** Abstract API calls into services (`SupabaseService`, `OfflineService`) rather than calling `fetch` directly in components.
- [x] **Scalable Patterns**
    - [x] **Context API:** Use Context for global state (Theme, Player, Auth) but avoid over-using it to prevent re-render hell.
    - [x] **Constants:** Centralize configuration (API endpoints, limits) in `src/config/constants.ts` (or `src/lib/utils.ts`).

---

## 🗓️ Section 2: Chronological Development Checklist

### 🏁 Phase 1: Requirements & Architecture (Ground Zero)
*Status: ✅ Completed*

- [x] **Requirements Gathering**
    - [x] Define mission: Free gospel music streaming, honoring CMFI legacy.
    - [x] Define features: Audio player, Lyrics sync, Biographies, Offline PWA.
- [x] **Architecture Design**
    - [x] Select Stack: Next.js (Frontend/API), Supabase (DB/Auth), Vercel (Hosting).
    - [x] Design Data Model: ERD for Tracks, Albums, Composers, Playlists.
- [x] **Design System**
    - [x] Define color palette (Dark theme focus) and typography.
    - [x] Create Figma/Sketch mockups for Mobile and Desktop.

### 🏗️ Phase 2: Infrastructure & Setup
*Status: ✅ Completed*

- [x] **Repository Setup**
    - [x] Initialize Git repo and connect to GitHub.
    - [x] Configure TypeScript and ESLint rules.
- [x] **Database Setup (Supabase)**
    - [x] Create project and configure region.
    - [x] Implement initial Schema (`schema.sql`).
    - [x] **Security Gate:** Enable RLS on all initial tables immediately.
- [x] **Storage Setup**
    - [x] Create `audio-files` and `images` buckets.
    - [x] Configure CORS and access policies.

### 💻 Phase 3: Core Development (Frontend & Features)
*Status: ✅ Completed*

- [x] **Authentication**
    - [x] Implement Supabase Auth (Email/Password).
    - [x] Create `AuthContext` for session management.
- [x] **Audio Player Implementation**
    - [x] Build global `PlayerContext` for state (playing, track, queue).
    - [x] Implement `AudioPlayer` component with HTML5 Audio / Howler.js.
    - [x] **Reusability Check:** Ensure player controls are separate components.
- [x] **Feature Development**
    - [x] Track Listing & Search.
    - [x] Composer Biographies & Album pages.
    - [x] Lyrics Synchronization logic.
- [x] **PWA & Offline Mode**
    - [x] Configure `next-pwa` (or custom SW).
    - [x] Implement Service Worker for caching audio/images.
    - [x] **Quality Gate:** Verify offline playback works in Airplane mode.

### 🛡️ Phase 4: Security Hardening & Review
*Status: ✅ Completed (Audited 2026-03-02)*

- [x] **RLS Audit**
    - [x] Review all tables in `src/lib/schema.sql` against Supabase dashboard.
    - [x] Verify `anon` role cannot `INSERT/UPDATE` public content.
    - [x] Verify `authenticated` users can only modify their own data.
- [x] **API Security**
    - [x] Rate limit API routes (using `rateLimiter.ts`).
    - [x] Validate file upload types and sizes (Images < 2MB, Audio < 20MB).
- [x] **Content Protection**
    - [x] Verify audio URLs are signed/expiring (`getSecureAudioUrl`).
    - [x] Check Service Worker cache for sensitive data leakage.
- [x] **Verification Criteria:**
    - [x] `npm audit` returns 0 high-severity vulnerabilities.
    - [x] Penetration test: Attempt to access another user's private playlist.

### 🧪 Phase 5: Testing & QA
*Status: ✅ Completed*

- [x] **Unit Testing**
    - [x] Write tests for utility functions (`formatTime`, `shuffleQueue`).
    - [x] Write tests for complex hooks (`useAudioPlayer`).
    - [x] *Reference:* `tests/unit/audioPlayer.test.tsx`, `tests/unit/cacheManager.test.ts`.
- [x] **Integration Testing**
    - [x] Test the full "Sign Up -> Login -> Play Track -> Like Track" flow.
    - [x] Test "Offline Mode -> Play Cached Track" flow.
    - [x] *Reference:* `tests/integration/supabaseService.test.ts`.
- [x] **Cross-Platform QA**
    - [x] Test on iOS (Safari) - Check background audio playback.
    - [x] Test on Android (Chrome) - Check PWA install prompt.
    - [x] Test on Desktop (Firefox/Edge).
- [x] **Maintainability Check:**
    - [x] Ensure no `any` types in TypeScript.
    - [x] Verify all new components have JSDoc comments.

### 🚀 Phase 6: Performance & Optimization
*Status: ✅ Completed / Maintenance*

- [x] **Core Web Vitals**
    - [x] **LCP (Largest Contentful Paint):** Optimize hero images (Composers/Albums) using `next/image` with `priority`.
    - [x] **CLS (Cumulative Layout Shift):** Reserve space for images/player.
    - [x] **INP (Interaction to Next Paint):** Debounce search inputs.
- [x] **Media Optimization**
    - [x] Implement Next.js `<Image>` for all static assets.
    - [x] Ensure audio files are compressed (MP3/AAC) but high quality (192kbps+).
- [x] **Caching Strategy**
    - [x] Implement `stale-while-revalidate` for non-critical data.
    - [x] Check IndexedDB limits (currently 500MB) and eviction policy (`cacheManager.ts`).

### 🚢 Phase 7: Deployment & Launch
*Status: ⏳ Future*

- [ ] **Pre-Flight Checks**
    - [ ] Environment Variables: Verify all Prod secrets are set in Vercel.
    - [ ] Build Check: Run `npm run build` locally to catch static generation errors.
    - [ ] SEO: Check `robots.txt`, `sitemap.xml`, and Meta tags.
- [ ] **Deployment**
    - [ ] Deploy to Vercel Production.
    - [ ] Configure Custom Domain & DNS.
    - [ ] Verify SSL Certificate.
- [ ] **Post-Launch Monitoring**
    - [ ] Set up Analytics (Vercel Analytics / Google Analytics).
    - [ ] Set up Error Tracking (Sentry).
    - [ ] **Verification:** Monitor for 48 hours for 500 errors or crashes.

---

## ✅ Quality Gates Summary

| Phase | Gatekeeper | Criteria for Passing | Status |
|-------|------------|----------------------|--------|
| **Infrastructure** | Database Schema | RLS enabled, Schema matches ERD. | ✅ PASS |
| **Development** | Feature Complete | All "Must Have" features working. PWA installable. | ✅ PASS |
| **Security** | Security Audit | No critical vulnerabilities. RLS verified. | ✅ PASS |
| **Performance** | Lighthouse Score | >90 Performance, >90 Accessibility. | ✅ PASS |
| **Launch** | Production Build | Clean build, passing E2E tests. | ⏳ PENDING |
