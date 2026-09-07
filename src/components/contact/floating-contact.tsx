"use client";

import { useEffect, useState } from "react";
import { contactLinks } from "@/data/contact";
import { ContactIcon, type ContactIconName } from "./contact-icons";

const actions = [
  { label: "WhatsApp", href: contactLinks.whatsapp, icon: "whatsapp" },
  { label: "Call Namo Decor", href: contactLinks.phone, icon: "phone" },
  { label: "Email Namo Decor", href: contactLinks.email, icon: "email" },
] satisfies { label: string; href: string; icon: ContactIconName }[];

export function FloatingContact() {
  const configuredActions = actions.filter((action) => Boolean(action.href));

  if (!configuredActions.length) return null;

  return <FloatingContactDock configuredActions={configuredActions} />;
}

function FloatingContactDock({ configuredActions }: { configuredActions: (typeof actions)[number][] }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > Math.min(window.innerHeight * .55, 520));
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div className={`contact-dock${visible ? " is-visible" : ""}${open ? " is-open" : ""}`}>
    <div className="contact-dock__actions" id="contact-dock-actions">
      {configuredActions.map(action => <a href={action.href} key={action.label} aria-label={action.label} title={action.label} target={action.icon === "whatsapp" ? "_blank" : undefined} rel={action.icon === "whatsapp" ? "noreferrer" : undefined}><ContactIcon name={action.icon} /></a>)}
    </div>
    <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="contact-dock-actions" aria-label={open ? "Close contact options" : "Open contact options"}><ContactIcon name="plus" /><span>Contact</span></button>
  </div>;
}
