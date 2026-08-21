import { PRICE_KR, PRODUCT } from "@/lib/product";
import { SHIPPING } from "@/lib/shipping";
import { getAvailableStock } from "@/lib/stock";

export const dynamic = "force-dynamic";

const SITE = "https://punkaslangen.se";

function xml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function money(kr: number) {
  return `${kr.toFixed(2)} SEK`;
}

export async function GET() {
  let availability = "in_stock";
  try {
    const stock = await getAvailableStock();
    availability = stock > 0 ? "in_stock" : "out_of_stock";
  } catch {
    availability = "in_stock";
  }

  const shipping = (["SE", "DK", "FI"] as const)
    .map(
      (country) => `      <g:shipping>
        <g:country>${country}</g:country>
        <g:service>Standard</g:service>
        <g:price>${money(SHIPPING[country].ore / 100)}</g:price>
      </g:shipping>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xml(PRODUCT.name)}</title>
    <link>${SITE}</link>
    <description>${xml(PRODUCT.description)}</description>
    <item>
      <g:id>${xml(PRODUCT.sku)}</g:id>
      <g:title>${xml(`${PRODUCT.name} — ${PRODUCT.tagline}`)}</g:title>
      <g:description>${xml(PRODUCT.description)}</g:description>
      <g:link>${SITE}/kop</g:link>
      <g:image_link>${SITE}/images/punkaslangen.png</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${money(PRICE_KR)}</g:price>
      <g:brand>${xml(PRODUCT.name)}</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:mpn>${xml(PRODUCT.sku)}</g:mpn>
      <g:google_product_category>Vehicles &amp; Parts &gt; Vehicle Maintenance, Care &amp; Decor &gt; Vehicle Repair &amp; Specialty Tools</g:google_product_category>
${shipping}
    </item>
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
