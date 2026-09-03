"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const details = [
  { label: "Visualization", value: "Interiors · Exteriors · Walkthroughs" },
  { label: "Design support", value: "2D Drawings · Mood Boards · Presentations" },
  { label: "Partners", value: "Architects · Designers · Builders · Studios" },
];

const journey = ["Understand", "Develop", "Visualize", "Present"];

export function AboutSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!section.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top 72%" },
        defaults: { ease: "power3.out" },
      });
      timeline
        .from(".about-eyebrow", { y: 18, opacity: 0, duration: 0.55 })
        .from(".about-title-line > span", { yPercent: 105, duration: 0.9, stagger: 0.11 }, "-=0.25")
        .from(".about-copy, .about-route", { y: 28, opacity: 0, duration: 0.75, stagger: 0.12 }, "-=0.4")
        .from(".about-image-frame", { clipPath: "inset(100% 0 0 0)", duration: 1.1, stagger: 0.16, ease: "power4.inOut" }, "-=0.55")
        .from(".about-detail", { y: 18, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.45");

      gsap.to(".about-image-primary img", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: ".about-visuals", start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(".about-image-secondary img", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: { trigger: ".about-visuals", start: "top bottom", end: "bottom top", scrub: 0.9 },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section id="about-story" ref={section} className="about-section" aria-labelledby="about-title">
      <div className="site-container">
        <div className="about-intro">
          <div className="about-eyebrow section-eyebrow"><span>01</span><span>A visualization partner</span></div>
          <h2 id="about-title" className="about-title">
            <span className="about-title-line"><span>Design deserves</span></span>
            <span className="about-title-line about-title-line--offset"><span>to be seen</span></span>
            <span className="about-title-line"><span>before it is built.</span></span>
          </h2>
          <div className="about-copy">
            <p className="about-partner-statement">Namo Decor is your behind-the-scenes partner in creating stunning spaces.</p>
            <p>We are a 3D visualization agency providing end-to-end design support—from photoreal interior and exterior renders to walkthroughs, 2D drawings, mood boards and presentation support.</p>
            <p>We work alongside architects, interior designers, builders, design studios and developers to turn design ideas into high-impact visuals that communicate clearly and confidently.</p>
          </div>
        </div>

        <div className="about-route" aria-label="Namo Decor project journey">
          {journey.map((step, index) => (
            <div className="about-route-step" key={step}><span>0{index + 1}</span><strong>{step}</strong></div>
          ))}
        </div>

        <div className="about-visuals">
          <figure className="about-image-frame about-image-primary">
            <Image
              src="/images/Neha-maam-bar-webp/4.webp"
              alt="Hospitality interior visualization with layered seating, lighting and material detail"
              fill
              sizes="(max-width: 767px) 90vw, 67vw"
            />
            <figcaption>Commercial spaces, vividly communicated</figcaption>
          </figure>
          <figure className="about-image-frame about-image-secondary">
            <Image
              src="/images/exterior-webp/Day View_02.webp"
              alt="Day-time architectural exterior visualization of a high-rise building"
              fill
              sizes="(max-width: 767px) 43vw, 29vw"
            />
            <figcaption>Architecture, clearly presented</figcaption>
          </figure>
        </div>

        <div className="about-details">
          {details.map((detail) => (
            <div className="about-detail" key={detail.label}><span>{detail.label}</span><p>{detail.value}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
