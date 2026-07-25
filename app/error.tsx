"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("application_route_error", {
      digest: error.digest,
      message: error.message,
    });
  }, [error]);

  return (
    <main className="error-status-page" role="alert">
      <p>Something interrupted this page</p>
      <h1>
        <span>The experience could not</span>
        <span>be loaded just now.</span>
      </h1>
      <p>
        Try the page again. If the interruption continues, return home or
        contact Luxe directly about your event.
      </p>
      <div>
        <button type="button" onClick={reset}>Try Again</button>
        <Link href="/">Return Home</Link>
        <Link href="/inquire">Contact Luxe</Link>
      </div>
    </main>
  );
}
