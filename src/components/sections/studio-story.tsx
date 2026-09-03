"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyBeats = [
  {
    number: "01",
    title: "Understand",
    copy: "Design intent begins as an idea—a spatial ambition, a material direction, a feeling that still needs a visible form.",
    image: "/images/namo-webp/living 4.webp",
    alt: "3D visualization of a contemporary living room with layered wall panels and soft daylight",
  },
  {
    number: "02",
    title: "Visualize",
    copy: "Namo Decor translates that intent into convincing environments shaped by composition, light, material and architectural detail.",
    image: "/images/Neha-maam-bar-webp/8.webp",
    alt: "3D visualization of a hospitality lounge with curved seating and patterned screens",
  },
  {
    number: "03",
    title: "Present",
    copy: "Architects, designers and builders can then communicate the vision clearly—before the space exists.",
    image: "/images/exterior-webp/Day View_02.webp",
    alt: "Daytime architectural visualization of a high-rise tower in an urban landscape",
  },
];

export function StudioStory() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!section.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from(".story-intro > *", { y: 42, opacity: 0, stagger: 0.1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: ".story-intro", start: "top 76%" } });
      gsap.utils.toArray<HTMLElement>(".story-beat").forEach((beat, index) => {
        ScrollTrigger.create({ trigger: beat, start: "top 54%", end: "bottom 46%", onEnter: () => setActive(index), onEnterBack: () => setActive(index) });
        gsap.from(beat, { y: 34, opacity: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: beat, start: "top 82%" } });
      });
      gsap.to(".story-visual-stack", { yPercent: 4, ease: "none", scrollTrigger: { trigger: ".story-stage", start: "top bottom", end: "bottom top", scrub: 0.9 } });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section id="about" ref={section} className="studio-story" aria-labelledby="studio-story-title">
      <div className="story-threshold" aria-hidden="true">
        <div className="story-threshold__image"><Image src="/images/namo-webp/living 2.webp" alt="" fill sizes="100vw" /></div>
        <span>From intention</span><span>to atmosphere</span>
      </div>
      <div className="site-container story-intro">
        <div className="story-annotation"><span>01 / Studio process</span><span>Behind the visible</span></div>
        <h2 id="studio-story-title">The quiet partner<br />behind <em>stunning spaces.</em></h2>
        <p>Namo Decor is your behind-the-scenes partner in creating stunning spaces.</p>
      </div>
      <div className="site-container story-stage">
        <div className="story-visual" aria-hidden="true">
          <div className="story-visual-stack">
            {storyBeats.map((beat, index) => (
              <div className={`story-visual-frame${active === index ? " is-active" : ""}`} key={beat.number}>
                <Image src={beat.image} alt="" fill sizes="(max-width: 1023px) 100vw, 61vw" quality={90} />
              </div>
            ))}
            <div className="story-visual-interface"><span>Frame 0{active + 1}</span><span>Visual development</span></div>
          </div>
        </div>
        <div className="story-beats">
          {storyBeats.map((beat, index) => (
            <article className={`story-beat${active === index ? " is-active" : ""}`} key={beat.number}>
              <div className="story-beat__image"><Image src={beat.image} alt={beat.alt} fill sizes="92vw" /></div>
              <span>{beat.number}</span><h3>{beat.title}</h3><p>{beat.copy}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="site-container story-capabilities" aria-label="Studio capabilities">
        <span>Interiors / Exteriors / Walkthroughs</span><span>2D drawings / Mood boards</span><span>Architects / Designers / Builders / Studios</span>
      </div>
    </section>
  );
}
