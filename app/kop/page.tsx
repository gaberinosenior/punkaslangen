import type { Metadata } from "next";
import { BuyForm } from "./BuyForm";
import { BodyCopy } from "@/components/BodyCopy";
import { ProductPhoto } from "@/components/ProductPhoto";
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
    <>
      <section className="bg-ochre px-6 py-16 md:px-12">
        <SectionHeadline>beställ</SectionHeadline>
      </section>
      <section className="bg-stone px-6 py-24 md:px-12">
        <ProductPhoto />
        <div className="mt-10">
          <BodyCopy>
            <p>
              Punkaslangen, {formatSek(PRICE_KR)} inkl. 25&nbsp;% moms. Frakt
              tillkommer beroende på land. Vi skickar inom Sverige och Norden.
            </p>
          </BodyCopy>
        </div>
        <div className="mt-10">
          <BuyForm stock={stock} stripeConfigured={stripeConfigured} />
        </div>
        {stock > 0 && stock <= 8 ? (
          <p className="mt-7 text-center text-caption font-bold text-ochre">
            {stock} kvar i lager
          </p>
        ) : null}
      </section>
    </>
  );
}
