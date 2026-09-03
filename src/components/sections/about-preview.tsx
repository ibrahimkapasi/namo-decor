"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutPreview() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!section.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from(".preview-reveal", {
        y: 46,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 78%" },
      });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section id="about" ref={section} className="about-preview" aria-labelledby="about-preview-title">
      <div className="site-container preview-grid">
        <div className="preview-reveal preview-label"><span>01</span><span>Visualization, with purpose</span></div>
        <p id="about-preview-title" className="preview-reveal preview-statement">
          From an early idea to a compelling presentation, Namo Decor gives design intent <em>clarity, atmosphere and visual impact.</em>
        </p>
        <div className="preview-reveal preview-aside">
          <span aria-hidden="true" />
          <p>End-to-end visual support for the people shaping spaces.</p>
        </div>
      </div>
    </section>
  );
}
