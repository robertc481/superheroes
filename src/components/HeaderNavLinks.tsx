"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

export function HeaderNavLinks(): ReactElement {
  const pathname = usePathname();

  return (
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
    </nav>
  );
}
