import { CopyCommand } from "@/components/copy-command";
import { STEPS, TEMPLATE_README } from "@/lib/site";

export function GetStarted() {
  return (
    <section className="section !py-4 sm:!py-8" id="get-started">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 sm:mb-4">
        <h2 className="section-title !mb-0 !text-[13px] sm:!text-[16px]">
          Get started in 3 commands
        </h2>
        <a
          href={TEMPLATE_README}
          className="text-[11px] text-muted no-underline hover:text-brand"
          target="_blank"
          rel="noreferrer"
        >
          Template README
        </a>
      </div>

      <ol className="m-0 grid list-none gap-2 p-0 sm:gap-3">
        {STEPS.map((step) => (
          <li key={step.n} className="min-w-0">
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-[10px] font-bold tracking-[0.14em] text-brand">
                {step.n}.
              </span>
              <h3 className="m-0 text-[12px] font-bold text-fg sm:text-[13px]">
                {step.title}
              </h3>
            </div>
            <CopyCommand command={step.command} compact />
          </li>
        ))}
      </ol>
    </section>
  );
}
