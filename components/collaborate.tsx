import {
  CONTACT_EMAIL,
  DISCUSSIONS,
  GITHUB,
  OPENHAT,
} from "@/lib/site";

export function Collaborate() {
  return (
    <section className="section">
      <h2 className="section-title">Collaborate</h2>
      <p className="m-0 max-w-[42rem] text-[16px] font-bold leading-7">
        jq is MIT. Issues and filters belong on jqlang/jq — this page is only a
        starter layout.
      </p>
      <p className="mt-3 max-w-[42rem] text-muted">
        Dress the template as your own CLI by swapping lib/site.ts. For OpenHat
        tooling that uses this same section order, see the org on GitHub.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn">
          Email {CONTACT_EMAIL}
        </a>
        <a
          href={DISCUSSIONS}
          className="btn btn-outline"
          target="_blank"
          rel="noreferrer"
        >
          jq discussions
        </a>
        <a
          href={GITHUB}
          className="btn btn-outline"
          target="_blank"
          rel="noreferrer"
        >
          jqlang/jq
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
