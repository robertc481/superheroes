import { CHARACTER_TYPES, POWER_TYPES, UNIVERSES } from "@/features/characters/types";
import { z } from "zod";

const powerEnum = z.enum(POWER_TYPES);
const universeEnum = z.enum(UNIVERSES);
const characterTypeEnum = z.enum(CHARACTER_TYPES);

const statValue = z.number().int().min(0).max(100);

export const characterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  fullName: z.string().min(1),
  score: z.number().min(0).max(10),
  type: characterTypeEnum,
  weakness: z.string().optional(),
  universe: universeEnum,
  aliases: z.array(z.string().min(1)),
  powers: z.array(powerEnum),
  powerStats: z.object({
    strength: statValue,
    speed: statValue,
    intelligence: statValue,
    magic: statValue,
  }),
  description: z.string(),
  image: z.string().url(),
});

export const charactersFileSchema = z.object({
  items: z.array(characterSchema),
});
