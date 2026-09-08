"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
import { Wordmark } from "@/components/ui/wordmark";
import { ArrowLink } from "@/components/ui/arrow-link";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wasOpen = useRef(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const page = document.querySelector("main");
    const footer = document.querySelector("footer");
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      wasOpen.current = true;
      document.body.style.overflow = "hidden";
      page?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      closeButton.current?.focus({ preventScroll: true });
    } else {
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      if (wasOpen.current) {
        openButton.current?.focus({ preventScroll: true });
        wasOpen.current = false;
      }
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!menuOpen) return;
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menu.current) return;

      const focusable = Array.from(
        menu.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="site-container site-header__inner">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => <a className="nav-link" href={item.href} key={item.label}>{item.label}</a>)}
          </nav>
          <div className="desktop-cta"><ArrowLink href="#contact">Start a Project</ArrowLink></div>
          <button
            ref={openButton}
            className="menu-trigger"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span>Menu</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>
          </button>
        </div>
      </header>

      <div
        ref={menu}
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="site-container mobile-menu__inner">
          <div className="mobile-menu__header">
            <Wordmark onClick={closeMenu} />
            <button
              ref={closeButton}
              className="menu-trigger menu-trigger--light"
              type="button"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              aria-label="Close navigation menu"
            >
              <span>Close</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <a className="mobile-nav-link" href={item.href} key={item.label} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                <span>0{index + 1}</span>{item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <p>3D visualization and end-to-end design support for the people shaping spaces.</p>
            <ArrowLink href="#contact" variant="line" onClick={closeMenu}>Start a Project</ArrowLink>
          </div>
        </div>
      </div>
    </>
  );
}
