"use client";

import { useState, type FormEvent } from "react";
import { OutlinedButton } from "@/components/OutlinedButton";
import { formatSek } from "@/lib/format";
import { PRICE_KR } from "@/lib/product";
import {
  SHIPPING,
  SHIPPING_COUNTRIES,
  shippingKr,
  type ShippingCountry,
} from "@/lib/shipping";

type Props = {
  stock: number;
  stripeConfigured: boolean;
};

export function BuyForm({ stock, stripeConfigured }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [country, setCountry] = useState<ShippingCountry>("SE");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const maxQty = Math.min(10, stock);
  const shipping = shippingKr(country);
  const productTotal = PRICE_KR * quantity;
  const total = productTotal + shipping;
  const soldOut = stock <= 0;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!stripeConfigured) {
      setError("Kassan är inte kopplad ännu. Stripe-nycklar saknas.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, country }),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error || "Kunde inte starta kassan.");
        setPending(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Något gick fel. Försök igen.");
      setPending(false);
    }
  }

  if (soldOut) {
    return (
      <p className="text-center font-sans text-body font-light uppercase tracking-[-0.02em] text-voltage-blue">
        Slutsåld
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-[600px] space-y-29">
      <label className="block">
        <span className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue">
          Antal
        </span>
        <select
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className="mt-11 w-full border border-ash bg-cream px-20 py-14 font-sans text-body font-light text-ink outline-none"
        >
          {Array.from({ length: maxQty }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue">
          Leveransland
        </span>
        <select
          value={country}
          onChange={(event) =>
            setCountry(event.target.value as ShippingCountry)
          }
          className="mt-11 w-full border border-ash bg-cream px-20 py-14 font-sans text-body font-light text-ink outline-none"
        >
          {SHIPPING_COUNTRIES.map((code) => (
            <option key={code} value={code}>
              {SHIPPING[code].label} — {formatSek(shippingKr(code))}
            </option>
          ))}
        </select>
      </label>

      {SHIPPING[country].note ? (
        <p className="font-sans text-body-sm font-normal text-ink">
          {SHIPPING[country].note}
        </p>
      ) : null}

      <div className="border-t border-ash pt-29">
        <Row label={`${quantity} × Punkaslangen`} value={formatSek(productTotal)} />
        <Row label="Frakt" value={formatSek(shipping)} />
        <Row label="Totalt inkl. moms" value={formatSek(total)} strong />
      </div>

      {error ? (
        <p className="font-sans text-body-sm font-normal text-voltage-blue">{error}</p>
      ) : null}

      <div className="flex justify-center">
        <OutlinedButton type="submit" disabled={pending}>
          {pending ? "Öppnar kassa…" : "Gå till betalning"}
        </OutlinedButton>
      </div>
    </form>
  );
}

function Row({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-20 py-11">
      <span
        className={`font-sans ${strong ? "text-body font-light uppercase text-voltage-blue" : "text-body-sm font-normal text-ink"}`}
      >
        {label}
      </span>
      <span
        className={`font-sans ${strong ? "text-body-lg font-light text-voltage-blue" : "text-body font-light text-ink"}`}
      >
        {value}
      </span>
    </div>
  );
}
