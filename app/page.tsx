import { Banner } from "@/components/banner";
import { Collaborate } from "@/components/collaborate";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { GetStarted } from "@/components/get-started";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MacTerminal } from "@/components/mac-terminal";
import { RepoPulseSection } from "@/components/repo-pulse";
import { TerminalOutput } from "@/components/terminal-output";
import { ToolsTabs } from "@/components/tools-tabs";
import { QUICKSTART_SESSION } from "@/lib/demos";
import { getRepoPulse } from "@/lib/github";
import { FEATURES, SITE, TEMPLATE_README } from "@/lib/site";

export default async function Home() {
  const pulse = await getRepoPulse();

  return (
    <div className="frame">
      <Banner />
      <Header />

      <Hero />

      <section className="section !py-4 sm:!py-12">
        <p className="mb-3 text-[11px] text-muted">
          Sample session — replace <code className="text-fg">lib/demos.ts</code> with
          your CLI’s output.
        </p>
        <MacTerminal title={QUICKSTART_SESSION.title}>
          <TerminalOutput session={QUICKSTART_SESSION} />
        </MacTerminal>
      </section>

      <section className="section !py-4 sm:!py-12">
        <h2 className="section-title !mb-2 !text-[13px] sm:!mb-3 sm:!text-[16px]">
          What is this template?
        </h2>
        <p className="mb-4 max-w-[42rem] text-[12px] leading-5 text-muted sm:mb-8 sm:text-[15px] sm:leading-7">
          {SITE.whatIs}
        </p>
        <ul className="m-0 list-none p-0 text-[12px] leading-5 sm:text-[15px] sm:leading-7">
          {FEATURES.map((item) => (
            <li key={item.title} className="flex gap-2 py-1.5 sm:gap-3 sm:py-3">
              <span className="star !mr-0 shrink-0">[*]</span>
              <p className="m-0">
                <strong className="font-bold">{item.title}</strong> {item.body}
              </p>
            </li>
          ))}
        </ul>
        <a
          href={TEMPLATE_README}
          className="btn mt-4 !px-2.5 !py-1.5 !text-[12px] sm:mt-8 sm:!px-[0.85rem] sm:!py-2 sm:!text-[14px]"
          target="_blank"
          rel="noreferrer"
        >
          Template README
          <span aria-hidden>→</span>
        </a>
      </section>

      <GetStarted />

      <ToolsTabs />

      <RepoPulseSection pulse={pulse} />

      <Faq />

      <Collaborate />

      <Footer stars={pulse.stars} />
    </div>
  );
}
