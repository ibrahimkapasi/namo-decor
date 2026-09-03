export type ContactIconName = "whatsapp" | "phone" | "email" | "plus";

export function ContactIcon({ name }: { name: ContactIconName }) {
  if (name === "whatsapp") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z"/><path d="M8.4 8.2c.2-.5.4-.5.7-.5h.5l.8 1.8c.1.3 0 .5-.2.7l-.6.7c.8 1.6 2 2.7 3.7 3.3l.6-.8c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.6 0 .8-.4 1.5-1.1 1.8-.6.3-1.5.5-2.8 0-1.6-.6-3.1-1.5-4.4-2.9-1.2-1.3-2-2.7-2.4-4-.3-1 .1-1.8.3-2.3Z"/></svg>;
  if (name === "phone") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.5 9.7 8 7.9 9.8c1 2.6 3 4.6 5.6 5.6l1.8-1.8 4.5 2.5-.7 3.3c-.1.6-.7 1.1-1.4 1.1A14.2 14.2 0 0 1 3.5 6.3c0-.7.5-1.3 1.1-1.4l2.6-.6Z"/></svg>;
  if (name === "email") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h17v11h-17z"/><path d="m4 7 8 6 8-6"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>;
}
