type Props = {
  children: string;
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "md" | "sm";
  tone?: "carbon" | "paper" | "ochre";
};

const sizes = {
  lg: "text-[clamp(2.2rem,6vw,3.5625rem)] leading-[1.1] font-extrabold lowercase",
  md: "text-[clamp(1.8rem,4vw,2.55rem)] leading-[1.1] font-extrabold lowercase",
  sm: "text-[clamp(1.4rem,3vw,1.8rem)] leading-[1.2] font-extrabold",
};

const tones = {
  carbon: "text-carbon",
  paper: "text-paper",
  ochre: "text-ochre",
};

export function SectionHeadline({
  children,
  as: Tag = "h2",
  size = "lg",
  tone = "carbon",
}: Props) {
  return (
    <Tag
      className={`text-center tracking-[-0.007em] ${sizes[size]} ${tones[tone]}`}
    >
      {children}
    </Tag>
  );
}
