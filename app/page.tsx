import { BodyCopy } from "@/components/BodyCopy";
import { MetadataLabel } from "@/components/MetadataLabel";
import { OutlinedButton } from "@/components/OutlinedButton";
import { ProductViewerLazy } from "@/components/ProductViewerLazy";
import { SectionHeadline } from "@/components/SectionHeadline";
import { VimeoEmbed } from "@/components/VimeoEmbed";
import { formatSek } from "@/lib/format";
import { PRICE_KR, PRODUCT } from "@/lib/product";
import { getAvailableStock } from "@/lib/stock";

const steps = [
  {
    n: "01",
    title: "Anslut ett friskt däck",
    body: "Skruva på den ena nippeln på ett däck med luft — reservhjul, annat fordon eller ett av de kvarvarande hjulen.",
  },
  {
    n: "02",
    title: "Anslut däcket med pyspunka",
    body: "Koppla den andra änden till det däck som läcker. Punkaslangen passar internationell standardventil.",
  },
  {
    n: "03",
    title: "Vänta 2–3 minuter",
    body: "När trycket utjämnats kopplar du bort slangen och kör vidare, med reducerad hastighet, till närmaste verkstad.",
  },
];

const facts = [
  { label: "Längd", value: PRODUCT.length },
  { label: "El", value: "Ingen" },
  { label: "Väder", value: "Alla" },
  { label: "Förvaring", value: "Handskfacket" },
];

export default async function HomePage() {
  const stock = await getAvailableStock();
  const soldOut = stock <= 0;
  const vimeoId = process.env.NEXT_PUBLIC_VIMEO_ID;

  return (
    <>
      <section className="px-6 py-20 md:px-12 xl:px-144 xl:py-150">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-35 md:flex-row md:items-end md:justify-between">
          <MetadataLabel label="Pris" value={formatSek(PRICE_KR)} align="left" />
          <p className="text-center font-sans text-body-lg font-light uppercase tracking-[-0.02em] text-voltage-blue">
            {PRODUCT.tagline}
          </p>
          <MetadataLabel label="Längd" value={PRODUCT.length} align="right" />
        </div>

        <h1 className="mt-35 text-center font-display text-[clamp(3.4rem,12vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.02em] text-voltage-blue">
          Punkaslangen
        </h1>

        <div className="mt-35">
          <ProductViewerLazy />
        </div>

        <p className="mx-auto mt-35 max-w-[600px] text-center font-sans text-body-lg font-light text-voltage-blue">
          Slipp bärgning. Slipp bli ståendes.
        </p>

        <div className="mt-35 flex justify-center">
          {soldOut ? (
            <p className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue">
              Slutsåld
            </p>
          ) : (
            <OutlinedButton href="/kop">Beställ — {formatSek(PRICE_KR)}</OutlinedButton>
          )}
        </div>
      </section>

      <section className="border-t border-ash px-6 py-20 md:px-12 xl:px-144 xl:py-150">
        <SectionHeadline>En enkel lösning på ett gammalt problem</SectionHeadline>
        <div className="mt-35">
          <BodyCopy>
            <p>
              Punkaslangen är som första hjälpen vid pyspunka. En 4 meter lång,
              extra smidig och mjuk gummislang med pumpnipplar — lika självklar i
              bilen som ett par startkablar.
            </p>
            <p>
              Fungerar mellan alla däck som har internationell standardventil.
              Nästan alla fordon i hela världen.
            </p>
          </BodyCopy>
        </div>
      </section>

      <section className="border-t border-ash px-6 py-20 md:px-12 xl:px-144 xl:py-150">
        <SectionHeadline>Tre enkla steg</SectionHeadline>
        <ol className="mx-auto mt-35 grid max-w-[1200px] gap-43 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="border border-ash p-14 text-center">
              <p className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue">
                {step.n}
              </p>
              <h3 className="mt-20 font-sans text-subheading font-light tracking-[-0.02em] text-voltage-blue">
                {step.title}
              </h3>
              <p className="mt-20 font-sans text-body font-normal text-ink">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-ash px-6 py-20 md:px-12 xl:px-144 xl:py-150">
        <SectionHeadline>Se hur det går till</SectionHeadline>
        <div className="mt-35">
          <VimeoEmbed videoId={vimeoId} />
        </div>
      </section>

      <section className="border-t border-ash px-6 py-20 md:px-12 xl:px-144 xl:py-150">
        <SectionHeadline>Lika självklar som startkablar</SectionHeadline>
        <dl className="mx-auto mt-35 grid max-w-[900px] grid-cols-2 gap-px bg-ash md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-cream px-14 py-30 text-center">
              <dt className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue">
                {fact.label}
              </dt>
              <dd className="mt-11 font-sans text-subheading font-light text-voltage-blue">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-35">
          <BodyCopy>
            <p>
              Låna luft från ett reservhjul, ett annat fordon eller till och med
              en annan fordonstyp. Från bil till cykel, från traktor till
              båttrailer. Vissa cyklar har en mindre ventil — då behövs samma
              lilla adapter som på macken.
            </p>
          </BodyCopy>
        </div>
        <div className="mt-35 flex justify-center">
          {soldOut ? (
            <p className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue">
              Slutsåld just nu
            </p>
          ) : (
            <OutlinedButton href="/kop">Till kassan</OutlinedButton>
          )}
        </div>
      </section>
    </>
  );
}
