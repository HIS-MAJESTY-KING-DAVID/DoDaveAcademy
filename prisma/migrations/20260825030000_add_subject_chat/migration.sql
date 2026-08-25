CREATE TABLE "dodave_subject_chat" (
  "id" SERIAL NOT NULL,
  "student_id" INTEGER NOT NULL,
  "category_id" INTEGER NOT NULL,
  "cycle" INTEGER,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "dodave_subject_chat_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "dodave_subject_chat_message" (
  "id" SERIAL NOT NULL,
  "subject_chat_id" INTEGER NOT NULL,
  "sender_id" INTEGER NOT NULL,
  "content" TEXT NOT NULL,
  "is_from_ai" BOOLEAN NOT NULL DEFAULT false,
  "is_read" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "edited_at" TIMESTAMP(3),
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "dodave_subject_chat_message_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "dodave_subject_chat_student_id_category_id_key"
  ON "dodave_subject_chat"("student_id", "category_id");
CREATE INDEX "dodave_subject_chat_student_id_idx"
  ON "dodave_subject_chat"("student_id");
CREATE INDEX "dodave_subject_chat_category_id_idx"
  ON "dodave_subject_chat"("category_id");
CREATE INDEX "dodave_subject_chat_message_subject_chat_id_created_at_idx"
  ON "dodave_subject_chat_message"("subject_chat_id", "created_at");
CREATE INDEX "dodave_subject_chat_message_sender_id_idx"
  ON "dodave_subject_chat_message"("sender_id");

ALTER TABLE "dodave_subject_chat"
  ADD CONSTRAINT "dodave_subject_chat_student_id_fkey"
  FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "dodave_subject_chat"
  ADD CONSTRAINT "dodave_subject_chat_category_id_fkey"
  FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "dodave_subject_chat_message"
  ADD CONSTRAINT "dodave_subject_chat_message_subject_chat_id_fkey"
  FOREIGN KEY ("subject_chat_id") REFERENCES "dodave_subject_chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "dodave_subject_chat_message"
  ADD CONSTRAINT "dodave_subject_chat_message_sender_id_fkey"
  FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "dodave_subject_chat_message" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subject_chat_message_select_own_room"
  ON "dodave_subject_chat_message"
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM "dodave_subject_chat" sc
      JOIN "student" st ON st."id" = sc."student_id"
      WHERE sc."id" = "dodave_subject_chat_message"."subject_chat_id"
        AND st."user_id" = ((current_setting('request.jwt.claims', true)::jsonb ->> 'app_user_id')::integer)
    )
  );

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE "dodave_subject_chat_message"';
  END IF;
END $$;
