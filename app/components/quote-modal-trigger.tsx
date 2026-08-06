"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type QuoteModalTriggerProps = {
  children: React.ReactNode;
  className?: string;
  "data-event-name"?: string;
};

export function QuoteModalTrigger({
  children,
  className,
  "data-event-name": dataEventName = "inquiry_start",
}: QuoteModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `quote-modal-title-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <a
        href="/contact"
        className={className}
        data-event-name={dataEventName}
        aria-haspopup="dialog"
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open
        ? createPortal(
            <dialog
              className="home-quote-modal"
              ref={dialogRef}
              aria-labelledby={titleId}
              onClose={() => setOpen(false)}
              onClick={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <div className="home-quote-modal-inner">
                <button
                  className="home-quote-modal-close"
                  type="button"
                  aria-label="Close quote form placeholder"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
                <p className="foundation-label">Plan your event</p>
                <h2 id={titleId}>Your quote will begin here.</h2>
                <p>
                  This popup will contain the Flashquotes quote form, or a similar quote
                  platform, once the final provider is selected and connected.
                </p>
                <div className="home-quote-modal-placeholder">
                  <span aria-hidden="true">↗︎</span>
                  <strong>Quote form integration placeholder</strong>
                  <small>No information is collected or submitted yet.</small>
                </div>
              </div>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}
