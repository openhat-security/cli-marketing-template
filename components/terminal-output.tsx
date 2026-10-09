type Props = {
  text: string;
};

export function TerminalOutput({ text }: Props) {
  const lines = text.split("\n");

  return (
    <pre className="m-0 overflow-x-auto bg-black px-4 py-4 text-[11px] leading-5 text-[#e2e8f0] sm:px-5 sm:text-[12px] sm:leading-6">
      {lines.map((line, i) => (
        <span
          key={`${i}:${line}`}
          className={line.startsWith("$") ? "text-brand" : undefined}
        >
          {line}
          {i < lines.length - 1 ? "\n" : ""}
        </span>
      ))}
    </pre>
  );
}
