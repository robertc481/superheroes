/**
 * @jest-environment jsdom
 */
import { SearchBar } from "@/components/SearchBar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Suspense, type ReactElement } from "react";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: (): { push: typeof mockPush } => ({ push: mockPush }),
  usePathname: (): string => "/",
  useSearchParams: jest.fn(),
}));

import { useSearchParams } from "next/navigation";

function wrap(ui: ReactElement): ReactElement {
  return <Suspense fallback={null}>{ui}</Suspense>;
}

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockPush.mockClear();
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("debounces URL updates and mutates search param", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(wrap(<SearchBar initialQuery="" />));

    const box = screen.getByRole("searchbox");
    await user.type(box, "bat");

    expect(mockPush).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(300);

    expect(mockPush).toHaveBeenCalled();
    const path = mockPush.mock.calls[0]?.[0] as string;
    expect(path).toContain("search=bat");
  });

  it("clear button clears input and pushes URL without search param", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(wrap(<SearchBar initialQuery="bat" />));

    await user.click(screen.getByRole("button", { name: /Clear search/i }));

    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(mockPush).toHaveBeenCalledWith("/", { scroll: false });
  });
});
