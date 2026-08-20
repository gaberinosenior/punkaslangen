import type Stripe from "stripe";
import { company } from "./company";
import { PRODUCT } from "./product";
import { SHIPPING, type ShippingCountry } from "./shipping";

function hasShipmondo(): boolean {
  return Boolean(
    process.env.SHIPMONDO_API_USER?.trim() &&
      process.env.SHIPMONDO_API_KEY?.trim(),
  );
}

function exclVat(oreIncl: number): string {
  const kr = oreIncl / 100 / (1 + PRODUCT.vatPercent / 100);
  return kr.toFixed(2);
}

function vatAmount(oreIncl: number): string {
  const incl = oreIncl / 100;
  const excl = incl / (1 + PRODUCT.vatPercent / 100);
  return (incl - excl).toFixed(2);
}

function splitPostal(postal: string): { zip: string; city: string } {
  const match = postal.trim().match(/^(\d{3}\s?\d{2})\s+(.+)$/);
  if (match) {
    return { zip: match[1].replace(/\s/g, ""), city: match[2] };
  }
  return { zip: postal.replace(/\s/g, ""), city: "" };
}

function shippingFromSession(session: Stripe.Checkout.Session) {
  const collected = session.collected_information?.shipping_details;
  const legacy = (
    session as {
      shipping_details?: {
        name?: string | null;
        address?: Stripe.Address | null;
      };
    }
  ).shipping_details;
  const details = collected ?? legacy;
  const address = details?.address ?? session.customer_details?.address;
  const name =
    details?.name ??
    session.customer_details?.name ??
    session.customer_details?.email ??
    "Kund";

  return {
    name,
    address1: address?.line1 ?? "",
    address2: address?.line2 ?? null,
    zipcode: address?.postal_code ?? "",
    city: address?.city ?? "",
    country_code: address?.country ?? "",
    email: session.customer_details?.email ?? "",
    mobile: session.customer_details?.phone ?? "",
    telephone: session.customer_details?.phone ?? "",
  };
}

export async function createShipmondoOrder(input: {
  session: Stripe.Checkout.Session;
  quantity: number;
  country: ShippingCountry;
  productOre: number;
  shippingOre: number;
}): Promise<void> {
  const user = process.env.SHIPMONDO_API_USER?.trim();
  const key = process.env.SHIPMONDO_API_KEY?.trim();
  if (!user || !key) {
    console.info("[shipmondo] API-uppgifter saknas — hoppar över");
    return;
  }

  const shipTo = shippingFromSession(input.session);
  if (!shipTo.address1 || !shipTo.zipcode || !shipTo.country_code) {
    console.error("[shipmondo] saknar leveransadress", input.session.id);
    return;
  }

  const sender = splitPostal(company.postal);
  const totalOre = input.productOre + input.shippingOre;
  const template = process.env.SHIPMONDO_TEMPLATE_ID?.trim();

  const payload: Record<string, unknown> = {
    order_id: input.session.id,
    ordered_at: new Date(
      (input.session.created ?? Math.floor(Date.now() / 1000)) * 1000,
    ).toISOString(),
    source_name: "Punkaslangen",
    archived: false,
    ship_to: shipTo,
    bill_to: {
      name: company.legalName,
      address1: company.address,
      zipcode: sender.zip,
      city: sender.city,
      country_code: "SE",
      email: company.email,
    },
    payment_details: {
      amount_excluding_vat: exclVat(totalOre),
      amount_including_vat: (totalOre / 100).toFixed(2),
      authorized_amount: (totalOre / 100).toFixed(2),
      currency_code: "SEK",
      vat_amount: vatAmount(totalOre),
      vat_percent: "0.25",
      payment_method: "stripe",
      transaction_id: input.session.payment_intent
        ? String(input.session.payment_intent)
        : input.session.id,
    },
    order_lines: [
      {
        line_type: "item",
        item_name: PRODUCT.name,
        item_sku: PRODUCT.sku,
        quantity: String(input.quantity),
        unit_price_excluding_vat: exclVat(PRODUCT.priceOre),
        vat_percent: "0.25",
        currency_code: "SEK",
      },
      {
        line_type: "shipping",
        item_name: `Frakt — ${SHIPPING[input.country].label}`,
        quantity: "1.0",
        unit_price_excluding_vat: exclVat(input.shippingOre),
        vat_percent: "0.25",
        currency_code: "SEK",
      },
    ],
  };

  if (template) {
    payload.shipment_template_id = template;
  }

  const auth = Buffer.from(`${user}:${key}`).toString("base64");
  const response = await fetch(
    "https://app.shipmondo.com/api/public/v3/sales_orders",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Shipmondo ${response.status}: ${detail}`);
  }
}

export { hasShipmondo };
