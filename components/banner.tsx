import { OPENCODE, TEMPLATE_GITHUB } from "@/lib/site";

export function Banner() {
  return (
    <div className="banner">
      <strong>CLI marketing template</strong> — not a product. jq is sample
      content. Section order inspired by{" "}
      <a
        href={OPENCODE}
        className="text-brand underline-offset-4 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        opencode.ai
      </a>
      .{" "}
      <a
        href={TEMPLATE_GITHUB}
        className="text-brand underline-offset-4 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Clone the starter
      </a>
    </div>
  );
}
