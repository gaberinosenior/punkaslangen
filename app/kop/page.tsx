import type { Metadata } from "next";
import { BuyForm } from "./BuyForm";
import { BodyCopy } from "@/components/BodyCopy";
import { ProductPhoto } from "@/components/ProductPhoto";
import { SectionHeadline } from "@/components/SectionHeadline";
import { formatSek } from "@/lib/format";
import { PRICE_KR } from "@/lib/product";
import { getAvailableStock } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Beställ punkaslang",
  description:
    "Köp Punkaslangen — 4 m punkaslang vid pyspunka. 129 kr inkl. moms. Frakt till Sverige och Norden.",
  alternates: { canonical: "/kop" },
};

export const dynamic = "force-dynamic";

export default async function BuyPage() {
  const stock = await getAvailableStock();

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
          <BuyForm stock={stock} />
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
