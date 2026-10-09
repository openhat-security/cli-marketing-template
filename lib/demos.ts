import type { Session, SessionLine } from "@/lib/session";

function cmd(text: string): SessionLine {
  return { kind: "cmd", text };
}
function out(text: string): SessionLine {
  return { kind: "out", text };
}
function json(text: string): SessionLine {
  return { kind: "json", text };
}
function help(text: string): SessionLine {
  return { kind: "help", text };
}
function man(text: string): SessionLine {
  return { kind: "man", text };
}
const blank: SessionLine = { kind: "blank" };

/** Short shell session for the hero — reads as a real prompt, not a text dump. */
export const HERO_SESSION: Session = {
  title: "zsh — ~",
  mode: "shell",
  lines: [
    cmd("jq --version"),
    out("jq-1.7.1-apple"),
    blank,
    cmd(`echo '{"foo": 0}' | jq .`),
    json("{"),
    json('  "foo": 0'),
    json("}"),
    blank,
    cmd("jq --help | head -n 6"),
    out("jq - commandline JSON processor [version 1.7.1-apple]"),
    out(""),
    out("Usage:\tjq [options] <jq filter> [file...]"),
    out("\tjq [options] --args <jq filter> [strings...]"),
    out("\tjq [options] --jsonargs <jq filter> [JSON_TEXTS...]"),
  ],
};

export const QUICKSTART_SESSION: Session = {
  title: "zsh — ~",
  mode: "shell",
  lines: [
    cmd(`echo '{"foo": 0}' | jq .`),
    json("{"),
    json('  "foo": 0'),
    json("}"),
    blank,
    cmd(`echo '{"users":[{"name":"ada","n":3},{"name":"sam","n":1}]}' \\`),
    out("    | jq '.users | map(.name)'"),
    json("["),
    json('  "ada",'),
    json('  "sam"'),
    json("]"),
    blank,
    cmd(`echo '{"users":[{"name":"ada","n":3},{"name":"sam","n":1}]}' \\`),
    out("    | jq '.users[] | select(.n > 1)'"),
    json("{"),
    json('  "name": "ada",'),
    json('  "n": 3'),
    json("}"),
  ],
};

export const HELP_SESSION: Session = {
  title: "jq --help",
  mode: "help",
  status: "jq --help  ·  1.7.1-apple",
  lines: [
    cmd("jq --help"),
    blank,
    help("jq - commandline JSON processor [version 1.7.1-apple]"),
    blank,
    help("Usage:  jq [options] <jq filter> [file...]"),
    help("        jq [options] --args <jq filter> [strings...]"),
    blank,
    help("The simplest filter is ., which copies jq's input to its"),
    help("output unmodified except for formatting."),
    blank,
    help("Example:"),
    help("  $ echo '{\"foo\": 0}' | jq ."),
    help("  {"),
    help('    "foo": 0'),
    help("  }"),
    blank,
    help("  -n, --null-input     use null as the single input value"),
    help("  -s, --slurp          read all inputs into an array"),
    help("  -c, --compact-output compact instead of pretty-printed"),
    help("  -r, --raw-output     strings without escapes and quotes"),
    help("  -h, --help           show the help"),
  ],
};

export const MAN_SESSION: Session = {
  title: "man jq",
  mode: "man",
  status: "Manual page jq(1)     line 1     (press q to quit)",
  lines: [
    cmd("man jq"),
    blank,
    man("JQ(1)                 General Commands Manual                JQ(1)"),
    blank,
    man("NAME"),
    man("       jq — Command-line JSON processor"),
    blank,
    man("SYNOPSIS"),
    man("       jq [options...] filter [files...]"),
    blank,
    man("DESCRIPTION"),
    man("       jq can transform JSON by selecting, iterating, reducing"),
    man("       and otherwise mangling JSON documents. For instance,"),
    man("       jq 'map(.price) | add' sums the price fields of an array."),
    blank,
    man("FILTERS"),
    man("       A jq program is a filter: it takes an input and produces"),
    man("       an output. Combine filters with | .  The identity filter"),
    man("       . pretty-prints and validates the input."),
  ],
};

export const FILTER_SESSION: Session = {
  title: "zsh — ~",
  mode: "shell",
  lines: [
    cmd(`echo '{"foo": 0}' | jq .`),
    json("{"),
    json('  "foo": 0'),
    json("}"),
    blank,
    cmd(`echo '{"users":[{"name":"ada","n":3}]}' | jq 'keys'`),
    json("["),
    json('  "users"'),
    json("]"),
  ],
};

export const SELECT_SESSION: Session = {
  title: "zsh — ~",
  mode: "shell",
  lines: [
    cmd(`jq '.users[] | select(.n > 1)' users.json`),
    json("{"),
    json('  "name": "ada",'),
    json('  "role": "admin",'),
    json('  "n": 3'),
    json("}"),
    blank,
    cmd(`jq '.users | map(.name)' users.json`),
    json("["),
    json('  "ada",'),
    json('  "sam"'),
    json("]"),
  ],
};
