import { createClient } from "@/lib/supabase/client";
import { Beer, BeerDB } from "../types/beers.types";

export const getBeers = async (): Promise<Beer[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("beers")
    .select("*")
    .order("tap_number");

  if (error) throw error;

  return (data as BeerDB[]).map((beer) => ({
    id: beer.id,
    tapNumber: beer.tap_number,
    image: beer.image,
    brewery: beer.brewery,
    name: beer.name,
    style: beer.style,
    location: beer.location,
    description: beer.description,
    price: {
      glass: beer.price_glass,
      pint: beer.price_pint,
    },
    alcohol: beer.alcohol,
    isAvailable: beer.is_available,
    createdAt: beer.created_at,
  }));
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
  };

  const { data, error } = await supabase
    .from("beers")
    .upsert(beerDB, { onConflict: "tap_number" })
    .select()
    .single();

  if (error) throw error;
  
  const savedBeer = data as BeerDB;
  return {
    id: savedBeer.id,
    tapNumber: savedBeer.tap_number,
    image: savedBeer.image,
    brewery: savedBeer.brewery,
    name: savedBeer.name,
    style: savedBeer.style,
    location: savedBeer.location,
    description: savedBeer.description,
    price: {
      glass: savedBeer.price_glass,
      pint: savedBeer.price_pint,
    },
    alcohol: savedBeer.alcohol,
    isAvailable: savedBeer.is_available,
    createdAt: savedBeer.created_at,
  };
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
