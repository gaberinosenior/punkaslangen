import { revalidateTag, unstable_cache } from "next/cache";
import { hasStripe, getStripe } from "./stripe";

const STOCK_TAG = "stock";

export function initialStock(): number {
  const raw = process.env.STOCK_QUANTITY;
  const parsed = raw ? Number(raw) : 50;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 50;
}

async function countSoldFromStripe(): Promise<number> {
  if (!hasStripe()) return 0;

  const stripe = getStripe();
  let sold = 0;
  let startingAfter: string | undefined;
  let pages = 0;

  while (pages < 20) {
    const sessions = await stripe.checkout.sessions.list({
      status: "complete",
      limit: 100,
      starting_after: startingAfter,
    });

    for (const session of sessions.data) {
      const qty = Number(session.metadata?.quantity ?? 1);
      sold += Number.isFinite(qty) && qty > 0 ? qty : 1;
    }

    if (!sessions.has_more || sessions.data.length === 0) break;
    startingAfter = sessions.data[sessions.data.length - 1]?.id;
    pages += 1;
  }

  return sold;
}

const getSoldCached = unstable_cache(countSoldFromStripe, ["sold-count"], {
  tags: [STOCK_TAG],
  revalidate: 60,
});

export async function getAvailableStock(): Promise<number> {
  const initial = initialStock();
  try {
    const sold = await getSoldCached();
    return Math.max(0, initial - sold);
  } catch {
    return initial;
  }
}

export async function revalidateStock() {
  revalidateTag(STOCK_TAG, "max");
}
