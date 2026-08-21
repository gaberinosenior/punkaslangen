import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PRODUCT } from "@/lib/product";

export const alt = "Punkaslangen — första hjälpen vid pyspunka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ebe4d8",
        }}
      >
        <img
          src={logoSrc}
          width={920}
          height={118}
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            marginTop: 36,
            color: "#312f27",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {PRODUCT.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
