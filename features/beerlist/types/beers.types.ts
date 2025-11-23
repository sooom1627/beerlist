export type Beer = {
  id: number;
  image: string;
  brewery: string;
  name: string;
  style: string;
  location: string;
  description: string;
  price:{
    glass: number;
    pint: number;
  }
  alcohol: number;
  isAvailable: boolean;
  createdAt: string;
};

export type BeerList = Beer[];