import type { Metadata } from "next";
import { BodyCopy } from "@/components/BodyCopy";
import { SectionHeadline } from "@/components/SectionHeadline";
import { company } from "@/lib/company";
import { formatSek } from "@/lib/format";
import { PRICE_KR } from "@/lib/product";

export const metadata: Metadata = {
  title: "Köpvillkor",
  description: "Allmänna villkor för köp av Punkaslangen.",
};

export default function TermsPage() {
  return (
    <article className="px-6 py-20 md:px-12 xl:px-144 xl:py-150">
      <SectionHeadline>Köpvillkor</SectionHeadline>
      <div className="mt-35">
        <BodyCopy>
          <p>
            Säljare: {company.legalName}, org.nr {company.orgNr}, {company.address},{" "}
            {company.postal}, {company.country}. E-post {company.email}.
          </p>
          <p>
            Punkaslangen säljs för {formatSek(PRICE_KR)} inklusive 25&nbsp;%
            moms. Frakt tillkommer enligt sidan Leverans och visas innan
            betalning.
          </p>
          <p>
            Avtal ingås när betalningen godkänns via Stripe. Vi reserverar oss
            för slutförsäljning och eventuella fel i prisuppgifter.
          </p>
          <p>
            Du har 14 dagars ångerrätt från den dag du tar emot varan. Meddela
            oss på {company.email} och returnera produkten. Vi återbetalar via
            samma betalningssätt när vi tagit emot returen.
          </p>
          <p>
            Reklamation av felaktig vara görs utan dröjsmål till {company.email}.
            Konsumentköplagen gäller.
          </p>
          <p>
            Produktsäkerhet (GPSR): {company.responsiblePerson}.
          </p>
          <p>Svensk rätt tillämpas. Tvist prövas av Allmänna reklamationsnämnden eller svensk allmän domstol.</p>
        </BodyCopy>
      </div>
    </article>
  );
}
