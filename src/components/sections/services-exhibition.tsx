"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, type Service } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const sourceNote = (service: Service) => {
  if (service.imageRole === "spatial-reference") {
    return "A static visualization illustrating spatial sequence and movement.";
  }
  if (service.imageRole === "representative-outcome") {
    return "This capability is presented through its process and intended outcome.";
  }
  return "A visualization example from the Namo Decor portfolio.";
};

function ServicePreview({ service, mobile = false }: { service: Service; mobile?: boolean }) {
  const textOnly = service.imageRole === "representative-outcome";

  return (
    <div className={`service-preview-content${textOnly ? " is-text-led" : ""}${mobile ? " is-mobile" : ""}`}>
      {!textOnly && (
        <div className="service-preview-content__image">
          <Image src={service.image} alt={service.imageAlt} fill sizes={mobile ? "100vw" : "42vw"} />
        </div>
      )}
      <div className="service-preview-content__copy">
        <span>{service.number} / 06</span>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <small>{sourceNote(service)}</small>
      </div>
    </div>
  );
}

export function ServicesExhibition() {
  const section = useRef<HTMLElement>(null);
  const indexList = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const previewCopy = useRef<HTMLDivElement>(null);
  const rows = useRef<Array<HTMLButtonElement | null>>([]);
  const visibleImage = useRef(services[0].imageRole === "representative-outcome" ? -1 : 0);
  const transitionId = useRef(0);
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const activeService = services[active];

  useEffect(() => {
    if (!section.current) return;
    const context = gsap.context(() => {
      gsap.from(".services__head > *", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".services__head", start: "top 80%", once: true },
      });
      gsap.from(".service-index-row", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".service-index", start: "top 82%", once: true },
      });
    }, section);
    return () => context.revert();
  }, []);

  useEffect(() => {
    const row = rows.current[active];
    const marker = indicator.current;
    if (!row || !marker) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(marker);
    gsap.to(marker, {
      y: row.offsetTop,
      height: row.offsetHeight,
      duration: reduced ? 0 : 0.36,
      ease: "power3.out",
      overwrite: true,
    });
  }, [active]);

  useEffect(() => {
    const list = indexList.current;
    if (!list || !indicator.current) return;
    const resize = new ResizeObserver(() => {
      const row = rows.current[active];
      if (row && indicator.current) gsap.set(indicator.current, { y: row.offsetTop, height: row.offsetHeight });
    });
    resize.observe(list);
    return () => resize.disconnect();
  }, [active]);

  useEffect(() => {
    if (!section.current) return;
    const id = ++transitionId.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const incoming = section.current.querySelector<HTMLImageElement>(`[data-service-image="${active}"]`);
    const outgoing = visibleImage.current >= 0
      ? section.current.querySelector<HTMLImageElement>(`[data-service-image="${visibleImage.current}"]`)
      : null;

    const reveal = () => {
      if (id !== transitionId.current) return;
      const targets = [incoming, outgoing, previewCopy.current].filter(Boolean);
      gsap.killTweensOf(targets);

      if (reduced) {
        section.current?.querySelectorAll<HTMLElement>("[data-service-image]").forEach((image, imageIndex) => {
          gsap.set(image, { opacity: imageIndex === active ? 1 : 0, scale: 1 });
        });
        if (previewCopy.current) gsap.set(previewCopy.current, { opacity: 1, y: 0 });
      } else {
        const timeline = gsap.timeline({ defaults: { overwrite: true } });
        if (incoming) timeline.fromTo(incoming, { opacity: 0, scale: 1.015 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0);
        if (outgoing && outgoing !== incoming) timeline.to(outgoing, { opacity: 0, duration: 0.28, ease: "power1.out" }, 0.1);
        if (previewCopy.current) timeline.fromTo(previewCopy.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.34, ease: "power3.out" }, 0.08);
      }
      visibleImage.current = incoming ? active : -1;
    };

    if (incoming && !incoming.complete) {
      incoming.addEventListener("load", reveal, { once: true });
      incoming.addEventListener("error", reveal, { once: true });
      return () => {
        incoming.removeEventListener("load", reveal);
        incoming.removeEventListener("error", reveal);
      };
    }
    reveal();
  }, [active]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, rowIndex: number) => {
    let next = rowIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (rowIndex + 1) % services.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (rowIndex - 1 + services.length) % services.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = services.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    rows.current[next]?.focus();
  };

  return (
    <section id="services" ref={section} className="section section--night services" aria-labelledby="services-title">
      <div className="site-container">
        <i className="section-rule" aria-hidden="true" />

        <header className="section-head services__head">
          <p className="kicker">03 — Capabilities</p>
          <h2 id="services-title" className="title section-head__title">
            Six ways to make <em>design visible.</em>
          </h2>
          <p className="support section-head__support">
            Visual and design support built around the way architects, designers and builders develop and communicate spaces.
          </p>
        </header>

        <div className="services__body">
          <div ref={indexList} className="service-index" role="tablist" aria-label="Services" aria-orientation="vertical">
            <span ref={indicator} className="service-index-indicator" aria-hidden="true" />
            {services.map((service, rowIndex) => (
              <button
                ref={(element) => { rows.current[rowIndex] = element; }}
                key={service.number}
                id={`service-index-${rowIndex}`}
                className={`service-index-row${active === rowIndex ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={active === rowIndex}
                aria-controls="service-stage"
                tabIndex={active === rowIndex ? 0 : -1}
                onFocus={() => setActive(rowIndex)}
                onClick={() => setActive(rowIndex)}
                onKeyDown={(event) => onKeyDown(event, rowIndex)}
              >
                <span>{service.number}</span><strong>{service.title}</strong><i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>

          <div
            id="service-stage"
            className={`service-preview${activeService.imageRole === "representative-outcome" ? " is-text-led" : ""}`}
            role="tabpanel"
            aria-labelledby={`service-index-${active}`}
          >
            <div className="service-preview__layers">
              {services.map((service, layerIndex) => service.imageRole !== "representative-outcome" && (
                <Image
                  key={service.number}
                  data-service-image={layerIndex}
                  style={{ opacity: layerIndex === 0 ? 1 : 0 }}
                  src={service.image}
                  alt={active === layerIndex ? service.imageAlt : ""}
                  fill
                  sizes="42vw"
                />
              ))}
            </div>
            <div ref={previewCopy} className="service-preview__copy">
              <span>{activeService.number} / 06</span>
              <h3>{activeService.title}</h3>
              <p>{activeService.description}</p>
              <small>{sourceNote(activeService)}</small>
            </div>
          </div>
        </div>

        <div className="services__accordion">
          {services.map((service, panelIndex) => {
            const open = mobileOpen === panelIndex;
            return (
              <article key={service.number} className={`service-accordion${open ? " is-open" : ""}`}>
                <h3>
                  <button type="button" aria-expanded={open} aria-controls={`service-panel-${panelIndex}`} onClick={() => setMobileOpen(open ? null : panelIndex)}>
                    <span>{service.number}</span><strong>{service.title}</strong><i aria-hidden="true">{open ? "−" : "+"}</i>
                  </button>
                </h3>
                <div id={`service-panel-${panelIndex}`} className="service-accordion__panel-shell" aria-hidden={!open} inert={!open}>
                  <div className="service-accordion__panel">
                    <div><ServicePreview service={service} mobile /></div>
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
