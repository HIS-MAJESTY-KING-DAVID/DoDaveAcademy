# Comprehensive Feature Audit & Migration Checklist

This document provides a detailed audit of the legacy PHP (Symfony) codebase and outlines the migration requirements for the Next.js React application.

## 1. Authentication & User Management (Primary)

**Description**: Core user identity, role management, and access control.
**Dependencies**: `lexik/jwt-authentication-bundle`, `symfonycasts/reset-password-bundle`, `symfony/security-bundle`.

| Feature | Priority | Status | Description | Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **User Registration** | Primary | **Completed** | Student and Instructor sign-up flows. | - [x] Create Register UI<br>- [x] Create API Route (`/api/auth/register`)<br>- [ ] Implement Instructor specific fields<br>- [ ] Add email verification |
| **User Login** | Primary | **Completed** | JWT-based authentication. | - [x] Create Login UI<br>- [x] Create API Route (`/api/auth/login`)<br>- [ ] Implement Refresh Token logic<br>- [ ] Persist session (NextAuth or custom) |
| **Password Reset** | Primary | Pending | Request and reset password flow via email. | - [ ] Create "Forgot Password" UI<br>- [ ] Create API Route for request<br>- [ ] Create API Route for reset<br>- [ ] Integrate Email Service |
| **Role Management** | Primary | In Progress | Role-based access (Student, Instructor, Admin). | - [x] Define User Roles in Schema<br>- [ ] Implement Middleware for protected routes<br>- [ ] Add "Switch Role" feature for Admin/Instructor |
| **User Profile** | Secondary | Pending | Edit profile, avatar, and personal info. | - [ ] Create Profile Page<br>- [ ] File Upload for Avatar<br>- [ ] Update User API |

## 2. Course Management (Primary)

**Description**: Creation, editing, and consumption of educational content.
**Dependencies**: `vich/uploader-bundle`, `friendsofsymfony/ckeditor-bundle`.

| Feature | Priority | Status | Description | Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **Course Listing** | Primary | In Progress | Public catalog of courses with filters. | - [x] Create Course List Component<br>- [x] Create Course Card<br>- [ ] Implement Filters (Category, Price, Level)<br>- [ ] Pagination |
| **Course Details** | Primary | Pending | Detailed view of a course (syllabus, instructor, price). | - [ ] Create Course Detail Page<br>- [ ] Display Curriculum (Chapters/Lessons)<br>- [ ] Show Instructor Info |
| **Course Consumption (Player)** | Primary | Pending | Video player and lesson content viewer. | - [ ] Create Video Player Component<br>- [ ] Track Lesson Progress (`Lecture` entity)<br>- [ ] Mark as Complete logic |
| **Course Creation (Instructor)** | Primary | Pending | Form to create/edit courses, chapters, and lessons. | - [ ] Create Instructor Dashboard<br>- [ ] Course Editor (Forms)<br>- [ ] Chapter/Lesson Management<br>- [ ] Media Uploads (Video/Images) |
| **Categories & Taxonomy** | Secondary | Pending | Manage Categories, Specialties, Classes. | - [ ] Admin Management UI<br>- [ ] Public Navigation Menu |

## 3. Payments & Subscriptions (Primary)

**Description**: Financial transactions for courses and subscriptions.
**Dependencies**: Custom `MobileApiService`, `PaymentUtil`.

| Feature | Priority | Status | Description | Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **Course Purchase** | Primary | Pending | Buy individual courses via Mobile Money. | - [ ] Integrate Mobile Money API (Port `MobileApiService`)<br>- [ ] Checkout UI<br>- [ ] Payment Confirmation Webhook/Poller |
| **Subscription Plans** | Primary | Pending | Recurring subscriptions (`Abonnement`). | - [ ] Subscription Plan Listing<br>- [ ] Subscribe Flow<br>- [ ] Expiry Management |
| **Instructor Payouts** | Secondary | Pending | Instructors requesting withdrawals (`Retrait`). | - [ ] Payout Request UI<br>- [ ] Admin Approval Interface<br>- [ ] Payout Processing API |
| **Order History** | Secondary | Pending | Student and Instructor transaction logs. | - [ ] Student Order List<br>- [ ] Instructor Sales Dashboard |

## 4. Student Dashboard (Primary)

**Description**: Personal space for students to track progress.

| Feature | Priority | Status | Description | Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **My Courses** | Primary | Pending | List of enrolled courses. | - [ ] "My Learning" Page<br>- [ ] Progress Bars |
| **Quizzes & Exams** | Secondary | Pending | Taking assessments and viewing results. | - [ ] Quiz Runner UI<br>- [ ] Result Calculation Logic<br>- [ ] Exam Interface |
| **Certificates** | Tertiary | Pending | Generate certificates upon completion. | - [ ] Certificate Generation Logic (PDF)<br>- [ ] Download UI |

## 5. AI & Analytics (Secondary)

**Description**: AI-driven features and data analysis.
**Dependencies**: DeepSeek API.

| Feature | Priority | Status | Description | Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **AI Teacher Assistant** | Secondary | Pending | AI-powered responses to student questions using DeepSeek. | - [ ] Port `DeepSeekAIService` logic to Next.js API<br>- [ ] Implement Chat UI for AI interactions<br>- [ ] Manage conversation history |
| **Message Analytics** | Tertiary | Pending | Analysis of chat messages and user engagement. | - [ ] Port `MessageAnalyticsService`<br>- [ ] Admin engagement reports |

## 6. Communication & Community (Secondary)

**Description**: Interaction between users.
**Dependencies**: `cboden/ratchet` (WebSockets).

| Feature | Priority | Status | Description | Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **Course Forums** | Secondary | Pending | Q&A threads per course. | - [ ] Forum UI (Questions/Answers)<br>- [ ] Thread Management |
| **Real-time Chat** | Secondary | Pending | Direct messaging between users. | - [ ] Port WebSocket Server or use Firebase/Pusher<br>- [ ] Chat UI<br>- [ ] Notification System |
| **Reviews** | Secondary | Pending | Course ratings and reviews. | - [ ] Review Submission Form<br>- [ ] Display Reviews on Course Page |
| **Notifications** | Secondary | Pending | In-app and Email notifications. | - [ ] Notification Center UI<br>- [ ] Email Service Integration |

## 7. Admin Dashboard (Secondary)

**Description**: Platform administration.
**Dependencies**: `knplabs/knp-paginator-bundle`.

| Feature | Priority | Status | Description | Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **User Management** | Secondary | Pending | Manage Students, Instructors, Admins. | - [ ] User List & Edit UI<br>- [ ] Ban/Unban functionality |
| **Content Approval** | Secondary | Pending | Validate courses before publishing. | - [ ] Course Review Queue<br>- [ ] Approve/Reject Actions |
| **Financial Stats** | Secondary | Pending | Platform revenue and payout stats. | - [ ] Admin Dashboard Widgets<br>- [ ] Transaction Reports |
| **Settings** | Tertiary | Pending | Site-wide configuration. | - [ ] Settings Form (Site Name, Contact, etc.) |

## 8. Network & Referrals (Tertiary)

**Description**: MLM-style referral system.
**Dependencies**: `ManageNetwork` utility.

| Feature | Priority | Status | Description | Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **Referral System** | Tertiary | Pending | User network visualization and commission. | - [ ] Network Visualization UI<br>- [ ] Commission Calculation Logic |

## 9. Miscellaneous (Tertiary)

| Feature | Priority | Status | Description | Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **Blog** | Tertiary | Pending | Public blog posts. | - [ ] Blog Listing & Detail Pages<br>- [ ] Admin Blog Editor |
| **FAQ** | Tertiary | Pending | Frequently Asked Questions. | - [ ] FAQ Page<br>- [ ] Admin FAQ Editor |
| **Contact Form** | Tertiary | Pending | Public contact form. | - [ ] Contact Page<br>- [ ] Email Submission API |
| **Push Notifications** | Secondary | Pending | Mobile/Web push notifications via Firebase (FCM). | - [ ] Integrate `firebase-admin` SDK<br>- [ ] Service Worker for Web Push<br>- [ ] Migration from legacy FCM API to v1 |

## 10. Entity Interactions & Business Logic

**Description**: Mapping of how entities interact and triggers for automated logic.
**Detailed Reference**: See [Entity_Interaction_Flows.md](./Entity_Interaction_Flows.md) for full mapping.

| Flow Area | Key Entities | Logic Trigger |
| :--- | :--- | :--- |
| **Course Enrollment** | `Payment`, `Student`, `Course` | Successful Mobile Money PayIn. |
| **MLM Distribution** | `Student`, `User` (Parent), `Abonnement` | Successful subscription payment. |
| **Progress Tracking** | `Lecture`, `Lesson`, `Student` | Video play/finish events. |
| **Course Validation** | `Course`, `Admin`, `Notification` | Instructor publication request. |
| **Evaluation Grading** | `Evaluation`, `Reponse`, `Resultat` | Student questionnaire submission. |
| **Financial Payouts** | `Retrait`, `Instructor`, `Admin` | Manual request -> Admin execution. |

---

## Technical Migration Notes

### Database
- **Schema**: Already migrated to Prisma (`schema.prisma`).
- **Data**: Need a migration script to move data from MySQL (Symfony) to new DB if schema changes are significant.

### API Strategy
- **Current**: API Platform + Custom Controllers + Mobile Money Integration (cURL).
- **Target**: Next.js API Routes (Serverless functions).
- **Action**: Port logic from `src/Controller` and `src/Utils` to `app/api/`.

### File Storage
- **Current**: Local filesystem (`public/uploads`) managed by VichUploader.
- **Target**: Cloud Storage (AWS S3 or Supabase Storage) recommended for scalability.
- **Action**: Update file upload logic to use cloud provider or consistent local path.

### Real-time & AI
- **Chat**: Currently using Ratchet (PHP WebSockets). Recommend moving to Supabase Realtime or Pusher.
- **AI**: Currently using DeepSeek API via PHP. Port to Next.js API route.
