"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// Records WhatsApp and phone clicks as Vercel Analytics custom events, tagged with
// where on the page the click came from, so enquiries can be traced to a button.
const placement = (link: HTMLElement) => {
  if (link.closest(".contact-dock")) return "floating button";
  if (link.closest(".mobile-menu")) return "mobile menu";
  if (link.closest("header")) return "navbar";
  if (link.closest("footer")) return "footer";
  return link.closest("section")?.id || "page";
};

export function ContactClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me")) track("WhatsApp click", { placement: placement(link) });
      else if (href.startsWith("tel:")) track("Call click", { placement: placement(link) });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
