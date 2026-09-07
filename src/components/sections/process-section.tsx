"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: "01", title: "Understand the brief", copy: "Align on the design intent, available drawings, references, materials and the purpose of the presentation." },
  { number: "02", title: "Develop the visualization", copy: "Build the geometry, light, materials and composition into one coherent visual direction." },
  { number: "03", title: "Refine and present", copy: "Shape the selected views into clear visual material for design reviews and client conversations." },
] as const;

export function ProcessSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!section.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top 76%", once: true },
        defaults: { duration: 0.58, ease: "power3.out" },
      })
        .from(".process-section__intro > *", { y: 16, opacity: 0, stagger: 0.06 })
        .from(".process-line > li", { y: 14, opacity: 0, stagger: 0.07 }, "-=0.34");
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={section} id="process" className="process-section section-shell" aria-labelledby="process-title">
      <div className="site-container">
        <header className="section-intro process-section__intro">
          <p className="section-kicker">04 / Process</p>
          <div><h2 id="process-title" className="section-title">One clear path from intent to presentation.</h2></div>
          <p className="section-support">A compact working rhythm that keeps the original design direction visible throughout.</p>
        </header>
        <ol className="process-line">
          {steps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
