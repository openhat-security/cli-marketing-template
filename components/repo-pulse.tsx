import { CommitGraph } from "@/components/commit-graph";
import {
  formatCount,
  formatRelativeTime,
  type RepoPulse,
} from "@/lib/github";
import { GITHUB, RELEASES } from "@/lib/site";

type Props = {
  pulse: RepoPulse;
};

export function RepoPulseSection({ pulse }: Props) {
  const meta = [
    pulse.license,
    pulse.latestRelease ? pulse.latestRelease.tag : null,
    pulse.pushedAt ? formatRelativeTime(pulse.pushedAt) : null,
  ].filter(Boolean);

  return (
    <section className="section !py-4 sm:!py-8">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <div className="min-w-0">
              <h2 className="section-title !mb-1 !text-[13px] sm:!text-[16px]">
                Live from GitHub
              </h2>
              <p className="m-0 text-[12px] leading-5 sm:text-[13px]">
                <a
                  href={pulse.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-fg no-underline hover:text-brand"
                >
                  {pulse.fullName}
                </a>
                {meta.length ? (
                  <span className="text-muted"> · {meta.join(" · ")}</span>
                ) : null}
                <span className="text-muted">
                  {" "}
                  ·{" "}
                  <a
                    href={`${GITHUB}/stargazers`}
                    target="_blank"
                    rel="noreferrer"
                    className="no-underline hover:text-brand"
                  >
                    ★ {formatCount(pulse.stars)}
                  </a>
                  {pulse.commits > 0 ? (
                    <>
                      {" "}
                      ·{" "}
                      <a
                        href={`${GITHUB}/commits`}
                        target="_blank"
                        rel="noreferrer"
                        className="no-underline hover:text-brand"
                      >
                        {formatCount(pulse.commits)} commits
                      </a>
                    </>
                  ) : null}
                </span>
              </p>
            </div>
            <div className="flex gap-3 text-[12px] md:hidden">
              <a
                href={GITHUB}
                className="font-bold text-brand no-underline hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Star ★
              </a>
              <a
                href={RELEASES}
                className="text-muted no-underline hover:text-brand"
                target="_blank"
                rel="noreferrer"
              >
                Releases
              </a>
            </div>
          </div>

          {pulse.recentCommits.length ? (
            <ul className="mt-3 m-0 list-none divide-y divide-hairline border border-hairline p-0 sm:mt-4">
              {pulse.recentCommits.slice(0, 3).map((c) => (
                <li key={c.sha}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-baseline gap-2 px-2.5 py-1.5 no-underline hover:bg-wash sm:gap-3 sm:px-3"
                  >
                    <code className="shrink-0 text-[11px] text-brand">
                      {c.sha}
                    </code>
                    <span className="min-w-0 flex-1 truncate text-[12px] text-fg">
                      {c.message}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted">
                      {formatRelativeTime(c.date)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {pulse.commitDays.length ? (
          <div className="flex w-full max-w-full flex-col items-start gap-3 md:w-max md:items-end md:justify-self-end">
            <div className="hidden gap-3 text-[12px] md:flex">
              <a
                href={GITHUB}
                className="font-bold text-brand no-underline hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Star ★
              </a>
              <a
                href={RELEASES}
                className="text-muted no-underline hover:text-brand"
                target="_blank"
                rel="noreferrer"
              >
                Releases
              </a>
            </div>
            <div className="max-w-full overflow-x-auto md:overflow-visible">
              <CommitGraph
                days={pulse.commitDays}
                mobileRangeDays={30}
                desktopRangeDays={365}
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
