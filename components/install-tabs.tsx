"use client";

import { useCallback, useState } from "react";
import { INSTALL_TABS } from "@/lib/site";

function emphasize(command: string, token: string) {
  const i = command.indexOf(token);
  if (i === -1) return command;
  return (
    <>
      {command.slice(0, i)}
      <strong className="font-bold text-brand">{token}</strong>
      {command.slice(i + token.length)}
    </>
  );
}

export function InstallTabs() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const tab = INSTALL_TABS[active] ?? INSTALL_TABS[0];

  const select = useCallback((index: number) => {
    setActive(index);
    setCopied(false);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(tab.command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative z-10">
      <div
        role="tablist"
        aria-label="Install commands"
        className="flex overflow-x-auto border border-hairline border-b-0 bg-bg-elevated [border-radius:6px_6px_0_0]"
      >
        {INSTALL_TABS.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`install-tab-${item.id}`}
              onClick={() => select(index)}
              className={`cursor-pointer shrink-0 px-3.5 py-2 text-[12px] transition-colors sm:px-4 sm:py-2.5 sm:text-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand ${
                isActive
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
        aria-labelledby={`install-tab-${tab.id}`}
        className="border border-hairline bg-[color-mix(in_srgb,var(--bg)_70%,#000)]"
      >
        <button
          type="button"
          onClick={copy}
          className="flex w-full cursor-pointer items-start justify-between gap-4 px-4 py-3 text-left text-[13px] leading-7 text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand sm:text-[14px]"
          aria-label="Copy install command"
        >
          <code className="whitespace-pre-wrap break-all">
            {emphasize(tab.command, tab.emphasis)}
          </code>
          <span className={copied ? "text-brand" : "text-muted"} aria-hidden>
            {copied ? "✓" : "⧉"}
          </span>
        </button>
      </div>
    </div>
  );
}
