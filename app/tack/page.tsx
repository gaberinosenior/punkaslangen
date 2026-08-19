import type { Metadata } from "next";
import { BodyCopy } from "@/components/BodyCopy";
import { OutlinedButton } from "@/components/OutlinedButton";
import { SectionHeadline } from "@/components/SectionHeadline";
import { formatSek, oreToKr } from "@/lib/format";
import { hasStripe, getStripe } from "@/lib/stripe";
import { SHIPPING, isShippingCountry } from "@/lib/shipping";

export const metadata: Metadata = {
  title: "Tack",
  description: "Tack för din beställning av Punkaslangen.",
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function ThanksPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  let summary: string | null = null;

  if (sessionId && hasStripe()) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      const qty = Number(session.metadata?.quantity ?? 1);
      const country = session.metadata?.country;
      const total = session.amount_total ?? 0;
      const countryLabel =
        country && isShippingCountry(country)
          ? SHIPPING[country].label
          : "Norden";
      summary = `${qty} × Punkaslangen till ${countryLabel}. Betalt ${formatSek(oreToKr(total))}.`;
    } catch {
      summary = null;
    }
  }

  return (
    <article className="px-6 py-20 md:px-12 xl:px-144 xl:py-150">
      <SectionHeadline>Tack</SectionHeadline>
      <div className="mt-35">
        <BodyCopy>
          <p>
            Din beställning är mottagen. En bekräftelse skickas till din e-post
            när betalningen är klar.
          </p>
          {summary ? <p>{summary}</p> : null}
          <p>
            Vi packar och bokar frakt manuellt. Du får spårning när paketet är
            på väg.
          </p>
        </BodyCopy>
      </div>
      <div className="mt-35 flex justify-center">
        <OutlinedButton href="/">Tillbaka hem</OutlinedButton>
      </div>
    </article>
  );
}
