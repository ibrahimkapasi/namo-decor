"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLink } from "@/components/ui/arrow-link";
import { company, heroImages } from "@/data/site";
import { refreshAfterLayoutSettles } from "@/lib/scroll-trigger-refresh";

gsap.registerPlugin(ScrollTrigger);

export function HeroExhibition() {
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!hero.current) return;

    const heroElement = hero.current;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          depth: "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 900px)",
        },
        ({ conditions }) => {
          if (!conditions?.motion) return;

          gsap.timeline({ defaults: { ease: "power3.out" } })
            .from(".hero-primary-entrance", { scale: 1.05, duration: 1.1 }, 0)
            .from(".hero-kicker-rule", { scaleX: 0, duration: 0.78, ease: "power2.inOut" }, 0.04)
            .from(".hero-title-line > span", { yPercent: 108, duration: 0.72, stagger: 0.09 }, 0.12)
            .from(".hero-exhibition-support", { y: 16, opacity: 0, duration: 0.62 }, 0.32)
            .from(".hero-exhibition-actions", { y: 13, opacity: 0, duration: 0.55 }, 0.45)
            .from(".hero-exhibition-caption", { y: 10, opacity: 0, duration: 0.45 }, 0.55);

          if (conditions.depth) {
            gsap.fromTo(
              ".hero-primary-depth",
              { y: -18 },
              {
                y: 22,
                ease: "none",
                scrollTrigger: {
                  trigger: heroElement,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );
          }
        },
        heroElement,
      );
    }, heroElement);

    const stopRefresh = refreshAfterLayoutSettles(heroElement, () => ScrollTrigger.refresh());

    return () => {
      stopRefresh();
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section id="top" ref={hero} className="hero-exhibition" aria-labelledby="hero-title">
      <div className="hero-primary-plane">
        <div className="hero-primary-entrance">
          <div className="hero-primary-depth">
            <Image
              className="hero-primary-image"
              src={heroImages.primary.src}
              alt={heroImages.primary.alt}
              fill
              preload
              sizes="100vw"
              quality={92}
            />
          </div>
        </div>
        <div className="hero-exhibition-shade" />
      </div>

      <div className="site-container hero-exhibition-layout">
        <p className="hero-exhibition-kicker">
          <i className="hero-kicker-rule" aria-hidden="true" />
          <span>3D visualization studio</span>
          <span>{company.location}</span>
        </p>

        <div className="hero-exhibition-copy">
          <h1 id="hero-title" className="hero-exhibition-title">
            <span className="hero-title-line"><span>Ideas,</span></span>
            <span className="hero-title-line"><span>made visible.</span></span>
          </h1>
          <p className="hero-exhibition-support">
            Namo Decor creates 3D visualizations and design support for architects, interior designers and builders.
          </p>
          <div className="hero-exhibition-actions">
            <ArrowLink href="#projects">Explore our work</ArrowLink>
            <ArrowLink href="#contact" variant="line">Start a project</ArrowLink>
          </div>
        </div>

        <p className="hero-exhibition-caption">Hospitality interior / 3D visualization</p>
      </div>
    </section>
  );
}
