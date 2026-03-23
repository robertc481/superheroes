import Link from "next/link";
import type { ReactElement } from "react";

export default function NotFound(): ReactElement {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-hero-primary/20 bg-white p-10 text-center dark:bg-hero-dark">
      <h1 className="font-heading text-2xl font-bold text-hero-primary dark:text-hero-light">
        Page not found
      </h1>
      <p className="mt-3 font-body text-hero-primary/80 dark:text-hero-light/80">
        This URL does not match any route in the app.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-hero-primary px-4 py-2 text-sm font-medium text-white hover:bg-hero-secondary"
      >
        Back to roster
      </Link>
    </div>
  );
}
