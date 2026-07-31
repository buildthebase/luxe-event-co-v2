"use client";

import { useEffect, useRef } from "react";
import { homeTestimonialPlaceholders } from "../home-content";

export function HomeTestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  function move(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const itemsPerView = window.matchMedia("(min-width: 961px)").matches ? 2 : 1;
    const pageCount = Math.ceil(homeTestimonialPlaceholders.length / itemsPerView);
    const currentPage = Math.round(track.scrollLeft / track.clientWidth);
    const nextPage = (currentPage + direction + pageCount) % pageCount;

    track.scrollTo({
      behavior: "smooth",
      left: nextPage * track.clientWidth,
    });
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!pausedRef.current) {
        move(1);
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="home-testimonial-carousel"
      aria-label="Sample testimonial carousel"
      data-content-status="placeholder"
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onPointerDown={() => {
        pausedRef.current = true;
      }}
      onPointerUp={() => {
        pausedRef.current = false;
      }}
    >
      <header>
        <span>Client words / placeholder</span>
        <div aria-label="Testimonial controls" role="group">
          <button
            aria-label="Previous sample testimonial"
            onClick={() => move(-1)}
            type="button"
          >
            ‹
          </button>
          <button
            aria-label="Next sample testimonial"
            onClick={() => move(1)}
            type="button"
          >
            ›
          </button>
        </div>
      </header>
      <div className="home-testimonial-track" ref={trackRef}>
        {homeTestimonialPlaceholders.map((testimonial, index) => (
          <blockquote key={testimonial.context}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>“{testimonial.quote}”</p>
            <footer>Sample — {testimonial.context}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
