-- Enable Supabase Realtime for Chat and Notifications

-- Add tables to the publication
ALTER PUBLICATION supabase_realtime ADD TABLE chat_message;
ALTER PUBLICATION supabase_realtime ADD TABLE conversation;
ALTER PUBLICATION supabase_realtime ADD TABLE participant;
ALTER PUBLICATION supabase_realtime ADD TABLE notification;
ALTER PUBLICATION supabase_realtime ADD TABLE forum_message;
