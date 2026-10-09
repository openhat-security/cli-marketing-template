import {
  FILTER_OUTPUT,
  HELP_OUTPUT,
  MAN_OUTPUT,
  SELECT_OUTPUT,
} from "@/lib/demos";

/** Swap this file (and `--brand` in `app/globals.css`) to rebrand the starter. */

export const SITE = {
  name: "jq",
  wordmark: "JQ",
  cli: "jq",
  tagline: [
    "Slice JSON.",
    "Pipe a filter.",
    "Print what you need.",
  ],
  description:
    "jq is a command-line JSON processor. Filters select, iterate, and reshape documents — the same language as man jq.",
  whatIs:
    "jq is a lightweight and flexible command-line JSON processor. It reads JSON, applies a filter, and writes JSON (or raw text) to stdout. This starter dresses the runhug / truffles layout as jq so every install line and terminal still is a real command.",
  title: "jq | Command-line JSON processor",
  year: 2026,
  copyright: "Adam Siwiec",
  contactEmail: "adam@devrecated.com",
  github: {
    owner: "jqlang",
    repo: "jq",
    live: true,
  },
} as const;

const REPO = `https://github.com/${SITE.github.owner}/${SITE.github.repo}`;

export const GITHUB = REPO;
export const ORG = `https://github.com/${SITE.github.owner}`;
export const DISCUSSIONS = `${REPO}/discussions`;
export const DOCS = "https://jqlang.github.io/jq/manual/";
export const MANUAL = DOCS;
export const RELEASES = `${REPO}/releases`;
export const CHANGELOG = `${REPO}/blob/master/NEWS.md`;
export const LICENSE = `${REPO}/blob/master/COPYING`;
export const CONTRIBUTING = `${REPO}/blob/master/CONTRIBUTING.md`;
export const SECURITY = `${REPO}/security`;
export const CONTACT_EMAIL = SITE.contactEmail;
export const SITE_URL = "https://jqlang.github.io/jq/";
export const OPENHAT = "https://github.com/openhat-security";

export const NAV = [
  { href: GITHUB, label: "GitHub" },
  { href: DOCS, label: "Manual" },
  { href: RELEASES, label: "Releases" },
] as const;

export const CHIPS = [
  { label: "filter", hint: "." },
  { label: "map", hint: "arrays" },
  { label: "select", hint: "predicates" },
  { label: "slurp", hint: "-s" },
  { label: "raw", hint: "-r" },
] as const;

export const FEATURES = [
  {
    title: "Identity filter",
    body: "`.` copies input to output and pretty-prints it. That is the example on jq --help.",
  },
  {
    title: "Object and array access",
    body: "`.foo`, `.[]`, and `keys` pull fields and iterate collections without writing a loop.",
  },
  {
    title: "map and select",
    body: "`map(.name)` reshapes arrays. `select(.n > 1)` keeps the objects that match a predicate.",
  },
  {
    title: "Pipes",
    body: "Glue filters with `|`. `map(.price) | add` is the averaging example from man jq.",
  },
  {
    title: "Output flags",
    body: "`-r` raw strings, `-c` compact, `-s` slurp every input into one array, `-S` sort keys.",
  },
  {
    title: "Streaming and files",
    body: "Read stdin or named files. `--stream` walks a large document without loading it all.",
  },
  {
    title: "From a file",
    body: "`jq -f filter.jq data.json` loads a program from disk when the one-liner gets long.",
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
    title: "Install",
    command: "brew install jq",
  },
  {
    n: "2",
    title: "Help",
    command: "jq --help",
  },
  {
    n: "3",
    title: "Pretty-print",
    command: `echo '{"foo": 0}' | jq .`,
  },
] as const;

export const TOOLS = [
  {
    id: "help",
    label: "help",
    title: "jq --help",
    lead: "The real help screen. Usage, the identity filter, and the example from this machine’s jq 1.7.1.",
    points: [
      "`.` copies JSON to stdout, pretty-printed.",
      "See man jq or https://jqlang.github.io/jq/ for the full language.",
    ],
    command: "jq --help",
    href: DOCS,
    cta: "Manual",
    output: HELP_OUTPUT,
    terminalTitle: "jq --help",
  },
  {
    id: "man",
    label: "man",
    title: "man jq",
    lead: "NAME, SYNOPSIS, and FILTERS from the jq(1) manual page.",
    points: [
      "`jq [options...] filter [files...]`",
      "man jq’s own example: `jq 'map(.price) | add'`.",
    ],
    command: "man jq",
    href: DOCS,
    cta: "Manual",
    output: MAN_OUTPUT,
    terminalTitle: "man jq",
  },
  {
    id: "filter",
    label: "filter",
    title: "jq .",
    lead: "Pretty-print a document, then list its keys — both captured from a live jq run.",
    points: [
      "`echo '{\"foo\": 0}' | jq .` is the example printed by jq --help.",
      "`keys` returns the top-level field names of an object.",
    ],
    command: `echo '{"foo": 0}' | jq .`,
    href: DOCS,
    cta: "Manual",
    output: FILTER_OUTPUT,
    terminalTitle: "jq .",
  },
  {
    id: "select",
    label: "select",
    title: "map and select",
    lead: "Iterate an array, keep matching objects, or collect a field. Same input, two filters.",
    points: [
      "`.users[] | select(.n > 1)` yields each matching object.",
      "`.users | map(.name)` builds a new array of names.",
    ],
    command: `echo '{"users":[{"name":"ada","n":3},{"name":"sam","n":1}]}' | jq '.users[] | select(.n > 1)'`,
    href: DOCS,
    cta: "Manual",
    output: SELECT_OUTPUT,
    terminalTitle: "jq select",
  },
] as const;

export const FAQ = [
  {
    q: "What is jq?",
    a: "A command-line JSON processor. It reads JSON, applies a filter written in the jq language, and writes the result to stdout. MIT licensed at jqlang/jq.",
  },
  {
    q: "How do I see the help and manual?",
    a: "jq --help prints usage and the identity-filter example. man jq is the full language reference. The web manual is https://jqlang.github.io/jq/manual/.",
  },
  {
    q: "What is the simplest command?",
    a: "echo '{\"foo\": 0}' | jq . — that is the example from jq --help. `.` pretty-prints and validates the input.",
  },
  {
    q: "How do I pick fields or rows?",
    a: ".foo for a field, .[] to iterate, map(.name) to rebuild an array, select(.n > 1) to keep matching objects. Pipe filters with |.",
  },
  {
    q: "Are the install commands real?",
    a: "Yes. brew, apt-get, dnf, scoop, winget, and choco all install the jqlang jq package. They are not placeholders.",
  },
  {
    q: "Are the terminal stills fake?",
    a: "No. They are captured from jq 1.7.1 on this machine: jq --help, man jq, and the filters shown next to each tab.",
  },
  {
    q: "Where does the GitHub pulse come from?",
    a: "Live from jqlang/jq via the public GitHub API, revalidated every 30 minutes. Stars, recent commits, and the contribution graph are not invented.",
  },
  {
    q: "Is this site jq itself?",
    a: "No. This is the opencode-web-template starter dressed as jq so the layout has a real CLI to copy. The program lives at github.com/jqlang/jq.",
  },
] as const;
