import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { BodyCopy } from "@/components/BodyCopy";
import { OutlinedButton } from "@/components/OutlinedButton";
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
    <ArticlePage
      title="tack"
      cta={<OutlinedButton href="/">Tillbaka hem</OutlinedButton>}
    >
      <BodyCopy>
        <p>
          Din beställning är mottagen. En bekräftelse skickas till din e-post när
          betalningen är klar.
        </p>
        {summary ? <p>{summary}</p> : null}
        <p>
          Vi packar och bokar frakt manuellt. Du får spårning när paketet är på
          väg.
        </p>
      </BodyCopy>
    </ArticlePage>
  );
}
