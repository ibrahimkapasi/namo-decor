"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLink } from "@/components/ui/arrow-link";
import { company, heroImages } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function HeroExhibition() {
  const hero = useRef<HTMLElement>(null);
  const windowFrame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hero.current) return;
    const heroElement = hero.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const context = gsap.context(() => {
      if (reduced) return;
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(".hero-aperture", { scaleX: 0, transformOrigin: "right center", duration: 0.9, ease: "expo.inOut" })
        .from(".hero-primary-plane", { clipPath: "inset(12% 8% 12% 8%)", scale: 1.08, duration: 1.2, ease: "expo.out" }, "-=0.72")
        .from(".hero-line > span", { yPercent: 110, duration: 0.82, stagger: 0.08 }, "-=0.82")
        .from(".hero-interface, .hero-render-window", { y: 18, opacity: 0, duration: 0.62, stagger: 0.08 }, "-=0.48")
        .from(document.querySelector(".site-header"), { yPercent: -110, duration: 0.55 }, "-=0.45");
      gsap.to(".hero-primary-image", { scale: 1.055, yPercent: 3.5, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: 0.8 } });
      gsap.to(".hero-exhibition-title", { yPercent: 10, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: 0.9 } });
    }, heroElement);

    if (!reduced && finePointer && windowFrame.current) {
      const moveX = gsap.quickTo(windowFrame.current, "x", { duration: 0.8, ease: "power3.out" });
      const moveY = gsap.quickTo(windowFrame.current, "y", { duration: 0.8, ease: "power3.out" });
      const tiltX = gsap.quickTo(".hero-primary-plane", "rotationY", { duration: 1, ease: "power3.out" });
      const tiltY = gsap.quickTo(".hero-primary-plane", "rotationX", { duration: 1, ease: "power3.out" });
      const onMove = (event: PointerEvent) => {
        const bounds = heroElement.getBoundingClientRect();
        const nx = event.clientX / bounds.width - 0.5;
        const ny = event.clientY / bounds.height - 0.5;
        moveX(nx * Math.min(bounds.width * 0.12, 150));
        moveY(ny * Math.min(bounds.height * 0.1, 80));
        tiltX(nx * 0.8);
        tiltY(ny * -0.6);
      };
      const onLeave = () => { moveX(0); moveY(0); tiltX(0); tiltY(0); };
      heroElement.addEventListener("pointermove", onMove);
      heroElement.addEventListener("pointerleave", onLeave);
      return () => {
        heroElement.removeEventListener("pointermove", onMove);
        heroElement.removeEventListener("pointerleave", onLeave);
        context.revert();
      };
    }
    return () => context.revert();
  }, []);

  return (
    <section id="top" ref={hero} className="hero-exhibition" aria-labelledby="hero-title">
      <div className="hero-primary-plane">
        <Image className="hero-primary-image" src={heroImages.primary.src} alt={heroImages.primary.alt} fill priority sizes="100vw" quality={92} />
        <div className="hero-exhibition-shade" />
      </div>
      <div className="hero-aperture" aria-hidden="true"><span>Namo Decor</span></div>
      <div className="hero-coordinate-grid" aria-hidden="true" />
      <div className="site-container hero-exhibition-layout">
        <div className="hero-interface hero-exhibition-kicker"><span>ND / VIS</span><span>3D visualization studio</span><span>Mumbai · India</span></div>
        <h1 id="hero-title" className="hero-exhibition-title">
          <span className="hero-line"><span>Ideas, made visible.</span></span>
          <span className="hero-line hero-line--indent"><span>Spaces, brought to life.</span></span>
        </h1>
        <div className="hero-interface hero-exhibition-bottom">
          <p>High-impact renders, walkthroughs and end-to-end visual support for the people shaping spaces.</p>
          <div className="hero-exhibition-actions"><ArrowLink href="#about">Enter the studio</ArrowLink><span>Visual field / 01</span></div>
        </div>
        <div ref={windowFrame} className="hero-render-window" aria-label="Alternate architectural visualization">
          <div className="hero-render-window__image"><Image src="/images/exterior-webp/Day View_03.webp" alt="Daytime architectural visualization of a high-rise tower" fill sizes="(max-width: 767px) 42vw, 22vw" quality={90} /></div>
          <div className="hero-render-window__meta"><span>Render window</span><span>Explore</span></div>
        </div>
        <a className="hero-interface hero-exhibition-scroll" href="#about" aria-label="Continue to the studio story"><span>Scroll / descend</span><i aria-hidden="true" /></a>
        <span className="hero-interface hero-exhibition-location">{company.location}</span>
      </div>
    </section>
  );
}
