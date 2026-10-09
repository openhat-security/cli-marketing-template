import {
  FILTER_SESSION,
  HELP_SESSION,
  MAN_SESSION,
  SELECT_SESSION,
} from "@/lib/demos";
import type { Session } from "@/lib/session";

/** Swap this file (and `--brand` in `app/globals.css`) to dress the template as your CLI. */

export const SITE = {
  name: "CLI Marketing Template",
  wordmark: "CLI TEMPLATE",
  cli: "jq",
  demoCli: "jq",
  tagline: [
    "A marketing template for CLIs.",
    "Same sections as runhug.",
    "jq is only the demo.",
  ],
  description:
    "Starter marketing site for terminal apps. The windows, install tabs, and GitHub pulse stay. The command is sample content — replace it with yours.",
  whatIs:
    "This is not jq’s website and it is not OpenCode. It is a Next.js starter for CLI and terminal-tool marketing pages, using the same section order as runhug-web and truffles-web. That order is inspired by opencode.ai. Terminals show a real command (jq) so you can see how --help, man, and live output sit in the layout.",
  title: "CLI Marketing Template | Starter for terminal apps",
  year: 2026,
  copyright: "Adam Siwiec",
  contactEmail: "adam@devrecated.com",
  github: {
    owner: "jqlang",
    repo: "jq",
    live: true,
  },
} as const;

export const TEMPLATE_GITHUB =
  "https://github.com/openhat-security/cli-marketing-template";
export const TEMPLATE_README = `${TEMPLATE_GITHUB}#readme`;
export const OPENCODE = "https://opencode.ai/";

const DEMO_REPO = `https://github.com/${SITE.github.owner}/${SITE.github.repo}`;

export const GITHUB = DEMO_REPO;
export const ORG = `https://github.com/${SITE.github.owner}`;
export const DISCUSSIONS = `${DEMO_REPO}/discussions`;
export const DOCS = "https://jqlang.github.io/jq/manual/";
export const MANUAL = DOCS;
export const RELEASES = `${DEMO_REPO}/releases`;
export const CHANGELOG = `${DEMO_REPO}/blob/master/NEWS.md`;
export const LICENSE = `${TEMPLATE_GITHUB}/blob/main/README.md`;
export const CONTRIBUTING = `${TEMPLATE_GITHUB}#readme`;
export const SECURITY = `${DEMO_REPO}/security`;
export const CONTACT_EMAIL = SITE.contactEmail;
export const SITE_URL = "https://cli-marketing-template.vercel.app";
export const OPENHAT = "https://github.com/openhat-security";

export const NAV = [
  { href: TEMPLATE_GITHUB, label: "GitHub" },
  { href: TEMPLATE_README, label: "README" },
  { href: GITHUB, label: "Demo CLI" },
] as const;

export const CHIPS = [
  { label: "template", hint: "not a product" },
  { label: "demo CLI", hint: "jq" },
  { label: "help / man", hint: "real output" },
  { label: "install tabs", hint: "brew · apt" },
  { label: "GitHub pulse", hint: "live API" },
] as const;

export const FEATURES = [
  {
    title: "Framed marketing page",
    body: "Sticky header, wordmark, and a single-column frame like runhug-web and truffles-web.",
  },
  {
    title: "Install tabs",
    body: "brew / apt / dnf / scoop / winget / choco. The commands here install jq as the sample CLI.",
  },
  {
    title: "Terminal windows",
    body: "Mac chrome around a real prompt. Swap the session data in lib/demos.ts for your --help and man pages.",
  },
  {
    title: "Feature list",
    body: "Star-prefixed bullets and a docs button. Point them at your CLI once you rebrand.",
  },
  {
    title: "GitHub pulse",
    body: "Stars, recent commits, and a contribution graph. This demo reads jqlang/jq live.",
  },
  {
    title: "FAQ and footer",
    body: "Disclosure accordion plus a five-cell footer. Keep the layout, change the links.",
  },
  {
    title: "One-file rebrand",
    body: "Names, install lines, FAQ, and nav live in lib/site.ts. Brand tokens live in app/globals.css.",
  },
] as const;

export const INSTALL_TABS = [
  {
    id: "brew",
    label: "brew",
    command: "brew install jq",
    emphasis: "jq",
  },
  {
    id: "apt",
    label: "apt",
    command: "sudo apt-get install jq",
    emphasis: "jq",
  },
  {
    id: "dnf",
    label: "dnf",
    command: "sudo dnf install jq",
    emphasis: "jq",
  },
  {
    id: "scoop",
    label: "scoop",
    command: "scoop install jq",
    emphasis: "jq",
  },
  {
    id: "winget",
    label: "winget",
    command: "winget install jqlang.jq",
    emphasis: "jqlang.jq",
  },
  {
    id: "choco",
    label: "choco",
    command: "choco install jq",
    emphasis: "jq",
  },
] as const;

export const STEPS = [
  {
    n: "1",
    title: "Clone the template",
    command: "git clone https://github.com/openhat-security/cli-marketing-template.git",
  },
  {
    n: "2",
    title: "Run it",
    command: "pnpm install && pnpm dev",
  },
  {
    n: "3",
    title: "Rebrand",
    command: "edit lib/site.ts",
  },
] as const;

export const TOOLS: {
  id: string;
  label: string;
  title: string;
  lead: string;
  points: string[];
  command: string;
  href: string;
  cta: string;
  session: Session;
  terminalTitle: string;
}[] = [
  {
    id: "help",
    label: "help",
    title: "jq --help",
    lead: "Sample --help still. Replace this session with your CLI’s help screen.",
    points: [
      "Prompt, usage, and flags are styled like a real terminal, not a pasted wall of text.",
      "The command is real: jq --help from jq 1.7.1.",
    ],
    command: "jq --help",
    href: DOCS,
    cta: "jq manual",
    session: HELP_SESSION,
    terminalTitle: HELP_SESSION.title,
  },
  {
    id: "man",
    label: "man",
    title: "man jq",
    lead: "Sample man page in a pager chrome — NAME, SYNOPSIS, FILTERS.",
    points: [
      "Section heads are highlighted the way less shows them.",
      "Status bar reads “Manual page jq(1)” so it is obvious this is a man view.",
    ],
    command: "man jq",
    href: DOCS,
    cta: "jq manual",
    session: MAN_SESSION,
    terminalTitle: MAN_SESSION.title,
  },
  {
    id: "filter",
    label: "filter",
    title: "jq .",
    lead: "Pretty-print and keys — the identity filter from jq --help.",
    points: [
      "`echo '{\"foo\": 0}' | jq .` is jq’s own example.",
      "JSON keys, strings, and numbers are colored so the output is readable.",
    ],
    command: `echo '{"foo": 0}' | jq .`,
    href: DOCS,
    cta: "jq manual",
    session: FILTER_SESSION,
    terminalTitle: FILTER_SESSION.title,
  },
  {
    id: "select",
    label: "select",
    title: "map and select",
    lead: "Two live filters on the same document. Swap in your own examples.",
    points: [
      "`.users[] | select(.n > 1)` keeps matching objects.",
      "`.users | map(.name)` builds a new array.",
    ],
    command: `jq '.users[] | select(.n > 1)' users.json`,
    href: DOCS,
    cta: "jq manual",
    session: SELECT_SESSION,
    terminalTitle: SELECT_SESSION.title,
  },
];

export const FAQ = [
  {
    q: "What is this site?",
    a: "A marketing template for terminal / CLI sites. Clone it, swap lib/site.ts, and keep the section order. It is not a product, not jq, and not OpenCode.",
  },
  {
    q: "Is this the official jq website?",
    a: "No. jq is only the sample command so the terminals show real --help, man, and JSON output. The program lives at github.com/jqlang/jq.",
  },
  {
    q: "How do I dress it as my CLI?",
    a: "Edit lib/site.ts (name, install commands, FAQ, links) and lib/demos.ts (terminal sessions). Change --brand in app/globals.css. Point SITE.github at your repo.",
  },
  {
    q: "Why jq?",
    a: "It is a standard open-source command with a real man page, a useful --help screen, and filters you can run locally. Any CLI can take its place.",
  },
  {
    q: "Are the install commands for the template?",
    a: "No. Those tabs install jq, the demo CLI. To start the template itself: git clone, then pnpm install && pnpm dev.",
  },
  {
    q: "Are the terminals screenshots?",
    a: "No. They are structured sessions: a zsh-style prompt, then captured jq 1.7.1 output with JSON and man/help styling.",
  },
  {
    q: "Where does the GitHub pulse come from?",
    a: "Live from jqlang/jq as an example of the pulse block. Set SITE.github to your CLI when you ship.",
  },
  {
    q: "Is this OpenCode?",
    a: "No. The section order is inspired by opencode.ai. This starter is an independent OpenHat / Devrecated template — not an OpenCode product or official kit.",
  },
  {
    q: "Who made the template?",
    a: "OpenHat / Devrecated. Same layout family as runhug-web and truffles-web. Credit to opencode.ai for the section order. MIT-shaped starter — see the GitHub repo.",
  },
] as const;
