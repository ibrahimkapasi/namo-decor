"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { configuredSocials, contact, contactLinks } from "@/data/contact";
import { ContactIcon, type ContactIconName } from "./contact-icons";
import { imageById } from "@/data/image-manifest";
import { refreshAfterLayoutSettles } from "@/lib/scroll-trigger-refresh";

gsap.registerPlugin(ScrollTrigger);

const contactBackground = imageById("towerNightSquare");

const methods = [
  { label: "WhatsApp", note: "Start a project conversation", href: contactLinks.whatsapp, icon: "whatsapp" },
  { label: "Call", note: "Speak directly", href: contactLinks.phone, icon: "phone" },
  { label: "Email", note: "Send a project brief", href: contactLinks.email, icon: "email" },
] satisfies { label: string; note: string; href: string; icon: ContactIconName }[];

export function ContactSection() {
  const section = useRef<HTMLElement>(null);
  const configuredMethods = methods.filter((method) => Boolean(method.href));

  useEffect(() => {
    if (!section.current) return;
    const sectionElement = section.current;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({
          scrollTrigger: { trigger: sectionElement, start: "top 76%", once: true },
          defaults: { ease: "power3.out" },
        })
          .from(".contact-visual img", { scale: 1.065, duration: 1.15 })
          .from(".contact-signature-rule", { scaleX: 0, duration: 0.76, ease: "power2.inOut" }, 0.05)
          .from(".contact-heading > span", { y: 10, opacity: 0, duration: 0.5 }, 0.18)
          .from(".contact-title-line > span", { yPercent: 105, duration: 0.72, stagger: 0.09 }, 0.24)
          .from(".contact-heading > p", { y: 14, opacity: 0, duration: 0.58 }, 0.48)
          .from(".contact-methods > a, .contact-pending", { y: 12, opacity: 0, duration: 0.52, stagger: 0.08 }, 0.56)
          .from(".contact-meta", { y: 12, opacity: 0, duration: 0.55 }, 0.72);
      }, sectionElement);
    }, sectionElement);
    const stopRefresh = refreshAfterLayoutSettles(sectionElement, () => ScrollTrigger.refresh());
    return () => {
      stopRefresh();
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section ref={section} className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-visual" aria-hidden="true">
        <Image src={contactBackground.src} alt="" fill sizes="100vw" />
      </div>
      <div className="contact-shade" />
      <div className="site-container contact-inner">
        <div className="contact-heading">
          <i className="contact-signature-rule" aria-hidden="true" />
          <span>07 / Begin a project</span>
          <h2 id="contact-title">
            <span className="contact-title-line"><span>Let’s make the</span></span>
            <span className="contact-title-line"><span><em>vision visible.</em></span></span>
          </h2>
          <p>Visualization and design support for architects, interior designers, builders and studios shaping what comes next.</p>
        </div>
        {configuredMethods.length ? (
          <div className="contact-methods" aria-label="Contact methods">
            {configuredMethods.map((method) => (
              <a href={method.href} key={method.label} target={method.icon === "whatsapp" ? "_blank" : undefined} rel={method.icon === "whatsapp" ? "noreferrer" : undefined} aria-label={`${method.label}: ${method.note}`}>
                <span className="contact-method-icon"><ContactIcon name={method.icon} /></span>
                <span><strong>{method.label}</strong><small>{method.note}</small></span><b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        ) : (
          <div className="contact-pending" role="note">
            <span>Contact details pending</span>
            <p>Direct project enquiry methods have not yet been confirmed. No inactive or placeholder action is shown.</p>
          </div>
        )}
        <div className="contact-meta">
          <div><span>Studio</span><address>{contact.address.map(line => <span key={line}>{line}</span>)}</address>{!contact.addressConfirmed && <small>Client confirmation pending</small>}{contactLinks.maps && <a href={contactLinks.maps} target="_blank" rel="noreferrer">View on Maps ↗</a>}</div>
          <div><span>Hours</span>{contact.businessHours.map(item => <p key={item.days}><strong>{item.days}</strong>{item.hours}</p>)}{!contact.businessHoursConfirmed && <small>Client confirmation pending</small>}</div>
          <div><span>Elsewhere</span>{configuredSocials.length ? configuredSocials.map(social => <a href={social.href} key={social.label} target="_blank" rel="noreferrer">{social.label} ↗</a>) : <p>Social profiles pending</p>}</div>
        </div>
      </div>
    </section>
  );
}
