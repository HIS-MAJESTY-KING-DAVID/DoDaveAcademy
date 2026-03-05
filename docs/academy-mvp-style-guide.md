DoDave Academy – MVP Design System (Header & Footer)
Version: 1.0  •  Updated: 2026‑03‑04

Scope
- Goal: Provide a reusable MVP style guide that standardizes header and footer design across DoDave Academy’s online learning platform while maintaining DoDave Tech Solutions brand identity.
- Coverage: Header & footer specifications (dimensions, typography, spacing, navigation structure, responsive behavior), complete color palette with hex/RGB and usage, and verified contact details. Guidance adapts all elements to the Academy context for visual consistency across pages.

Brand Foundations
- Brand name: DoDave Tech Solutions (Academy sub‑brand: DoDave Academy)
- Typography stack:
  - Headings: Montserrat, sans‑serif
  - Body: Roboto, sans‑serif
  - Brand mark: Pacifico, cursive (limited to brand/wordmark)
- Container: max width 1280px (Tailwind max-w-7xl), horizontal padding 16px base, 24px ≥640px (sm), 32px ≥1024px (lg)

Color Palette (Hex & RGB) and Usage
- Primary: #1E3D59 (rgb 30,61,89)
  - Usage: Brand text, primary links, active language pill, key headings.
- Secondary: #00B4D8 (rgb 0,180,216)
  - Usage: Primary CTAs (buttons), focus rings, interactive accents and hover states.
- Accent: #FFB703 (rgb 255,183,3)
  - Usage: Limited highlights (badges, sale tags, progress markers). Avoid for body text.
- Backgrounds:
  - White: #FFFFFF (rgb 255,255,255) – global background, header, cards.
  - Gray 50: #F3F4F6 (rgb 243,244,246) – section backgrounds and subtle separators.
- Text:
  - Body: Gray 800 #1F2937 (rgb 31,41,55)
  - Inverse: White #FFFFFF on dark surfaces (e.g., footer, dark overlays)
- Accessibility:
  - Ensure 4.5:1 contrast for body text; 3:1 for large text and UI elements.
  - Primary on white and white on primary meet contrast ratios for standard sizes.

Header – Specifications
- Layout
  - Position: Fixed, top; full width; elevation via subtle shadow.
  - Background: White (#FFFFFF).
  - Container: Max 1280px; px = 16/24/32 at base/sm/lg respectively.
  - Height:
    - Desktop (≥1024px): 80px target; align to ensure full logo visibility.
    - Mobile (<768px): 64px target.
  - Logo: SVG/PNG, 48×48px (h-12 w-12).
  - Brand text: Pacifico, 24px (text-2xl), color Primary (#1E3D59).
- Navigation (Desktop, ≥768px)
  - Items (order): Home, Services, Training, Portfolio, Blog, About, Contact.
  - Action: “Get Started” button (primary), pill radius 8px, px 24, py 8, background Secondary (#00B4D8), text White.
  - Language switcher: Pill links with px 8, py 4; active = bg Primary + text White; inactive = text Primary with hover bg Gray 50.
  - Spacing: Space between items 24px (space-x-6); items vertically centered.
- Navigation (Mobile, <768px)
  - Hamburger button: Right‑aligned.
  - Slide‑down menu:
    - Background: White; card shadow.
    - Items: Full‑width links, padding x=12px, y=8px.
    - Language switcher appears within menu as pill links.
    - Primary action “Get Started” as a full‑width button below links.
- States
  - Hover: Links change to Secondary; buttons increase opacity (90%).
  - Focus: 2px ring using Secondary; maintain visible focus for keyboard nav.
  - Active/current page: Use Primary text color on the corresponding nav link.

Footer – Specifications
- Layout
  - Background: Gray 800 (#1F2937); text White (#FFFFFF).
  - Padding: 48px top/bottom (py-12).
  - Grid: 1 column on mobile; 4 columns at ≥768px; gap 32px (gap-8).
  - Columns:
    1) Brand & Social – brand name in Pacifico 24px; tagline in Gray 400; social icons (LinkedIn/others).
    2) Quick Links – About, Services, Blog, Contact.
    3) Services – Cybersecurity, IT Support, Cloud Solutions, Network Services.
    4) Contact Info – Address, Phone, Email.
  - Link color: Gray 400 default; hover to White.
  - Divider: Top border for copyright area; single line.
- Typography
  - Column headings: Montserrat, 18px, bold.
  - Link text: Roboto, 16px; Gray 400 → White on hover.
  - Tagline: Roboto, 14–16px, Gray 400.
- Copyright
  - Format: “© {year} DoDave Tech Solutions. All rights reserved.”

Navigation Structure (Current)
- Primary: Home, Services, Training, Portfolio, Blog, About, Contact
- Actions: Get Started (primary button), Language Switcher (EN/FR)
- Academy adaptation (recommended additions): Courses, Programs/Tracks, Instructors, Pricing, Sign In / Sign Up (replace or complement “Get Started” with “Enroll Now”)

Typography & Scale
- Fonts
  - Headings: Montserrat (weights 600–700)
  - Body: Roboto (weights 300–500)
  - Brand: Pacifico (wordmark only)
- Sizes (guideline)
  - H1: 48px (text-5xl) – page titles/hero
  - H2: 32px (text-4xl) – section titles
  - H3: 20–24px (text-xl to text-2xl) – card titles
  - Body: 16px (text-base) – standard copy
  - Small: 14px (text-sm) – meta, captions
- Line heights
  - Headings: 1.2–1.3
  - Body: 1.5–1.7

Buttons & Forms
- Buttons
  - Primary: bg Secondary (#00B4D8), text White, radius 8px, px 24, py 8; hover 90% opacity.
  - Outline: 2px border Primary, text Primary; hover bg Primary + text White.
  - Secondary/Link: White border on dark backgrounds or muted on light sections.
- Forms
  - Inputs: Full width, px 16, py 8, radius 8px, border Gray 300 on rest; focus border & ring in Secondary.
  - Labels: Roboto 14px, Primary or Gray 800.

Responsive Behavior
- Breakpoints
  - Mobile: <768px – stacked layouts, collapsed nav.
  - Tablet: ≥768px – grid columns available; horizontal nav appears.
  - Desktop: ≥1024px – full layout spacing and max container width.
- Header
  - Desktop: Horizontal nav, language switcher, primary action visible.
  - Mobile: Hamburger toggles vertical menu; CTA placed below links; language pills visible inside.
- Footer
  - Mobile: Single column; order as listed.
  - Tablet+: Four columns; consistent 32px gaps.

Assets & Icons
- Logo: /public/logo.svg (preferred) and /public/logo.png (fallback)
- Favicon: /app/icon.svg (provided)
- Icon set: Remix Icon via CDN.

Verified Contact Details
- Physical Address: 237 Tech Street, Douala, Cameroon
- Phone: +237 673 14 77 53
- Email: dave@dodave.tech
- Social
  - LinkedIn: https://www.linkedin.com/in/kollodavid237/
  - Facebook: Set when available
  - X/Twitter: Set when available

DoDave Academy Adaptation Guidelines
- Identity
  - Keep Primary (#1E3D59) and Secondary (#00B4D8) as brand anchors.
  - Use Accent (#FFB703) sparingly for highlights (e.g., course badges, “New”, “Bestseller”).
- Header (Academy)
  - Recommended nav: Home, Courses, Programs, Instructors, Blog, About, Contact.
  - Auth actions: “Sign In” (ghost) and “Enroll Now” (primary button).
  - Language switcher unchanged (EN/FR).
  - Maintain 80px desktop / 64px mobile height for consistency.
- Course Cards (example defaults)
  - Card background White (#FFFFFF), shadow subtle.
  - Title: Montserrat 20–22px, Primary.
  - Meta: Roboto 14–16px, Gray 600–700.
  - Actions: Primary button (Secondary color) with 8px radius.
  - Badges: Accent background (#FFB703), text #1F2937.
- Page Templates
  - List pages: 1 column mobile, 2 columns ≥768px, 3 columns ≥1024px; gap 24px.
  - Detail pages: Hero title (H1 48px), key info stack, CTA area with Primary/Secondary buttons.
- Accessibility
  - Preserve focus rings, ensure color contrast, and maintain semantic nav landmarks.
  - Localized routes /en and /fr mirrored for Academy content.

Implementation Mapping (Reference)
- Header code: components/Header.tsx
- Footer code: components/Footer.tsx
- Fonts: loaded in app/[locale]/layout.tsx via Google Fonts
- Theme tokens: tailwind.config.ts (colors, radius, fonts)
- Buttons/Forms utilities: assets/css/style.css (.btn-primary, .btn-outline, .form-input)

Release Checklist (MVP)
- Header/footer adhere to dimensions and spacing in this doc.
- Typography applied consistently for headings and body text.
- Locale routing and language switcher present (EN/FR).
- CTAs use Secondary color; links meet contrast.
- Footer contact details match “Verified Contact Details”.
- Navigation items updated for Academy where applicable.
