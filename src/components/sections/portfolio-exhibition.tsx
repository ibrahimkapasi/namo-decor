"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

type CategoryFilter = "all" | PortfolioCategory;

const categories: ReadonlyArray<{ id: CategoryFilter; label: string }> = [
  { id: "all", label: "All" },
  ...portfolioCategories.map((category) => ({
    ...category,
    label: category.id === "commercial" ? "Commercial" : category.label,
  })),
];

const categoryLabel = (category: PortfolioCategory) =>
  portfolioCategories.find((item) => item.id === category)?.label ?? category;

const presentation = (item: PortfolioItem) => {
  if (item.category === "exterior") return "exterior";
  if (item.width / item.height < 1.05) return "portrait";
  return "landscape";
};

export function PortfolioExhibition() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const transition = useRef<HTMLDivElement>(null);
  const dragging = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const transitioning = useRef(false);
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [compare, setCompare] = useState(50);

  const items = useMemo(
    () => category === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === category),
    [category],
  );
  const active = items[activeIndex] ?? items[0];
  const isExteriorPair = active.category === "exterior";

  useEffect(() => {
    if (!section.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.from(".portfolio-intro > *", {
        y: 34,
        opacity: 0,
        stagger: 0.1,
        duration: 0.78,
        ease: "power3.out",
        scrollTrigger: { trigger: ".portfolio-intro", start: "top 76%" },
      });
      gsap.from(".portfolio-stage-shell", {
        clipPath: "inset(12% 5% 12% 5%)",
        scale: 0.97,
        duration: 1.05,
        ease: "expo.out",
        scrollTrigger: { trigger: ".portfolio-stage-shell", start: "top 78%" },
      });
      gsap.from(".portfolio-exit__inner > *", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".portfolio-exit", start: "top 78%" },
      });
    }, section);
    return () => context.revert();
  }, []);

  useEffect(() => {
    rail.current?.querySelector<HTMLElement>(`[data-portfolio-index="${activeIndex}"]`)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, category]);

  const commitIndex = (nextIndex: number) => {
    const normalized = (nextIndex + items.length) % items.length;
    if (normalized === activeIndex || transitioning.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !transition.current || !stage.current) {
      setActiveIndex(normalized);
      setCompare(50);
      return;
    }
    transitioning.current = true;
    gsap.timeline({
      onComplete: () => { transitioning.current = false; },
    })
      .to(transition.current, { scaleX: 1, transformOrigin: "left", duration: 0.38, ease: "power3.inOut" })
      .to(stage.current, { scale: 1.025, duration: 0.38, ease: "power2.in" }, 0)
      .add(() => { setActiveIndex(normalized); setCompare(50); })
      .set(stage.current, { scale: 0.985 })
      .to(transition.current, { scaleX: 0, transformOrigin: "right", duration: 0.46, ease: "expo.inOut" })
      .to(stage.current, { scale: 1, duration: 0.58, ease: "power3.out" }, "<");
  };

  const selectCategory = (nextCategory: CategoryFilter) => {
    if (nextCategory === category) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = () => { setCategory(nextCategory); setActiveIndex(0); setCompare(50); };
    if (reduced || !transition.current) return apply();
    transitioning.current = true;
    gsap.timeline({ onComplete: () => { transitioning.current = false; } })
      .to(transition.current, { scaleX: 1, transformOrigin: "left", duration: 0.38, ease: "power3.inOut" })
      .add(apply)
      .to(transition.current, { scaleX: 0, transformOrigin: "right", duration: 0.46, ease: "expo.inOut" });
  };

  const onStageKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") commitIndex(activeIndex + 1);
    else if (event.key === "ArrowLeft") commitIndex(activeIndex - 1);
    else if (event.key === "Home") commitIndex(0);
    else if (event.key === "End") commitIndex(items.length - 1);
    else return;
    event.preventDefault();
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !rail.current) return;
    dragging.current = { active: true, startX: event.clientX, scrollLeft: rail.current.scrollLeft, moved: false };
    rail.current.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current.active || !rail.current) return;
    const delta = event.clientX - dragging.current.startX;
    if (Math.abs(delta) > 5) dragging.current.moved = true;
    rail.current.scrollLeft = dragging.current.scrollLeft - delta;
  };
  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current.active = false;
    if (rail.current?.hasPointerCapture(event.pointerId)) rail.current.releasePointerCapture(event.pointerId);
  };

  const currentNumber = String(activeIndex + 1).padStart(2, "0");
  const total = String(items.length).padStart(2, "0");

  return (
    <section id="projects" ref={section} className="portfolio-exhibition" aria-labelledby="portfolio-title">
      <div className="site-container portfolio-intro">
        <span>03 / Selected visualizations</span>
        <h2 id="portfolio-title">Spaces imagined<br /><em>in detail.</em></h2>
        <p>Move through a curated field of interiors, hospitality spaces, exteriors and architectural thresholds.</p>
      </div>

      <div className="portfolio-category-wrap">
        <div className="site-container portfolio-categories" role="toolbar" aria-label="Filter portfolio">
          {categories.map((item) => (
            <button key={item.id} type="button" className={category === item.id ? "is-active" : ""} aria-pressed={category === item.id} onClick={() => selectCategory(item.id)}>
              {item.label}<span>{item.id === "all" ? portfolioItems.length : portfolioItems.filter((work) => work.category === item.id).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-stage-shell">
        <div
          ref={stage}
          className={`portfolio-stage portfolio-stage--${presentation(active)}`}
          tabIndex={0}
          role="region"
          aria-roledescription="portfolio viewer"
          aria-label={`${active.title}, item ${activeIndex + 1} of ${items.length}`}
          onKeyDown={onStageKeyDown}
        >
          <div className="portfolio-stage__visual">
            {isExteriorPair ? (
              <div className="day-night-comparison">
                <Image src="/images/exterior-webp/Night View_02.webp" alt="Night architectural visualization of an illuminated high-rise tower within a city skyline" fill sizes="(max-width: 899px) 100vw, 76vw" quality={92} priority draggable={false} />
                <div className="day-night-comparison__day" style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}>
                  <Image src="/images/exterior-webp/Day View_03.webp" alt="Daytime architectural visualization of a high-rise tower with a glazed facade and landscaped urban setting" fill sizes="(max-width: 899px) 100vw, 76vw" quality={92} priority draggable={false} />
                </div>
                <span className="day-night-label day-night-label--day">Day</span><span className="day-night-label day-night-label--night">Night</span>
                <div className="day-night-handle" style={{ left: `${compare}%` }} aria-hidden="true"><i /></div>
                <input type="range" min="8" max="92" value={compare} onChange={(event) => setCompare(Number(event.target.value))} aria-label="Compare daytime and nighttime exterior visualizations" />
              </div>
            ) : (
              <Image key={active.id} src={active.image} alt={active.alt} fill sizes="(max-width: 899px) 100vw, 76vw" quality={92} priority={activeIndex < 2} draggable={false} />
            )}
            <div ref={transition} className="portfolio-stage__transition" aria-hidden="true" />
            <span className="portfolio-stage__large-index" aria-hidden="true">{currentNumber}</span>
          </div>

          <aside className="portfolio-metadata" aria-live="polite">
            <div className="portfolio-progress"><span>{currentNumber}</span><i /><span>{total}</span></div>
            <div><span>{categoryLabel(active.category)}</span><h3>{active.title}</h3><p>{active.descriptor}</p></div>
            {isExteriorPair && <p className="portfolio-comparison-note">Drag the line to move between daylight and night atmosphere.</p>}
            <div className="portfolio-controls">
              <button type="button" onClick={() => commitIndex(activeIndex - 1)} aria-label="Previous visualization">←</button>
              <button type="button" onClick={() => commitIndex(activeIndex + 1)} aria-label="Next visualization">→</button>
            </div>
          </aside>
        </div>
      </div>

      <div className="portfolio-rail-wrap">
        <div
          ref={rail}
          className={`portfolio-rail${dragging.current.active ? " is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          aria-label="Portfolio image rail"
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-portfolio-index={index}
              className={activeIndex === index ? "is-active" : ""}
              onClick={() => { if (!dragging.current.moved) commitIndex(index); dragging.current.moved = false; }}
              aria-label={`Show ${item.title}`}
              aria-current={activeIndex === index ? "true" : undefined}
            >
              <Image src={item.image} alt="" fill sizes="(max-width: 767px) 62vw, 22vw" loading={Math.abs(index - activeIndex) <= 1 ? "eager" : "lazy"} draggable={false} />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-exit">
        <div className="site-container portfolio-exit__inner"><span>Next perspective</span><p>Behind<br />the <em>visuals.</em></p><span>Founder intentionally follows in a later phase</span></div>
      </div>
    </section>
  );
}
