/** Captured from jq 1.7.1 (`jq --help`, `man jq`, and live filters). */

export const HELP_OUTPUT = `jq - commandline JSON processor [version 1.7.1-apple]

Usage:	jq [options] <jq filter> [file...]
	jq [options] --args <jq filter> [strings...]
	jq [options] --jsonargs <jq filter> [JSON_TEXTS...]

jq is a tool for processing JSON inputs, applying the given filter to
its JSON text inputs and producing the filter's results as JSON on
standard output.

The simplest filter is ., which copies jq's input to its output
unmodified except for formatting. For more advanced filters see
the jq(1) manpage ("man jq") and/or https://jqlang.github.io/jq/.

Example:

	$ echo '{"foo": 0}' | jq .
	{
	  "foo": 0
	}

Command options:
  -n, --null-input          use \`null\` as the single input value;
  -R, --raw-input           read each line as string instead of JSON;
  -s, --slurp               read all inputs into an array and use it as
                            the single input value;
  -c, --compact-output      compact instead of pretty-printed output;
  -r, --raw-output          output strings without escapes and quotes;
  -h, --help                show the help;`;

export const MAN_OUTPUT = `JQ(1)                                                                    JQ(1)

NAME
       jq - Command-line JSON processor

SYNOPSIS
       jq [options...] filter [files...]

       jq can transform JSON in various ways, by selecting, iterating,
       reducing and otherwise mangling JSON documents. For instance, running
       the command jq 'map(.price) | add' will take an array of JSON objects
       as input and return the sum of their "price" fields.

       jq can accept text input as well, but by default, jq reads a stream of
       JSON entities (including numbers and other literals) from stdin.
       One or more files may be specified, in which case jq will read input
       from those instead.

FILTERS
       A jq program is a "filter": it takes an input, and produces an output.
       There are a lot of builtin filters for extracting a particular field of
       an object, or converting a number to a string, or various other
       standard tasks.

       Filters can be combined in various ways - you can pipe the output of
       one filter into another filter, or collect the output of a filter into
       an array.

INVOKING JQ
       The simplest and most common filter is ., which is the identity
       operator. Because the default behavior is to pretty-print outputs,
       the . program's main use is to validate and pretty-print the inputs.`;

export const QUICKSTART_OUTPUT = `$ echo '{"foo": 0}' | jq .
{
  "foo": 0
}

$ echo '{"users":[{"name":"ada","role":"admin","n":3},{"name":"sam","role":"dev","n":1}]}' \\
    | jq '.users | map(.name)'
[
  "ada",
  "sam"
]

$ echo '{"users":[{"name":"ada","role":"admin","n":3},{"name":"sam","role":"dev","n":1}]}' \\
    | jq '.users[] | select(.n > 1)'
{
  "name": "ada",
  "role": "admin",
  "n": 3
}

$ echo '{"users":[{"name":"ada","role":"admin","n":3},{"name":"sam","role":"dev","n":1}]}' \\
    | jq -r '.users[] | "\\(.name)\\t\\(.role)\\t\\(.n)"'
ada	admin	3
sam	dev	1`;

export const FILTER_OUTPUT = `$ echo '{"foo": 0}' | jq .
{
  "foo": 0
}

$ echo '{"users":[{"name":"ada","n":3},{"name":"sam","n":1}]}' | jq 'keys'
[
  "users"
]`;

export const SELECT_OUTPUT = `$ echo '{"users":[{"name":"ada","role":"admin","n":3},{"name":"sam","role":"dev","n":1}]}' \\
    | jq '.users[] | select(.n > 1)'
{
  "name": "ada",
  "role": "admin",
  "n": 3
}

$ echo '{"users":[{"name":"ada","role":"admin","n":3},{"name":"sam","role":"dev","n":1}]}' \\
    | jq '.users | map(.name)'
[
  "ada",
  "sam"
]`;
