"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { configuredSocials, contact, contactLinks } from "@/data/contact";
import { imageById } from "@/data/image-manifest";
import { refreshAfterLayoutSettles } from "@/lib/scroll-trigger-refresh";

gsap.registerPlugin(ScrollTrigger);

const contactBackground = imageById("towerNightSquare");

export function ContactSection() {
  const section = useRef<HTMLElement>(null);

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
          .from(".contact-title-line > span", { yPercent: 105, duration: 0.72, stagger: 0.09 }, 0.24)
          .from(".contact-heading > p", { y: 14, opacity: 0, duration: 0.58 }, 0.48)
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
          <h2 id="contact-title">
            <span className="contact-title-line"><span>Let’s make the</span></span>
            <span className="contact-title-line"><span><em>vision visible.</em></span></span>
          </h2>
          <p>Visualization and design support for architects, interior designers, builders and studios shaping what comes next.</p>
        </div>
        <div className="contact-meta">
          <div><span>Studio</span><address>{contact.address.map(line => <span key={line}>{line}</span>)}</address>{!contact.addressConfirmed && <small>Client confirmation pending</small>}{contactLinks.maps && <a href={contactLinks.maps} target="_blank" rel="noreferrer">View on Maps ↗</a>}</div>
          <div><span>Contact</span>{contactLinks.phone && <a href={contactLinks.phone}>+91 90822 81625</a>}{contactLinks.whatsapp && <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>}</div>
          <div><span>Elsewhere</span>{configuredSocials.length ? configuredSocials.map(social => <a href={social.href} key={social.label} target="_blank" rel="noreferrer">{social.label} ↗</a>) : <p>Social profiles pending</p>}</div>
        </div>
      </div>
    </section>
  );
}
