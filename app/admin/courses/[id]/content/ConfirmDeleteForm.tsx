'use client';

export default function ConfirmDeleteForm({ action, label, message }: { action: string; label: string; message: string }) {
  return <form action={action} method="POST" onSubmit={(event) => { if (!window.confirm(message)) event.preventDefault(); }}><input type="hidden" name="_action" value="delete" /><button type="submit" className="text-xs text-red-600 hover:underline">{label}</button></form>;
}
