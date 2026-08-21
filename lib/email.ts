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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function receiptFields(order: OrderEmail) {
  const totalOre = order.productOre + order.shippingOre;
  const vat = PRODUCT.vatPercent;
  return {
    date: receiptDate(),
    totalOre,
    vat,
    total: formatSek(oreToKr(totalOre)),
    product: formatSek(oreToKr(order.productOre)),
    shipping: formatSek(oreToKr(order.shippingOre)),
    excl: formatSekOre(exclVatOre(totalOre, vat)),
    vatAmount: formatSekOre(vatOre(totalOre, vat)),
    countryLabel: SHIPPING[order.country].label,
    ref: orderReference(order.sessionId, order.paymentIntentId),
    buyer: order.customerName?.trim() || "Kund",
    thanks: `Tack för din beställning${order.customerName ? `, ${order.customerName}` : ""}!`,
  };
}

function customerReceipt(order: OrderEmail): string {
  const f = receiptFields(order);
  return [
    `Kvitto — ${company.name}`,
    f.date,
    "",
    f.thanks,
    "",
    "Säljare",
    company.legalName,
    `Org.nr ${company.orgNr}`,
    company.address,
    `${company.postal}, ${company.country}`,
    company.email,
    "",
    "Köpare",
    f.buyer,
    order.customerEmail,
    "",
    "Rader (priser inkl. moms)",
    `${order.quantity} × ${PRODUCT.name} (${PRODUCT.length}) — ${f.product}`,
    `Frakt — ${f.countryLabel} — ${f.shipping}`,
    "",
    `Belopp exkl. moms — ${f.excl}`,
    `Moms ${f.vat} % — ${f.vatAmount}`,
    `Totalt att betala — ${f.total}`,
    "",
    "Betalsätt: kort via Stripe",
    `Orderreferens: ${f.ref}`,
    "",
    "Vi packar och skickar så snart vi kan. Du får spårning när paketet är på väg.",
  ].join("\n");
}

function customerReceiptHtml(order: OrderEmail): string {
  const f = receiptFields(order);
  const logo = "https://punkaslangen.se/images/logo.png";
  return `<!DOCTYPE html>
<html lang="sv">
<body style="margin:0;padding:24px;background:#ebe4d8;color:#312f27;font-family:Georgia,serif;font-size:16px;line-height:1.5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="background:#d58922;padding:20px 24px;text-align:center;">
        <img src="${logo}" alt="${escapeHtml(company.name)}" width="180" style="display:block;margin:0 auto;max-width:180px;height:auto;border:0;" />
      </td>
    </tr>
    <tr>
      <td style="padding:28px 24px 32px;">
        <p style="margin:0 0 4px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#d58922;">Kvitto och orderbekräftelse</p>
        <h1 style="margin:0 0 8px;font-size:24px;">${escapeHtml(company.name)}</h1>
        <p style="margin:0 0 20px;color:#5c574c;">${escapeHtml(f.date)}</p>
        <p style="margin:0 0 24px;">${escapeHtml(f.thanks)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
          <tr>
            <td style="vertical-align:top;padding:0 12px 0 0;width:50%;">
              <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#8a8478;">Säljare</p>
              <p style="margin:0;">${escapeHtml(company.legalName)}<br />Org.nr ${escapeHtml(company.orgNr)}<br />${escapeHtml(company.address)}<br />${escapeHtml(company.postal)}, ${escapeHtml(company.country)}<br />${escapeHtml(company.email)}</p>
            </td>
            <td style="vertical-align:top;padding:0;width:50%;">
              <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#8a8478;">Köpare</p>
              <p style="margin:0;">${escapeHtml(f.buyer)}<br />${escapeHtml(order.customerEmail)}</p>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ebe4d8;border-bottom:1px solid #ebe4d8;margin:0 0 16px;">
          <tr>
            <td style="padding:12px 0;">${order.quantity} × ${escapeHtml(PRODUCT.name)} (${escapeHtml(PRODUCT.length)})</td>
            <td style="padding:12px 0;text-align:right;">${escapeHtml(f.product)}</td>
          </tr>
          <tr>
            <td style="padding:0 0 12px;">Frakt — ${escapeHtml(f.countryLabel)}</td>
            <td style="padding:0 0 12px;text-align:right;">${escapeHtml(f.shipping)}</td>
          </tr>
        </table>
        <p style="margin:0 0 4px;">Belopp exkl. moms — ${escapeHtml(f.excl)}</p>
        <p style="margin:0 0 4px;">Moms ${f.vat} % — ${escapeHtml(f.vatAmount)}</p>
        <p style="margin:0 0 20px;font-size:18px;"><strong>Totalt att betala — ${escapeHtml(f.total)}</strong></p>
        <p style="margin:0 0 4px;color:#5c574c;">Betalsätt: kort via Stripe</p>
        <p style="margin:0 0 20px;color:#5c574c;">Orderreferens: ${escapeHtml(f.ref)}</p>
        <p style="margin:0;">Vi packar och skickar så snart vi kan. Du får spårning när paketet är på väg.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
      html: customerReceiptHtml(order),
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

export async function sendCustomerReceiptPreview(to: string) {
  const token = process.env.POSTMARK_SERVER_TOKEN?.trim();
  if (!token) {
    throw new Error("POSTMARK_SERVER_TOKEN saknas");
  }
  const order: OrderEmail = {
    customerEmail: to,
    customerName: "Alexander",
    quantity: 1,
    country: "SE",
    productOre: PRODUCT.priceOre,
    shippingOre: SHIPPING.SE.ore,
    sessionId: "preview",
    paymentIntentId: "pi_exempelkvitto",
  };
  await sendPostmark(token, {
    to,
    subject: `Kvitto — ${PRODUCT.name} (exempel)`,
    text: customerReceipt(order),
    html: customerReceiptHtml(order),
    from: fromAddress(),
  });
}

async function sendPostmark(
  token: string,
  message: {
    to: string;
    subject: string;
    text: string;
    from: string;
    html?: string;
  },
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
      HtmlBody: message.html,
      MessageStream: messageStream(),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Postmark ${response.status}: ${detail}`);
  }
}
