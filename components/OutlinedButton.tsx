import Link from "next/link";
import type { ComponentProps } from "react";

const sizes = {
  nav: "rounded-nav px-[16px] py-[8px] text-caption shadow-[0_1px_4px_rgba(0,0,0,0.2)]",
  default:
    "rounded-pill px-7 py-3.5 text-body-sm shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
  hero: "rounded-hero px-7 py-3.5 text-body shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
};

const className =
  "inline-flex items-center justify-center bg-ochre font-bold text-paper transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40";

type Size = keyof typeof sizes;

type ButtonAsButton = ComponentProps<"button"> & {
  href?: undefined;
  size?: Size;
};
type ButtonAsLink = Omit<ComponentProps<typeof Link>, "className"> & {
  href: string;
  size?: Size;
};

function withoutSize<T extends { size?: Size }>(props: T) {
  const copy = { ...props };
  delete copy.size;
  return copy;
}

export function OutlinedButton(props: ButtonAsButton | ButtonAsLink) {
  const classes = `${className} ${sizes[props.size ?? "default"]}`;

  if ("href" in props && props.href) {
    const { href, children, ...rest } = withoutSize(props);
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, type = "button", ...rest } = withoutSize(
    props as ButtonAsButton,
  );
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
