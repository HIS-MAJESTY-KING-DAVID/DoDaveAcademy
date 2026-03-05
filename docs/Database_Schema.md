# Database Schema Documentation & Roadmap

## 1. Overview
The database uses PostgreSQL managed by Prisma ORM (formerly Doctrine). This document outlines the current schema structure and the strategic roadmap for consolidation and modernization.

## 2. Current Schema Entities

### 2.1 User & Profiles
- **User** (`kulmapeck_user`): Core identity.
    - Fields: `id`, `email`, `username`, `password`, `roles`, `phoneNumber`.
    - Relationships: `OneToOne` with `Eleve`, `Enseignant`.
- **Eleve** (Student):
    - Fields: Profile details.
    - Relationships: `OneToOne` with `User`.
- **Enseignant** (Instructor):
    - Fields: Profile details.
    - Relationships: `OneToOne` with `User`.
- **Personne**: Base class/Entity for personal details.

### 2.2 Course Management
- **Cours** (Course):
    - Fields: `intitule`, `description`, `price`, `isFree`, `publishedAt`.
    - Relationships: `ManyToOne` with `Categorie`, `Classe`, `Enseignant`.
- **Categorie**: Course categories.
- **Classe**: Classes/Levels.
- **Lecon** / **Lesson**:
    - Fields: `title`, `content`, `videoUrl`.
    - Relationships: `ManyToOne` with `Cours` or `Chapitre`.
- **Chapitre** (Chapter):
    - Groups lessons within a course.

### 2.3 Assessment & Learning
- **Quiz**: Quizzes for courses/lessons.
- **Exam**: Larger exams.
- **Evaluation**: Student evaluations.
- **Question**: Questions for quizzes/exams.
- **Reponse**: Answers for questions.
- **Resultat**: Student scores.

### 2.4 Communication
- **MessageChat**: Real-time chat messages.
    - Fields: `content`, `sentAt`, `isRead`.
    - Relationships: `sender`, `receiver`.
- **SubjectChat**: Topic-based chat.
- **Forum**: Course forums.
- **ForumMessage**: Posts in forums.
- **Notification**: System notifications.

### 2.5 Payments & Subscriptions
- **Abonnement**: Subscription plans.
    - Fields: `label`, `price`, `duration`.
- **Payment**: Payment records.
    - Fields: `amount`, `status`, `transactionId`.
- **PaymentMethod**: Methods (Mobile Money, Card, etc.).

---

## 3. Redundancy & Fragmentation Analysis
We have identified significant data redundancy and fragmentation in the current schema:

1.  **User Identity Fragmentation**: User data is split across `User`, `Personne`, `Eleve`, `Enseignant`, `Membre`.
2.  **Communication Silos**: Three distinct chat/messaging implementations (`Forum`, `SubjectChat`, `ChatMessage`).
3.  **Assessment Overlap**: `Quiz`, `Exam`, and `Evaluation` share similar structures.
4.  **Inconsistent Naming**: Mix of French (`Eleve`, `Cours`) and English (`User`, `Lesson`).

---

## 4. Proposed Future Schema (Roadmap)

We propose a consolidated, English-standardized schema following **3NF**.

### 4.1 Consolidated Identity Layer
*   **`users`**: Core auth (id, email, password_hash, role, is_verified).
*   **`profiles`**: Extended profile data (user_id, first_name, last_name, avatar_url, bio, phone). Replaces `Personne`.
*   **`instructors`**: Specific instructor data (user_id, qualifications, bio, status). Replaces `Enseignant`.
*   **`students`**: Specific student data (user_id, enrollment_status). Replaces `Eleve`.

### 4.2 Unified Content Layer
*   **`programs`**: (Was `Formation`) Top-level tracks.
*   **`courses`**: (Was `Cours`) Main learning units.
*   **`modules`**: (Was `Chapitre`) Sections within a course.
*   **`lessons`**: Atomic content units (video, text).
*   **`categories`**: Unified taxonomy for courses and blog.

### 4.3 Unified Assessment Engine
*   **`assessments`**: Polymorphic table or single table with `type` (quiz, exam, assignment).
*   **`questions`**: Question bank linked to assessments.
*   **`answers`**: Student submissions.
*   **`grades`**: Results and feedback.

### 4.4 Unified Communication Layer
*   **`channels`**: Containers for conversations (linked to Course, Subject, or Direct Message). Replaces `Forum`, `SubjectChat`.
*   **`messages`**: Unified message table. Replaces `ForumMessage`, `MessageChat`, `ChatMessage`.
*   **`participants`**: Users in a channel.

### 4.5 Naming Convention
*   **Tables**: Plural nouns (e.g., `users`, `course_enrollments`).
*   **Primary Keys**: `id` (BigInt/UUID).
*   **Foreign Keys**: `singular_table_name_id` (e.g., `user_id`).
*   **Language**: Strictly **English** (snake_case).
