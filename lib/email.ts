import { Resend } from "resend";
import { company } from "./company";
import { PRODUCT } from "./product";
import { formatSek, oreToKr } from "./format";
import type { ShippingCountry } from "./shipping";
import { SHIPPING } from "./shipping";

type OrderEmail = {
  customerEmail: string;
  customerName?: string | null;
  quantity: number;
  country: ShippingCountry;
  productOre: number;
  shippingOre: number;
  sessionId: string;
};

function fromAddress(): string {
  return process.env.RESEND_FROM || `${company.name} <${company.email}>`;
}

function notifyAddress(): string | undefined {
  return process.env.ORDER_NOTIFY_EMAIL;
}

export async function sendOrderEmails(order: OrderEmail) {
  const key = process.env.RESEND_API_KEY;
  const total = formatSek(oreToKr(order.productOre + order.shippingOre));
  const product = formatSek(oreToKr(order.productOre));
  const shipping = formatSek(oreToKr(order.shippingOre));
  const countryLabel = SHIPPING[order.country].label;

  const customerBody = [
    `Tack för din beställning${order.customerName ? `, ${order.customerName}` : ""}!`,
    "",
    `${order.quantity} × ${PRODUCT.name} — ${product}`,
    `Frakt (${countryLabel}) — ${shipping}`,
    `Totalt — ${total} (inkl. moms)`,
    "",
    "Vi packar och skickar så snart vi kan. Du får spårning när paketet är på väg.",
    "",
    `Orderreferens: ${order.sessionId}`,
    "",
    company.name,
    company.email,
  ].join("\n");

  const ownerBody = [
    "Ny order på Punkaslangen",
    "",
    `Kund: ${order.customerName || "—"} <${order.customerEmail}>`,
    `Antal: ${order.quantity}`,
    `Land: ${countryLabel}`,
    `Produkt: ${product}`,
    `Frakt: ${shipping}`,
    `Totalt: ${total}`,
    `Stripe: ${order.sessionId}`,
    "",
    "Boka etikett i Shipmondo och lämna paketet.",
  ].join("\n");

  if (!key) {
    console.info("[email] RESEND_API_KEY saknas — mejl loggas istället");
    console.info(customerBody);
    console.info(ownerBody);
    return;
  }

  const resend = new Resend(key);
  const from = fromAddress();

  await resend.emails.send({
    from,
    to: order.customerEmail,
    subject: `Tack för din beställning — ${PRODUCT.name}`,
    text: customerBody,
  });

  const notify = notifyAddress();
  if (notify) {
    await resend.emails.send({
      from,
      to: notify,
      subject: `Ny order: ${order.quantity} × ${PRODUCT.name}`,
      text: ownerBody,
    });
  }
}
