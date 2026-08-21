import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { sendOrderEmails } from "@/lib/email";
import { isShippingCountry } from "@/lib/shipping";
import { isPunkaslangenOrder, PRODUCT } from "@/lib/product";
import { getStripe, hasStripe } from "@/lib/stripe";
import { createShipmondoOrder } from "@/lib/shipmondo";
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
    if (!isPunkaslangenOrder(session.metadata)) {
      return NextResponse.json({ received: true, ignored: true });
    }
    const quantity = Number(session.metadata?.quantity ?? 1);
    const countryRaw = session.metadata?.country ?? "SE";
    const country = isShippingCountry(countryRaw) ? countryRaw : "SE";
    const shippingOre = SHIPPING[country].ore;
    const qty = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
    const productOre = PRODUCT.priceOre * qty;

    const fullSession = await getStripe().checkout.sessions.retrieve(
      session.id,
      { expand: ["payment_intent"] },
    );
    const email = fullSession.customer_details?.email;

    await revalidateStock();

    try {
      await createShipmondoOrder({
        session: fullSession,
        quantity: qty,
        country,
        productOre,
        shippingOre,
      });
    } catch (error) {
      console.error("[webhook] shipmondo failed", error);
    }

    if (email) {
      try {
        const paymentIntent = fullSession.payment_intent;
        const paymentIntentId =
          typeof paymentIntent === "string"
            ? paymentIntent
            : paymentIntent?.id;
        await sendOrderEmails({
          customerEmail: email,
          customerName: fullSession.customer_details?.name,
          quantity: qty,
          country,
          productOre,
          shippingOre,
          sessionId: session.id,
          paymentIntentId,
        });
      } catch (error) {
        console.error("[webhook] email failed", error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
