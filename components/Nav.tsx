import Image from "next/image";
import Link from "next/link";
import { OutlinedButton } from "./OutlinedButton";

const links = [
  { href: "/pyspunka", label: "Vid punka" },
  { href: "/instruktioner", label: "Så funkar det" },
  { href: "/om", label: "Om oss" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Punkaslangen"
      width={560}
      height={72}
      className={`object-contain object-left ${className ?? "h-9 w-auto sm:h-11"}`}
      priority
    />
  );
}

export function Nav() {
  return (
    <header className="bg-stone/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-6 py-4 md:px-12">
        <Link href="/" className="shrink-0" aria-label="Punkaslangen hem">
          <Logo className="h-9 w-auto sm:h-11" />
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3">
          <ul className="hidden items-center gap-x-8 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-caption font-bold text-muted transition-colors hover:text-carbon"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <OutlinedButton href="/kop" size="nav">
            Beställ
          </OutlinedButton>
        </div>
      </nav>
    </header>
  );
}
