export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "NEIGHBOR Craftbeer & Grill",
  image: "https://beerlist-sepia.vercel.app/opengraph-image.png",
  description: "Craftbeer & Grill in Nogata City, Nakano, Tokyo. Offering a curated selection of craft beers and grill menu.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nakano City",
    addressRegion: "Tokyo",
    addressCountry: "JP",
    streetAddress: "Nogata", // Note: Exact address should be updated if known
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.719, // Approximate Nogata station coordinates
    longitude: 139.657,
  },
  servesCuisine: ["Craft Beer", "Grill"],
  priceRange: "¥¥",
  url: "https://beerlist-sepia.vercel.app",
};

