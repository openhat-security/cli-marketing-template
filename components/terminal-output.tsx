import type { ReactNode } from "react";
import { PROMPT_CHAR, PROMPT_PATH, type Session, type SessionLine } from "@/lib/session";

const TOKEN =
  /("(?:\\.|[^"\\])*")\s*:|("(?:\\.|[^"\\])*")|\b(-?\d+(?:\.\d+)?)\b|\b(true|false|null)\b/g;

function JsonText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(TOKEN.source, "g");
  while ((m = re.exec(text))) {
    if (m.index > last) {
      nodes.push(
        <span key={`p-${last}`} className="text-[#94a3b8]">
          {text.slice(last, m.index)}
        </span>,
      );
    }
    if (m[1] != null) {
      nodes.push(
        <span key={`k-${m.index}`} className="text-[#7dd3fc]">
          {m[1]}
        </span>,
      );
      nodes.push(
        <span key={`c-${m.index}`} className="text-[#94a3b8]">
          :
        </span>,
      );
    } else if (m[2] != null) {
      nodes.push(
        <span key={`s-${m.index}`} className="text-[#86efac]">
          {m[2]}
        </span>,
      );
    } else if (m[3] != null) {
      nodes.push(
        <span key={`n-${m.index}`} className="text-[#fbbf24]">
          {m[3]}
        </span>,
      );
    } else {
      nodes.push(
        <span key={`l-${m.index}`} className="text-[#c4b5fd]">
          {m[4]}
        </span>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    nodes.push(
      <span key={`t-${last}`} className="text-[#94a3b8]">
        {text.slice(last)}
      </span>,
    );
  }
  return <>{nodes}</>;
}

function HelpText({ text }: { text: string }) {
  const flag = /^(\s*)(-[\w,-]+(?:,\s--[\w-]+)?)(\s+.*)?$/.exec(text);
  if (flag) {
    return (
      <>
        <span className="text-[#64748b]">{flag[1]}</span>
        <span className="text-[#38bdf8]">{flag[2]}</span>
        {flag[3] ? <span className="text-[#cbd5e1]">{flag[3]}</span> : null}
      </>
    );
  }
  if (text.startsWith("Usage:") || text.startsWith("Example:")) {
    return <span className="font-medium text-[#e2e8f0]">{text}</span>;
  }
  return <span className="text-[#cbd5e1]">{text}</span>;
}

function ManText({ text }: { text: string }) {
  if (/^(NAME|SYNOPSIS|DESCRIPTION|FILTERS|INVOKING JQ|OPTIONS)$/.test(text)) {
    return <span className="font-bold tracking-wide text-[#38bdf8]">{text}</span>;
  }
  if (text.startsWith("JQ(1)")) {
    return <span className="text-[#e2e8f0]">{text}</span>;
  }
  return <span className="text-[#cbd5e1]">{text}</span>;
}

function LineView({ line, last }: { line: SessionLine; last: boolean }) {
  if (line.kind === "blank") {
    return <span>{"\n"}</span>;
  }
  if (line.kind === "cmd") {
    return (
      <span>
        <span className="text-[#64748b]">{PROMPT_PATH}</span>
        {" "}
        <span className="text-[#38bdf8]">{PROMPT_CHAR}</span>
        {" "}
        <span className="text-[#f8fafc]">{line.text}</span>
        {last ? (
          <span className="ml-0.5 inline-block h-[1em] w-1.5 translate-y-0.5 bg-[#38bdf8] motion-safe:animate-pulse" />
        ) : (
          "\n"
        )}
      </span>
    );
  }
  return (
    <span>
      {line.kind === "json" ? (
        <JsonText text={line.text} />
      ) : line.kind === "help" ? (
        <HelpText text={line.text} />
      ) : line.kind === "man" ? (
        <ManText text={line.text} />
      ) : (
        <span className="text-[#cbd5e1]">{line.text}</span>
      )}
      {"\n"}
    </span>
  );
}

export function TerminalOutput({ session }: { session: Session }) {
  return (
    <div className="term-screen">
      <pre className="term-body">
        {session.lines.map((line, i) => (
          <LineView
            key={`${i}:${line.kind}:${line.kind === "blank" ? i : line.text}`}
            line={line}
            last={false}
          />
        ))}
        {session.mode === "shell" ? (
          <LineView line={{ kind: "cmd", text: "" }} last />
        ) : null}
      </pre>
      {session.status ? (
        <div className="term-status">{session.status}</div>
      ) : null}
    </div>
  );
}
