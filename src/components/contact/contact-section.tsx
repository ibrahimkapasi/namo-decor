import Image from "next/image";
import { configuredSocials, contact, contactLinks } from "@/data/contact";
import { ContactIcon, type ContactIconName } from "./contact-icons";

const methods = [
  { label: "WhatsApp", note: "Start a project conversation", href: contactLinks.whatsapp, icon: "whatsapp" },
  { label: "Call", note: "Speak directly", href: contactLinks.phone, icon: "phone" },
  { label: "Email", note: "Send a project brief", href: contactLinks.email, icon: "email" },
] satisfies { label: string; note: string; href: string; icon: ContactIconName }[];

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-visual" aria-hidden="true">
        <Image src="/images/exterior-webp/Night View_02.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="contact-shade" />
      <div className="site-container contact-inner">
        <div className="contact-heading">
          <span>06 / Begin a project</span>
          <h2 id="contact-title">Let’s make the <em>vision visible.</em></h2>
          <p>Visualization and design support for architects, interior designers, builders and studios shaping what comes next.</p>
        </div>
        <div className="contact-methods" aria-label="Contact methods">
          {methods.map((method) => method.href ? (
            <a href={method.href} key={method.label} target={method.icon === "whatsapp" ? "_blank" : undefined} rel={method.icon === "whatsapp" ? "noreferrer" : undefined} aria-label={`${method.label}: ${method.note}`}>
              <span className="contact-method-icon"><ContactIcon name={method.icon} /></span>
              <span><strong>{method.label}</strong><small>{method.note}</small></span><b aria-hidden="true">↗</b>
            </a>
          ) : (
            <div className="contact-method is-pending" key={method.label} aria-label={`${method.label} details pending`}>
              <span className="contact-method-icon"><ContactIcon name={method.icon} /></span>
              <span><strong>{method.label}</strong><small>Details pending</small></span><b aria-hidden="true">—</b>
            </div>
          ))}
        </div>
        <div className="contact-meta">
          <div><span>Studio</span><address>{contact.address.map(line => <span key={line}>{line}</span>)}</address>{!contact.addressConfirmed && <small>Client confirmation pending</small>}{contactLinks.maps && <a href={contactLinks.maps} target="_blank" rel="noreferrer">View on Maps ↗</a>}</div>
          <div><span>Hours</span>{contact.businessHours.map(item => <p key={item.days}><strong>{item.days}</strong>{item.hours}</p>)}{!contact.businessHoursConfirmed && <small>Client confirmation pending</small>}</div>
          <div><span>Elsewhere</span>{configuredSocials.length ? configuredSocials.map(social => <a href={social.href} key={social.label} target="_blank" rel="noreferrer">{social.label} ↗</a>) : <p>Social profiles pending</p>}</div>
        </div>
      </div>
    </section>
  );
}
