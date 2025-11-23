"use client";

import { BeerList as BeerListType } from "../types/beers.types";

const beerList: BeerListType = [
  {
    id: 1,
    image:
      "https://kyotonudebrewery.myshopify.com/cdn/shop/files/logo_nude_black.svg",
    brewery: "DUGS",
    name: "UKIYOGUMO -浮世雲-",
    style: "Grisette / Herb",
    location: "京都",
    description:
      "カモミール由来のりんごの甘みやベルギー酵母由来でスパイシーで爽やかな香り。すっきり飲めるハーブティーのような仕上がり。",
    price: {
      glass: 850,
      pint: 1400,
    },
    alcohol: 4.0,
    isAvailable: true,
    createdAt: "2024-11-23",
  },
  {
    id: 2,
    image: "https://rec-cb.work/cdn/shop/files/logo-black_500x.png",
    brewery: "REC CIDER BEER WORKS",
    name: "ゆらゆらハードサイダースタンダード",
    style: "Cider",
    location: "福島",
    description:
      "福島県産のりんごをこだわったシードルの味わい感と、穏かな甘味を感じるハードサイダーです。",
    price: {
      glass: 850,
      pint: 1600,
    },
    alcohol: 5.5,
    isAvailable: true,
    createdAt: "2024-11-23",
  },
  {
    id: 3,
    image:
      "https://assets.st-note.com/production/uploads/images/111994120/profile_7bde2620889a5040bb5acd481524c0f2.png?fit=bounds&format=jpeg&quality=85&width=330",
    brewery: "Gangi Brewing",
    name: "SPACE OUT",
    style: "Bitter",
    location: "新潟",
    description:
      "アロマはほのかのローズフローラルの香り。苦かなモルトの甘味。まろやかな苦みが特徴のイギリス系統の伝統的なビアスタイルです。",
    price: {
      glass: 850,
      pint: 1400,
    },
    alcohol: 5.0,
    isAvailable: true,
    createdAt: "2024-11-23",
  },
  {
    id: 4,
    image: "https://gigaplus.makeshop.jp/yourbeer/common/shop/hideji.png",
    brewery: "宮崎ひでじビール",
    name: "栗黒",
    style: "Dark Chestnut Ale",
    location: "宮崎",
    description:
      "宮崎県産の栗を麦芽とともに焼いて、スネットと栗の二つにじたい素材をブレンドしました。まろやかな甘みとほんのり効いたホップのコク。",
    price: {
      glass: 1000,
      pint: 1000,
    },
    alcohol: 6.0,
    isAvailable: true,
    createdAt: "2024-11-23",
  },
  {
    id: 5,
    image:
      "https://s3-ap-northeast-1.amazonaws.com/public-my-beer-2/uploads/brewery/image/636/75d88a1b-4082-48e8-a173-205233c67121.jpeg",
    brewery: "KUNITACHI BREWERY",
    name: "柴崎インプレッション",
    style: "Session IPA",
    location: "東京",
    description:
      "フラッグホップをたっぷり使った馥郁たる香り、柑橘感を伴うフレッシーなモダンなホップなセッションIPA",
    price: {
      glass: 900,
      pint: 1500,
    },
    alcohol: 4.5,
    isAvailable: true,
    createdAt: "2024-11-23",
  },
  {
    id: 6,
    image:
      "https://pullup.beer/wp/wp-content/uploads/2021/07/logo_hopkotan.jpg",
    brewery: "忽布古丹醸造",
    name: "古丹とAKIRA",
    style: "Czech Pils",
    location: "北海道",
    description:
      "インペルホップのような安定や穏やさ、上面させ穏かに引き出しながらも柑橘的なスパイスバランスが楽しめる。",
    price: {
      glass: 900,
      pint: 1500,
    },
    alcohol: 5.0,
    isAvailable: true,
    createdAt: "2024-11-23",
  },
  {
    id: 7,
    image:
      "https://uscraftbeer.jp/img/breweries/kneedeepbrewing/breweries-logo_kneedeepbrewing.jpg",
    brewery: "Knee Deep Brewing Co.",
    name: "DEEP HAZE IPA",
    style: "Hazy IPA",
    location: "アメリカ",
    description:
      "ジューシーで華やか、ニューエングランドスタイル・ヘイジーIPA。華やかな口当たりで滑らかい口当たで飲みやすい。",
    price: {
      glass: 1050,
      pint: 1800,
    },
    alcohol: 6.5,
    isAvailable: true,
    createdAt: "2024-11-23",
  },
  {
    id: 8,
    image: "https://brasserieknot.jp/img/loading_logo.png",
    brewery: "Brasserie Knot",
    name: "WIND",
    style: "IPA",
    location: "北海道",
    description:
      "シトラスを彷彿指せ穏やかなホップアロマと、ビピレスフスポット系のフレーバーでニュージーランドイーストを思わせる軽やかなスタイルのIPAです。",
    price: {
      glass: 950,
      pint: 1600,
    },
    alcohol: 6.0,
    isAvailable: true,
    createdAt: "2024-11-23",
  },
];

export function BeerList() {
  return (
    <div className="space-y-8 w-full mx-auto pb-8">
      {/* パターン1A: コンパクト横並び + description常時表示 */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden w-full relative">
          {beerList.map((beer, index) => (
            <div
              key={beer.id}
              className="w-full py-2 px-1 border-b flex flex-col items-start relative"
            >
              <div className="w-full flex items-center gap-1 justify-between">
                <div className="flex flex-row items-center gap-3">
                  <img
                    src={beer.image}
                    alt={beer.name}
                    className="w-10 h-10 object-contain rounded flex-shrink-0 bg-white dark:bg-zinc-100 p-1"
                  />
                  <div className="flex flex-col items-start justify-start">
                    <span className="text-xs text-gray-500 truncate">
                      {beer.brewery}/{beer.location}
                    </span>
                    <h3 className="font-semibold text-xs">{beer.name}</h3>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <span className="text-xs text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    glass: ¥{beer.price.glass}
                  </span>
                  <span className="text-xs text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    pint: ¥{beer.price.pint}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-orange-500 whitespace-nowrap">
                  style: {beer.style}
                </span>
                <span className="text-xs text-orange-500 whitespace-nowrap">
                  alcohol: {beer.alcohol}%
                </span>
              </div>
              <div className="w-full">
                <p className="text-xs text-gray-500 line-clamp-2">
                  {beer.description}
                </p>
              </div>
              {!beer.isAvailable && (
                <span className="text-xs text-red-500 whitespace-nowrap absolute bottom-0 right-0 -z-10 opacity-20 pointer-events-none select-none">
                  {beer.name} is sold out
                </span>
              )}
              <span className="text-8xl font-bold text-orange-400 dark:text-orange-600 whitespace-nowrap absolute bottom-0 right-0 -z-10 opacity-20 pointer-events-none select-none">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
