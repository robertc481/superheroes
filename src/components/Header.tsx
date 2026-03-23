"use client";

import { DarkModeToggle } from "@/components/DarkModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

export function Header(): ReactElement {
  const pathname = usePathname();

  return (
    <header className="border-b border-hero-primary/20 bg-hero-primary text-white shadow-md dark:border-hero-light/10 dark:bg-hero-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-white hover:text-hero-accent"
        >
          Superhero Roster
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium hover:text-hero-accent ${
              pathname === "/"
                ? "text-hero-accent underline underline-offset-4"
                : "text-white/90"
            }`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className={`text-sm font-medium hover:text-hero-accent ${
              pathname === "/favorites"
                ? "text-hero-accent underline underline-offset-4"
                : "text-white/90"
            }`}
            aria-current={pathname === "/favorites" ? "page" : undefined}
          >
            Favorites
          </Link>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}
