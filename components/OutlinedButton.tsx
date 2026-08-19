import Link from "next/link";
import type { ComponentProps } from "react";

const className =
  "inline-flex items-center justify-center rounded-pill border-[1.5px] border-voltage-blue bg-transparent px-43 py-14 font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40";

type ButtonAsButton = ComponentProps<"button"> & { href?: undefined };
type ButtonAsLink = Omit<ComponentProps<typeof Link>, "className"> & {
  href: string;
};

export function OutlinedButton(props: ButtonAsButton | ButtonAsLink) {
  if ("href" in props && props.href) {
    const { href, children, ...rest } = props;
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
}
