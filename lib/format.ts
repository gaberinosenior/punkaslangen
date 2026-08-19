export function formatSek(amountKr: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(amountKr);
}

export function oreToKr(ore: number): number {
  return ore / 100;
}
