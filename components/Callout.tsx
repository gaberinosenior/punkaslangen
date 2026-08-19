export function Callout({ children }: { children: string }) {
  return (
    <p className="relative mx-auto max-w-[28rem] rounded-[10px] bg-sand px-6 py-5 text-center text-caption text-carbon">
      {children}
      <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-sand" />
    </p>
  );
}
