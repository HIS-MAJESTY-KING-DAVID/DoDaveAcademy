-- Enable the storage extension if not already enabled (usually enabled by default in Supabase)
-- CREATE EXTENSION IF NOT EXISTS "storage";

-- Create buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('media', 'media', true),
  ('course-content', 'course-content', false),
  ('secure-docs', 'secure-docs', false)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for 'avatars'
DROP POLICY IF EXISTS "Avatar images are publicly accessible." ON storage.objects;
CREATE POLICY "Avatar images are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'avatars' );

DROP POLICY IF EXISTS "Anyone can upload an avatar." ON storage.objects;
CREATE POLICY "Anyone can upload an avatar."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Users can update their own avatar." ON storage.objects;
CREATE POLICY "Users can update their own avatar."
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'avatars' AND auth.uid() = owner )
  WITH CHECK ( bucket_id = 'avatars' AND auth.uid() = owner );

-- RLS Policies for 'media' (Course thumbnails, etc.)
DROP POLICY IF EXISTS "Media files are publicly accessible." ON storage.objects;
CREATE POLICY "Media files are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'media' );

DROP POLICY IF EXISTS "Instructors and Admins can upload media." ON storage.objects;
CREATE POLICY "Instructors and Admins can upload media."
  ON storage.objects FOR INSERT
  WITH CHECK ( 
    bucket_id = 'media' 
    AND auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Instructors and Admins can update media." ON storage.objects;
CREATE POLICY "Instructors and Admins can update media."
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'media' AND auth.uid() = owner );

DROP POLICY IF EXISTS "Instructors and Admins can delete media." ON storage.objects;
CREATE POLICY "Instructors and Admins can delete media."
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'media' AND auth.uid() = owner );

-- RLS Policies for 'course-content' (Videos, PDFs)
DROP POLICY IF EXISTS "Authenticated users can view course content." ON storage.objects;
CREATE POLICY "Authenticated users can view course content."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'course-content' AND auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Instructors can upload course content." ON storage.objects;
CREATE POLICY "Instructors can upload course content."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'course-content' AND auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Instructors can update their own course content." ON storage.objects;
CREATE POLICY "Instructors can update their own course content."
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'course-content' AND auth.uid() = owner );

DROP POLICY IF EXISTS "Instructors can delete their own course content." ON storage.objects;
CREATE POLICY "Instructors can delete their own course content."
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'course-content' AND auth.uid() = owner );

-- RLS Policies for 'secure-docs' (Instructor CNI, etc.)
DROP POLICY IF EXISTS "Users can view their own secure docs." ON storage.objects;
CREATE POLICY "Users can view their own secure docs."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'secure-docs' AND auth.uid() = owner );

DROP POLICY IF EXISTS "Users can upload secure docs." ON storage.objects;
CREATE POLICY "Users can upload secure docs."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'secure-docs' AND auth.role() = 'authenticated' );
