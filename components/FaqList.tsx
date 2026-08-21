type Item = { q: string; a: string };

export function FaqList({ items }: { items: readonly Item[] }) {
  return (
    <dl className="mx-auto mt-12 max-w-[720px] divide-y divide-carbon/10 overflow-hidden rounded-card bg-white/50">
      {items.map((item) => (
        <div key={item.q} className="px-6 py-6 md:px-8">
          <dt className="text-subheading font-bold text-carbon">{item.q}</dt>
          <dd className="mt-3 text-body-sm text-carbon/90">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}
