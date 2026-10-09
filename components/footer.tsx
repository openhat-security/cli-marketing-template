import {
  DOCS,
  GITHUB,
  OPENCODE,
  RELEASES,
  SITE,
  TEMPLATE_GITHUB,
  TEMPLATE_README,
} from "@/lib/site";
import { formatCount } from "@/lib/github";

export function Footer({ stars }: { stars: number }) {
  const cells = [
    { href: TEMPLATE_GITHUB, label: "Template" },
    { href: GITHUB, label: stars ? `Demo CLI [${formatCount(stars)}]` : "Demo CLI" },
    { href: DOCS, label: "jq manual" },
    { href: RELEASES, label: "jq releases" },
    { href: TEMPLATE_README, label: "README" },
  ];

  return (
    <>
      <footer className="grid grid-cols-1 border-t border-hairline sm:grid-cols-5">
        {cells.map((cell) => (
          <a
            key={cell.label}
            href={cell.href}
            target="_blank"
            rel="noreferrer"
            className="border-t border-hairline px-4 py-8 text-center text-[14px] text-muted no-underline first:border-t-0 hover:bg-wash hover:text-brand hover:underline sm:border-t-0 sm:border-l sm:first:border-l-0"
          >
            {cell.label}
          </a>
        ))}
      </footer>
      <div className="flex flex-wrap items-center justify-center gap-8 px-6 py-8 text-[13px] text-muted">
        <span>
          © {SITE.year} {SITE.copyright}
        </span>
        <a href={TEMPLATE_README} className="text-muted no-underline hover:underline" target="_blank" rel="noreferrer">
          README
        </a>
        <a href={TEMPLATE_GITHUB} className="text-muted no-underline hover:underline" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={OPENCODE} className="text-muted no-underline hover:underline" target="_blank" rel="noreferrer">
          Inspired by opencode.ai
        </a>
      </div>
    </>
  );
}
