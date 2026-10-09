"use client";

import { useEffect, useMemo, useState } from "react";
import type { CommitDay } from "@/lib/github";

const CELL = 11;
const GAP = 3;
/** Empty → brand (matches site --brand). */
const LEVEL = [
  "color-mix(in srgb, var(--muted) 18%, transparent)",
  "color-mix(in srgb, var(--brand) 28%, transparent)",
  "color-mix(in srgb, var(--brand) 48%, transparent)",
  "color-mix(in srgb, var(--brand) 72%, transparent)",
  "var(--brand)",
] as const;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const DAY_MS = 86_400_000;

function contributionLevel(count: number, max: number): number {
  if (count <= 0) return 0;
  if (max <= 1) return 1;
  const q = count / max;
  if (q <= 0.25) return 1;
  if (q <= 0.5) return 2;
  if (q <= 0.75) return 3;
  return 4;
}

function weeksOf(days: CommitDay[]): CommitDay[][] {
  const weeks: CommitDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function monthLabel(week: CommitDay[]): string | null {
  const first = week.find((d) => d.date.endsWith("-01"));
  if (!first) return null;
  return new Date(`${first.date}T00:00:00Z`).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
}

function commitTip(day: CommitDay): string {
  const pretty = new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  if (day.count === 0) return `No commits on ${pretty}`;
  if (day.count === 1) return `1 commit on ${pretty}`;
  return `${day.count} commits on ${pretty}`;
}

/**
 * Keep the last `rangeDays` calendar days (ending on the newest day in
 * `days`), then pad back to Sunday so the grid stays week-aligned.
 * Pass `365` for a full-year view.
 */
export function sliceCommitDays(
  days: CommitDay[],
  rangeDays: number,
): CommitDay[] {
  if (!days.length || rangeDays <= 0) return days;
  const byDate = new Map(days.map((d) => [d.date, d.count]));
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const end = new Date(`${sorted[sorted.length - 1]!.date}T00:00:00Z`);
  const windowStart = new Date(end.getTime() - (rangeDays - 1) * DAY_MS);
  const graphStart = new Date(
    windowStart.getTime() - windowStart.getUTCDay() * DAY_MS,
  );
  const out: CommitDay[] = [];
  for (let t = graphStart.getTime(); t <= end.getTime(); t += DAY_MS) {
    const date = new Date(t).toISOString().slice(0, 10);
    out.push({ date, count: byDate.get(date) ?? 0 });
  }
  return out;
}

type Props = {
  days: CommitDay[];
  /**
   * Visible window in days ending at the latest commit day.
   * When omitted, uses 30 on small screens and 365 on `md+`.
   */
  rangeDays?: number;
  /** Mobile / desktop defaults when `rangeDays` is not set. */
  mobileRangeDays?: number;
  desktopRangeDays?: number;
};

export function CommitGraph({
  days,
  rangeDays,
  mobileRangeDays = 30,
  desktopRangeDays = 365,
}: Props) {
  const [autoRange, setAutoRange] = useState(mobileRangeDays);

  useEffect(() => {
    if (rangeDays != null) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () =>
      setAutoRange(mq.matches ? desktopRangeDays : mobileRangeDays);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [rangeDays, mobileRangeDays, desktopRangeDays]);

  const effectiveRange = rangeDays ?? autoRange;
  const visible = useMemo(
    () => sliceCommitDays(days, effectiveRange),
    [days, effectiveRange],
  );
  const weeks = weeksOf(visible);
  const max = Math.max(1, ...visible.map((d) => d.count));
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(
    null,
  );

  if (visible.length < 7) return null;

  return (
    <div className="relative w-max max-w-full">
      <div className="flex gap-[3px]">
        <div className="flex w-7 shrink-0 flex-col" style={{ paddingTop: 18 }}>
          {DAY_LABELS.map((label, i) => (
            <span
              key={`d-${i}`}
              className="text-right text-[9px] leading-[14px] text-muted"
              style={{ height: CELL + GAP }}
            >
              {label}
            </span>
          ))}
        </div>
        <div>
          <div className="flex" style={{ height: 18, gap: GAP }}>
            {weeks.map((week, wi) => (
              <span
                key={`m-${week[0]?.date ?? wi}`}
                className="text-[11px] leading-[18px] text-muted"
                style={{ width: CELL }}
              >
                {monthLabel(week) ?? ""}
              </span>
            ))}
          </div>
          <div className="flex" style={{ gap: GAP }}>
            {weeks.map((week) => (
              <div
                key={week[0]?.date}
                className="flex flex-col"
                style={{ gap: GAP }}
              >
                {week.map((day) => (
                  <button
                    key={day.date}
                    type="button"
                    aria-label={commitTip(day)}
                    className="block rounded-[2px] outline-offset-1"
                    style={{
                      width: CELL,
                      height: CELL,
                      background: LEVEL[contributionLevel(day.count, max)],
                      boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.12)",
                    }}
                    onMouseEnter={(event) => {
                      const box = event.currentTarget.getBoundingClientRect();
                      setTip({
                        text: commitTip(day),
                        x: box.left + box.width / 2,
                        y: box.top,
                      });
                    }}
                    onMouseLeave={() => setTip(null)}
                    onBlur={() => setTip(null)}
                    onFocus={(event) => {
                      const box = event.currentTarget.getBoundingClientRect();
                      setTip({
                        text: commitTip(day),
                        x: box.left + box.width / 2,
                        y: box.top,
                      });
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-muted">
            Less
            {LEVEL.map((fill) => (
              <span
                key={fill}
                className="inline-block rounded-[2px]"
                style={{
                  width: CELL,
                  height: CELL,
                  background: fill,
                  boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.12)",
                }}
              />
            ))}
            More
          </div>
        </div>
      </div>
      {tip ? (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md border border-hairline bg-bg-elevated px-2 py-1 text-[11px] font-medium text-fg shadow-lg"
          style={{ left: tip.x, top: tip.y }}
        >
          {tip.text}
        </div>
      ) : null}
    </div>
  );
}
