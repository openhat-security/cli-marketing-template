"use client";

import { useState } from "react";
import { CopyCommand } from "@/components/copy-command";
import { MacTerminal } from "@/components/mac-terminal";
import { TerminalOutput } from "@/components/terminal-output";
import { TOOLS } from "@/lib/site";

export function ToolsTabs() {
  const [active, setActive] = useState(0);
  const tab = TOOLS[active] ?? TOOLS[0];

  return (
    <section className="section !py-4 sm:!py-8" id="tools">
      <h2 className="section-title !mb-1 !text-[13px] sm:!text-[16px]">
        Demo CLI — help · man · filter · select
      </h2>
      <p className="mb-3 max-w-[42rem] text-[12px] text-muted sm:mb-4 sm:text-[13px]">
        jq is the sample command. These stills are real 1.7.1 sessions so you can
        see how --help, man, and JSON sit in the chrome.
      </p>

      <div
        role="tablist"
        aria-label="Help, man, filter, and select"
        className="flex gap-0.5 border-b border-hairline"
      >
        {TOOLS.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tool-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`tool-panel-${item.id}`}
              onClick={() => setActive(index)}
              className={`cursor-pointer px-3 py-1.5 text-[12px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand sm:px-4 sm:py-2 sm:text-[13px] ${
                selected
                  ? "border-b-2 border-brand font-medium text-brand"
                  : "border-b-2 border-transparent text-muted hover:text-fg"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`tool-panel-${tab.id}`}
        aria-labelledby={`tool-tab-${tab.id}`}
        className="pt-4"
      >
        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="min-w-0">
            <h3 className="m-0 text-[14px] font-bold text-fg sm:text-[15px]">
              {tab.title}
            </h3>
            <p className="mt-1 text-[12px] leading-5 text-muted sm:text-[13px] sm:leading-6">
              {tab.lead}
            </p>
            <ul className="mt-3 list-none space-y-1.5 p-0 text-[12px] leading-5 sm:text-[13px] sm:leading-6">
              {tab.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="star !mr-0 shrink-0">[*]</span>
                  <span className="text-muted">{point}</span>
                </li>
              ))}
            </ul>
            <a
              href={tab.href}
              className="btn btn-outline mt-3 !px-2.5 !py-1 !text-[12px]"
              target="_blank"
              rel="noreferrer"
            >
              {tab.cta}
              <span aria-hidden>→</span>
            </a>
          </div>

          <MacTerminal title={tab.terminalTitle}>
            <TerminalOutput session={tab.session} />
          </MacTerminal>
        </div>

        <CopyCommand command={tab.command} compact className="mt-3" />
      </div>
    </section>
  );
}
