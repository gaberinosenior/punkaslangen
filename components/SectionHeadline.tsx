type Props = {
  children: string;
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "md" | "sm";
};

const sizes = {
  lg: "text-[clamp(2.75rem,8vw,4.8125rem)] leading-[0.95]",
  md: "text-[clamp(2.4rem,6vw,3.875rem)] leading-[1]",
  sm: "text-[clamp(1.75rem,4vw,2.375rem)] leading-[1.2]",
};

export function SectionHeadline({ children, as: Tag = "h2", size = "lg" }: Props) {
  return (
    <Tag
      className={`font-display font-normal text-voltage-blue tracking-[-0.02em] text-center ${sizes[size]}`}
    >
      {children}
    </Tag>
  );
}
