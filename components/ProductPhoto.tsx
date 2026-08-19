import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

export function ProductPhoto({ className, priority = false }: Props) {
  return (
    <div
      className={`relative mx-auto flex w-full max-w-[480px] items-end justify-center ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="absolute bottom-[6%] left-1/2 h-[18%] w-[70%] -translate-x-1/2 rounded-[100%] bg-carbon/15 blur-md"
      />
      <Image
        src="/images/punkaslangen-cutout.png"
        alt="Punkaslangen, 4 meter flätad slang med ventilnipplar"
        width={500}
        height={350}
        className="relative z-10 h-auto w-full object-contain"
        priority={priority}
      />
    </div>
  );
}
