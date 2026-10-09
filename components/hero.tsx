import { InstallTabs } from "@/components/install-tabs";
import { MacTerminal } from "@/components/mac-terminal";
import { TerminalOutput } from "@/components/terminal-output";
import { HERO_SESSION } from "@/lib/demos";
import { CHIPS, SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="section border-t-0 !py-8 sm:!py-12">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0 text-left">
          <p className="mb-2 text-[11px] font-bold tracking-[0.28em] text-brand">
            WEB TEMPLATE
          </p>
          <h1 className="m-0 text-[24px] font-bold leading-[1.2] tracking-tight sm:text-[34px] sm:leading-[1.15]">
            {SITE.tagline[0]}
            <br />
            {SITE.tagline[1]}
            <br />
            {SITE.tagline[2]}
          </h1>
          <p className="mt-4 max-w-[36rem] text-[13px] leading-6 text-muted sm:text-[14px] sm:leading-7">
            {SITE.description}
          </p>
        </div>

        <div className="relative min-w-0">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.16),transparent_68%)]"
          />
          <MacTerminal title={HERO_SESSION.title}>
            <TerminalOutput session={HERO_SESSION} />
          </MacTerminal>
        </div>
      </div>

      <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-2 p-0">
        {CHIPS.map((chip) => (
          <li
            key={chip.label}
            className="inline-flex items-center gap-2 rounded-md border border-hairline bg-bg-elevated/80 px-2.5 py-1.5"
          >
            <span className="text-[11px] font-semibold leading-none text-brand">
              {chip.label}
            </span>
            <span className="text-[10px] leading-none text-muted">
              {chip.hint}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 sm:mt-8" id="install">
        <p className="mb-2 text-[11px] text-muted">
          Demo install — these commands install <strong className="text-fg">jq</strong>,
          the sample CLI. They do not install this template.
        </p>
        <InstallTabs />
      </div>
    </section>
  );
}
