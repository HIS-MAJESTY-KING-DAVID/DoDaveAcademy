
-- Enable RLS on Chat Tables
ALTER TABLE conversation ENABLE ROW LEVEL SECURITY;
ALTER TABLE participant ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_message ENABLE ROW LEVEL SECURITY;

-- Policy: Conversation
-- Participants can view their conversations
CREATE POLICY "Participants can view conversations"
ON conversation
FOR SELECT
USING (
  exists (
    select 1 from participant 
    where participant.conversation_id = conversation.id 
    and participant.user_id = (auth.jwt() ->> 'app_user_id')::int
  )
);

-- Authenticated users can create conversations
CREATE POLICY "Authenticated users can create conversations"
ON conversation
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Participants can update conversations (e.g. timestamp)
CREATE POLICY "Participants can update conversations"
ON conversation
FOR UPDATE
USING (
  exists (
    select 1 from participant 
    where participant.conversation_id = conversation.id 
    and participant.user_id = (auth.jwt() ->> 'app_user_id')::int
  )
);

-- Policy: Participant
-- Users can view themselves and peers in their conversations
CREATE POLICY "View self and peers"
ON participant
FOR SELECT
USING (
  user_id = (auth.jwt() ->> 'app_user_id')::int 
  OR exists (
    select 1 from participant p2 
    where p2.conversation_id = participant.conversation_id 
    and p2.user_id = (auth.jwt() ->> 'app_user_id')::int
  )
);

-- Authenticated users can insert participants (when creating chat)
CREATE POLICY "Insert participants"
ON participant
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Policy: Chat Message
-- Participants can view messages
CREATE POLICY "View messages"
ON chat_message
FOR SELECT
USING (
  exists (
    select 1 from participant 
    where participant.conversation_id = chat_message.conversation_id 
    and participant.user_id = (auth.jwt() ->> 'app_user_id')::int
  )
);

-- Participants can send messages
CREATE POLICY "Send messages"
ON chat_message
FOR INSERT
WITH CHECK (
  exists (
    select 1 from participant 
    where participant.conversation_id = chat_message.conversation_id 
    and participant.user_id = (auth.jwt() ->> 'app_user_id')::int
  )
  AND sender_id = (auth.jwt() ->> 'app_user_id')::int
);
