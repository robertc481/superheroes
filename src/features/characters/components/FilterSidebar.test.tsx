/**
 * @jest-environment jsdom
 */
import { FilterSidebar } from "@/features/characters/components/FilterSidebar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Suspense, type ReactElement } from "react";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: (): { replace: typeof mockReplace } => ({ replace: mockReplace }),
  useSearchParams: jest.fn(),
}));

import { useSearchParams } from "next/navigation";

function wrap(ui: ReactElement): ReactElement {
  return <Suspense fallback={null}>{ui}</Suspense>;
}

describe("FilterSidebar", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams("power=Strength"));
  });

  it("checkbox toggles merge into router.replace query (adds power)", async () => {
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

    expect(mockReplace).toHaveBeenCalled();
    const arg = mockReplace.mock.calls[0]?.[0] as string;
    expect(arg).toContain("power=");
    expect(arg).toContain("Strength");
    expect(arg).toContain("Speed");
  });

  it("universe checkbox toggles into router.replace query", async () => {
    const user = userEvent.setup();
    render(
      wrap(
        <FilterSidebar
          currentFilters={{ powers: ["Strength"], universes: [], type: null }}
          currentSearch=""
        />,
      ),
    );

    const marvel = screen.getByRole("checkbox", { name: "Marvel" });
    await user.click(marvel);

    expect(mockReplace).toHaveBeenCalled();
    const arg = mockReplace.mock.calls[0]?.[0] as string;
    expect(arg).toContain("universe=Marvel");
  });

  it("type radio buttons push selected type into URL", async () => {
    const user = userEvent.setup();
    render(
      wrap(
        <FilterSidebar
          currentFilters={{ powers: [], universes: [], type: null }}
          currentSearch=""
        />,
      ),
    );

    const villain = screen.getByRole("radio", { name: "Villain" });
    await user.click(villain);

    expect(mockReplace).toHaveBeenCalled();
    const arg = mockReplace.mock.calls[0]?.[0] as string;
    expect(arg).toContain("type=villain");
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

    expect(mockReplace).toHaveBeenCalled();
    const arg = mockReplace.mock.calls[0]?.[0] as string;
    expect(arg).toContain("search=bat");
    expect(arg).not.toContain("power=");
  });
});
