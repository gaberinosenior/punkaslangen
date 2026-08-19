import type { Metadata } from "next";
import { BodyCopy } from "@/components/BodyCopy";
import { SectionHeadline } from "@/components/SectionHeadline";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Integritet",
  description: "Integritetspolicy för Punkaslangen.",
};

export default function PrivacyPage() {
  return (
    <article className="px-6 py-20 md:px-12 xl:px-144 xl:py-150">
      <SectionHeadline>Integritet</SectionHeadline>
      <div className="mt-35">
        <BodyCopy>
          <p>
            Personuppgiftsansvarig: {company.legalName}, org.nr {company.orgNr},{" "}
            {company.email}.
          </p>
          <p>
            Vi behandlar namn, e-post, leveransadress och orderuppgifter för att
            fullgöra köpet, skicka varan och hantera returer. Rättslig grund är
            avtal och, där det krävs, rättslig förpliktelse (bokföring).
          </p>
          <p>
            Betalningen hanteras av Stripe. Frakt bokas hos transportör via
            Shipmondo. Dessa parter är självständiga personuppgiftsansvariga
            eller personuppgiftsbiträden enligt sina villkor.
          </p>
          <p>
            Orderuppgifter sparas så länge bokföringslagen kräver. Du har rätt
            att begära tillgång, rättelse, radering och begränsning, samt att
            klaga till Integritetsskyddsmyndigheten.
          </p>
          <p>
            Sajten använder endast nödvändiga cookies för att genomföra köp.
            Ingen marknadsföringsprofilering sker i version 1.
          </p>
        </BodyCopy>
      </div>
    </article>
  );
}
