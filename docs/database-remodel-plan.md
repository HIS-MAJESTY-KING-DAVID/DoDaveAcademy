# DoDave Academy - Database Schema Masterplan

## 1. Executive Summary

DoDave Academy (formerly Kulmapeck) is undergoing a strategic transformation to become a premier EdTech platform. To support this vision, the underlying database schema requires significant modernization. The current schema reflects a history of organic growth, characterized by mixed naming conventions (French/English), redundant entity structures, and overlapping functionality.

This masterplan outlines a comprehensive strategy to consolidate, standardize, and optimize the database architecture. The goal is to reduce technical debt, improve query performance, and provide a scalable foundation for future features like AI-driven analytics and global expansion.

## 2. Current State Analysis

### 2.1 Complete Inventory & Classification
The system currently comprises **68 Entities**, categorized as follows:

#### A. Identity & Access Management (IAM)
*   **Core**: `User` (Auth), `Personne` (Profile base), `ResetPasswordRequest`.
*   **Roles**: `Eleve` (Student), `Enseignant` (Instructor), `Membre` (Forum member), `Investisseur`.
*   **Device/Session**: `Device`, `WebSocketConnection`.

#### B. Academic Structure
*   **Organization**: `Etablissement` (School/Institution).
*   **Hierarchy**: `SousSysteme`, `TypeEnseignement`, `Filiere` (Track), `Specialite`, `Classe`, `SkillLevel`.
*   **Curriculum**: `MatiereCycle`, `Term`.

#### C. Content Management (LMS)
*   **Structure**: `Formation` (Program), `Cours` (Course), `Chapitre` (Module), `Lesson`.
*   **Metadata**: `Categorie` (Subject/Category), `CourseTag`, `Media`.
*   **Tracking**: `Lecture` (Progress tracking).

#### D. Assessment & Grading
*   **Evaluations**: `Evaluation`, `EvaluationQuestion`, `EvaluationResultat`.
*   **Exams**: `Exam`.
*   **Quizzes**: `Quiz`, `QuizzesType`, `QuizResult`, `QuizLost`, `Reponse` (Student answer), `Proposition` (Multiple choice option).

#### E. Communication & Social
*   **Forums**: `Forum`, `Sujet` (Topic), `ForumMessage`, `LikeMessageForum`.
*   **Chat**: `SubjectChat` (Room), `MessageChat` (Message), `ChatMessage` (Legacy message).
*   **Feedback**: `Review`, `Like`.
*   **Support**: `Contact`, `FAQ`.

#### F. Financials
*   **Transactions**: `Payment`, `PaymentMethod`, `Retrait` (Withdrawal).
*   **Subscriptions**: `Abonnement`, `AbonnementItem`.
*   **Revenue Share**: `PartAction`.

#### G. System & Configuration
*   **Settings**: `SiteSetting`, `SocialSetting`, `EmailSetting`, `NetworkConfig`.
*   **Notifications**: `Notification`, `NotificationSetting`, `NotificationTemplate`, `NotificationType`, `PushNotification`.
*   **Geography**: `Pays` (Country).

### 2.2 Redundancy & Fragmentation Analysis
We have identified significant data redundancy (estimated at **25-30%**) and fragmentation:

1.  **User Identity Fragmentation (High Impact)**:
    *   User data is split across `User`, `Personne`, `Eleve`, `Enseignant`, `Membre`.
    *   *Impact*: Complex joins for basic profile retrieval; potential data inconsistency.

2.  **Communication Silos (Medium Impact)**:
    *   Three distinct chat/messaging implementations: `Forum` (Async), `SubjectChat` (Real-time), and `ChatMessage` (Legacy/Simple).
    *   *Impact*: Fragmented user experience; duplicated logic for moderation and notifications.

3.  **Assessment Overlap (Medium Impact)**:
    *   `Quiz`, `Exam`, and `Evaluation` share similar structures (questions, answers, results) but exist as separate entities.
    *   *Impact*: Triple maintenance of grading logic and reporting.

4.  **Inconsistent Naming (High Impact)**:
    *   Tables/Entities mix French (`Eleve`, `Cours`, `Matiere`) and English (`User`, `Lesson`, `Quiz`).
    *   *Impact*: Developer cognitive load; hinders onboarding of international developers.

## 3. Proposed Schema Design

We propose a consolidated, English-standardized schema following **3NF (Third Normal Form)**.

### 3.1 Consolidated Identity Layer
*   **`users`**: Core auth (id, email, password_hash, role, is_verified).
*   **`profiles`**: Extended profile data (user_id, first_name, last_name, avatar_url, bio, phone). Replaces `Personne`.
*   **`instructors`**: Specific instructor data (user_id, qualifications, bio, status). Replaces `Enseignant`.
*   **`students`**: Specific student data (user_id, enrollment_status). Replaces `Eleve`.
    *   *Note*: `Eleve` and `Enseignant` tables are kept lightweight, primarily for role-specific relationships, while common data moves to `profiles`.

### 3.2 Unified Content Layer
*   **`programs`**: (Was `Formation`) Top-level tracks.
*   **`courses`**: (Was `Cours`) Main learning units.
*   **`modules`**: (Was `Chapitre`) Sections within a course.
*   **`lessons`**: Atomic content units (video, text).
*   **`categories`**: Unified taxonomy for courses and blog.

### 3.3 Unified Assessment Engine
*   **`assessments`**: Polymorphic table or single table with `type` (quiz, exam, assignment).
*   **`questions`**: Question bank linked to assessments.
*   **`answers`**: Student submissions.
*   **`grades`**: Results and feedback.

### 3.4 Unified Communication Layer
*   **`channels`**: Containers for conversations (linked to Course, Subject, or Direct Message). Replaces `Forum`, `SubjectChat`.
*   **`messages`**: Unified message table. Replaces `ForumMessage`, `MessageChat`, `ChatMessage`.
*   **`participants`**: Users in a channel.

## 4. Naming Convention Framework

All database objects will follow strictly **snake_case** and **English** terminology.

*   **Tables**: Plural nouns (e.g., `users`, `course_enrollments`).
*   **Primary Keys**: `id` (BigInt, Auto-increment or UUID).
*   **Foreign Keys**: `singular_table_name_id` (e.g., `user_id`, `course_id`).
*   **Timestamps**: `created_at`, `updated_at`, `deleted_at` (for soft deletes).
*   **Booleans**: `is_active`, `has_paid` (verb prefixes).

**Mapping Examples:**
*   `kulmapeck_user` -> `users`
*   `Eleve` -> `students`
*   `Enseignant` -> `instructors`
*   `Cours` -> `courses`
*   `Matiere` -> `subjects`

## 5. Migration Strategy

### Phase 1: Preparation & Safety (Week 1)
1.  **Backup**: Full snapshot of production database.
2.  **Audit**: Run data consistency checks to identify orphan records.
3.  **Code Freeze**: Halt schema-dependent feature development.

### Phase 2: Schema Migration (Week 2-3)
1.  **Create New Tables**: Create the new English/Consolidated tables alongside existing ones.
2.  **Dual Write**: Update backend to write to BOTH old and new tables (optional, for zero-downtime) OR plan a maintenance window.
3.  **Data Transformation Scripts (ETL)**:
    *   Script 1: Migrate `User`/`Eleve`/`Enseignant` -> `users`/`profiles`.
    *   Script 2: Migrate `Cours`/`Chapitre` -> `courses`/`modules`.
    *   Script 3: Migrate Chats -> `channels`/`messages`.

### Phase 3: Codebase Refactoring (Week 4)
1.  **Entity Update**: Rename and refactor Doctrine Entities to match new schema.
2.  **Repository Update**: Rewrite DQL/SQL queries.
3.  **API Platform**: Update `#[ApiResource]` mappings.

### Phase 4: Cleanup (Week 5)
1.  **Validation**: Verify data integrity between old and new structures.
2.  **Drop Old Tables**: Archive and remove legacy French tables.
3.  **Performance Tuning**: Add indexes to new foreign keys and search columns.

## 6. Testing Strategy

*   **Unit Tests**: Test Entity validation logic and transformation scripts.
*   **Integration Tests**: Verify API endpoints return correct data structure after migration.
*   **Data Integrity Tests**:
    *   Row counts match (Old vs New).
    *   Sum checks (e.g., total payments match).
    *   Foreign key relationship validity.
*   **Performance Benchmarks**: Compare query execution time for critical paths (e.g., "Get User Profile", "List Courses") before and after.

## 7. Risk Assessment

| Risk | Probability | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| Data Loss during migration | Low | Critical | Multiple backups, dry-run mode for scripts. |
| API Downtime | Medium | High | Scheduled maintenance window, blue/green deployment. |
| Broken Legacy References | High | Medium | Comprehensive grep search for hardcoded table names. |

## 8. Success Metrics

*   **Schema Reduction**: 60+ tables -> ~40 optimized tables.
*   **Redundancy**: Reduced from ~25% to <5%.
*   **Query Performance**: 20% improvement in complex join queries.
*   **Developer Onboarding**: Setup time reduced by standardization.
