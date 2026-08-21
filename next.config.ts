import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "www.punkaslangen.se" }],
        destination: "https://punkaslangen.se/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.punkaslangen.se" }],
        destination: "https://punkaslangen.se/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
