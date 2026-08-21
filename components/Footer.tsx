import Link from "next/link";
import { company } from "@/lib/company";
import { formatSek } from "@/lib/format";
import { PRICE_KR } from "@/lib/product";
import { Logo } from "./Nav";

const links = [
  { href: "/pyspunka", label: "Vid punka" },
  { href: "/instruktioner", label: "Så funkar det" },
  { href: "/om", label: "Om oss" },
  { href: "/leverans", label: "Leverans" },
  { href: "/villkor", label: "Villkor" },
  { href: "/integritet", label: "Integritet" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-carbon px-6 py-16 text-paper md:px-12">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo className="h-9 w-auto" />
          <p className="mt-4 max-w-[28rem] text-caption text-paper/80">
            En 4 meter lång räddare i nöden. {formatSek(PRICE_KR)} inkl. moms.
            Frakt tillkommer.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-caption font-bold text-paper transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-[1200px] text-caption text-ash">
        {company.email}
      </p>
    </footer>
  );
}
