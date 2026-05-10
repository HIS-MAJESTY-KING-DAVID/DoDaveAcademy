import { createClient, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export function subscribeToNotifications(
  userId: number,
  onNotification: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void,
) {
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notification',
        filter: `recipient_id=eq.${userId}`,
      },
      onNotification,
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function broadcastNotification(
  channel: string,
  event: string,
  payload: unknown,
) {
  await supabase.channel(channel).send({
    type: 'broadcast',
    event,
    payload,
  });
}
