import type { Metadata } from "next";
import { BodyCopy } from "@/components/BodyCopy";
import { OutlinedButton } from "@/components/OutlinedButton";
import { SectionHeadline } from "@/components/SectionHeadline";

export const metadata: Metadata = {
  title: "Om",
  description: "Historien bakom Punkaslangen — idén från Lugnet.",
};

export default function AboutPage() {
  return (
    <article className="px-6 py-20 md:px-12 xl:px-144 xl:py-150">
      <SectionHeadline>Lugnet</SectionHeadline>
      <div className="mt-11 text-center">
        <p className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue">
          Här föddes idén
        </p>
      </div>
      <div className="mt-35">
        <BodyCopy>
          <p>
            Punkaslangen kom till för att lösa ett gammalt problem på ett
            enkelt sätt: du ska inte behöva bli stående, och du ska inte behöva
            bärgning, bara för att luften sakta lämnar ett däck.
          </p>
          <p>
            Idén föddes i Lugnet. Resultatet är en 4 meter lång, mjuk gummislang
            med pumpnipplar — en räddare i nöden som hör hemma i varje fordon,
            precis som startkablar.
          </p>
          <p>
            Vi säljer den direkt online. Inköpt från tillverkaren, skickad av
            oss, utan omvägar.
          </p>
        </BodyCopy>
      </div>
      <div className="mt-35 flex justify-center">
        <OutlinedButton href="/kop">Beställ</OutlinedButton>
      </div>
    </article>
  );
}
