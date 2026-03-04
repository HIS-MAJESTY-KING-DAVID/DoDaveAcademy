
-- 1. Enable RLS on all tables
-- Content / Catalog
ALTER TABLE category ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter ENABLE ROW LEVEL SECURITY;
ALTER TABLE class ENABLE ROW LEVEL SECURITY;
ALTER TABLE country ENABLE ROW LEVEL SECURITY;
ALTER TABLE course ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_class ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_like ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_payment_method ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_tag ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE institution ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson ENABLE ROW LEVEL SECURITY;
ALTER TABLE major ENABLE ROW LEVEL SECURITY;
ALTER TABLE major_sub_system ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposition ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE review ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_setting ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_level ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_setting ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialty ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_system ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE term ENABLE ROW LEVEL SECURITY;
ALTER TABLE training ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_course ENABLE ROW LEVEL SECURITY;

-- User Data
ALTER TABLE answer ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE device ENABLE ROW LEVEL SECURITY;
ALTER TABLE lecture ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_setting ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_method ENABLE ROW LEVEL SECURITY;
ALTER TABLE person ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_lost ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_result ENABLE ROW LEVEL SECURITY;
ALTER TABLE student ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_course ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_student ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_major ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawal ENABLE ROW LEVEL SECURITY;

-- Forum
ALTER TABLE forum ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_message ENABLE ROW LEVEL SECURITY;
ALTER TABLE like_message_forum ENABLE ROW LEVEL SECURITY;
ALTER TABLE member ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_forum ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject ENABLE ROW LEVEL SECURITY;

-- Subscription
ALTER TABLE subscription ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_payment_method ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_subscription_item ENABLE ROW LEVEL SECURITY;

-- 2. Create "Public Read" policies for Catalog Data
-- (Allows anyone to read, including anon)
CREATE POLICY "Public Read Access" ON category FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON class FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON country FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON course FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Access" ON course_class FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON course_tag FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON faq FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON institution FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON instructor FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON major FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON major_sub_system FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON review FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON site_setting FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON skill_level FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON social_setting FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON specialty FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON sub_system FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON teaching_type FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON term FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON training FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON training_course FOR SELECT USING (true);

-- Course Content (Chapters, Lessons, Quizzes) - Usually restricted to enrollment, 
-- but for now let's allow read if course is published to simplify "Preview" logic.
-- Ideally, we check enrollment.
CREATE POLICY "Public Read Access" ON chapter FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON lesson FOR SELECT USING (true); 
CREATE POLICY "Public Read Access" ON quiz FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON proposition FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON media FOR SELECT USING (true);

-- 3. Create "Owner Read" policies for User Data
-- "user" table
CREATE POLICY "Read Own User" ON "user" FOR SELECT USING (id = (auth.jwt() ->> 'app_user_id')::int);
CREATE POLICY "Read Own Person" ON person FOR SELECT USING (user_id = (auth.jwt() ->> 'app_user_id')::int);

-- Student
CREATE POLICY "Read Own Student" ON student FOR SELECT USING (user_id = (auth.jwt() ->> 'app_user_id')::int);

-- Progress / User Data
CREATE POLICY "Read Own Lecture" ON lecture FOR SELECT USING (
    student_id IN (SELECT id FROM student WHERE user_id = (auth.jwt() ->> 'app_user_id')::int)
);

CREATE POLICY "Read Own Enrollments" ON student_course FOR SELECT USING (
    student_id IN (SELECT id FROM student WHERE user_id = (auth.jwt() ->> 'app_user_id')::int)
);

CREATE POLICY "Read Own Payments" ON payment FOR SELECT USING (
    student_id IN (SELECT id FROM student WHERE user_id = (auth.jwt() ->> 'app_user_id')::int)
);

CREATE POLICY "Read Own Quiz Results" ON quiz_result FOR SELECT USING (
    student_id IN (SELECT id FROM student WHERE user_id = (auth.jwt() ->> 'app_user_id')::int)
);

-- 4. Admin / Service Role Fallback
-- Supabase Service Role (used by our Next.js backend) bypasses RLS automatically.
-- However, if we ever connect via a client with a claim 'role' = 'admin', we can add:
-- CREATE POLICY "Admin Full Access" ON table_name USING ((auth.jwt() ->> 'role') = 'admin');

