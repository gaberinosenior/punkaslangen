const APEX = "https://punkaslangen.se";

export function publicSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  if (process.env.VERCEL_ENV === "production") {
    return APEX;
  }

  if (env) return env;

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
