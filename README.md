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
| `RESEND_API_KEY` | Transaktionsmejl |
| `RESEND_FROM` | Avsändare, måste vara verifierad hos Resend |
| `ORDER_NOTIFY_EMAIL` | Er ordernotis |
| `NEXT_PUBLIC_SITE_URL` | Publik URL, t.ex. `https://punkaslangen.vercel.app` |
| `NEXT_PUBLIC_VIMEO_ID` | Endast id:t, t.ex. `123456789` |

Bolagsuppgifter (org.nr, adress, GPSR) är placeholders i `lib/company.ts` tills ni har dem.

## Stripe

1. Skapa konto, valuta SEK.
2. Aktivera Klarna och Swish i Dashboard om de finns för kontot. `automatic_payment_methods` plockar upp det som är påslaget (kort, Apple Pay, Google Pay, m.fl.).
3. Webhook mot `/api/webhooks/stripe` för eventet `checkout.session.completed`.
4. Lokalt: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.

## Frakt

Ni packar själva. Efter order: boka etikett i [Shipmondo](https://shipmondo.com/se/) (inbyggda priser, inget eget PostNord-avtal krävs i början) och lämna paketet.

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
