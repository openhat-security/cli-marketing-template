import type { ReactNode } from "react";

type MacTerminalProps = {
  title?: string;
  children: ReactNode;
};

export function MacTerminal({
  title = "jq --help",
  children,
}: MacTerminalProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-[#1c1c1e] shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
      <div className="flex h-10 items-center gap-3 border-b border-white/10 bg-[#2c2c2e] px-3.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.2)]" />
        </div>
        <div className="min-w-0 flex-1 text-center text-[11px] text-white/55">
          <span className="truncate">{title}</span>
        </div>
        <div className="w-11" aria-hidden />
      </div>
      <div className="bg-black">{children}</div>
    </div>
  );
}
