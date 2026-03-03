# Project Overview

## Introduction
This project "Kulmapeck" is currently a Symfony 6.2 application using API Platform, Doctrine ORM, and Twig templates. It functions as an E-learning platform (LMS) with features for students, instructors, and administrators.

## Current Architecture
- **Backend Framework**: Symfony 6.2
- **API Layer**: API Platform (REST)
- **Database**: PostgreSQL (via Doctrine ORM)
- **Frontend**: Twig Templates + jQuery/Vanilla JS
- **Real-time**: WebSocket (Ratchet) for Chat
- **File Storage**: VichUploaderBundle (Local/Cloud)
- **Authentication**: Symfony Security (Session-based) + JWT (LexikJWT) for API

## Goal
Transform the application into a modern **React TypeScript** application with a **Node.js/Next.js** backend (or keeping Symfony as a headless API) using **PostgreSQL**, deployable on **Vercel**.

## Core Features
1.  **User Management**: Students, Instructors, Admins.
2.  **Course Management**: Creation, publishing, categories, tags.
3.  **Learning Process**: Lessons, Quizzes, Exams, Evaluations.
4.  **Subscriptions & Payments**: Plans, Payment integration.
5.  **Social/Communication**: Chat (Private/Group), Forums, Notifications.
6.  **Content Delivery**: Video lessons, documents.

## Directory Structure
- `src/Entity`: Database Models
- `src/Controller`: API & Page Controllers
- `templates/`: Frontend Views (Twig)
- `public/`: Static Assets
- `migrations/`: Database Schema Changes
