export type Market = "TESCO" | "BILLA";

export const BILLA_PRODUCTS: Record<number, string> = {
  82329695: "bon-via-paprika-cervena-82329695",
  82246186:
    "lindt-excellence-horka-cokolada-s-pomerancovymi-kousky-a-s-kousky-mandli-100g-82246186",
  82329725: "pcukr-krupice-1kg-korunnitp-82329725",
  82334636:
    "billa-premium-cerstva-vejce-slepic-ve-volnem-vybehu-ml-6-ks-82334636",
  82336414: "cuketa-82336414",
  82204154: "kral-syru-hermelin-original-120g-82204154",
  82226503: "opavia-piskoty-tradicni-240g-82226503",
  82334635:
    "billa-premium-cerstva-vejce-slepic-ve-volnem-vybehu-m-10-ks-82334635",
};

const BILLA = Object.keys(BILLA_PRODUCTS).map(Number);

export const PRODUCTS: Record<Market, number[]> = {
  TESCO: [
    2001012691222, 2001014250175, 2001014531595, 2001012691659, 2001012692878,
    2001012177306, 2001013321111, 2001000131150, 2001020177822, 2001020343489,
    2001020289010, 2001120770075, 2001000009282, 2001018181871,
  ],
  BILLA,
};
