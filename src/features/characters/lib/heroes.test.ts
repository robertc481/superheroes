import { filterCharactersByFavoriteIds } from "@/features/characters/lib/filterUtils";
import {
  ALL_CHARACTERS,
  filterHeroes,
  getVisibleHeroes,
  searchHeroes,
} from "@/features/characters/lib/heroes";
import type { Character } from "@/features/characters/types";

const characters: Character[] = ALL_CHARACTERS;

describe("filterHeroes", () => {
  it("type: 'hero' returns 7 heroes (Batman, Superman, Gamora, Wonder Woman, Aquaman, Thor, Spiderman)", () => {
    const out = filterHeroes(characters, {
      powers: [],
      universes: [],
      type: "hero",
    });
    expect(out).toHaveLength(7);
    const names = out.map((c) => c.name).sort();
    expect(names).toEqual(
      [
        "Aquaman",
        "Batman",
        "Gamora",
        "Spiderman",
        "Superman",
        "Thor",
        "Wonder Woman",
      ].sort(),
    );
  });

  it("powers: ['Magic'] returns 5 characters (Thor, Wonder Woman, Superman, Aquaman, Thanos)", () => {
    const out = filterHeroes(characters, {
      powers: ["Magic"],
      universes: [],
      type: null,
    });
    expect(out).toHaveLength(5);
    const names = out.map((c) => c.name).sort();
    expect(names).toEqual(
      ["Aquaman", "Superman", "Thanos", "Thor", "Wonder Woman"].sort(),
    );
  });

  it("universes: ['Marvel'] returns 4 characters (Gamora, Thanos, Thor, Spiderman)", () => {
    const out = filterHeroes(characters, {
      powers: [],
      universes: ["Marvel"],
      type: null,
    });
    expect(out).toHaveLength(4);
    const names = out.map((c) => c.name).sort();
    expect(names).toEqual(["Gamora", "Spiderman", "Thanos", "Thor"].sort());
  });

  it("universes: ['DC'] + type: 'villain' returns 3 characters (Joker, Lex Luthor, Harley Quinn)", () => {
    const out = filterHeroes(characters, {
      powers: [],
      universes: ["DC"],
      type: "villain",
    });
    expect(out).toHaveLength(3);
    const names = out.map((c) => c.name).sort();
    expect(names).toEqual(["Harley Quinn", "Joker", "Lex Luthor"].sort());
  });

  it("empty characters array returns []", () => {
    expect(
      filterHeroes([], {
        powers: [],
        universes: [],
        type: null,
      }),
    ).toEqual([]);
  });

  it("no characters match active filters returns []", () => {
    const out = filterHeroes(characters, {
      powers: ["Speed"],
      universes: [],
      type: "villain",
    });
    expect(out).toEqual([]);
  });

  it("multiple powers use AND: ['Strength', 'Magic'] returns only characters with both", () => {
    const out = filterHeroes(characters, {
      powers: ["Strength", "Magic"],
      universes: [],
      type: null,
    });
    const names = out.map((c) => c.name).sort();
    expect(names).toEqual(
      ["Aquaman", "Superman", "Thanos", "Thor", "Wonder Woman"].sort(),
    );
    expect(out.every((c) => c.powers.includes("Strength") && c.powers.includes("Magic"))).toBe(true);
  });

  it("multiple powers AND excludes partial matches", () => {
    const out = filterHeroes(characters, {
      powers: ["Speed", "Intelligence"],
      universes: [],
      type: null,
    });
    const names = out.map((c) => c.name).sort();
    expect(names).toEqual(["Batman", "Spiderman"].sort());
  });
});

describe("searchHeroes", () => {
  it("query 'bat' matches Batman by name", () => {
    const out = searchHeroes(characters, "bat");
    expect(out).toHaveLength(1);
    expect(out[0]?.id).toBe("batman");
  });

  it("query 'dark knight' matches Batman by alias", () => {
    const out = searchHeroes(characters, "dark knight");
    expect(out).toHaveLength(1);
    expect(out[0]?.id).toBe("batman");
  });

  it("query 'xyz' returns []", () => {
    expect(searchHeroes(characters, "xyz")).toEqual([]);
  });

  it("empty query returns same array reference unchanged", () => {
    const out = searchHeroes(characters, "");
    expect(out).toBe(characters);
  });
});

describe("getVisibleHeroes", () => {
  it("applies filterHeroes then searchHeroes: universes ['Marvel'] + search 'god' returns only Thor", () => {
    const out = getVisibleHeroes(
      characters,
      { powers: [], universes: ["Marvel"], type: null },
      "god",
    );
    expect(out).toHaveLength(1);
    expect(out[0]?.id).toBe("thor");
  });
});

describe("filterCharactersByFavoriteIds", () => {
  it("returns [] when favoriteIds is empty", () => {
    expect(filterCharactersByFavoriteIds(characters, [])).toEqual([]);
  });

  it("returns only characters whose id is in favoriteIds", () => {
    const out = filterCharactersByFavoriteIds(characters, ["batman", "thor"]);
    expect(out.map((c) => c.id).sort()).toEqual(["batman", "thor"]);
  });

  it("ignores unknown ids", () => {
    const out = filterCharactersByFavoriteIds(characters, ["batman", "nope"]);
    expect(out).toHaveLength(1);
    expect(out[0]?.id).toBe("batman");
  });
});
