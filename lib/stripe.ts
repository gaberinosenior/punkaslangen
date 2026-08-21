import Stripe from "stripe";
import { publicSiteUrl } from "@/lib/site";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env["STRIPE_SECRET_KEY"]?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY saknas");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export function hasStripe(): boolean {
  const key = process.env["STRIPE_SECRET_KEY"]?.trim();
  return Boolean(key);
}

export function siteUrl(): string {
  return publicSiteUrl();
}

/** Prefer the browser origin on localhost so Stripe does not return to a dead port. */
export function checkoutReturnUrl(request: Request): string {
  const configured = siteUrl();
  const originHeader = request.headers.get("origin");
  if (!originHeader) return configured;

  try {
    const origin = new URL(originHeader);
    const expected = new URL(configured);
    const localHost = (host: string) =>
      host === "localhost" || host === "127.0.0.1";
    if (localHost(origin.hostname) && localHost(expected.hostname)) {
      return origin.origin;
    }
  } catch {
    return configured;
  }

  return configured;
}
