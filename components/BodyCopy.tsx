import type { ReactNode } from "react";

export function BodyCopy({
  children,
  tone = "carbon",
}: {
  children: ReactNode;
  tone?: "carbon" | "paper";
}) {
  return (
    <div
      className={`mx-auto max-w-[640px] space-y-6 text-center text-body ${tone === "paper" ? "text-paper" : "text-carbon"}`}
    >
      {children}
    </div>
  );
}
