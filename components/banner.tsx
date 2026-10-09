import { TEMPLATE_GITHUB } from "@/lib/site";

export function Banner() {
  return (
    <div className="banner">
      <strong>Web template</strong> for terminal / CLI marketing sites. The
      command in the windows is sample content (jq), not this product.{" "}
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
