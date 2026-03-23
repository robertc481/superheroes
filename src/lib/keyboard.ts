import type { KeyboardEvent } from "react";

/** Ensures Enter on checkbox/radio toggles like a click (some browsers differ). */
export function handleEnterAsClick(e: KeyboardEvent<HTMLInputElement>): void {
  if (e.key === "Enter") {
    e.currentTarget.click();
  }
}
