import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/stripe";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [
    "",
    "/instruktioner",
    "/om",
    "/kop",
    "/leverans",
    "/villkor",
    "/integritet",
  ];

  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    changeFrequency: path === "" || path === "/kop" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
