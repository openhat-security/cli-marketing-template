"use client";

import { useCallback, useState } from "react";

type Props = {
  command: string;
  className?: string;
  compact?: boolean;
};

export function CopyCommand({
  command,
  className = "",
  compact = false,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [command]);

  return (
    <div className={`group relative w-full ${className}`}>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
        className={`flex w-full cursor-pointer items-center overflow-hidden rounded-md border border-hairline bg-[color-mix(in_srgb,var(--bg)_55%,#000)] text-left transition-colors hover:border-brand/45 hover:bg-[color-mix(in_srgb,var(--bg)_40%,#000)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-px disabled:cursor-not-allowed disabled:opacity-45 ${
          compact
            ? "gap-2 px-2.5 py-1.5"
            : "gap-3 px-3 py-3 sm:px-4"
        }`}
      >
        <span className="shrink-0 select-none text-brand" aria-hidden>
          $
        </span>
        <code
          className={`min-w-0 flex-1 overflow-x-auto whitespace-pre text-fg ${
            compact
              ? "text-[11px] leading-5 sm:text-[12px]"
              : "text-[12px] leading-6 sm:text-[13px]"
          }`}
        >
          {command}
        </code>
        <span
          className={`ml-1 inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent transition-all sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 ${
            compact ? "h-6 w-6 text-[12px]" : "h-8 w-8 text-[14px]"
          } ${
            copied
              ? "border-brand/40 bg-wash text-brand opacity-100"
              : "text-muted hover:border-hairline hover:text-fg"
          }`}
          aria-hidden
        >
          {copied ? "✓" : "⧉"}
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Command copied to clipboard" : ""}
      </span>
    </div>
  );
}
