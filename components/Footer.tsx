import Link from "next/link";
import { company } from "@/lib/company";

const links = [
  { href: "/leverans", label: "Leverans" },
  { href: "/villkor", label: "Villkor" },
  { href: "/integritet", label: "Integritet" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ash px-6 py-43 md:px-12 xl:px-144">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-29 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue">
            {company.name}
          </p>
          <p className="mt-11 max-w-[28rem] font-sans text-body-sm font-light text-ink">
            En 4 meter lång räddare i nöden. 99 kr inkl. moms. Frakt tillkommer.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-29 gap-y-11">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
