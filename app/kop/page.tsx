import type { Metadata } from "next";
import { BuyForm } from "./BuyForm";
import { BodyCopy } from "@/components/BodyCopy";
import { SectionHeadline } from "@/components/SectionHeadline";
import { formatSek } from "@/lib/format";
import { PRICE_KR } from "@/lib/product";
import { hasStripe } from "@/lib/stripe";
import { getAvailableStock } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Beställ",
  description: "Beställ Punkaslangen. 99 kr inkl. moms. Frakt tillkommer.",
};

export default async function BuyPage() {
  const stock = await getAvailableStock();
  const stripeConfigured = hasStripe();

  return (
    <article className="px-6 py-20 md:px-12 xl:px-144 xl:py-150">
      <SectionHeadline>Beställ</SectionHeadline>
      <div className="mt-35">
        <BodyCopy>
          <p>
            Punkaslangen, {formatSek(PRICE_KR)} inkl. 25&nbsp;% moms. Frakt
            tillkommer beroende på land. Vi skickar inom Sverige och Norden.
          </p>
        </BodyCopy>
      </div>
      <div className="mt-35">
        <BuyForm stock={stock} stripeConfigured={stripeConfigured} />
      </div>
      {stock > 0 && stock <= 8 ? (
        <p className="mt-29 text-center font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue">
          {stock} kvar i lager
        </p>
      ) : null}
    </article>
  );
}
