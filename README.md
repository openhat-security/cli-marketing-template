# opencode-web-template

Web template for **terminal / CLI marketing sites**. Same section order as [runhug-web](https://github.com/openhat-security/runhug-web) and [truffles-web](https://github.com/openhat-security/truffles-web).

This is not a product. [jq](https://jqlang.github.io/jq/) is sample demo content so the windows show a real `--help`, `man`, and JSON session. Swap it for your CLI.

Live: [https://opencode-web-template.vercel.app](https://opencode-web-template.vercel.app)

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

1. `lib/site.ts` — name, install commands, FAQ, links.
2. `lib/demos.ts` — terminal sessions (`--help`, `man`, live commands).
3. `--brand` tokens in `app/globals.css`.
4. `SITE.github` — point at your repo and keep `live: true` for the pulse block.

## Deploy

Vercel project: `devrecated/opencode-web-template`.

```bash
vercel --prod --scope devrecated
```
