"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { founder } from "@/data/site";
import { imageById } from "@/data/image-manifest";

gsap.registerPlugin(ScrollTrigger);

const story = [
  { number: "01", title: "Founded at 20", copy: "Naitri started Namo Decor with a clear purpose: to support architects and interior designers through thoughtful visualization." },
  { number: "02", title: "Seven years in the industry", copy: "Her experience has shaped a precise approach to rendering, composition and visual storytelling." },
  { number: "03", title: "A project partner", copy: "Today, the studio helps design professionals across India translate creative concepts into high-impact architectural visuals." },
];

const founderPortrait = imageById("founderPortrait");

export function FounderStory() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!section.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 74%", once: true }, defaults: { ease: "power3.out" } })
        .from(".founder-portrait", { clipPath: "inset(5% 0 5% 0)", opacity: 0, duration: 0.68 })
        .from(".founder-identity > *", { y: 18, opacity: 0, stagger: 0.06, duration: 0.58 }, "-=0.42")
        .from(".founder-beat", { y: 14, opacity: 0, stagger: 0.06, duration: 0.56 }, "-=0.32");
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section id="founder" ref={section} className="founder-story" aria-labelledby="founder-title">
      <div className="site-container founder-heading"><span>05 / Behind Namo Decor</span><p>Founder profile</p></div>
      <div className="site-container founder-composition">
        <figure className="founder-portrait">
          <Image src={founderPortrait.src} alt={founderPortrait.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1199px) 44vw, 36vw" quality={90} />
          <figcaption>Founder / Namo Decor</figcaption>
        </figure>
        <div className="founder-identity">
          <span>Founder · Namo Decor</span>
          <h2 id="founder-title">Naitri <em>Mehta.</em></h2>
          <p className="founder-lede">Driven by a passion for design and visual storytelling, {founder.name} built Namo Decor to make ambitious ideas visible and convincing.</p>
          <div className="founder-beats">{story.map((beat) => <article className="founder-beat" key={beat.number}><span>{beat.number}</span><div><h3>{beat.title}</h3><p>{beat.copy}</p></div></article>)}</div>
        </div>
      </div>
    </section>
  );
}
