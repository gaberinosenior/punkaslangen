type Props = {
  label: string;
  value: string;
  align?: "left" | "right" | "center";
};

export function MetadataLabel({ label, value, align = "center" }: Props) {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  return (
    <div className={alignClass}>
      <p className="font-sans text-[14px] font-light uppercase tracking-[-0.02em] text-voltage-blue">
        {label}
      </p>
      <p className="mt-7 font-sans text-body-lg font-light tracking-[-0.02em] text-voltage-blue">
        {value}
      </p>
    </div>
  );
}
