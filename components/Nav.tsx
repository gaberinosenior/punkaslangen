import Link from "next/link";

const links = [
  { href: "/", label: "Hem" },
  { href: "/instruktioner", label: "Så funkar det" },
  { href: "/om", label: "Om" },
  { href: "/kop", label: "Beställ" },
];

export function Nav() {
  return (
    <header className="border-b-[1.5px] border-ash">
      <nav className="flex items-center justify-between gap-20 px-6 py-29 md:px-12 xl:px-144">
        <Link
          href="/"
          className="font-sans text-body-sm font-light uppercase tracking-[-0.02em] text-voltage-blue"
        >
          Punkaslangen
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-x-29 gap-y-11">
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
      </nav>
    </header>
  );
}
