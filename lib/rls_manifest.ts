
// RLS Policy Manifest
// This document maps application-level permissions to Database Row Level Security policies.

/*
ROLES:
- admin: Full access to everything.
- instructor: Can manage their own courses, chapters, lessons, quizzes. Can view students enrolled in their courses.
- student: Can view published courses. Can view/create/update their own progress (Lecture), quiz results, and chat messages.
- user (authenticated): Can view public profiles, own profile.
- anon: Can view published courses (catalog), public profiles.

TABLES & POLICIES:

1.  **course**
    -   SELECT: Public (anon/authenticated) where `is_published = true` OR Owner (instructor) OR Admin.
    -   INSERT/UPDATE/DELETE: Owner (instructor) OR Admin.

2.  **chapter**, **lesson**, **quiz**, **proposition**
    -   SELECT: Public (if course published) OR Owner (instructor) OR Admin.
    -   INSERT/UPDATE/DELETE: Owner (instructor) OR Admin.

3.  **student_course** (Enrollments)
    -   SELECT: Owner (student) OR Course Instructor OR Admin.
    -   INSERT: Owner (student) - typically handled by payment webhook or server-side logic, but for self-enrollment (free), Student.
    -   UPDATE/DELETE: Admin.

4.  **lecture** (Progress)
    -   SELECT: Owner (student) OR Admin.
    -   INSERT/UPDATE: Owner (student).

5.  **quiz_result**
    -   SELECT: Owner (student) OR Course Instructor OR Admin.
    -   INSERT: Owner (student).

6.  **conversation**
    -   SELECT: Participant (user_id IN participants).
    -   INSERT: Authenticated User (anyone can start a chat?).
    -   UPDATE: Participant (update `updated_at`).

7.  **participant**
    -   SELECT: Participant (user_id = auth.uid) OR Part of same conversation.
    -   INSERT: Authenticated User (add self or others if starting conversation).

8.  **chat_message**
    -   SELECT: Participant of conversation.
    -   INSERT: Participant of conversation.

9.  **user**
    -   SELECT: Public (basic info) - *Careful with PII*. Maybe restrict to authenticated.
    -   UPDATE: Self.

10. **forum**, **subject**, **forum_message**
    -   SELECT: Enrolled Student OR Instructor OR Admin.
    -   INSERT: Enrolled Student OR Instructor OR Admin.

*/

export const RLS_MANIFEST = {
    roles: ['admin', 'instructor', 'student', 'user', 'anon'],
    tables: {
        conversation: {
            policies: [
                {
                    name: "Enable read for participants",
                    command: "SELECT",
                    using: "exists (select 1 from participant where participant.conversation_id = conversation.id and participant.user_id = (auth.jwt() ->> 'app_user_id')::int)"
                },
                {
                    name: "Enable insert for authenticated users",
                    command: "INSERT",
                    with_check: "auth.role() = 'authenticated'"
                },
                {
                    name: "Enable update for participants",
                    command: "UPDATE",
                    using: "exists (select 1 from participant where participant.conversation_id = conversation.id and participant.user_id = (auth.jwt() ->> 'app_user_id')::int)"
                }
            ]
        },
        participant: {
            policies: [
                {
                    name: "Enable read for self or conversation peers",
                    command: "SELECT",
                    using: "user_id = (auth.jwt() ->> 'app_user_id')::int OR exists (select 1 from participant p2 where p2.conversation_id = participant.conversation_id and p2.user_id = (auth.jwt() ->> 'app_user_id')::int)"
                },
                {
                    name: "Enable insert for authenticated users",
                    command: "INSERT",
                    with_check: "auth.role() = 'authenticated'"
                }
            ]
        },
        chat_message: {
            policies: [
                {
                    name: "Enable read for conversation participants",
                    command: "SELECT",
                    using: "exists (select 1 from participant where participant.conversation_id = chat_message.conversation_id and participant.user_id = (auth.jwt() ->> 'app_user_id')::int)"
                },
                {
                    name: "Enable insert for conversation participants",
                    command: "INSERT",
                    with_check: "exists (select 1 from participant where participant.conversation_id = chat_message.conversation_id and participant.user_id = (auth.jwt() ->> 'app_user_id')::int) AND sender_id = (auth.jwt() ->> 'app_user_id')::int"
                }
            ]
        }
        // ... (Other tables would follow similar pattern)
    }
};
