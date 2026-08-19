import type { ReactNode } from "react";
import { SectionHeadline } from "./SectionHeadline";

export function ArticlePage({
  title,
  children,
  cta,
}: {
  title: string;
  children: ReactNode;
  cta?: ReactNode;
}) {
  return (
    <>
      <section className="bg-ochre px-6 py-16 md:px-12">
        <SectionHeadline>{title}</SectionHeadline>
      </section>
      <section className="bg-stone px-6 py-24 md:px-12">
        {children}
        {cta ? <div className="mt-10 flex justify-center">{cta}</div> : null}
      </section>
    </>
  );
}
