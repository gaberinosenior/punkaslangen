import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { BodyCopy } from "@/components/BodyCopy";
import { JsonLd } from "@/components/JsonLd";
import { OutlinedButton } from "@/components/OutlinedButton";
import { howToNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Så använder du Punkaslangen",
  description:
    "Så kopplar du punkaslangen vid pyspunka: friskt däck, läckande däck, två–tre minuter. Sedan vidare till verkstad.",
  alternates: { canonical: "/instruktioner" },
};

export default function InstructionsPage() {
  return (
    <ArticlePage
      title="instruktioner"
      cta={<OutlinedButton href="/kop">Beställ</OutlinedButton>}
    >
      <JsonLd data={{ "@context": "https://schema.org", ...howToNode() }} />
      <BodyCopy>
        <p>
          Montera Punkaslangen mellan det punkterade däcket och ett däck med
          lufttryck. Vänta cirka tre minuter. När lufttrycket utjämnats mellan
          däcken kopplar du från slangen och kör fordonet vidare — med
          reducerad hastighet — till närmaste verkstad.
        </p>
        <p>
          Kom ihåg att fylla på luft i det däck du lånade från. Det räcker att
          låna från ett hjul, men det går att låna från fler än ett.
        </p>
        <p>
          Om punkteringen är lite svårare och luften pyser ut under färd kan det
          vara nödvändigt att stanna på vägen till verkstan och låna mer luft
          från något av de återstående däcken.
        </p>
        <p>
          Sätt ut varningstriangel och använd varningsljus medan du för över
          luft, om du står på en trafikerad väg.
        </p>
        <p>
          Du kan låna luft från ett reservhjul, andra fordon och andra
          fordonstyper. Från en bil till en cykel, från en traktor till en
          båttrailer, och så vidare.
        </p>
        <p>
          Punkaslangen fungerar på det mesta med luftgummihjul — bilar, bussar,
          lastbilar, traktorer, skottkärror, motorcyklar, hästtransporter,
          båttrailers, cyklar, fyrhjulingar och pirror — eftersom de delar samma
          standardventil. Vissa cyklar har en lite mindre ventil. Då behövs en
          liten, billig adapter, samma som på macken.
        </p>
        <p>
          Punkaslangen är tillverkad för att användas om och om igen. Den
          förvaras inne i fordonet, till exempel i handskfacket. Den fungerar i
          alla väder och behöver ingen el.
        </p>
      </BodyCopy>
    </ArticlePage>
  );
}
