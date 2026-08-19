"use client";

import dynamic from "next/dynamic";
import { HoseSvg } from "./HoseSvg";

const Viewer = dynamic(
  () => import("./ProductViewer").then((mod) => mod.ProductViewer),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto flex h-[min(52vw,420px)] w-full max-w-[720px] items-center justify-center">
        <HoseSvg className="h-full w-full" />
      </div>
    ),
  },
);

export function ProductViewerLazy() {
  return <Viewer />;
}
