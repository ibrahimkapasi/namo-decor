import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import { configuredSocials, contact, contactLinks } from "@/data/contact";
import { navigation } from "@/data/site";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-container footer-main">
      <div className="footer-brand"><Wordmark light /><p>3D visualization and design support for architects, interior designers and builders.</p></div>
      <nav aria-label="Footer navigation"><span>Navigate</span>{navigation.map(item => <a href={item.href} key={item.label}>{item.label}</a>)}</nav>
      <div><span>Contact</span>{contactLinks.whatsapp && <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>}{contactLinks.phone && <a href={contactLinks.phone}>Call</a>}{contactLinks.email && <a href={contactLinks.email}>Email</a>}{!contactLinks.whatsapp && !contactLinks.phone && !contactLinks.email && <p>Contact details pending</p>}</div>
      <div><span>Studio</span><address>{contact.address.join(", ")}</address>{!contact.addressConfirmed && <small>Client confirmation pending</small>}{configuredSocials.map(social => <a href={social.href} key={social.label} target="_blank" rel="noreferrer">{social.label} ↗</a>)}</div>
    </div>
    <div className="site-container footer-bottom"><p>© {new Date().getFullYear()} Namo Decor</p><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div><a href="#top">Back to top ↑</a></div>
  </footer>;
}
