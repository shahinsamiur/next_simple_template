
import Link from "next/link";

import { FOOTER_CONFIG, FOOTER_COLUMNS } from "@/mocks/footer";

export default function Footer() {
  const { brand, watermark } = FOOTER_CONFIG;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-bold text-foreground">
              {brand.name}
            </p>

            <p className="mt-3 max-w-55 text-sm text-muted">
              {brand.tagline}
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                {column.title}
              </p>

              <ul className="mt-4 flex flex-col items-start gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden border-t border-border">
        <p
          aria-hidden="true"
          className="translate-y-[18%] select-none text-center font-heading text-(length:--font-size-footer-watermark) font-bold leading-none text-foreground/4"
        >
          {watermark}
        </p>
      </div>
    </footer>
  );
}
