import { createClient } from "@/lib/supabase/client";
import { DraftBeer, transformDraftBeerDBToDraftBeer, DraftBeerDB, beerDBSchema, transformBeerDBToBeer, Beer } from "../types/beers.types";
import { z } from "zod";

// Zod schema for draft validation
const draftDBSchema = z.object({
  id: z.number(),
  image: z.string(),
  brewery: z.string(),
  name: z.string(),
  style: z.string(),
  color: z.string().nullable().optional(),
  location: z.string(),
  description: z.string(),
  price_glass: z.number().min(0),
  price_pint: z.number().min(0),
  alcohol: z.number().min(0).max(100),
  created_at: z.string(),
});

export const getDrafts = async (): Promise<DraftBeer[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("beer_drafts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const draftsArray = z.array(draftDBSchema).parse(data);
  return draftsArray.map(transformDraftBeerDBToDraftBeer);
};

export const createDraft = async (draft: Omit<DraftBeer, "id" | "createdAt">): Promise<DraftBeer> => {
  const supabase = createClient();
  
  const draftDB = {
    image: draft.image,
    brewery: draft.brewery,
    name: draft.name,
    style: draft.style,
    color: draft.color,
    location: draft.location,
    description: draft.description,
    price_glass: draft.price.glass,
    price_pint: draft.price.pint,
    alcohol: draft.alcohol,
  };

  const { data, error } = await supabase
    .from("beer_drafts")
    .insert(draftDB)
    .select()
    .single();

  if (error) throw error;

  const validatedDraft = draftDBSchema.parse(data);
  return transformDraftBeerDBToDraftBeer(validatedDraft);
};

export const updateDraft = async (draft: Omit<DraftBeer, "createdAt">): Promise<DraftBeer> => {
  const supabase = createClient();
  
  const draftDB = {
    image: draft.image,
    brewery: draft.brewery,
    name: draft.name,
    style: draft.style,
    color: draft.color,
    location: draft.location,
    description: draft.description,
    price_glass: draft.price.glass,
    price_pint: draft.price.pint,
    alcohol: draft.alcohol,
  };

  const { data, error } = await supabase
    .from("beer_drafts")
    .update(draftDB)
    .eq("id", draft.id)
    .select()
    .single();

  if (error) throw error;

  const validatedDraft = draftDBSchema.parse(data);
  return transformDraftBeerDBToDraftBeer(validatedDraft);
};

export const deleteDraft = async (id: number): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase
    .from("beer_drafts")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

export const applyDraftToSlot = async (draft: DraftBeer, slotNumber: number): Promise<Beer> => {
  const supabase = createClient();
  
  const beerDB = {
    tap_number: slotNumber,
    image: draft.image,
    brewery: draft.brewery,
    name: draft.name,
    style: draft.style,
    color: draft.color,
    location: draft.location,
    description: draft.description,
    price_glass: draft.price.glass,
    price_pint: draft.price.pint,
    alcohol: draft.alcohol,
    is_available: true, // Default to available when applying to slot
    isNew: true,       // Default to new when applying to slot
  };

  const { data, error } = await supabase
    .from("beers")
    .upsert(beerDB, { onConflict: "tap_number" })
    .select()
    .single();

  if (error) throw error;

  const validatedBeer = beerDBSchema.parse(data);
  return transformBeerDBToBeer(validatedBeer);
};

