import type { ReactElement } from "react";

export function EmptyState({ message }: { message: string }): ReactElement {
  return (
    <div
      className="rounded-xl border border-dashed border-hero-primary/30 bg-hero-light/40 p-10 text-center text-hero-primary dark:border-hero-light/20 dark:bg-hero-dark/60 dark:text-hero-light"
      role="status"
    >
      <p className="font-body text-base">{message}</p>
    </div>
  );
}
