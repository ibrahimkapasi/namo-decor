"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLink } from "@/components/ui/arrow-link";
import { company, heroImages } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!hero.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(".hero-image-wrap", { clipPath: "inset(0 0 100% 0)", duration: 1.35, ease: "power4.inOut" })
        .from(".hero-kicker", { y: 18, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".hero-line > span", { yPercent: 110, duration: 0.95, stagger: 0.1 }, "-=0.35")
        .from(".hero-follow", { y: 20, opacity: 0, duration: 0.7, stagger: 0.09 }, "-=0.45")
        .from(".hero-detail", { x: 24, opacity: 0, duration: 0.8 }, "-=0.45");

      gsap.to(".hero-image", {
        scale: 1.07,
        yPercent: 4,
        ease: "none",
        scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(".hero-content", {
        yPercent: 12,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: hero.current, start: "35% top", end: "bottom top", scrub: 0.7 },
      });
    }, hero);

    return () => context.revert();
  }, []);

  return (
    <section id="top" ref={hero} className="hero" aria-labelledby="hero-title">
      <div className="hero-image-wrap">
        <Image className="hero-image" src={heroImages.primary.src} alt={heroImages.primary.alt} fill priority sizes="100vw" />
        <div className="hero-shade" />
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="site-container hero-layout">
        <div className="hero-content">
          <div className="hero-kicker"><span />3D visualization · End-to-end design support</div>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-line"><span>Ideas, made visible.</span></span>
            <span className="hero-line hero-line--indent"><span>Spaces, brought to life.</span></span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-follow hero-copy">
              High-impact 3D renders, architectural walkthroughs and design support for architects, interior designers, builders and studios.
            </p>
            <div className="hero-follow hero-actions">
              <ArrowLink href="#projects">Explore our work</ArrowLink>
              <ArrowLink href="#contact" variant="line">Start your project</ArrowLink>
            </div>
          </div>
        </div>
        <div className="hero-detail">
          <div className="hero-detail__image">
            <Image src={heroImages.detail.src} alt={heroImages.detail.alt} fill sizes="220px" />
          </div>
          <div className="hero-detail__meta"><span>Exterior<br />after dark</span><span>01</span></div>
        </div>
        <p className="hero-location hero-follow">{company.location}</p>
        <a className="hero-scroll hero-follow" href="#about" aria-label="Scroll to introduction">
          <span>Scroll to discover</span>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v13M5 11l5 5 5-5" /></svg>
        </a>
      </div>
    </section>
  );
}
