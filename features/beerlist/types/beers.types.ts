import { z } from "zod";

// Zod schema for database response validation
export const beerDBSchema = z.object({
  id: z.number(),
  tap_number: z.number().int().min(1).max(8),
  image: z.string(),
  brewery: z.string(),
  name: z.string(),
  style: z.string(),
  location: z.string(),
  description: z.string(),
  price_glass: z.number().min(0),
  price_pint: z.number().min(0),
  alcohol: z.number().min(0).max(100),
  is_available: z.boolean(),
  isNew: z.boolean(),
  created_at: z.string(),
  color: z.string().nullable().optional(),
});

export type BeerDB = z.infer<typeof beerDBSchema>;

export type Beer = {
  id: number;
  tapNumber: number;
  image: string;
  brewery: string;
  name: string;
  style: string;
  color?: string | null;
  location: string;
  description: string;
  price: {
    glass: number;
    pint: number;
  };
  alcohol: number;
  isAvailable: boolean;
  createdAt: string;
  isNew: boolean;
};

export type DraftBeer = Omit<Beer, "id" | "tapNumber" | "isAvailable" | "isNew" | "createdAt"> & {
  id: number;
  createdAt: string;
};

export type DraftBeerDB = Omit<BeerDB, "id" | "tap_number" | "is_available" | "isNew" | "created_at"> & {
  id: number;
  created_at: string;
};

// Transform function to convert DraftBeerDB to DraftBeer
export function transformDraftBeerDBToDraftBeer(draftDB: DraftBeerDB): DraftBeer {
  return {
    id: draftDB.id,
    image: draftDB.image,
    brewery: draftDB.brewery,
    name: draftDB.name,
    style: draftDB.style,
    color: draftDB.color,
    location: draftDB.location,
    description: draftDB.description,
    price: {
      glass: draftDB.price_glass,
      pint: draftDB.price_pint,
    },
    alcohol: draftDB.alcohol,
    createdAt: draftDB.created_at,
  };
}

export type BeerList = Beer[];

// Transform function to convert BeerDB to Beer
export function transformBeerDBToBeer(beerDB: BeerDB): Beer {
  return {
    id: beerDB.id,
    tapNumber: beerDB.tap_number,
    image: beerDB.image,
    brewery: beerDB.brewery,
    name: beerDB.name,
    style: beerDB.style,
    color: beerDB.color,
    location: beerDB.location,
    description: beerDB.description,
    price: {
      glass: beerDB.price_glass,
      pint: beerDB.price_pint,
    },
    alcohol: beerDB.alcohol,
    isAvailable: beerDB.is_available,
    createdAt: beerDB.created_at,
    isNew: beerDB.isNew,
  };
}
