import { BodyCopy } from "@/components/BodyCopy";
import { Callout } from "@/components/Callout";
import { CarIllustration, TractorIllustration } from "@/components/Illustrations";
import { OutlinedButton } from "@/components/OutlinedButton";
import { ProductPhoto } from "@/components/ProductPhoto";
import { SectionHeadline } from "@/components/SectionHeadline";
import { VimeoEmbed } from "@/components/VimeoEmbed";
import { formatSek } from "@/lib/format";
import { PRICE_KR, PRODUCT } from "@/lib/product";
import { getAvailableStock } from "@/lib/stock";

const steps = [
  { n: "01", title: "Friskt däck" },
  { n: "02", title: "Pyspunkan" },
  { n: "03", title: "2–3 min" },
];

const facts = [
  { label: "Längd", value: "4 meter" },
  { label: "El", value: "Ingen" },
  { label: "Väder", value: "Alla" },
  { label: "Plats", value: "Handskfacket" },
];

export default async function HomePage() {
  const stock = await getAvailableStock();
  const soldOut = stock <= 0;
  const vimeoId = process.env.NEXT_PUBLIC_VIMEO_ID || PRODUCT.vimeoId;

  return (
    <>
      <section className="relative overflow-hidden bg-stone px-6 pb-16 pt-4 md:px-12">
        <CarIllustration className="pointer-events-none absolute -left-8 bottom-0 hidden w-[42%] max-w-[380px] opacity-90 md:block" />
        <TractorIllustration className="pointer-events-none absolute -right-10 bottom-2 hidden w-[38%] max-w-[340px] opacity-90 md:block" />
        <div className="relative z-10">
          <ProductPhoto priority />
          <h1 className="mt-6 text-center text-[clamp(1.75rem,4.5vw,2.35rem)] font-bold leading-tight text-carbon">
            Slipp bärgning. Slipp bli ståendes.
          </h1>
          <div className="mt-8 flex justify-center">
            {soldOut ? (
              <p className="font-bold text-carbon">Slutsåld</p>
            ) : (
              <OutlinedButton href="/kop" size="hero">
                Beställ — {formatSek(PRICE_KR)}
              </OutlinedButton>
            )}
          </div>
        </div>
      </section>

      <section className="bg-ochre px-6 py-20 md:px-12 md:py-28">
        <p className="mx-auto max-w-[1100px] text-center text-[clamp(2.6rem,9vw,4.25rem)] font-extrabold lowercase leading-none tracking-[-0.007em] text-carbon">
          punkaslangen
        </p>
        <div className="mt-8">
          <BodyCopy>
            <p>
              Första hjälpen vid pyspunka. En 4 meter lång gummislang med
              pumpnipplar — lika självklar i bilen som ett par startkablar.
            </p>
          </BodyCopy>
        </div>
        <div className="mt-8">
          <Callout>Ingen el. Inget krångel. Bara luft från däck till däck.</Callout>
        </div>
      </section>

      <section className="bg-stone px-6 py-20 md:px-12 md:py-24">
        <SectionHeadline>tre enkla steg</SectionHeadline>
        <ol className="mx-auto mt-12 flex max-w-[900px] flex-col gap-3 sm:flex-row sm:gap-0">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className="flex flex-1 items-center gap-4 rounded-card bg-white/50 px-5 py-5 sm:flex-col sm:rounded-none sm:text-center first:sm:rounded-l-card last:sm:rounded-r-card"
            >
              <span className="text-heading font-extrabold text-ochre">{step.n}</span>
              {i < steps.length - 1 ? (
                <span className="hidden h-px w-full bg-ochre/40 sm:block" />
              ) : null}
              <h3 className="text-subheading font-bold text-carbon">{step.title}</h3>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <BodyCopy>
            <p>
              Anslut ett friskt däck, koppla på pyspunkan, vänta två–tre minuter.
              Koppla bort slangen och kör vidare — med sänkt fart — till
              verkstad.
            </p>
          </BodyCopy>
        </div>
      </section>

      <section className="overflow-hidden bg-carbon px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <CarIllustration className="w-full max-w-[420px] justify-self-start" />
          <p className="text-center text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold lowercase leading-tight text-ochre">
            från bil
            <br />
            till traktor
          </p>
          <TractorIllustration className="w-full max-w-[420px] justify-self-end" />
        </div>
        <p className="mx-auto mt-8 max-w-[560px] text-center text-body text-paper/90">
          Samma standardventil. Nästan alla fordon i hela världen.
        </p>
      </section>

      <section className="bg-fog px-6 py-20 md:px-12 md:py-24">
        <SectionHeadline>se hur det går till</SectionHeadline>
        <div className="mt-10">
          <VimeoEmbed videoId={vimeoId} />
        </div>
      </section>

      <section className="bg-stone px-6 py-20 md:px-12 md:py-24">
        <SectionHeadline>lika självklar som startkablar</SectionHeadline>
        <dl className="mx-auto mt-12 grid max-w-[640px] grid-cols-2 gap-px overflow-hidden rounded-card bg-carbon/10">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-stone px-5 py-6 text-center">
              <dt className="text-caption font-bold text-muted">{fact.label}</dt>
              <dd className="mt-2 text-[1.15rem] font-extrabold leading-snug text-carbon">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-12">
          <BodyCopy>
            <p>
              Låna luft från ett reservhjul, en annan bil eller en traktor. Samma
              ventil — nästan överallt.
            </p>
          </BodyCopy>
        </div>
        <div className="mt-10 flex justify-center">
          {soldOut ? (
            <p className="font-bold text-carbon">Slutsåld just nu</p>
          ) : (
            <OutlinedButton href="/kop" size="hero">
              Till kassan
            </OutlinedButton>
          )}
        </div>
      </section>
    </>
  );
}
