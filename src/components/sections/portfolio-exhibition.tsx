"use client";

import Image from "next/image";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/data/portfolio";
import { refreshAfterLayoutSettles } from "@/lib/scroll-trigger-refresh";

gsap.registerPlugin(ScrollTrigger);

type CategoryFilter = "all" | PortfolioCategory;
type ImageVariables = CSSProperties & {
  "--asset-position": string;
  "--asset-mobile-position": string;
  "--asset-ratio": string;
};

const categories: ReadonlyArray<{ id: CategoryFilter; label: string }> = [
  { id: "all", label: "All visuals" },
  ...portfolioCategories,
];

const featuredIds = new Set([
  "tailored-bedroom",
  "indoor-outdoor-lounge",
  "lift-lobby",
  "high-rise-exterior-day",
  "childrens-bedroom",
]);

const featuredItems = [
  "tailored-bedroom",
  "indoor-outdoor-lounge",
  "lift-lobby",
  "high-rise-exterior-day",
  "childrens-bedroom",
].map((id) => portfolioItems.find((item) => item.id === id)!).filter(Boolean);

const archiveItems = portfolioItems.filter((item) => !featuredIds.has(item.id));

const categoryLabel = (category: PortfolioCategory) =>
  portfolioCategories.find((item) => item.id === category)?.label ?? category;

const imageVariables = (item: PortfolioItem): ImageVariables => ({
  "--asset-position": item.crop.desktop.objectPosition,
  "--asset-mobile-position": item.crop.mobile.objectPosition,
  "--asset-ratio": `${item.width} / ${item.height}`,
});

function WorkCard({
  item,
  variant,
  onOpen,
}: {
  item: PortfolioItem;
  variant: "lead" | "paired" | "closing";
  onOpen: (item: PortfolioItem, trigger: HTMLElement) => void;
}) {
  return (
    <article className={`portfolio-feature-card portfolio-feature-card--${variant}`} style={imageVariables(item)}>
      <button type="button" className="portfolio-feature-card__image" onClick={(event) => onOpen(item, event.currentTarget)}>
        <span className="portfolio-feature-card__media">
          <span className="portfolio-feature-card__entrance">
            <Image src={item.image} alt={item.alt} fill sizes={variant === "paired" ? "(max-width: 767px) 100vw, 45vw" : "(max-width: 767px) 100vw, 82vw"} />
          </span>
        </span>
        <span className="portfolio-feature-card__view">View image <i aria-hidden="true">↗</i></span>
      </button>
      <div className="portfolio-feature-card__caption">
        <p>{categoryLabel(item.category)}</p>
        <h3>{item.title}</h3>
        <span>{item.descriptor}</span>
      </div>
    </article>
  );
}

function PortfolioViewer({
  index,
  onClose,
  onChange,
}: {
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const imageFrame = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const item = portfolioItems[index];

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf([overlay.current, imageFrame.current]);
    if (reduced) {
      onClose();
      return;
    }
    gsap.timeline({ onComplete: onClose })
      .to(imageFrame.current, { opacity: 0, scale: 0.992, duration: 0.14, ease: "power2.in" }, 0)
      .to(overlay.current, { opacity: 0, duration: 0.18, ease: "power1.out" }, 0.02);
  }, [onClose]);

  useEffect(() => {
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    header?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    closeButton.current?.focus({ preventScroll: true });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.timeline()
        .fromTo(overlay.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" })
        .fromTo(imageFrame.current, { opacity: 0, scale: 0.985 }, { opacity: 1, scale: 1, duration: 0.28, ease: "power3.out" }, 0.06);
    }

    return () => {
      gsap.killTweensOf([overlay.current, imageFrame.current]);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      header?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, []);

  useEffect(() => {
    if (!imageFrame.current || closing.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.killTweensOf(imageFrame.current);
    gsap.fromTo(imageFrame.current, { opacity: 0.72, scale: 0.995 }, { opacity: 1, scale: 1, duration: 0.22, ease: "power2.out", overwrite: true });
  }, [index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
      else if (event.key === "ArrowRight") onChange((index + 1) % portfolioItems.length);
      else if (event.key === "ArrowLeft") onChange((index - 1 + portfolioItems.length) % portfolioItems.length);
      else if (event.key === "Tab" && dialog.current) {
        const focusable = Array.from(dialog.current.querySelectorAll<HTMLElement>("button:not([disabled]), [href], [tabindex='0']"));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index, onChange, requestClose]);

  return createPortal(
    <div ref={overlay} className="portfolio-viewer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) requestClose(); }}>
      <div ref={dialog} className="portfolio-viewer__dialog" role="dialog" aria-modal="true" aria-labelledby="portfolio-viewer-title">
        <div className="portfolio-viewer__topbar">
          <p><span>{categoryLabel(item.category)}</span><strong id="portfolio-viewer-title">{item.title}</strong></p>
          <button ref={closeButton} type="button" onClick={requestClose} aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button>
        </div>
        <div ref={imageFrame} className="portfolio-viewer__image">
          <Image key={item.id} src={item.image} alt={item.alt} fill sizes="100vw" quality={92} />
        </div>
        <div className="portfolio-viewer__footer">
          <p>{item.descriptor}</p>
          <span>{String(index + 1).padStart(2, "0")} / {String(portfolioItems.length).padStart(2, "0")}</span>
          <div>
            <button type="button" onClick={() => onChange((index - 1 + portfolioItems.length) % portfolioItems.length)} aria-label="Previous image">←</button>
            <button type="button" onClick={() => onChange((index + 1) % portfolioItems.length)} aria-label="Next image">→</button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function PortfolioExhibition() {
  const section = useRef<HTMLElement>(null);
  const viewerTrigger = useRef<HTMLElement | null>(null);
  const archive = useRef<HTMLDivElement>(null);
  const archiveGrid = useRef<HTMLDivElement>(null);
  const compareTween = useRef<gsap.core.Tween | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [archiveMounted, setArchiveMounted] = useState(false);
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [renderedArchive, setRenderedArchive] = useState(archiveItems);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [compare, setCompare] = useState(50);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => () => { compareTween.current?.kill(); }, []);

  useEffect(() => {
    if (!archiveMounted || !archive.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }
    gsap.fromTo(archive.current, { opacity: 0, y: 8 }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => ScrollTrigger.refresh(),
    });
    return () => { if (archive.current) gsap.killTweensOf(archive.current); };
  }, [archiveMounted]);

  useEffect(() => {
    if (!section.current) return;
    const sectionElement = section.current;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          depth: "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 900px)",
        },
        ({ conditions }) => {
          if (!conditions?.motion) return;

          gsap.timeline({
            scrollTrigger: { trigger: ".portfolio-intro", start: "top 80%", once: true },
            defaults: { ease: "power3.out" },
          })
            .from(".portfolio-intro > span", { y: 12, opacity: 0, duration: 0.52 })
            .from(".portfolio-intro h2", { y: 24, opacity: 0, duration: 0.72 }, "-=0.32")
            .from(".portfolio-intro > p", { y: 14, opacity: 0, duration: 0.58 }, "-=0.42");

          gsap.timeline({
            scrollTrigger: { trigger: ".portfolio-feature-card--lead", start: "top 82%", once: true },
            defaults: { ease: "power3.out" },
          })
            .from(".portfolio-feature-card--lead .portfolio-feature-card__image", { clipPath: "inset(4% 4% 4% 4%)", duration: 1.05, ease: "power2.inOut" })
            .from(".portfolio-feature-card--lead .portfolio-feature-card__entrance", { scale: 1.045, duration: 1.08 }, 0)
            .from(".portfolio-feature-card--lead .portfolio-feature-card__caption", { y: 16, opacity: 0, duration: 0.58 }, "-=0.42");

          gsap.timeline({
            scrollTrigger: { trigger: ".portfolio-feature-pair", start: "top 82%", once: true },
            defaults: { ease: "power3.out" },
          })
            .from(".portfolio-feature-pair .portfolio-feature-card__image", { clipPath: "inset(3% 3% 3% 3%)", duration: 0.88, stagger: 0.1, ease: "power2.inOut" })
            .from(".portfolio-feature-pair .portfolio-feature-card__entrance", { scale: 1.035, duration: 0.9, stagger: 0.1 }, 0)
            .from(".portfolio-feature-pair .portfolio-feature-card__caption", { y: 13, opacity: 0, duration: 0.55, stagger: 0.1 }, "-=0.5");

          gsap.from(".portfolio-feature-card--exterior", {
            y: 18,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: ".portfolio-feature-card--exterior", start: "top 84%", once: true },
          });
          gsap.from(".portfolio-feature-card--closing", {
            y: 14,
            opacity: 0,
            duration: 0.68,
            ease: "power3.out",
            scrollTrigger: { trigger: ".portfolio-feature-card--closing", start: "top 84%", once: true },
          });

          gsap.timeline({
            scrollTrigger: { trigger: ".portfolio-exit", start: "top 88%", once: true },
            defaults: { ease: "power3.out" },
          })
            .from(".portfolio-exit__rule", { scaleX: 0, duration: 0.72, ease: "power2.inOut" })
            .from(".portfolio-exit p", { y: 14, opacity: 0, duration: 0.62 }, "-=0.42")
            .from(".portfolio-exit__inner > span", { opacity: 0, duration: 0.4, stagger: 0.07 }, "-=0.34");

          if (conditions.depth) {
            gsap.fromTo(
              ".portfolio-feature-card--lead .portfolio-feature-card__media",
              { y: -16 },
              {
                y: 20,
                ease: "none",
                scrollTrigger: {
                  trigger: ".portfolio-feature-card--lead",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.75,
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

  const openViewer = (item: PortfolioItem, trigger: HTMLElement) => {
    viewerTrigger.current = trigger;
    setViewerIndex(portfolioItems.findIndex((candidate) => candidate.id === item.id));
  };

  const closeViewer = useCallback(() => {
    setViewerIndex(null);
    requestAnimationFrame(() => viewerTrigger.current?.focus({ preventScroll: true }));
  }, []);

  const setComparison = (value: number) => {
    compareTween.current?.kill();
    setCompare(value);
  };

  const animateComparison = (target: number) => {
    compareTween.current?.kill();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCompare(target);
      return;
    }
    const value = { current: compare };
    compareTween.current = gsap.to(value, {
      current: target,
      duration: 0.38,
      ease: "power2.inOut",
      overwrite: true,
      onUpdate: () => setCompare(Math.round(value.current * 10) / 10),
    });
  };

  const toggleArchive = () => {
    if (!expanded) {
      setArchiveMounted(true);
      setExpanded(true);
      return;
    }
    setExpanded(false);
    const element = archive.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setArchiveMounted(false);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }
    gsap.killTweensOf(element);
    gsap.to(element, {
      opacity: 0,
      y: -6,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setArchiveMounted(false);
        requestAnimationFrame(() => ScrollTrigger.refresh());
      },
    });
  };

  const selectCategory = (next: CategoryFilter) => {
    if (next === category) return;
    const nextItems = next === "all" ? archiveItems : archiveItems.filter((item) => item.category === next);
    const grid = archiveGrid.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const commit = () => {
      setCategory(next);
      setRenderedArchive(nextItems);
      requestAnimationFrame(() => {
        const cards = archiveGrid.current?.children;
        if (cards && !reduced) {
          gsap.fromTo(cards, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.26, stagger: 0.025, ease: "power2.out", overwrite: true, onComplete: () => ScrollTrigger.refresh() });
        } else {
          ScrollTrigger.refresh();
        }
      });
    };
    if (!grid || reduced) {
      commit();
      return;
    }
    gsap.killTweensOf(grid.children);
    gsap.to(grid.children, { opacity: 0, y: -5, duration: 0.16, stagger: 0.015, ease: "power1.in", overwrite: true, onComplete: commit });
  };

  const dayItem = featuredItems[3];
  const nightItem = portfolioItems.find((item) => item.id === "high-rise-exterior-night")!;

  return (
    <section id="projects" ref={section} className="portfolio-exhibition" aria-labelledby="portfolio-title">
      <div className="site-container portfolio-intro">
        <span>02 / Selected work</span>
        <h2 id="portfolio-title">A concise edit of<br /><em>spaces made visible.</em></h2>
        <p>Five compositions spanning residential, hospitality, exterior and lobby visualization.</p>
      </div>

      <div className="site-container portfolio-feature-grid">
        <WorkCard item={featuredItems[0]} variant="lead" onOpen={openViewer} />
        <div className="portfolio-feature-pair">
          <WorkCard item={featuredItems[1]} variant="paired" onOpen={openViewer} />
          <WorkCard item={featuredItems[2]} variant="paired" onOpen={openViewer} />
        </div>

        <article className="portfolio-feature-card portfolio-feature-card--exterior">
          <div className="portfolio-comparison">
            <Image src={nightItem.image} alt={nightItem.alt} fill sizes="(max-width: 767px) 100vw, 62vw" />
            <div className="portfolio-comparison__day" style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}>
              <Image src={dayItem.image} alt={dayItem.alt} fill sizes="(max-width: 767px) 100vw, 62vw" />
            </div>
            <span className="portfolio-comparison__label portfolio-comparison__label--day">Day</span>
            <span className="portfolio-comparison__label portfolio-comparison__label--night">Night</span>
            <span className="portfolio-comparison__line" style={{ left: `${compare}%` }} aria-hidden="true" />
            <input type="range" min="0" max="100" value={compare} onPointerDown={() => compareTween.current?.kill()} onChange={(event) => setComparison(Number(event.target.value))} aria-label="Compare day and night views of the same exterior" aria-valuetext={`${Math.round(compare)}% day, ${Math.round(100 - compare)}% night`} />
          </div>
          <div className="portfolio-comparison__caption">
            <div><p>{categoryLabel(dayItem.category)}</p><h3>High-Rise Exterior — Day / Night</h3><span>One exterior composition shown across two lighting conditions.</span></div>
            <div className="portfolio-comparison__controls" aria-label="Comparison controls">
              <button type="button" aria-pressed={compare === 100} onClick={() => animateComparison(100)}>Show day</button>
              <button type="button" aria-pressed={compare === 0} onClick={() => animateComparison(0)}>Show night</button>
              <button type="button" onClick={(event) => openViewer(compare >= 50 ? dayItem : nightItem, event.currentTarget)}>Open full view</button>
            </div>
          </div>
        </article>

        <WorkCard item={featuredItems[4]} variant="closing" onOpen={openViewer} />
      </div>

      <div className="site-container portfolio-archive-entry">
        <div><span>Wider archive</span><p>{archiveItems.length} additional visual studies spanning residential, hospitality, exterior and lobby work.</p></div>
        <button type="button" onClick={toggleArchive} aria-expanded={expanded} aria-controls="portfolio-archive">
          {expanded ? "Close archive" : "View all visuals"}<span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      </div>

      {archiveMounted && (
        <div ref={archive} id="portfolio-archive" className={`portfolio-archive${expanded ? " is-expanded" : ""}`} aria-hidden={!expanded} inert={!expanded}>
          <div className="site-container portfolio-categories" role="toolbar" aria-label="Filter wider archive">
            {categories.map((item) => {
              const count = item.id === "all" ? archiveItems.length : archiveItems.filter((work) => work.category === item.id).length;
              return (
                <button key={item.id} type="button" className={category === item.id ? "is-active" : ""} aria-pressed={category === item.id} onClick={() => selectCategory(item.id)}>
                  {item.label}<span>{count}</span>
                </button>
              );
            })}
          </div>
          <div ref={archiveGrid} className="site-container portfolio-archive-grid">
            {renderedArchive.map((item) => (
              <article key={item.id} className="portfolio-archive-card" style={imageVariables(item)}>
                <button type="button" className="portfolio-archive-card__image" onClick={(event) => openViewer(item, event.currentTarget)} aria-label={`Open ${item.title}`}>
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                </button>
                <div><p>{categoryLabel(item.category)}</p><h3>{item.title}</h3></div>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="portfolio-exit">
        <div className="site-container portfolio-exit__inner">
          <i className="portfolio-exit__rule" aria-hidden="true" />
          <span>Next / Capabilities</span><p>From image to <em>support.</em></p><span>Six ways to make design visible</span>
        </div>
      </div>

      {mounted && viewerIndex !== null && (
        <PortfolioViewer index={viewerIndex} onClose={closeViewer} onChange={setViewerIndex} />
      )}
    </section>
  );
}
