import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { BodyCopy } from "@/components/BodyCopy";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Integritet",
  description: "Integritetspolicy för Punkaslangen.",
};

export default function PrivacyPage() {
  return (
    <ArticlePage title="integritet">
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
          Shipmondo. Dessa parter är självständiga personuppgiftsansvariga eller
          personuppgiftsbiträden enligt sina villkor.
        </p>
        <p>
          Orderuppgifter sparas så länge bokföringslagen kräver. Du har rätt att
          begära tillgång, rättelse, radering och begränsning, samt att klaga
          till Integritetsskyddsmyndigheten.
        </p>
        <p>
          Sajten använder endast nödvändiga cookies för att genomföra köp. Ingen
          marknadsföringsprofilering sker i version 1.
        </p>
      </BodyCopy>
    </ArticlePage>
  );
}
