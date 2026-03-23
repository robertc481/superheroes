"use client";

import type { ReactElement, ReactNode } from "react";
import { useEffect, useRef } from "react";

const LG_BREAKPOINT = "(min-width: 1024px)";

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const nodes = container.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  return [...nodes];
}

export function FilterSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}): ReactElement | null {
  const sheetRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const mql = window.matchMedia(LG_BREAKPOINT);
    if (mql.matches) {
      onCloseRef.current();
      return;
    }

    const main = document.getElementById("main-content");
    if (main !== null) {
      main.inert = true;
    }

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || sheetRef.current === null) {
        return;
      }
      const focusables = getFocusableElements(sheetRef.current);
      if (focusables.length === 0) {
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !sheetRef.current.contains(active)) {
          e.preventDefault();
          last?.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    const onViewportChange = (): void => {
      if (mql.matches) {
        onCloseRef.current();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    mql.addEventListener("change", onViewportChange);

    const prev = document.activeElement as HTMLElement | null;
    const focusables = sheetRef.current ? getFocusableElements(sheetRef.current) : [];
    (focusables[0] ?? sheetRef.current)?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mql.removeEventListener("change", onViewportChange);
      if (main !== null) {
        main.inert = false;
      }
      prev?.focus();
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        onClick={(): void => onCloseRef.current()}
      />
      <div
        ref={sheetRef}
        id="filter-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Character filters"
        tabIndex={-1}
        className="absolute left-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-xl outline-none dark:bg-hero-dark"
      >
        {children}
      </div>
    </div>
  );
}
