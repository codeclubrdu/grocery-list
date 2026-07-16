# Contributing

## Scripts

- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm start` — serve production build
- `pnpm lint` / `pnpm lint:fix` — ESLint
- `pnpm format` / `pnpm format:check` — Prettier
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm tasks` / `pnpm tasks:stop` — task board (see below)

## Git hooks (lefthook)

Installed automatically by `pnpm install` (via the `prepare` script).

- **pre-commit** (parallel, auto-restages fixes):
  - `prettier --write` on staged `*.{js,mjs,ts,tsx,md,mdx,json,css,yml,yaml}`
  - `eslint --fix` on staged `*.{js,mjs,ts,tsx}`
- **pre-push**: `pnpm typecheck`

Manual run: `pnpm lefthook run pre-commit` / `pnpm lefthook run pre-push`.
Skip in a pinch with `git commit --no-verify` / `git push --no-verify`.

## Task board

Tasks live in the repo as markdown files under `tasks/boards/` (lanes are directories, cards are `.md` files), viewed with [Tasks.md](https://github.com/BaldissaraMatheus/Tasks.md). Requires Docker.

```bash
pnpm tasks       # start the board at http://localhost:8338
pnpm tasks:stop  # stop it
```

Edit cards in the UI or your editor and commit them like any other file. Prettier ignores `tasks/` so the app's own formatting is left alone.

## PRs

Branch from `main`. No direct pushes to `main` — open a PR.
