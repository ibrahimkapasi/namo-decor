"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!section.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top 74%" },
        defaults: { ease: "power3.out" },
      })
        .from(".services-eyebrow, .services-heading, .services-lede", { y: 28, opacity: 0, duration: 0.75, stagger: 0.1 })
        .from(".service-row, .service-accordion", { y: 18, opacity: 0, duration: 0.55, stagger: 0.07 }, "-=0.32")
        .from(".services-visual", { clipPath: "inset(0 0 100% 0)", duration: 1.05, ease: "power4.inOut" }, "-=0.65");
    }, section);

    return () => context.revert();
  }, []);

  const selectService = (index: number) => setActive(index);
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % services.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + services.length) % services.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = services.length - 1;
    else return;

    event.preventDefault();
    selectService(next);
    document.getElementById(`service-tab-${next}`)?.focus();
  };

  return (
    <section id="services" ref={section} className="services-section" aria-labelledby="services-title">
      <div className="site-container">
        <div className="services-intro">
          <div className="services-eyebrow section-eyebrow section-eyebrow--light"><span>02</span><span>How we support your work</span></div>
          <div>
            <h2 id="services-title" className="services-heading">From design intent<br /><em>to visual impact.</em></h2>
            <p className="services-lede">Six connected services for clearer decisions and stronger presentations.</p>
          </div>
        </div>

        <div className="services-desktop">
          <div className="services-list" role="tablist" aria-label="Services" aria-orientation="vertical">
            {services.map((service, index) => (
              <button
                key={service.number}
                id={`service-tab-${index}`}
                className={`service-row${active === index ? " is-active" : ""}`}
                type="button"
                role="tab"
                tabIndex={active === index ? 0 : -1}
                aria-selected={active === index}
                aria-controls="service-panel"
                onMouseEnter={() => selectService(index)}
                onFocus={() => selectService(index)}
                onClick={() => selectService(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                <span className="service-number">{service.number}</span>
                <span className="service-name">{service.title}</span>
                <svg className="service-arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>
              </button>
            ))}
          </div>

          <div id="service-panel" className="services-visual" role="tabpanel" aria-labelledby={`service-tab-${active}`}>
            {services.map((service, index) => (
              <Image
                key={service.image}
                className={`service-visual-image${active === index ? " is-active" : ""}`}
                src={service.image}
                alt={active === index ? service.imageAlt : ""}
                fill
                sizes="(max-width: 1199px) 0px, 48vw"
              />
            ))}
            <div className="services-visual-shade" />
            <div className="services-visual-meta">
              <span>{services[active].shortLabel}</span>
              <div aria-live="polite">
                <span>{services[active].number} / 06</span>
                <p>{services[active].description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="services-mobile">
          {services.map((service, index) => {
            const open = active === index;
            return (
              <article className={`service-accordion${open ? " is-open" : ""}`} key={service.number}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`service-mobile-${index}`}
                    onClick={() => selectService(index)}
                  >
                    <span>{service.number}</span>
                    <strong>{service.title}</strong>
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v14M3 10h14" /></svg>
                  </button>
                </h3>
                <div id={`service-mobile-${index}`} className="service-accordion-panel" aria-hidden={!open}>
                  <div className="service-accordion-inner">
                    <div className="service-mobile-image">
                      <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 767px) 88vw, 70vw" />
                    </div>
                    <p>{service.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
