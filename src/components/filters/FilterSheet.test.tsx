/**
 * @jest-environment jsdom
 */
import { FilterSheet } from "@/components/filters/FilterSheet";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";

const changeListeners: Array<() => void> = [];

beforeEach(() => {
  changeListeners.length = 0;
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: (_: string, cb: () => void): void => {
        changeListeners.push(cb);
      },
      removeEventListener: jest.fn(),
    })),
  });

  const main = document.createElement("div");
  main.id = "main-content";
  document.body.appendChild(main);
});

afterEach(() => {
  document.getElementById("main-content")?.remove();
});

function renderSheet(open: boolean, onClose: () => void): void {
  render(
    <FilterSheet open={open} onClose={onClose}>
      <button type="button">First</button>
      <button type="button">Second</button>
    </FilterSheet>,
  );
}

describe("FilterSheet", () => {
  it("renders nothing when open is false", () => {
    const onClose = jest.fn();
    renderSheet(false, onClose);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog when open is true", () => {
    const onClose = jest.fn();
    renderSheet(true, onClose);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("sets main.inert to true when open", () => {
    const onClose = jest.fn();
    renderSheet(true, onClose);
    const main = document.getElementById("main-content");
    expect(main?.inert).toBe(true);
  });

  it("restores main.inert to false when closed", () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <FilterSheet open={true} onClose={onClose}>
        <button type="button">First</button>
      </FilterSheet>,
    );
    rerender(
      <FilterSheet open={false} onClose={onClose}>
        <button type="button">First</button>
      </FilterSheet>,
    );
    const main = document.getElementById("main-content");
    expect(main?.inert).toBe(false);
  });

  it("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderSheet(true, onClose);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("focuses the first focusable element on open", () => {
    const onClose = jest.fn();
    renderSheet(true, onClose);
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "First" }));
  });

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderSheet(true, onClose);
    const backdrop = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
