import {
  CHARACTER_TYPES,
  POWER_TYPES,
  UNIVERSES,
  type CharacterType,
  type FilterState,
  type PowerType,
  type Universe,
} from "@/types";

const POWER_SET: ReadonlySet<string> = new Set<string>(POWER_TYPES);
const UNIVERSE_SET: ReadonlySet<string> = new Set<string>(UNIVERSES);

function isPowerTypeString(value: string): value is PowerType {
  return POWER_SET.has(value);
}

function isUniverseString(value: string): value is Universe {
  return UNIVERSE_SET.has(value);
}

function isCharacterTypeString(value: string): value is CharacterType {
  return (CHARACTER_TYPES as readonly string[]).includes(value);
}

function normalizeParamTokens(value: string | string[] | undefined): string[] {
  if (value === undefined) {
    return [];
  }
  const chunks: string[] = Array.isArray(value) ? value : [value];
  const out: string[] = [];
  for (const chunk of chunks) {
    for (const piece of chunk.split(",")) {
      const t = piece.trim();
      if (t.length > 0) {
        out.push(t);
      }
    }
  }
  return out;
}

function parsePowers(value: string | string[] | undefined): PowerType[] {
  const tokens = normalizeParamTokens(value);
  const result: PowerType[] = [];
  for (const token of tokens) {
    if (isPowerTypeString(token)) {
      result.push(token);
    }
  }
  return result;
}

function parseUniverses(value: string | string[] | undefined): Universe[] {
  const tokens = normalizeParamTokens(value);
  const result: Universe[] = [];
  for (const token of tokens) {
    if (isUniverseString(token)) {
      result.push(token);
    }
  }
  return result;
}

function parseTypeParam(value: string | string[] | undefined): CharacterType | null {
  if (value === undefined) {
    return null;
  }
  const raw = Array.isArray(value) ? value[value.length - 1] : value;
  if (raw === undefined || raw.trim().length === 0) {
    return null;
  }
  const token = raw.trim();
  return isCharacterTypeString(token) ? token : null;
}

export function parseFilterState(
  params: Record<string, string | string[] | undefined>,
): FilterState {
  return {
    powers: parsePowers(params["power"]),
    universes: parseUniverses(params["universe"]),
    type: parseTypeParam(params["type"]),
  };
}

export function parseSearchQuery(
  params: Record<string, string | string[] | undefined>,
): string {
  const raw = params["search"];
  if (raw === undefined) {
    return "";
  }
  const str = Array.isArray(raw) ? raw[raw.length - 1] : raw;
  if (str === undefined) {
    return "";
  }
  return str;
}

export function recordFromReadonlySearchParams(sp: {
  keys: () => IterableIterator<string>;
  getAll: (name: string) => string[];
}): Record<string, string | string[] | undefined> {
  const out: Record<string, string | string[] | undefined> = {};
  const seen = new Set<string>();
  for (const key of sp.keys()) {
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    const all = sp.getAll(key);
    if (all.length === 0) {
      continue;
    }
    out[key] = all.length === 1 ? all[0] : all;
  }
  return out;
}

export function buildQueryString(filters: FilterState, search: string): string {
  const params = new URLSearchParams();
  if (filters.powers.length > 0) {
    params.set("power", filters.powers.join(","));
  }
  if (filters.universes.length > 0) {
    params.set("universe", filters.universes.join(","));
  }
  if (filters.type !== null) {
    params.set("type", filters.type);
  }
  const q = search.trim();
  if (q.length > 0) {
    params.set("search", q);
  }
  const s = params.toString();
  return s.length > 0 ? `?${s}` : "";
}
