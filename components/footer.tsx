import {
  CHANGELOG,
  CONTRIBUTING,
  DOCS,
  GITHUB,
  LICENSE,
  RELEASES,
  SITE,
} from "@/lib/site";
import { formatCount } from "@/lib/github";

export function Footer({ stars }: { stars: number }) {
  const cells = [
    { href: GITHUB, label: stars ? `GitHub [${formatCount(stars)}]` : "GitHub" },
    { href: DOCS, label: "Docs" },
    { href: CHANGELOG, label: "Changelog" },
    { href: RELEASES, label: "Releases" },
    { href: CONTRIBUTING, label: "Contributing" },
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
        <a href={LICENSE} className="text-muted no-underline hover:underline" target="_blank" rel="noreferrer">
          MIT
        </a>
        <a href={GITHUB} className="text-muted no-underline hover:underline" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </>
  );
}
