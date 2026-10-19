# Agent notes

- Linting and formatting use Oxlint and Oxfmt, not ESLint or Prettier. There is no ESLint config; do not run `npx eslint`.
  - Check: `npm run lint`
  - Fix: `npm run lint:fix`
  - Rules live in `.oxlintrc.json` and `.oxfmtrc.json`.
- Full gate before pushing: `npm run check` (typecheck, lint, knip, tests).
- Icons come from `@phosphor-icons/react` only. Use the `*Icon`-suffixed exports (e.g. `XIcon`); the unsuffixed names are deprecated. Files without `'use client'` import from `@phosphor-icons/react/ssr`.
- Demo-only code lives in `src/_demo(DELETE)/`. Keep new demo or showcase code there. If core code must reference it, update `scripts/remove-demo.mjs` so `npm run demo:remove` still leaves a working app.
- Dependencies are pinned to exact versions (`.npmrc` sets `save-exact=true`). Do not add `^` or `~` ranges.
