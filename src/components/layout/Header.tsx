"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

import { HEADER_CONFIG, NAV_LINKS } from "@/mocks/nav";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { brand, cta, menu } = HEADER_CONFIG;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href={brand.href} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-background">
              {brand.logo}
            </div>

            <span className="text-xl font-bold tracking-tight">
              {brand.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href={cta.href}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-background transition-opacity hover:opacity-80"
            >
              {cta.label}
            </Link>
          </div>

          <button
            type="button"
            className="p-2 text-foreground lg:hidden"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-label={isOpen ? menu.closeLabel : menu.openLabel}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-background p-6 lg:hidden"
        >
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-base font-medium text-muted transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href={cta.href}
              className="mt-4 rounded-xl bg-primary px-5 py-3 text-center text-sm font-bold text-background transition-opacity hover:opacity-80"
              onClick={() => setIsOpen(false)}
            >
              {cta.label}
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
