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

const fieldClass =
  "mt-3 w-full rounded-input border border-ash bg-fog px-4 py-3 text-body text-carbon outline-none focus:border-ochre focus:ring-2 focus:ring-ochre";

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
      <p className="text-center font-bold text-carbon">Slutsåld</p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-[600px] space-y-7">
      <label className="block">
        <span className="text-caption font-bold text-carbon">Antal</span>
        <select
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className={fieldClass}
        >
          {Array.from({ length: maxQty }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-caption font-bold text-carbon">Leveransland</span>
        <select
          value={country}
          onChange={(event) =>
            setCountry(event.target.value as ShippingCountry)
          }
          className={fieldClass}
        >
          {SHIPPING_COUNTRIES.map((code) => (
            <option key={code} value={code}>
              {SHIPPING[code].label} — {formatSek(shippingKr(code))}
            </option>
          ))}
        </select>
      </label>

      {SHIPPING[country].note ? (
        <p className="text-caption text-carbon">{SHIPPING[country].note}</p>
      ) : null}

      <div className="border-t border-ash pt-7">
        <Row label={`${quantity} × Punkaslangen`} value={formatSek(productTotal)} />
        <Row label="Frakt" value={formatSek(shipping)} />
        <Row label="Totalt inkl. moms" value={formatSek(total)} strong />
      </div>

      {error ? <p className="text-caption font-bold text-ochre">{error}</p> : null}

      <div className="flex justify-center">
        <OutlinedButton type="submit" disabled={pending} size="hero">
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
    <div className="flex items-baseline justify-between gap-5 py-3">
      <span className={strong ? "font-bold text-carbon" : "text-caption text-carbon"}>
        {label}
      </span>
      <span className={strong ? "text-heading-sm font-extrabold text-carbon" : "text-body text-carbon"}>
        {value}
      </span>
    </div>
  );
}
