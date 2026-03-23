import {
  buildQueryString,
  parseFilterState,
  parseSearchQuery,
  recordFromReadonlySearchParams,
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

describe("parseSearchQuery", () => {
  it("returns empty string when search param is undefined", () => {
    expect(parseSearchQuery({})).toBe("");
  });

  it("returns the string when present", () => {
    expect(parseSearchQuery({ search: "bat" })).toBe("bat");
  });

  it("returns last element when search param is an array", () => {
    expect(parseSearchQuery({ search: ["a", "b"] })).toBe("b");
  });

  it("returns empty string when search param is an empty array", () => {
    expect(parseSearchQuery({ search: [] })).toBe("");
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

  it("returns empty string when all filters are empty and search is blank", () => {
    expect(buildQueryString({ powers: [], universes: [], type: null }, "")).toBe("");
  });

  it("returns empty string when search is only whitespace", () => {
    expect(buildQueryString({ powers: [], universes: [], type: null }, "   ")).toBe("");
  });
});

describe("recordFromReadonlySearchParams", () => {
  it("records each key once when the same name appears multiple times", () => {
    const sp = new URLSearchParams();
    sp.append("a", "1");
    sp.append("a", "2");
    const rec = recordFromReadonlySearchParams(sp);
    expect(Object.keys(rec)).toEqual(["a"]);
    expect(rec["a"]).toEqual(["1", "2"]);
  });

  it("returns single string (not array) for single-value keys", () => {
    const sp = new URLSearchParams("foo=bar");
    const rec = recordFromReadonlySearchParams(sp);
    expect(rec["foo"]).toBe("bar");
  });
});
