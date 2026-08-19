export const SHIPPING_COUNTRIES = ["SE", "DK", "FI", "NO"] as const;

export type ShippingCountry = (typeof SHIPPING_COUNTRIES)[number];

export const SHIPPING: Record<
  ShippingCountry,
  { ore: number; label: string; note?: string }
> = {
  SE: { ore: 4900, label: "Sverige · PostNord" },
  DK: { ore: 9900, label: "Danmark · PostNord" },
  FI: { ore: 9900, label: "Finland · PostNord" },
  NO: {
    ore: 12900,
    label: "Norge",
    note: "Norge ligger utanför EU. Importavgifter kan tillkomma.",
  },
};

export function isShippingCountry(value: string): value is ShippingCountry {
  return (SHIPPING_COUNTRIES as readonly string[]).includes(value);
}

export function shippingKr(country: ShippingCountry): number {
  return SHIPPING[country].ore / 100;
}
