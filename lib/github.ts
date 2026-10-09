import { SITE } from "@/lib/site";

export type RepoContributor = {
  login: string;
  avatarUrl: string;
  contributions: number;
  url: string;
};

export type RepoCommit = {
  sha: string;
  message: string;
  date: string;
  url: string;
};

export type RepoRelease = {
  tag: string;
  name: string;
  url: string;
  publishedAt: string;
};

export type RepoLanguage = {
  name: string;
  bytes: number;
  pct: number;
};

export type CommitDay = {
  date: string;
  count: number;
};

export type RepoPulse = {
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  license: string | null;
  language: string | null;
  pushedAt: string | null;
  createdAt: string | null;
  commits: number;
  latestRelease: RepoRelease | null;
  recentCommits: RepoCommit[];
  contributors: RepoContributor[];
  languages: RepoLanguage[];
  commitDays: CommitDay[];
};

const OWNER = SITE.github.owner;
const REPO = SITE.github.repo;
const FULL = `${OWNER}/${REPO}`;
const HTML_URL = `https://github.com/${FULL}`;
const DAY_MS = 86_400_000;

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "cli-marketing-template",
  "X-GitHub-Api-Version": "2022-11-28",
};

function lastPage(link: string | null): number | null {
  if (!link) return null;
  const match = /[?&]page=(\d+)>; rel="last"/.exec(link);
  return match ? Number(match[1]) : null;
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  if (n >= 1_000) {
    const k = n / 1_000;
    return n % 1_000 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  }
  return String(n);
}

export function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return "unknown";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "unknown";
  const seconds = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 45) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 18) return `${months}mo ago`;
  const years = Math.round(days / 365);
  return `${years}y ago`;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function utcDay(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Deterministic year of activity so the graph looks populated offline. */
export function getMockPulse(now = Date.now()): RepoPulse {
  const end = new Date(now);
  end.setUTCHours(0, 0, 0, 0);
  const endMs = end.getTime();
  const windowStart = endMs - (52 * 7 - 1) * DAY_MS;
  const startSunday = windowStart - new Date(windowStart).getUTCDay() * DAY_MS;
  const rand = mulberry32(0x1eaf);
  const commitDays: CommitDay[] = [];
  let commits = 0;

  for (let t = startSunday; t <= endMs; t += DAY_MS) {
    const dow = new Date(t).getUTCDay();
    const weekday = dow !== 0 && dow !== 6;
    const roll = rand();
    let count = 0;
    if (weekday && roll > 0.22) count = 1 + Math.floor(rand() * 6);
    else if (!weekday && roll > 0.72) count = 1 + Math.floor(rand() * 2);
    commitDays.push({ date: utcDay(t), count });
    commits += count;
  }

  const hoursAgo = (h: number) => new Date(now - h * 3600_000).toISOString();

  return {
    fullName: FULL,
    description: SITE.description,
    url: HTML_URL,
    stars: 1284,
    forks: 96,
    openIssues: 12,
    license: "MIT",
    language: "Go",
    pushedAt: hoursAgo(6),
    createdAt: "2024-03-18T00:00:00.000Z",
    commits,
    latestRelease: {
      tag: "v0.9.0",
      name: "v0.9.0",
      url: `${HTML_URL}/releases/tag/v0.9.0`,
      publishedAt: hoursAgo(80),
    },
    recentCommits: [
      {
        sha: "a1b2c3d",
        message: "Index workspace fixtures for the starter tour",
        date: hoursAgo(6),
        url: `${HTML_URL}/commit/a1b2c3d`,
      },
      {
        sha: "d4e5f6a",
        message: "Add ship playbook and draft PR path",
        date: hoursAgo(28),
        url: `${HTML_URL}/commit/d4e5f6a`,
      },
      {
        sha: "8899abb",
        message: "Watch CI until required checks finish",
        date: hoursAgo(52),
        url: `${HTML_URL}/commit/8899abb`,
      },
      {
        sha: "c0ffee1",
        message: "Resume the last agent session by default",
        date: hoursAgo(96),
        url: `${HTML_URL}/commit/c0ffee1`,
      },
      {
        sha: "bada55e",
        message: "Document filler brand tokens in the README",
        date: hoursAgo(140),
        url: `${HTML_URL}/commit/bada55e`,
      },
    ],
    contributors: [
      {
        login: "ada",
        avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
        contributions: 214,
        url: "https://github.com/ada",
      },
      {
        login: "sam",
        avatarUrl: "https://avatars.githubusercontent.com/u/2?v=4",
        contributions: 88,
        url: "https://github.com/sam",
      },
    ],
    languages: [
      { name: "Go", bytes: 72000, pct: 72 },
      { name: "TypeScript", bytes: 18000, pct: 18 },
      { name: "Shell", bytes: 10000, pct: 10 },
    ],
    commitDays,
  };
}

async function gh<T>(
  path: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; json: T | null; link: string | null }> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      ...init,
      headers: { ...headers, ...(init?.headers ?? {}) },
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      return { ok: false, status: res.status, json: null, link: res.headers.get("link") };
    }
    return {
      ok: true,
      status: res.status,
      json: (await res.json()) as T,
      link: res.headers.get("link"),
    };
  } catch {
    return { ok: false, status: 0, json: null, link: null };
  }
}

function emptyPulse(): RepoPulse {
  return {
    fullName: FULL,
    description: null,
    url: HTML_URL,
    stars: 0,
    forks: 0,
    openIssues: 0,
    license: null,
    language: null,
    pushedAt: null,
    createdAt: null,
    commits: 0,
    latestRelease: null,
    recentCommits: [],
    contributors: [],
    languages: [],
    commitDays: [],
  };
}

function commitDaysFromActivity(
  weeks: Array<{ days?: number[]; week?: number }> | null,
): CommitDay[] {
  if (!weeks?.length) return [];
  const days: CommitDay[] = [];
  for (const w of weeks) {
    if (typeof w.week !== "number" || !Array.isArray(w.days)) continue;
    for (let i = 0; i < 7; i++) {
      const ms = (w.week + i * 86_400) * 1000;
      days.push({ date: utcDay(ms), count: w.days[i] ?? 0 });
    }
  }
  return days;
}

async function fetchCommitActivity(): Promise<
  Array<{ days?: number[]; week?: number; total?: number }> | null
> {
  const path = `/repos/${FULL}/stats/commit_activity`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(`https://api.github.com${path}`, {
        headers,
        next: { revalidate: 1800 },
      });
      if (res.status === 202) {
        await new Promise((r) => setTimeout(r, 900));
        continue;
      }
      if (!res.ok) return null;
      const json = (await res.json()) as unknown;
      return Array.isArray(json) ? json : null;
    } catch {
      return null;
    }
  }
  return null;
}

export async function getRepoPulse(): Promise<RepoPulse> {
  if (!SITE.github.live) return getMockPulse();

  const [repoRes, commitsRes, contribRes, releaseRes, langsRes, partRes, activity] =
    await Promise.all([
      gh<{
        full_name?: string;
        description?: string | null;
        html_url?: string;
        stargazers_count?: number;
        forks_count?: number;
        open_issues_count?: number;
        language?: string | null;
        license?: { spdx_id?: string | null } | null;
        pushed_at?: string | null;
        created_at?: string | null;
      }>(`/repos/${FULL}`),
      gh<
        Array<{
          sha: string;
          html_url: string;
          commit: { message: string; author?: { date?: string } | null };
        }>
      >(`/repos/${FULL}/commits?per_page=5`),
      gh<
        Array<{
          login: string;
          avatar_url: string;
          html_url: string;
          contributions: number;
          type?: string;
        }>
      >(`/repos/${FULL}/contributors?per_page=12&anon=1`),
      gh<{
        tag_name?: string;
        name?: string | null;
        html_url?: string;
        published_at?: string | null;
      }>(`/repos/${FULL}/releases/latest`),
      gh<Record<string, number>>(`/repos/${FULL}/languages`),
      gh<{ all?: number[] }>(`/repos/${FULL}/stats/participation`),
      fetchCommitActivity(),
    ]);

  if (!repoRes.ok || !repoRes.json) return emptyPulse();
  const repo = repoRes.json;

  const recentCommits: RepoCommit[] = (commitsRes.json ?? []).slice(0, 5).map((c) => ({
    sha: c.sha.slice(0, 7),
    message: (c.commit.message || "").split("\n")[0]?.trim() || "(no message)",
    date: c.commit.author?.date ?? "",
    url: c.html_url,
  }));

  const commitDays = commitDaysFromActivity(activity);

  let commits = 0;
  if (commitDays.length) {
    commits = commitDays.reduce((a, d) => a + d.count, 0);
  } else {
    const participation = partRes.json?.all;
    if (Array.isArray(participation) && participation.length > 0) {
      commits = participation.reduce((a, b) => a + b, 0);
    } else {
      const pages = lastPage(commitsRes.link);
      if (pages) commits = pages * 5;
      else commits = recentCommits.length;
    }
  }

  const contributors: RepoContributor[] = (contribRes.json ?? [])
    .filter((c) => c.login && c.type !== "Anonymous")
    .slice(0, 8)
    .map((c) => ({
      login: c.login,
      avatarUrl: c.avatar_url,
      contributions: c.contributions,
      url: c.html_url,
    }));

  let latestRelease: RepoRelease | null = null;
  if (releaseRes.ok && releaseRes.json?.tag_name && releaseRes.json.html_url) {
    latestRelease = {
      tag: releaseRes.json.tag_name,
      name: releaseRes.json.name || releaseRes.json.tag_name,
      url: releaseRes.json.html_url,
      publishedAt: releaseRes.json.published_at ?? "",
    };
  }

  const langBytes = langsRes.json ?? {};
  const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0) || 1;
  const languages: RepoLanguage[] = Object.entries(langBytes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, bytes]) => ({
      name,
      bytes,
      pct: Math.round((bytes / totalBytes) * 1000) / 10,
    }));

  return {
    fullName: repo.full_name ?? FULL,
    description: repo.description ?? null,
    url: repo.html_url ?? HTML_URL,
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    openIssues: repo.open_issues_count ?? 0,
    license: repo.license?.spdx_id ?? null,
    language: repo.language ?? null,
    pushedAt: repo.pushed_at ?? null,
    createdAt: repo.created_at ?? null,
    commits,
    latestRelease,
    recentCommits,
    contributors,
    languages,
    commitDays,
  };
}
