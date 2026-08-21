import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage } from "@/components/ArticlePage";
import { BodyCopy } from "@/components/BodyCopy";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { OutlinedButton } from "@/components/OutlinedButton";

export const metadata: Metadata = {
  title: "Pyspunka på vägen",
  description:
    "Fått pyspunka eller punktering? Så kommer du vidare utan bärgning — och när du ändå behöver däckverkstad eller bärgare.",
  alternates: { canonical: "/pyspunka" },
};

const steps = [
  {
    q: "Pyspunka eller totalt tomt däck?",
    a: "Pyspunka är när luften läcker långsamt — du hör det, eller märker att bilen drar snett. Då kan du låna luft från ett annat däck med Punkaslangen. Är däcket helt platt, avsitet eller har en stor skada lagar slangen ingenting. Då är det bärgning.",
  },
  {
    q: "Stanna säkert först",
    a: "Varningstriangel, varningsljus, reflexväst om du har. Stå inte i körfältet. Punkaslangen tar ett par minuter — det ska ske där det är tryggt.",
  },
  {
    q: "Låna luft, kör till verkstad",
    a: "Koppla slangen mellan ett friskt däck och pyspunkan. Vänta 2–3 minuter. Kör vidare med sänkt fart till närmaste däckverkstad. Slangen är första hjälpen, inte en reparation. Hålet finns kvar.",
  },
];

export default function PunctureGuidePage() {
  return (
    <ArticlePage
      title="vid pyspunka"
      cta={<OutlinedButton href="/kop">Beställ Punkaslangen</OutlinedButton>}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: steps.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <BodyCopy>
        <p>
          De flesta som söker däckverkstad i mobilens GPS har redan fått punka.
          Om det är pyspunka — luften pyser ut långsamt — behöver du inte sitta
          och vänta på bärgare. Du behöver luft nog att rulla till verkstaden.
        </p>
        <h2 className="text-heading-sm font-extrabold">Vad är pyspunka?</h2>
        <p>
          En spik, en skruv eller ett långsamt läckage vid ventilen. Däcket blir
          mjukt under färd, men det är inte avsitet. Det är just det scenariot
          Punkaslangen är gjord för: en punkaslang som överför luft från ett
          friskt däck till det som läcker.
        </p>
        <h2 className="text-heading-sm font-extrabold">När räcker inte slangen?</h2>
        <p>
          Sprucket däck, avsiten slanga, eller så lite luft kvar att fälgen tar
          i asfalten. Då ska du inte köra. Ring bärgning. Punkaslangen ersätter
          inte däckverkstad, kompressor eller reservhjul — den tar dig dit när
          pyspunkan annars skulle stoppa resan.
        </p>
        <h2 className="text-heading-sm font-extrabold">Så gör du på plats</h2>
        <p>
          Sätt ut varningstriangel. Anslut Punkaslangen till ett däck med tryck
          (ett annat hjul, reservhjul, eller en medtrafikant som stannar) och
          till pyspunkan. Vänta två–tre minuter. Koppla bort, kör sakta, fyll på
          det däck du lånade från så snart du kan.
        </p>
        <h2 className="text-heading-sm font-extrabold">
          Däckverkstad kommer ändå
        </h2>
        <p>
          Verkstaden hittar hålet, lagar eller byter. Det ni vinner är tiden på
          vägrenen: ingen bärgning, ingen helt förstörd fälg av att köra på
          tomt däck, ingen semester som stannar på E4:an.
        </p>
        <p>
          Steg för steg med nippeln finns under{" "}
          <Link href="/instruktioner" className="font-bold underline">
            instruktioner
          </Link>
          .
        </p>
      </BodyCopy>
      <FaqList items={steps} />
    </ArticlePage>
  );
}
