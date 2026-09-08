"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imageById } from "@/data/image-manifest";
import { company, founder } from "@/data/site";
import { refreshAfterLayoutSettles } from "@/lib/scroll-trigger-refresh";

gsap.registerPlugin(ScrollTrigger);

const studioImage = imageById("warmLivingRoom");

const facts = [
  { label: "Based in", value: company.location },
  { label: "Industry experience", value: `${founder.industryExperienceYears} years of design and visual storytelling` },
  { label: "Working with", value: company.audience },
];

export function StudioStory() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!section.current) return;

    const sectionElement = section.current;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          depth: "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 1024px)",
        },
        ({ conditions }) => {
          if (!conditions?.motion) return;

          const intro = gsap.timeline({
            scrollTrigger: { trigger: ".studio__head", start: "top 78%", once: true },
            defaults: { ease: "power3.out" },
          });
          intro
            .from(".studio__head .kicker", { y: 12, opacity: 0, duration: 0.52 })
            .from(".studio__head .title", { y: 22, opacity: 0, duration: 0.74 }, "-=0.34")
            .from(".studio__copy", { y: 16, opacity: 0, duration: 0.62 }, "-=0.46");

          gsap.timeline({
            scrollTrigger: { trigger: ".studio__visual", start: "top 82%", once: true },
            defaults: { ease: "power3.out" },
          })
            .from(".studio__mask", { clipPath: "inset(5% 5% 5% 5%)", duration: 1.05, ease: "power2.inOut" })
            .from(".studio__entrance", { scale: 1.045, duration: 1.05 }, 0)
            .from(".studio__visual figcaption", { y: 10, opacity: 0, duration: 0.5 }, "-=0.35");

          gsap.from(".studio__facts li", {
            y: 14,
            opacity: 0,
            duration: 0.56,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: ".studio__facts", start: "top 88%", once: true },
          });

          if (conditions.depth) {
            gsap.fromTo(
              ".studio__depth",
              { y: -20 },
              {
                y: 24,
                ease: "none",
                scrollTrigger: { trigger: ".studio__visual", start: "top bottom", end: "bottom top", scrub: 0.9 },
              },
            );
          }
        },
        sectionElement,
      );
    }, sectionElement);

    const stopRefresh = refreshAfterLayoutSettles(sectionElement, () => ScrollTrigger.refresh());
    return () => {
      stopRefresh();
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section id="about" ref={section} className="section section--paper studio" aria-labelledby="studio-title">
      <div className="site-container">
        <i className="section-rule" aria-hidden="true" />

        <header className="section-head studio__head">
          <p className="kicker">01 — The studio</p>
          <h2 id="studio-title" className="title section-head__title">
            Namo Decor is your <span className="nowrap">behind-the-scenes</span> partner in creating{" "}
            <em>stunning spaces.</em>
          </h2>
          <div className="section-head__support studio__copy">
            <p className="support">
              We work alongside architects, interior designers and builders, translating design intent into clear,
              convincing 3D visuals before a space exists.
            </p>
            <a className="rule-link" href="#projects">View selected work <i aria-hidden="true">↘</i></a>
          </div>
        </header>

        <figure className="studio__visual">
          <div className="studio__mask">
            <div className="studio__depth">
              <div className="studio__entrance">
                <Image
                  src={studioImage.src}
                  alt={studioImage.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 78vw"
                />
              </div>
            </div>
          </div>
          <figcaption className="caption">Residential interior visualization / light, material and proportion</figcaption>
        </figure>

        <ul className="studio__facts">
          {facts.map((fact) => (
            <li key={fact.label}>
              <span className="meta-label">{fact.label}</span>
              <p>{fact.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
