"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GoogleReview, ReviewsResult } from "@/lib/google-places";

gsap.registerPlugin(ScrollTrigger);

export function ReviewsSection({ result }: { result: ReviewsResult }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!section.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 74%", once: true }, defaults: { ease: "power3.out" } })
        .from(".reviews__summary > *", { y: 18, opacity: 0, stagger: 0.06, duration: 0.6 })
        .from(".reviews__stage", { y: 18, opacity: 0, duration: 0.64 }, "-=0.34");
    }, section);
    return () => context.revert();
  }, []);

  const hasPlace = result.status === "ready" || result.status === "empty";

  return (
    <section id="reviews" ref={section} className="section section--night reviews" aria-labelledby="reviews-title">
      <div className="site-container">
        <i className="section-rule" aria-hidden="true" />

        <header className="section-head reviews__head">
          <p className="kicker">06 — Shared experiences</p>
          <h2 id="reviews-title" className="title section-head__title">
            Trust, in <em>their words.</em>
          </h2>
          <p className="support section-head__support">
            Reviews are published exactly as they appear on Google Maps.
          </p>
        </header>

        <div className="reviews__layout">
          <aside className="reviews__summary">
            {hasPlace && typeof result.rating === "number" && (
              <div className="rating-summary">
                <strong>{result.rating.toFixed(1)}</strong>
                <div>
                  <span aria-label={`${result.rating} out of 5 stars`}>
                    {"★".repeat(Math.round(result.rating))}{"☆".repeat(5 - Math.round(result.rating))}
                  </span>
                  <p>{result.reviewCount ? `${result.reviewCount} Google reviews` : "Google reviews"}</p>
                </div>
              </div>
            )}
            {hasPlace && (
              <div className="google-attribution">
                <img
                  src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  alt="Google"
                  referrerPolicy="no-referrer"
                />
                <span>Maps</span>
                <a href={result.googleMapsUri} target="_blank" rel="noreferrer">View Namo Decor on Google Maps ↗</a>
              </div>
            )}
          </aside>

          <div className="reviews__stage">
            {result.status === "ready" && (
              <>
                <ReviewsCarousel reviews={result.reviews} />
                <p className="reviews__disclosure">
                  Reviews are supplied by Google Maps and shown in Google&apos;s default relevance order. Google does not
                  verify reviews, but checks for and removes fake content when identified.
                </p>
              </>
            )}
            {result.status === "unconfigured" && (
              <ReviewNotice
                eyebrow="Google connection pending"
                title="Real reviews will appear once Google Places is connected."
                copy="No sample testimonials are shown—this space is reserved for verified customer experiences."
              />
            )}
            {result.status === "error" && (
              <ReviewNotice
                eyebrow="Temporarily unavailable"
                title="Google reviews could not be loaded just now."
                copy="The rest of the Namo Decor experience remains available while the connection recovers."
              />
            )}
            {result.status === "empty" && (
              <ReviewNotice
                eyebrow="Google Reviews"
                title="There are no reviews available to display yet."
                copy="Namo Decor never substitutes fictional testimonials for live customer feedback."
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsCarousel({ reviews }: { reviews: GoogleReview[] }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const touchStart = useRef<number | null>(null);
  const move = (direction: number) => {
    setExpanded(false);
    setActive((current) => (current + direction + reviews.length) % reviews.length);
  };
  const review = reviews[active];

  return (
    <div
      className="reviews-carousel"
      aria-roledescription="carousel"
      aria-label="Google reviews"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        else if (event.key === "ArrowRight") move(1);
        else if (event.key === "Home") setActive(0);
        else if (event.key === "End") setActive(reviews.length - 1);
        else return;
        event.preventDefault();
      }}
    >
      <div
        className="review-active"
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const delta = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1);
          touchStart.current = null;
        }}
      >
        <ReviewAuthor review={review} />
        <blockquote className={expanded ? "is-expanded" : ""}>“{review.text}”</blockquote>
        {review.text.length > 280 && (
          <button className="review-read-more" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
        <a className="review-source" href={review.googleMapsUri} target="_blank" rel="noreferrer">View this review on Google Maps ↗</a>
      </div>

      <div className="review-controls">
        <span><strong>{String(active + 1).padStart(2, "0")}</strong> / {String(reviews.length).padStart(2, "0")}</span>
        <i><b style={{ width: `${((active + 1) / reviews.length) * 100}%` }} /></i>
        <div>
          <button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Previous review">←</button>
          <button className="icon-button" type="button" onClick={() => move(1)} aria-label="Next review">→</button>
        </div>
      </div>
    </div>
  );
}

function ReviewAuthor({ review }: { review: GoogleReview }) {
  const content = (
    <>
      {review.profilePhotoUrl
        ? <img src={review.profilePhotoUrl} alt="" referrerPolicy="no-referrer" />
        : <span aria-hidden="true">{review.authorName.slice(0, 1)}</span>}
      <div>
        <strong>{review.authorName}</strong>
        <p>
          <span aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.round(review.rating))}</span>
          {review.relativeTime && <> · {review.relativeTime}</>}
        </p>
      </div>
    </>
  );
  return review.authorUri
    ? <a className="review-author" href={review.authorUri} target="_blank" rel="noreferrer">{content}</a>
    : <div className="review-author">{content}</div>;
}

function ReviewNotice({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="review-notice">
      <span>{eyebrow}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      <div aria-hidden="true"><i /><i /><i /></div>
    </div>
  );
}

export function ReviewsSkeleton() {
  return (
    <section id="reviews" className="section section--night reviews" aria-label="Loading Google reviews" aria-busy="true">
      <div className="site-container">
        <div className="reviews__layout">
          <div className="reviews-skeleton reviews-skeleton--summary" />
          <div className="reviews-skeleton reviews-skeleton--stage" />
        </div>
      </div>
    </section>
  );
}
