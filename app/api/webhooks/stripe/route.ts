import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { sendOrderEmails } from "@/lib/email";
import { isShippingCountry } from "@/lib/shipping";
import { PRODUCT } from "@/lib/product";
import { getStripe, hasStripe } from "@/lib/stripe";
import { revalidateStock } from "@/lib/stock";
import { SHIPPING } from "@/lib/shipping";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasStripe() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook är inte konfigurerad." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Saknar signatur." }, { status: 400 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return NextResponse.json({ error: "Ogiltig signatur." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const quantity = Number(session.metadata?.quantity ?? 1);
    const countryRaw = session.metadata?.country ?? "SE";
    const country = isShippingCountry(countryRaw) ? countryRaw : "SE";
    const email = session.customer_details?.email;
    const shippingOre = SHIPPING[country].ore;
    const productOre = PRODUCT.priceOre * (Number.isFinite(quantity) ? quantity : 1);

    await revalidateStock();

    if (email) {
      await sendOrderEmails({
        customerEmail: email,
        customerName: session.customer_details?.name,
        quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
        country,
        productOre,
        shippingOre,
        sessionId: session.id,
      });
    }
  }

  return NextResponse.json({ received: true });
}
