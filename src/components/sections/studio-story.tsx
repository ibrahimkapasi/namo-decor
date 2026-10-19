"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imageById } from "@/data/image-manifest";
import { refreshAfterLayoutSettles } from "@/lib/scroll-trigger-refresh";

gsap.registerPlugin(ScrollTrigger);

const studioImage = imageById("warmLivingRoom");
const studioSide = [
  { tag: "Commercial", image: imageById("directorCabin") },
  { tag: "Hospitality", image: imageById("barLounge") },
];
const audience = ["Architects", "Interior designers", "Builders", "Developers", "Design studios"];

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
          lineReveal: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
          desktop: "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 900px)",
        },
        ({ conditions }) => {
          if (!conditions?.motion) return;

          const intro = gsap.timeline({
            scrollTrigger: { trigger: ".studio-positioning__intro", start: "top 78%", once: true },
            defaults: { ease: "power3.out" },
          });
          if (conditions.lineReveal) {
            intro.from(".studio-line-inner", { yPercent: 105, duration: 0.72, stagger: 0.09 });
          } else {
            intro.from(".studio-positioning__intro h2", { y: 20, opacity: 0, duration: 0.72 });
          }
          intro.from(".studio-positioning__copy", { y: 16, opacity: 0, duration: 0.62 }, "-=0.46");

          gsap.timeline({
            scrollTrigger: { trigger: ".studio-positioning__visual", start: "top 82%", once: true },
            defaults: { ease: "power3.out" },
          })
            .from(".studio-positioning__visual-mask", { clipPath: "inset(5% 5% 5% 5%)", duration: 1.05, ease: "power2.inOut" })
            .from(".studio-positioning__visual-entrance", { scale: 1.045, duration: 1.05 }, 0);

          if (conditions.desktop) {
            gsap.fromTo(
              ".studio-positioning__visual-depth",
              { y: -20 },
              {
                y: 24,
                ease: "none",
                scrollTrigger: {
                  trigger: ".studio-positioning__visual",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
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
    <section id="about" ref={section} className="studio-positioning section-shell" aria-labelledby="studio-positioning-title">
      <div className="site-container">
        <header className="studio-positioning__intro studio-positioning__intro--v2">
          <h2 id="studio-positioning-title">
            <span className="studio-line-mask"><span className="studio-line-inner">Namo Decor is your</span></span>{" "}
            <span className="studio-line-mask"><span className="studio-line-inner">behind-the-scenes partner</span></span>{" "}
            <span className="studio-line-mask"><span className="studio-line-inner">in creating <em>stunning spaces.</em></span></span>
          </h2>
          <div className="studio-positioning__copy">
            <p className="studio-quote">Your vision, rendered before it&rsquo;s built.</p>
            <p>
              We work alongside architects, interior designers and builders, translating design intent into clear,
              convincing 3D visuals before a space exists.
            </p>
            <ul className="studio-audience" aria-label="Who we work with">
              {audience.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a href="#services">See what we offer <span aria-hidden="true">↘</span></a>
          </div>
        </header>

        <div className="studio-mosaic">
        <figure className="studio-positioning__visual">
          <div className="studio-positioning__visual-mask">
            <div className="studio-positioning__visual-depth">
              <div className="studio-positioning__visual-entrance">
                <Image
                  src={studioImage.src}
                  alt={studioImage.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 76vw"
                />
              </div>
            </div>
          </div>
          <span className="image-tag">Residential</span>
        </figure>
        <div className="studio-mosaic__side">
          {studioSide.map((item) => (
            <figure key={item.tag}>
              <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 767px) 50vw, 26vw" />
              <span className="image-tag">{item.tag}</span>
            </figure>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
