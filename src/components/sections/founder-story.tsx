"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { founder } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const story = [
  { number: "01", title: "Founded with intent", copy: "Naitri started Namo Decor at age 20 with a clear purpose: to give architects and interior designers reliable, detail-driven visualization support." },
  { number: "02", title: "Seven years of craft", copy: "Across seven years in the industry, she has shaped an exacting approach to rendering, composition and visual storytelling." },
  { number: "03", title: "Built to support ideas", copy: "Today, Namo Decor transforms creative concepts into high-impact visuals for design professionals and projects across India." },
];

export function FounderStory() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!section.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 72%" }, defaults: { ease: "power3.out" } })
        .from(".founder-portrait", { clipPath: "inset(12% 0 88% 0)", duration: 1, ease: "expo.inOut" })
        .from(".founder-identity > *", { y: 28, opacity: 0, stagger: .08, duration: .65 }, "-=.5")
        .from(".founder-beat", { y: 24, opacity: 0, stagger: .09, duration: .62 }, "-=.3");
      gsap.to(".founder-portrait img", { yPercent: 4, scale: 1.035, ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: .8 } });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section id="founder" ref={section} className="founder-story" aria-labelledby="founder-title">
      <div className="site-container founder-heading"><span>04 / Behind Namo Decor</span><p>Founder profile</p></div>
      <div className="founder-composition">
        <div className="founder-portrait">
          <Image src="/images/1D5A2423.JPG.jpeg" alt="Naitri Mehta, founder of Namo Decor" fill sizes="(max-width: 767px) 100vw, 48vw" quality={92} />
          <span aria-hidden="true">NM / 20—NOW</span>
        </div>
        <div className="founder-identity">
          <span>Founder · Namo Decor</span>
          <h2 id="founder-title">Naitri<br /><em>Mehta.</em></h2>
          <p>Visual storytelling, with precision at its core.</p>
        </div>
      </div>
      <div className="site-container founder-story-grid">
        <p className="founder-lede">Driven by a passion for design and visual storytelling, {founder.name} built Namo Decor to make ambitious ideas visible—and convincing.</p>
        <div className="founder-beats">{story.map((beat) => <article className="founder-beat" key={beat.number}><span>{beat.number}</span><h3>{beat.title}</h3><p>{beat.copy}</p></article>)}</div>
      </div>
      <div className="founder-philosophy">
        <div className="site-container founder-philosophy__inner">
          <span>Studio philosophy</span><p>Observe the intent.<br />Refine every detail.<br /><em>Communicate the vision.</em></p>
          <div><span>Observe</span><span>Refine</span><span>Communicate</span></div>
        </div>
      </div>
    </section>
  );
}
