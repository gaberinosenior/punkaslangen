import { company } from "./company";
import { PRODUCT } from "./product";
import {
  exclVatOre,
  formatSek,
  formatSekOre,
  oreToKr,
  vatOre,
} from "./format";
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
  paymentIntentId?: string | null;
};

function fromAddress(): string {
  return (
    process.env.POSTMARK_FROM?.trim() ||
    `${company.name} <${company.email}>`
  );
}

function notifyAddress(): string | undefined {
  return process.env.ORDER_NOTIFY_EMAIL?.trim() || undefined;
}

function messageStream(): string {
  return process.env.POSTMARK_MESSAGE_STREAM?.trim() || "outbound";
}

function orderReference(sessionId: string, paymentIntentId?: string | null): string {
  if (paymentIntentId?.trim()) return paymentIntentId.trim();
  if (sessionId.length <= 24) return sessionId;
  return sessionId.slice(-24);
}

function receiptDate(now = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "long",
    timeZone: "Europe/Stockholm",
  }).format(now);
}

function customerReceipt(order: OrderEmail): string {
  const totalOre = order.productOre + order.shippingOre;
  const vat = PRODUCT.vatPercent;
  const total = formatSek(oreToKr(totalOre));
  const product = formatSek(oreToKr(order.productOre));
  const shipping = formatSek(oreToKr(order.shippingOre));
  const countryLabel = SHIPPING[order.country].label;
  const ref = orderReference(order.sessionId, order.paymentIntentId);
  const buyer = order.customerName?.trim() || "Kund";

  return [
    `Kvitto — ${company.name}`,
    receiptDate(),
    "",
    `Tack för din beställning${order.customerName ? `, ${order.customerName}` : ""}!`,
    "",
    "Säljare",
    company.legalName,
    `Org.nr ${company.orgNr}`,
    company.address,
    `${company.postal}, ${company.country}`,
    company.email,
    "",
    "Köpare",
    buyer,
    order.customerEmail,
    "",
    "Rader (priser inkl. moms)",
    `${order.quantity} × ${PRODUCT.name} (${PRODUCT.length}) — ${product}`,
    `Frakt — ${countryLabel} — ${shipping}`,
    "",
    `Belopp exkl. moms — ${formatSekOre(exclVatOre(totalOre, vat))}`,
    `Moms ${vat} % — ${formatSekOre(vatOre(totalOre, vat))}`,
    `Totalt att betala — ${total}`,
    "",
    "Betalsätt: kort via Stripe",
    `Orderreferens: ${ref}`,
    "",
    "Vi packar och skickar så snart vi kan. Du får spårning när paketet är på väg.",
  ].join("\n");
}

export async function sendOrderEmails(order: OrderEmail) {
  const token = process.env.POSTMARK_SERVER_TOKEN?.trim();
  const total = formatSek(oreToKr(order.productOre + order.shippingOre));
  const product = formatSek(oreToKr(order.productOre));
  const shipping = formatSek(oreToKr(order.shippingOre));
  const countryLabel = SHIPPING[order.country].label;
  const customerBody = customerReceipt(order);

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

  if (!token) {
    console.info("[email] POSTMARK_SERVER_TOKEN saknas — mejl loggas istället");
    console.info(customerBody);
    console.info(ownerBody);
    return;
  }

  const from = fromAddress();
  const errors: string[] = [];

  try {
    await sendPostmark(token, {
      to: order.customerEmail,
      subject: `Kvitto — ${PRODUCT.name}`,
      text: customerBody,
      from,
    });
  } catch (error) {
    errors.push(`kund: ${error instanceof Error ? error.message : "okänt fel"}`);
  }

  const notify = notifyAddress();
  if (notify) {
    try {
      await sendPostmark(token, {
        to: notify,
        subject: `Ny order: ${order.quantity} × ${PRODUCT.name}`,
        text: ownerBody,
        from,
      });
    } catch (error) {
      errors.push(`notis: ${error instanceof Error ? error.message : "okänt fel"}`);
    }
  }

  if (errors.length > 0) {
    console.error("[email]", errors.join(" | "));
  }
}

async function sendPostmark(
  token: string,
  message: { to: string; subject: string; text: string; from: string },
) {
  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: message.from,
      To: message.to,
      Subject: message.subject,
      TextBody: message.text,
      MessageStream: messageStream(),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Postmark ${response.status}: ${detail}`);
  }
}
