import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { BodyCopy } from "@/components/BodyCopy";
import { OutlinedButton } from "@/components/OutlinedButton";

export const metadata: Metadata = {
  title: "Om",
  description: "Historien bakom Punkaslangen — idén från Lugnet.",
};

export default function AboutPage() {
  return (
    <ArticlePage
      title="lugnet"
      cta={<OutlinedButton href="/kop">Beställ</OutlinedButton>}
    >
      <p className="mb-10 text-center text-body-sm font-bold text-ochre">
        Här föddes idén
      </p>
      <BodyCopy>
        <p>
          Punkaslangen kom till för att lösa ett gammalt problem på ett enkelt
          sätt: du ska inte behöva bli stående, och du ska inte behöva bärgning,
          bara för att luften sakta lämnar ett däck.
        </p>
        <p>
          Idén föddes i Lugnet. Resultatet är en 4 meter lång, mjuk gummislang
          med pumpnipplar — en räddare i nöden som hör hemma i varje fordon,
          precis som startkablar.
        </p>
        <p>
          Vi säljer den direkt online. Inköpt från tillverkaren, skickad av oss,
          utan omvägar.
        </p>
      </BodyCopy>
    </ArticlePage>
  );
}
