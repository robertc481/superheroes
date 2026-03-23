/**
 * @jest-environment jsdom
 */
import { FilterSidebar } from "@/components/FilterSidebar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Suspense, type ReactElement } from "react";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: (): { push: typeof mockPush } => ({ push: mockPush }),
  useSearchParams: jest.fn(),
}));

import { useSearchParams } from "next/navigation";

function wrap(ui: ReactElement): ReactElement {
  return <Suspense fallback={null}>{ui}</Suspense>;
}

describe("FilterSidebar", () => {
  beforeEach(() => {
    mockPush.mockClear();
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams("power=Strength"));
  });

  it("checkbox toggles merge into router.push query (adds power)", async () => {
    const user = userEvent.setup();
    render(
      wrap(
        <FilterSidebar
          currentFilters={{ powers: ["Strength"], universes: [], type: null }}
          currentSearch=""
        />,
      ),
    );

    const speed = screen.getByRole("checkbox", { name: "Speed" });
    await user.click(speed);

    expect(mockPush).toHaveBeenCalled();
    const arg = mockPush.mock.calls[0]?.[0] as string;
    expect(arg).toContain("power=");
    expect(arg).toContain("Strength");
    expect(arg).toContain("Speed");
  });

  it("clear all filters preserves search query in the URL", async () => {
    const user = userEvent.setup();
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("power=Strength&search=bat"),
    );
    render(
      wrap(
        <FilterSidebar
          currentFilters={{ powers: ["Strength"], universes: [], type: null }}
          currentSearch="bat"
        />,
      ),
    );

    await user.click(screen.getByRole("button", { name: /Clear all filters/i }));

    expect(mockPush).toHaveBeenCalled();
    const arg = mockPush.mock.calls[0]?.[0] as string;
    expect(arg).toContain("search=bat");
    expect(arg).not.toContain("power=");
  });
});
