"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV, SITE, TEMPLATE_GITHUB } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 h-20 border-b border-hairline bg-bg/95 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between gap-4 px-6 sm:px-20">
        <Link href="/" className="wordmark text-[15px] font-bold no-underline">
          {SITE.wordmark}
        </Link>
        <nav className="hidden items-center gap-7 text-[14px] md:flex">
          {NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted no-underline hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={TEMPLATE_GITHUB}
            className="btn hidden sm:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            Clone
            <span aria-hidden>→</span>
          </a>
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-px w-4 bg-fg" />
            <span className="block h-px w-4 bg-fg" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-hairline bg-bg px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-[14px]">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-fg no-underline"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={TEMPLATE_GITHUB}
              className="btn w-fit"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Clone
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
