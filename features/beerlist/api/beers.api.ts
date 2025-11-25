import { createClient } from "@/lib/supabase/client";
import { Beer, transformBeerDBToBeer, beerDBSchema } from "../types/beers.types";
import { z } from "zod";

export const getBeers = async (): Promise<Beer[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("beers")
    .select("*")
    .order("tap_number");

  if (error) throw error;

  // Validate response data with Zod schema
  const beersArray = z.array(beerDBSchema).parse(data);
  return beersArray.map(transformBeerDBToBeer);
};

export const upsertBeer = async (beer: Omit<Beer, "id" | "createdAt"> & { id?: number }): Promise<Beer> => {
  const supabase = createClient();
  
  const beerDB = {
    tap_number: beer.tapNumber,
    image: beer.image,
    brewery: beer.brewery,
    name: beer.name,
    style: beer.style,
    location: beer.location,
    description: beer.description,
    price_glass: beer.price.glass,
    price_pint: beer.price.pint,
    alcohol: beer.alcohol,
    is_available: beer.isAvailable,
    isNew: beer.isNew,
  };

  const { data, error } = await supabase
    .from("beers")
    .upsert(beerDB, { onConflict: "tap_number" })
    .select()
    .single();

  if (error) throw error;

  // Validate response data with Zod schema
  const validatedBeer = beerDBSchema.parse(data);
  return transformBeerDBToBeer(validatedBeer);
};

export const deleteBeer = async (tapNumber: number): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase
    .from("beers")
    .delete()
    .eq("tap_number", tapNumber);

  if (error) throw error;
};

export const uploadBeerImage = async (file: File): Promise<string> => {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from('beer-images')
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from('beer-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
