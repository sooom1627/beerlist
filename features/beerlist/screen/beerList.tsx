"use client";

import { BeerList as BeerListType } from "../types/beers.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
        {beerList.map((beer, index) => (
          <Card
            key={beer.id}
            className={`group relative transition-all duration-200 hover:shadow-md ${
              !beer.isAvailable ? "opacity-60" : ""
            }`}
          >
            <CardHeader className="pb-0 px-4 pt-4">
              <div className="flex items-start justify-start gap-3 mb-2">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded p-1.5 flex items-center justify-center border border-border">
                    <img
                      src={beer.image}
                      alt={beer.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-semibold line-clamp-1">
                    {beer.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {beer.brewery} / {beer.location}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground">
                    style: <span className="font-medium">{beer.style}</span> / alcohol: <span className="font-medium">{beer.alcohol}%</span>
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0 space-y-2">
              <p className="text-xs text-muted-foreground leading-snug">
                {beer.description}
              </p>
              <div className="flex items-center justify-between pt-1.5 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-muted-foreground">Glass</span>
                    <span className="font-medium">¥{beer.price.glass}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-muted-foreground">Pint</span>
                    <span className="font-medium">¥{beer.price.pint}</span>
                  </div>
                </div>
                {!beer.isAvailable && (
                  <span className="text-xs text-muted-foreground">
                    完売
                  </span>
                )}
              </div>
            </CardContent>
            <span className="text-7xl font-black opacity-15 text-orange-400 dark:text-orange-400 absolute top-2 right-2">
              {index + 1}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

