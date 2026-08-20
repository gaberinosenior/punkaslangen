# Punkaslangen

Enprodukts-webshop för Punkaslangen. Next.js på Vercel, Stripe Checkout, frakt via Shipmondo (manuellt i v1).

## Utveckling

```bash
npm install
cp .env.example .env.local
npm run dev
```

Sajten fungerar utan Stripe-nycklar (kassan visar då ett fel). Fyll i nycklarna när ni är redo att ta emot testbetalningar.

## Miljövariabler

| Variabel | Syfte |
| --- | --- |
| `STRIPE_SECRET_KEY` | Stripe hemlig nyckel |
| `STRIPE_WEBHOOK_SECRET` | Webhook-signatur (`whsec_…`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publik Stripe-nyckel (reserv) |
| `STOCK_QUANTITY` | Startsaldo. Sålda ordrar räknas från completed Stripe-sessioner |
| `POSTMARK_SERVER_TOKEN` | Server-token från Postmark (egen server för Punkaslangen) |
| `POSTMARK_FROM` | Avsändare, tillsvidare `Punkaslangen <alexander@magaconsulting.se>` |
| `POSTMARK_MESSAGE_STREAM` | Stream-id, oftast `outbound` |
| `ORDER_NOTIFY_EMAIL` | Er ordernotis |
| `NEXT_PUBLIC_SITE_URL` | Publik URL, t.ex. `https://punkaslangen.vercel.app` |
| `NEXT_PUBLIC_VIMEO_ID` | Endast id:t, t.ex. `123456789` |

Säljare är Quick2prep AB. Bolagsuppgifter och tillverkare (GPSR) ligger i `lib/company.ts`.

## Stripe

Använd ett **eget Stripe-konto** för Punkaslangen (Create account i Dashboard), inte live-nycklarna från en annan butik. Börja i **testläge**. Rör inte den andra butikens webhook-URL:er.

Kassan skapar priser i Checkout och rör inte befintliga Products. Webhook och lager räknar bara sessioner med `metadata.sku = punkaslangen`.

1. Nytt konto, valuta SEK. Hämta testnycklar (`sk_test_…`, `pk_test_…`).
2. Aktivera Klarna och Swish när ni går live, om de finns för kontot.
3. Webhook mot `https://<er-url>/api/webhooks/stripe` för `checkout.session.completed`. Ny endpoint — ändra inte den andra butikens.
4. Lokalt: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.

## Mejl (Postmark)

Egen Postmark-server för Punkaslangen. Avsändare just nu: `alexander@magaconsulting.se` (enda verifierade signaturen på kontot). Mottagare för ordernotis: `hej@quick2prep.se`. När one.com-inlogget finns: Postmark TXT för `punkaslangen.se` och byt avsändare till `hej@punkaslangen.se`. Rör inte A/CNAME förrän DNS ska pekas om till Vercel.

## Frakt

Ni packar själva. Etikett bokas i [Shipmondo](https://shipmondo.com/se/) (inbyggda priser, inget eget PostNord-avtal krävs i början). Ingen frankeringsmaskin behövs — en vanlig A4-skrivare räcker. Lämna paketet hos PostNord-ombud eller boka upphämtning.

Fasta priser i kassan: SE 49 kr, DK/FI 99 kr, NO 129 kr. Norge är utanför EU — hantera VOEC/tull innan ni säljer dit på riktigt.

## Deploy

Bygget är Vercel-klart (`npm run build` går igenom). Preview-URL får ni när ni kopplar projektet:

1. Skapa ett GitHub-repo och pusha `master`.
2. Importera repot på [vercel.com/new](https://vercel.com/new).
3. Sätt miljövariablerna ovan. `NEXT_PUBLIC_SITE_URL` ska vara preview-URL:en (`https://….vercel.app`) tills DNS pekas om.
4. Stripe-webhook: `https://<er-url>/api/webhooks/stripe` för `checkout.session.completed`.

`npx vercel` kräver inloggning (`vercel login`). Anonym deploy av Next.js 16 via CLI är inte pålitlig — använd Git-kopplingen.

Befintlig sajt på punkaslangen.se lämnas orörd tills ni har domäninlogg och byter A/CNAME till Vercel.

## Design

Cream `#ebe4d8` (stone), ockra `#d58922`, text `#312f27` (carbon). Manrope i UI. Ockrafärgade pill-knappar.
