import {
  CONTACT_EMAIL,
  OPENHAT,
  TEMPLATE_GITHUB,
} from "@/lib/site";

export function Collaborate() {
  return (
    <section className="section">
      <h2 className="section-title">Collaborate</h2>
      <p className="m-0 max-w-[42rem] text-[16px] font-bold leading-7">
        This repo is a starter for CLI marketing sites. Issues about the
        layout belong here — not on jqlang/jq.
      </p>
      <p className="mt-3 max-w-[42rem] text-muted">
        Fork it, swap the demo command, and ship. runhug-web and truffles-web
        use this same section order. Website design inspired by opencode.ai —
        this is not an OpenCode product.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn">
          Email {CONTACT_EMAIL}
        </a>
        <a
          href={TEMPLATE_GITHUB}
          className="btn btn-outline"
          target="_blank"
          rel="noreferrer"
        >
          Template repo
          <span aria-hidden>→</span>
        </a>
        <a
          href={OPENHAT}
          className="btn btn-outline"
          target="_blank"
          rel="noreferrer"
        >
          OpenHat Security
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
