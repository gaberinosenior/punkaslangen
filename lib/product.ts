export const PRODUCT = {
  sku: "punkaslangen",
  name: "Punkaslangen",
  tagline: "Första hjälpen vid pyspunka",
  description:
    "En 4 meter lång, extra smidig och mjuk gummislang med pumpnipplar. Koppla mellan ett friskt däck och ett däck med pyspunka, vänta 2–3 minuter, och kör vidare till närmaste verkstad.",
  length: "4 meter",
  priceOre: 9900,
  currency: "sek",
  vatPercent: 25,
  vimeoId: "368576595",
} as const;

export const PRICE_KR = PRODUCT.priceOre / 100;
