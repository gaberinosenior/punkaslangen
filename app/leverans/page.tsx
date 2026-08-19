import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { BodyCopy } from "@/components/BodyCopy";
import { formatSek } from "@/lib/format";
import { shippingKr } from "@/lib/shipping";

export const metadata: Metadata = {
  title: "Leverans",
  description: "Frakt, leveranstider och returer för Punkaslangen.",
};

export default function ShippingPage() {
  return (
    <ArticlePage title="leverans">
      <BodyCopy>
        <p>
          Vi packar själva och skickar med PostNord via Shipmondo. Frakt
          tillkommer alltid — den ingår inte i produktpriset.
        </p>
        <p>
          Sverige {formatSek(shippingKr("SE"))} · Danmark och Finland{" "}
          {formatSek(shippingKr("DK"))} · Norge {formatSek(shippingKr("NO"))}.
        </p>
        <p>
          Leverans inom Sverige tar normalt 1–3 vardagar efter att paketet
          lämnats. Till Danmark och Finland något längre. Norge ligger utanför
          EU; importavgifter kan tillkomma.
        </p>
        <p>
          Du har 14 dagars ångerrätt enligt distansavtalslagen. Produkten ska
          returneras i väsentligen oförändrat skick. Returfrakten betalas av
          köparen om inte varan är felaktig.
        </p>
      </BodyCopy>
    </ArticlePage>
  );
}
