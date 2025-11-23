import { BeerList as BeerListType } from "../types/beers.types";

  const beerList: BeerListType = [
    {
      id: 1,
      image: "https://kyotonudebrewery.myshopify.com/cdn/shop/files/logo_nude_black.svg",
      brewery: "Kyoto Nude Brewery",
      name: "UKIYOGUMO -浮世雲-",
      style: "IPA",
      location: "Kyoto, Japan",
      description: "カモミール由来のりんごの甘みやベルギー酵母由来でスパイシーで爽やかな香り。すっきり飲めるハーブティーのような仕上がり",
      price: {
        glass: 850,
        pint: 1400,
      },
      alcohol: 4.0,
      isAvailable: true,
      createdAt: "2021-01-01",
    },
    {
      id: 2,
      image: "https://rec-cb.work/cdn/shop/files/logo-black_500x.png",
      brewery: "REC CIDER BEER WORKS",
      name: "ゆらゆらハードサイダー ＜スタンダード＞",
      style: "Hard Cider",
      location: "Fukushima, Japan",
      description: "福島産のりんごを醸したほのかな酸味と、程よい甘みを感じるハードサイダーです。",
      price: {
        glass: 950,
        pint: 1600,
      },
      alcohol: 5.5,
      isAvailable: true,
      createdAt: "2021-01-01",
    },
  ];

  export function BeerList() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {beerList.map((beer) => (
          <div key={beer.id} className="border rounded-lg p-4">
            <h2 className="text-lg font-bold">{beer.name}</h2>
            <img src={beer.image} alt={beer.name} width={150} height={150} />
            <p className="text-sm text-gray-500">{beer.description}</p>
            <p className="text-sm text-gray-500">{beer.brewery}</p>
            <p className="text-sm text-gray-500">{beer.style}</p>
            <p className="text-sm text-gray-500">{beer.location}</p>
            <p className="text-sm text-gray-500">glass:¥{beer.price.glass}</p>
            <p className="text-sm text-gray-500">pint:¥{beer.price.pint}</p>
            <p className="text-sm text-gray-500">{beer.alcohol}%</p>
            <p className="text-sm text-gray-500">{beer.isAvailable ? "Available" : "Not Available"}</p>
          </div>
        ))}
      </div>
    );
  }