export function formatSek(amountKr: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(amountKr);
}

export function formatSekOre(ore: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ore / 100);
}

export function oreToKr(ore: number): number {
  return ore / 100;
}

/** Inclusive price in öre → exclusive of VAT, in öre (rounded to whole öre). */
export function exclVatOre(oreIncl: number, vatPercent: number): number {
  return Math.round(oreIncl / (1 + vatPercent / 100));
}

export function vatOre(oreIncl: number, vatPercent: number): number {
  return oreIncl - exclVatOre(oreIncl, vatPercent);
}
