export type Beer = {
  id: number;
  tapNumber: number;
  image: string;
  brewery: string;
  name: string;
  style: string;
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

export type BeerList = Beer[];

// Helper type for DB response if needed
export type BeerDB = {
  id: number;
  tap_number: number;
  image: string;
  brewery: string;
  name: string;
  style: string;
  location: string;
  description: string;
  price_glass: number;
  price_pint: number;
  alcohol: number;
  is_available: boolean;
  is_new: boolean;
  created_at: string;
};
