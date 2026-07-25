"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { homeHeroMedia, homeHeroTimeline } from "../home-hero-media";
import { CredibilityStrip } from "./signature-elements";

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
};

export function HomeHero() {
  const [phase, setPhase] = useState(0);
  const [sequenceSkipped, setSequenceSkipped] = useState(false);
  const [failedMedia, setFailedMedia] = useState<Set<string>>(() => new Set());
  const timers = useRef<number[]>([]);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const finalPhase = homeHeroTimeline.finalPhaseIndex;
  const finalState = phase === finalPhase;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as NavigatorWithConnection).connection;
    const saveData = connection?.saveData === true;
    const constrainedNetwork =
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (reducedMotion || saveData || constrainedNetwork) {
      const fallbackTimer = window.setTimeout(() => {
        setSequenceSkipped(true);
        setPhase(finalPhase);
      }, 0);

      return () => window.clearTimeout(fallbackTimer);
    }

    timers.current = homeHeroTimeline.phaseStartsMs.slice(1).map((start, index) =>
      window.setTimeout(() => setPhase(index + 1), start),
    );

    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [finalPhase]);

  useEffect(() => {
    videos.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (index === phase) {
        void video.play().catch(() => {
          setFailedMedia((current) => new Set(current).add(homeHeroMedia[index].id));
        });
      } else {
        video.pause();
      }
    });
  }, [phase]);

  function skipIntro() {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setSequenceSkipped(true);
    setPhase(finalPhase);
  }

  function markMediaFailed(id: string) {
    setFailedMedia((current) => new Set(current).add(id));
  }

  return (
    <section
      className="home-hero home-cinematic-hero"
      aria-labelledby="home-title"
      data-phase={homeHeroMedia[phase].id}
      data-sequence-skipped={sequenceSkipped ? "true" : "false"}
    >
      <p className="home-cinematic-media-alternative">
        Luxe Event Co. brings together crafted coffee service, a live dessert
        experience, and considered seating and event rentals. The muted hero films
        provide atmosphere only; this page contains the complete service information.
      </p>
      <div className="home-cinematic-stage">
        <div className="home-cinematic-media-grid" aria-hidden="true">
          {homeHeroMedia.map((media, index) => {
            const hasVideo = media.sources.length > 0 && !failedMedia.has(media.id);
            const active = index === phase;

            return (
              <div
                className={`home-cinematic-panel home-cinematic-panel-${media.id}${
                  active ? " is-active" : ""
                }`}
                data-placement={media.placement}
                key={media.id}
              >
                <div className="home-cinematic-placeholder">
                  {media.label ? <span>{media.label}</span> : null}
                  {media.id === "together" ? <small>Cohesive film</small> : null}
                  <i />
                  <i />
                  <i />
                </div>
                {hasVideo ? (
                  <video
                    ref={(node) => {
                      videos.current[index] = node;
                    }}
                    muted
                    loop
                    playsInline
                    preload={index === 0 ? "metadata" : "none"}
                    poster={media.poster ?? undefined}
                    onError={() => markMediaFailed(media.id)}
                  >
                    {media.sources.map((source) => (
                      <source src={source.src} type={source.type} key={source.src} />
                    ))}
                  </video>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="home-cinematic-copy">
          <p className="foundation-label">Luxe Event Co. / Toronto &amp; the GTA</p>
          <h1 id="home-title" aria-label="Luxury events, gathered.">
            <span className="home-cinematic-title-accessible">Luxury events, gathered.</span>
            {homeHeroMedia.slice(0, 3).map((media, index) => (
              <span
                className={`home-cinematic-word home-cinematic-word-${media.id}${
                  phase >= index ? " is-visible" : ""
                }`}
                aria-hidden="true"
                key={media.id}
              >
                {media.word}
              </span>
            ))}
          </h1>
          <p
            className={`home-cinematic-description${finalState ? " is-visible" : ""}`}
            aria-hidden={finalState ? undefined : "true"}
          >
            Mobile coffee, live dessert, and event rentals brought together through
            one planning and inquiry journey.
          </p>
        </div>

        <div
          className={`home-hero-actions home-cinematic-actions${
            finalState ? " is-visible" : ""
          }`}
          aria-hidden={finalState ? undefined : "true"}
        >
          <Link
            href="/inquire"
            className="home-button home-button-primary"
            data-event-name="inquiry_start"
            tabIndex={finalState ? 0 : -1}
          >
            Plan Your Event
            <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href="/experiences"
            className="home-button home-button-secondary"
            data-event-name="experience_select"
            tabIndex={finalState ? 0 : -1}
          >
            Explore Experiences
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {!finalState ? (
          <button className="home-cinematic-skip" type="button" onClick={skipIntro}>
            Skip intro
          </button>
        ) : null}
      </div>

      <CredibilityStrip variant="hero" />
    </section>
  );
}
