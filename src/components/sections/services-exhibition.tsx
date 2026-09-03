"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export function ServicesExhibition() {
  const section = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!section.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const context = gsap.context(() => {
      if (reduced) return;
      gsap.from(".services-exhibition-head > *", { y: 38, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".services-exhibition-head", start: "top 78%" } });
      gsap.from(".service-index-row", { xPercent: -4, opacity: 0, duration: 0.65, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: ".service-index", start: "top 75%" } });
      gsap.from(".service-preview", { clipPath: "inset(100% 0 0 0)", duration: 1.05, ease: "expo.inOut", scrollTrigger: { trigger: ".service-index", start: "top 72%" } });
    }, section);

    if (!reduced && fine && preview.current) {
      const moveY = gsap.quickTo(preview.current, "y", { duration: 0.75, ease: "power3.out" });
      const onMove = (event: PointerEvent) => {
        const bounds = section.current!.getBoundingClientRect();
        const relative = event.clientY - bounds.top - bounds.height / 2;
        moveY(Math.max(-70, Math.min(70, relative * 0.08)));
      };
      section.current.addEventListener("pointermove", onMove);
      return () => { section.current?.removeEventListener("pointermove", onMove); context.revert(); };
    }
    return () => context.revert();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % services.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + services.length) % services.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = services.length - 1;
    else return;
    event.preventDefault(); setActive(next); document.getElementById(`service-index-${next}`)?.focus();
  };

  return (
    <section id="services" ref={section} className="services-exhibition" aria-labelledby="services-exhibition-title">
      <div className="services-exhibition-glow" aria-hidden="true" />
      <div className="site-container services-exhibition-head">
        <span>02 / Capabilities</span>
        <h2 id="services-exhibition-title">Six ways to make<br /><em>design visible.</em></h2>
        <p>End-to-end visual support, built around the way design teams think, decide and present.</p>
      </div>
      <div className="site-container services-exhibition-desktop">
        <div className="service-index" role="tablist" aria-label="Services" aria-orientation="vertical">
          {services.map((service, index) => (
            <button key={service.number} id={`service-index-${index}`} className={`service-index-row${active === index ? " is-active" : ""}`} type="button" role="tab" aria-selected={active === index} aria-controls="service-stage" tabIndex={active === index ? 0 : -1} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} onKeyDown={(event) => onKeyDown(event, index)}>
              <span>{service.number}</span><strong>{service.title}</strong><i>{service.shortLabel}</i>
            </button>
          ))}
        </div>
        <div ref={preview} id="service-stage" className="service-preview" role="tabpanel" aria-labelledby={`service-index-${active}`}>
          {services.map((service, index) => <Image key={service.image} className={active === index ? "is-active" : ""} src={service.image} alt={active === index ? service.imageAlt : ""} fill sizes="38vw" quality={90} />)}
          <div className="service-preview__mask" />
          <div className="service-preview__meta"><span>{services[active].number} / 06</span><p>{services[active].description}</p></div>
        </div>
      </div>
      <div className="services-exhibition-mobile">
        {services.map((service) => (
          <article key={service.number} className="service-mobile-chapter">
            <div className="service-mobile-chapter__head"><span>{service.number}</span><h3>{service.title}</h3></div>
            <div className="service-mobile-chapter__image"><Image src={service.image} alt={service.imageAlt} fill sizes="100vw" /></div>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
