export type SessionLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "json"; text: string }
  | { kind: "help"; text: string }
  | { kind: "man"; text: string }
  | { kind: "blank" };

export type Session = {
  title: string;
  mode: "shell" | "help" | "man";
  lines: SessionLine[];
  status?: string;
};

export const PROMPT_PATH = "~";
export const PROMPT_CHAR = "%";
