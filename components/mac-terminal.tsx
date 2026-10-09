import type { ReactNode } from "react";

type MacTerminalProps = {
  title?: string;
  badge?: string;
  children: ReactNode;
};

export function MacTerminal({
  title = "zsh — ~",
  badge = "demo",
  children,
}: MacTerminalProps) {
  return (
    <div className="term-window">
      <div className="term-chrome">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.2)]" />
        </div>
        <div className="min-w-0 flex-1 text-center text-[11px] text-white/55">
          <span className="truncate">{title}</span>
        </div>
        <span className="shrink-0 rounded-[3px] border border-white/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/40">
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}
