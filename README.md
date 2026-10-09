# opencode-web-template

Starter marketing site in the same section order as [runhug-web](https://github.com/openhat-security/runhug-web) and [truffles-web](https://github.com/openhat-security/truffles-web). Dressed as [jq](https://jqlang.github.io/jq/) so every install line and terminal still is a real command (`jq --help`, `man jq`, `.` / `map` / `select`).

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build
pnpm start
```

## Rebrand

1. Edit `lib/site.ts` and `lib/demos.ts`.
2. Edit `--brand` tokens in `app/globals.css`.
3. Point `SITE.github` at your repo. `live: true` fetches stars and the commit graph from the GitHub API.

## Deploy

Live: [https://opencode-web-template.vercel.app](https://opencode-web-template.vercel.app)

Vercel project: `devrecated/opencode-web-template`.

```bash
vercel --prod --scope devrecated
```

## Notes

- Install tabs are the real jq packages (brew, apt-get, dnf, scoop, winget, choco).
- Terminal stills were captured from jq 1.7.1.
- GitHub pulse reads `jqlang/jq` when `SITE.github.live` is true.
