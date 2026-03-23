import {
  buildQueryString,
  parseFilterState,
  parseSearchQuery,
} from "@/lib/urlState";
import type { FilterState } from "@/types";

describe("parseFilterState", () => {
  it("parses ?power=Magic,Speed into powers Magic+Speed, empty universes, type null", () => {
    const params: Record<string, string | string[] | undefined> = {
      power: "Magic,Speed",
    };
    expect(parseFilterState(params)).toEqual({
      powers: ["Magic", "Speed"],
      universes: [],
      type: null,
    });
  });

  it("discards invalid power token and returns empty powers", () => {
    const params: Record<string, string | string[] | undefined> = {
      power: "InvalidValue",
    };
    expect(parseFilterState(params)).toEqual({
      powers: [],
      universes: [],
      type: null,
    });
  });

  it("missing params return default FilterState", () => {
    expect(parseFilterState({})).toEqual({
      powers: [],
      universes: [],
      type: null,
    });
  });
});

describe("buildQueryString", () => {
  it("round-trips with parseFilterState", () => {
    const filters: FilterState = {
      powers: ["Magic", "Speed"],
      universes: ["Marvel", "DC"],
      type: "hero",
    };
    const search = "batman";
    const qs = buildQueryString(filters, search);
    const params = Object.fromEntries(new URLSearchParams(qs.replace(/^\?/, "")));
    const normalized: Record<string, string | string[] | undefined> = {};
    for (const [k, v] of Object.entries(params)) {
      normalized[k] = v;
    }
    expect(parseFilterState(normalized)).toEqual({
      powers: ["Magic", "Speed"],
      universes: ["Marvel", "DC"],
      type: "hero",
    });
    expect(parseSearchQuery(normalized)).toBe("batman");
  });
});
