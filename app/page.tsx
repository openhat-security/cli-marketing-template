import { Collaborate } from "@/components/collaborate";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { GetStarted } from "@/components/get-started";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MacTerminal } from "@/components/mac-terminal";
import { RepoPulseSection } from "@/components/repo-pulse";
import { ToolsTabs } from "@/components/tools-tabs";
import { TerminalOutput } from "@/components/terminal-output";
import { QUICKSTART_OUTPUT } from "@/lib/demos";
import { getRepoPulse } from "@/lib/github";
import { DOCS, FEATURES, SITE } from "@/lib/site";

export default async function Home() {
  const pulse = await getRepoPulse();

  return (
    <div className="frame">
      <Header />

      <Hero />

      <section className="section !py-4 sm:!py-12">
        <MacTerminal title={`${SITE.cli} — quickstart`}>
          <TerminalOutput text={QUICKSTART_OUTPUT} />
        </MacTerminal>
      </section>

      <section className="section !py-4 sm:!py-12">
        <h2 className="section-title !mb-2 !text-[13px] sm:!mb-3 sm:!text-[16px]">
          What is {SITE.cli}?
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
          href={DOCS}
          className="btn mt-4 !px-2.5 !py-1.5 !text-[12px] sm:mt-8 sm:!px-[0.85rem] sm:!py-2 sm:!text-[14px]"
          target="_blank"
          rel="noreferrer"
        >
          Read docs
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
