import type { ReactNode } from "react";

export function BodyCopy({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[600px] space-y-29 text-center font-sans text-body font-normal leading-[1.5] tracking-[-0.02em] text-ink">
      {children}
    </div>
  );
}
