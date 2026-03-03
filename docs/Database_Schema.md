# Database Schema Documentation

## Overview
The database uses PostgreSQL managed by Doctrine ORM. Below is the mapping of key entities.

## User & Profiles
- **User** (`kulmapeck_user`): Core identity.
    - Fields: `id`, `email`, `username`, `password`, `roles`, `phoneNumber`.
    - Relationships: `OneToOne` with `Eleve`, `Enseignant`.
- **Eleve** (Student):
    - Fields: Profile details.
    - Relationships: `OneToOne` with `User`.
- **Enseignant** (Instructor):
    - Fields: Profile details.
    - Relationships: `OneToOne` with `User`.
- **Personne**: Base class/Entity for personal details (likely mapped superclass or joined inheritance).

## Course Management
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

## Assessment & Learning
- **Quiz**: Quizzes for courses/lessons.
- **Exam**: Larger exams.
- **Evaluation**: Student evaluations.
- **Question**: Questions for quizzes/exams.
- **Reponse**: Answers for questions.
- **Resultat**: Student scores.

## Communication
- **MessageChat**: Real-time chat messages.
    - Fields: `content`, `sentAt`, `isRead`.
    - Relationships: `sender`, `receiver`.
- **SubjectChat**: Topic-based chat.
- **Forum**: Course forums.
- **ForumMessage**: Posts in forums.
- **Notification**: System notifications.

## Payments & Subscriptions
- **Abonnement**: Subscription plans.
    - Fields: `label`, `price`, `duration`.
- **Payment**: Payment records.
    - Fields: `amount`, `status`, `transactionId`.
- **PaymentMethod**: Methods (Mobile Money, Card, etc.).

## Migration to PostgreSQL (Supabase/Neon)
- The schema can be exported using `php bin/console doctrine:schema:create --dump-sql`.
- **Action Item**: Generate a full SQL dump or use TypeORM/Prisma introspection to generate the new schema in the React/Node project.
