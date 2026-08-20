import { NextResponse } from "next/server";
import { PRODUCT } from "@/lib/product";
import { isShippingCountry, SHIPPING } from "@/lib/shipping";
import { getStripe, hasStripe, checkoutReturnUrl } from "@/lib/stripe";
import { getAvailableStock } from "@/lib/stock";

export async function POST(request: Request) {
  if (!hasStripe()) {
    return NextResponse.json(
      { error: "Stripe är inte konfigurerat." },
      { status: 503 },
    );
  }

  let body: { quantity?: unknown; country?: unknown };
  try {
    body = (await request.json()) as { quantity?: unknown; country?: unknown };
  } catch {
    return NextResponse.json({ error: "Ogiltig begäran." }, { status: 400 });
  }

  const quantity = Number(body.quantity);
  const country = typeof body.country === "string" ? body.country : "";

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return NextResponse.json({ error: "Ogiltigt antal." }, { status: 400 });
  }

  if (!isShippingCountry(country)) {
    return NextResponse.json({ error: "Ogiltigt land." }, { status: 400 });
  }

  const stock = await getAvailableStock();
  if (stock <= 0) {
    return NextResponse.json({ error: "Slutsåld." }, { status: 409 });
  }
  if (quantity > stock) {
    return NextResponse.json(
      { error: `Bara ${stock} kvar i lager.` },
      { status: 409 },
    );
  }

  const shipping = SHIPPING[country];
  const stripe = getStripe();
  const origin = checkoutReturnUrl(request);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "sv",
    success_url: `${origin}/tack?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/kop`,
    customer_creation: "always",
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    shipping_address_collection: {
      allowed_countries: [country],
    },
    metadata: {
      sku: PRODUCT.sku,
      quantity: String(quantity),
      country,
    },
    payment_intent_data: {
      metadata: {
        sku: PRODUCT.sku,
      },
    },
    line_items: [
      {
        quantity,
        price_data: {
          currency: PRODUCT.currency,
          unit_amount: PRODUCT.priceOre,
          tax_behavior: "inclusive",
          product_data: {
            name: PRODUCT.name,
            description: `${PRODUCT.length}. ${PRODUCT.tagline}.`,
          },
        },
      },
      {
        quantity: 1,
        price_data: {
          currency: PRODUCT.currency,
          unit_amount: shipping.ore,
          tax_behavior: "inclusive",
          product_data: {
            name: `Frakt — ${shipping.label}`,
          },
        },
      },
    ],
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Kunde inte skapa kassasession." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: session.url });
}
