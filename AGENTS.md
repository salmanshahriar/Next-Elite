# Agent notes

- Project skills live in `.agents/skills/` (the shared location coding agents read). Read `.agents/skills/project-standards/SKILL.md` before any UI or frontend work.
- Linting and formatting use Oxlint and Oxfmt, not ESLint or Prettier. There is no ESLint config; do not run `npx eslint`.
  - Check: `npm run lint`
  - Fix: `npm run lint:fix`
  - Rules live in `.oxlintrc.json` and `.oxfmtrc.json`.
- Full local gate before pushing: `npm run check` (typecheck, lint, knip, tests).
- Token contrast: keep the pairs in `src/app/styles/tokens.css` at WCAG AA (text 4.5:1, UI 3:1) in light and dark. Do not weaken them to make a visual tweak pass — adjust the token properly or ask.
- Icons come from `@phosphor-icons/react` only. Use the `*Icon`-suffixed exports (e.g. `XIcon`); the unsuffixed names are deprecated. Files without `'use client'` import from `@phosphor-icons/react/ssr`.
- Keep shared code off the critical path: `npm run size` (after `npm run build`, also run in CI) fails when a page's own initial JS goes over its budget in `scripts/check-bundle-size.ts`. Prefer `next/dynamic` or `React.lazy` for widgets that aren't needed for first paint.
- Demo-only code lives in `src/_demo(DELETE)/`. Keep new demo or showcase code there. If core code must reference it, update `scripts/remove-demo.ts` so `npm run demo:remove` still leaves a working app.
- Dependencies are pinned to exact versions (`.npmrc` sets `save-exact=true`). Do not add `^` or `~` ranges.

## Public-repo maintenance kit

This is a public boilerplate. Adopters copy patterns from core UI, demo, headers, and CI. Prefer must-fix baselines over one-off polish.

### CI gates (do not drop without asking)

| Gate          | Command / job                       | Purpose                                  |
| ------------- | ----------------------------------- | ---------------------------------------- |
| Types         | `npm run typecheck`                 | Strict TS                                |
| Lint / format | `npm run lint`                      | Oxlint + Oxfmt                           |
| Dead code     | `npm run knip`                      | Unused files/exports/deps                |
| Unit tests    | `npm run test`                      | Vitest                                   |
| Build + size  | `npm run build` then `npm run size` | Production build + per-route JS budgets  |
| Audit         | `npm audit --audit-level=high`      | High+ advisories (CI)                    |
| Demo removal  | `demo-removal` job                  | `demo:remove` still leaves a working app |
| E2E           | `playwright.yml`                    | Playwright smoke                         |

### Before finishing UI work

1. Follow the accessibility / modern-web baseline in the project-standards skill.
2. No hard-coded colours; tokens only; check contrast in both themes after token edits.
3. `npm run lint:fix` then `npm run check`.
4. If demo UI changed, keep demo a11y and ensure `npm run demo:remove` still works.
