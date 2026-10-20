---
name: project-standards
description: Coding standards for this project (Next.js 16 App Router + React 19 + Tailwind v4 + shadcn/Radix frontend for admin panels, ERPs, dashboards, user portals and SaaS). Use for ANY UI or frontend work in this repo - pages, sections, cards, stats, charts, tables, forms, inputs, selects, date pickers, dialogs, layouts, styling, new components, new routes, refactors. Enforces reuse of existing components in src/components, variants over duplicates, design tokens over hard-coded values, minimal JSX/CSS, server-first public pages, and asking before structural changes.
---

# Project standards

This is a professional, production-grade frontend codebase for products such as admin panels, ERPs, dashboards, user portals and SaaS. It talks to an external backend (REST, GraphQL or BFF). It is built around user experience, so everything added to it has to stay clean, consistent and premium, and the codebase has to stay easy for the next developer to read.

Every rule below comes from the existing code. When this file and the code disagree, **the code wins**: open the nearest similar file and copy how it does things.

## Non-negotiables

1. **Use existing components first.** Before writing any JSX, check `src/components/ui`, `src/components/shared`, `src/components/layout` and `src/components/icons`. If something there does the job, use it.
2. **Extend, don't duplicate.** If a component is close but not quite right, add a variant or prop to it. Never make `MyCard`, `CustomButton`, `StatsBox` or a near-copy of something that already exists.
3. **Tokens only.** No hard-coded colors, radii, shadows or magic sizes. Every value comes from the CSS variables in `src/app/styles/tokens.css`, through Tailwind utilities.
4. **Minimal code.** No wrapper `<div>` that does nothing, no unused class, no dead code, no commented-out code, no unused export, file or dependency. Write only what the feature needs.
5. **Server first.** Pages and layouts are Server Components. Add `'use client'` only to the smallest leaf that needs state, effects or browser APIs. Public pages must render on the server for SEO.
6. **Respect the structure.** Don't add top-level folders, move files, rename conventions, add dependencies or change configs without asking the user first (see "When to ask").
7. **Industry practice, kept simple.** Pick the boring, standard solution that a new developer will understand on first read.

## Workflow for every UI task

Go through these steps in order. Stop at the first one that works.

1. **Find it.** Search the catalog below, then `grep -r "data-slot=\"<name>\"" src/components` or `ls src/components/*`. Then look at existing pages and components that already compose similar UI, and match them. If `src/_demo(DELETE)/` exists, its `components/ui-showcase.tsx` is a good composition reference for dashboards, profiles, tables and date pickers. Read it, but never import from it.
2. **Compose it.** Build the section from existing parts: `Card` + `CardHeader` + `StatCard` + `Chart` + `DataTable` + `Badge` and so on. Most "new components" are just compositions and need no new file.
3. **Extend it.** If an existing component needs a new look or behavior, add a **variant** to it (see "Extending a component"). Keep the default behavior exactly as it is, so current usages don't change.
4. **Create it**, only if nothing related exists. Follow "Creating a new component". If the component is big or reusable across the app (a new primitive, a new library), tell the user what you plan and ask before building.

Briefly tell the user which existing components you reused or extended.

## Component catalog

All paths are under `src/components/`. Import with the `@/` alias, for example `import { Card } from '@/components/ui/card'`.

### Surfaces and layout blocks

| Need                               | Use                                                                                                                                                                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Card, panel, section box           | `ui/card`: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction` (top-right slot), `CardContent`, `CardFooter`. Props: `flat` (bordered, `bg-card`, used on dashboards), `variant="solid" \| "glow"`, `nested` |
| KPI / stat tile                    | `ui/stat-card`: `StatCard` with `title`, `value`, optional `icon`, `isLoading` (renders its own skeleton)                                                                                                                   |
| Page title and actions row         | `shared/page-header`: `PageHeader` with `title`, `subtitle`, `actions`                                                                                                                                                      |
| Page wrapper with standard spacing | `shared/page-header`: `PageLayout` (`gap-6` column; `centered` for empty/error states)                                                                                                                                      |
| Alert / inline notice              | `ui/alert`: `Alert`, `AlertTitle`, `AlertDescription` (`default`, `destructive`)                                                                                                                                            |
| Divider                            | `ui/separator`                                                                                                                                                                                                              |
| Collapsible / FAQ                  | `ui/accordion`, `ui/collapsible`                                                                                                                                                                                            |
| Tabs                               | `ui/tabs`: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                                                                                                                                                                 |
| Carousel                           | `ui/carousel` (Embla)                                                                                                                                                                                                       |
| Empty placeholder art              | `ui/placeholder-pattern`                                                                                                                                                                                                    |
| Decorative glow                    | `shared/blur-glow`                                                                                                                                                                                                          |

### Data display

| Need                                                     | Use                                                                                                                                                                                                |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Table with sorting, pagination, loading and empty states | `ui/data-table`: `DataTable` with `data`, `columns: DataTableColumnDef<T>[]`, `isLoading`, `pagination={{ total, page, limit, onPageChange }}`, `emptyMessage`, controlled `sorting`               |
| Plain static table                                       | `ui/table`: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableFooter`, `TableCaption`                                                                               |
| Area / trend chart                                       | `ui/chart`: `Chart` with `data: ChartDataItem[]` (`{ label, value }`), `name`, `color`, `height`, `formatValue`, `isLoading` (ApexCharts, client-only)                                             |
| Animated ring / score gauge                              | `ui/dynamic-chart`: `DynamicChart` with `label`, `value` (0-100), `delay`, `strokeClassName`                                                                                                       |
| Progress bar                                             | `ui/progress`: `Progress` with `value`, `variant="default" \| "success" \| "destructive"`                                                                                                          |
| Status pill / tag                                        | `ui/badge`: `Badge`. Variants: `default`, `secondary`, `success`, `warning`, `destructive`, `outline`, `successSubtle`, `primaryOutline`, `successOutline`, `warningOutline`, `destructiveOutline` |
| Status dot                                               | `ui/status-indicator`: `StatusIndicator` with `variant` (`success`, `warning`, `destructive`, `muted`), `size` (`sm`, `default`, `lg`), `pulse`                                                    |
| Avatar                                                   | `ui/avatar`: `Avatar`, `AvatarImage`, `AvatarFallback`                                                                                                                                             |
| Loading placeholder                                      | `ui/skeleton`; inline spinner `ui/spinner`                                                                                                                                                         |
| Breadcrumbs                                              | `ui/breadcrumb` (the protected `Topbar` already generates them from the URL plus `navigation.*` translations)                                                                                      |

### Inputs and forms

| Need                                      | Use                                                                                                                                                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Text input                                | `ui/input`                                                                                                                                                                                                                     |
| Input with icon, prefix, suffix or button | `ui/input-group`: `InputGroup`, `InputGroupAddon` (`align`), `InputGroupInput`, `InputGroupTextarea`, `InputGroupButton`, `InputGroupText`                                                                                     |
| Password with show/hide                   | `ui/password-input`                                                                                                                                                                                                            |
| Textarea                                  | `ui/textarea` (auto-grows)                                                                                                                                                                                                     |
| Native-style select                       | `ui/select`: `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`                                                                                          |
| Searchable select                         | `ui/combobox`: `Combobox` with `options: ComboboxOption[]`, `value`, `onChange`                                                                                                                                                |
| Date picker                               | `Popover` + `PopoverTrigger asChild` + outline `Button` with `CalendarIcon` + `PopoverContent className="w-auto p-0"` + `Calendar mode="single" captionLayout="dropdown"`. See the snippet below. Don't install another picker |
| Calendar                                  | `ui/calendar` (react-day-picker with month/year selects)                                                                                                                                                                       |
| Checkbox / radio / switch                 | `ui/checkbox`, `ui/radio-group`, `ui/switch`                                                                                                                                                                                   |
| Toggle / segmented control                | `ui/toggle`, `ui/toggle-group`                                                                                                                                                                                                 |
| OTP code                                  | `ui/input-otp`                                                                                                                                                                                                                 |
| Label                                     | `ui/label`                                                                                                                                                                                                                     |
| Field error text                          | `ui/input-error` (`InputError message={...}`, renders nothing when empty)                                                                                                                                                      |
| react-hook-form bindings                  | `ui/form`: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`                                                                                                                       |

Date picker pattern:

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button
      id="due-date"
      variant="outline"
      className="w-full justify-start font-normal"
    >
      <CalendarIcon className="text-muted-foreground" />
      {date ? (
        formatDate(date)
      ) : (
        <span className="text-muted-foreground">{t('pickDate')}</span>
      )}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={date}
      captionLayout="dropdown"
    />
  </PopoverContent>
</Popover>
```

### Actions and overlays

| Need            | Use                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button          | `ui/button`: `Button` with `loading` (shows the loader and translated "Loading...", disables itself) and `asChild` (wrap `Link`). Variants: `default`, `primary`, `subtle`, `secondary`, `outline`, `ghost`, `ghostPrimary`, `ghostDestructive`, `destructive`, `destructiveSubtle`, `outlineSuccess`, `outlineWarning`, `outlineDestructive`, `accent`, `muted`, `success`, `toggle`, `link`. Sizes: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg` |
| Grouped buttons | `ui/button-group`                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Modal / confirm | `ui/dialog`                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Side drawer     | `ui/sheet`                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Popover         | `ui/popover`                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Menu            | `ui/dropdown-menu`                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Tooltip         | `ui/tooltip`                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Toast           | `import { toast } from 'sonner'` (the `<Toaster richColors />` is already mounted in `app/providers.tsx`)                                                                                                                                                                                                                                                                                                                                                 |
| Text link       | `shared/text-link` (`variant="default" \| "underlined"`); otherwise `next/link`                                                                                                                                                                                                                                                                                                                                                                           |

### App chrome (already wired, reuse it, don't rebuild it)

- `layout/app-shell`, `layout/admin-sidebar`, `layout/user-sidebar`, `layout/topbar`, `layout/header`, `layout/app-brand`, `ui/sidebar`
- `shared/theme-toggle`, `shared/language-switcher`, `shared/user-dropdown`, `shared/logo`, `shared/top-loader`
- To add a sidebar link, add an entry to the `NavItem[]` array in the relevant sidebar, with `id`, `label: t('navigation.<key>')`, `href`, `icon: IconName` and `permission`. Don't hand-write menu JSX.

### Icons

- Use `@phosphor-icons/react` only, and always the `*Icon` names (`CalendarIcon`, not `Calendar`).
- Files **without** `'use client'` import from `@phosphor-icons/react/ssr`.
- Navigation icons go through the registry in `icons/app-icons.tsx` (`<Icon name="dashboard" />`). Add new nav icons to `Icons` there.
- Brand or custom SVGs go in `components/icons/` and get exported from `icons/index.ts`.

### Helpers

- `cn()` from `@/libs/utils` merges classes. Use it whenever a `className` is conditional or passed in.
- `Case` from `shared/case` handles conditional blocks: `<Case condition={x}>...</Case>`.
- Hooks: `useIsMobile` (`@/hooks/use-mobile`), `useIsDarkTheme` (`@/hooks/use-is-dark-theme`), `useIsRtl` (`@/features/i18n/use-is-rtl`), `useAuth` (`@/features/auth/hooks/auth-provider`), `useSidebar`.

## Extending a component (variants)

Match how the component is already built:

- **cva components** (`button`, `badge`, `status-indicator`, `toggle`, `alert`, `input-group`): add a key to the existing `variants.variant` (or `size`) object. Keep the naming pattern (`<color>`, `<color>Subtle`, `<color>Outline`, `ghost<Color>`). Use only token classes.

  ```tsx
  // badge.tsx: add to the existing variants.variant object
  info: 'border-transparent bg-primary/10 text-primary',
  ```

- **Prop-switched components** (`card`'s `flat` / `variant`, `progress`'s `variant`, `text-link`'s `variant`): add one more union member or boolean prop and one more `cn()` branch.
- Don't change the default output. Existing call sites must render the same.
- If the variant only makes sense on one page, don't add it. Pass `className` at the call site instead.
- If a test exists for the component in `src/tests/components/ui/`, add a case for the new variant.

## Creating a new component

Only do this when nothing in the catalog fits.

- **Where it goes:**
  - `src/components/ui/<name>.tsx` for generic, app-agnostic primitives (shadcn style).
  - `src/components/shared/<name>.tsx` for app-level pieces reused across pages.
  - `src/components/layout/` for app chrome.
  - `src/components/<domain>/` (like the existing `auth/`) for a domain's UI.
  - Used by a single page? Keep it in that page's file or right next to it. Don't create a folder for one file.
  - If `src/_demo(DELETE)/` exists, demo or showcase code goes only there.
- **File anatomy for ui primitives** (copy `card.tsx`, `skeleton.tsx`, `stat-card.tsx`):

  ```tsx
  import { cn } from '@/libs/utils';

  function Thing({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="thing"
        className={cn('rounded-md border bg-card p-4', className)}
        {...props}
      />
    );
  }

  export { Thing };
  ```

  - Use `function` declarations, extend native props (`React.ComponentProps<'div'>` or `typeof Primitive.Root`), destructure with defaults, spread `...props` last, and set `data-slot="<kebab-name>"`.
  - Put a single `export { ... }` block at the bottom, and `export type { ... }` for public types.
  - Use cva + `VariantProps` once you have two or more visual variants.
  - Wrap Radix primitives when they exist instead of building behavior by hand.

- Don't install a new UI library when a Radix primitive or an existing component can do it. If you really need one, ask first. Pin exact versions, with no `^` or `~`.
- Keep it accessible: real `<button type="button">`, `aria-label` on icon-only buttons, `aria-invalid` on invalid fields, and `role` only where the semantics need it.

## Code style (match it exactly)

### Files and naming

- File names are kebab-case: `stat-card.tsx`, `use-is-rtl.ts`. Components are PascalCase and hooks start with `use`.
- Module-level constants are `UPPER_SNAKE_CASE` with `as const`: `SORT_ICONS`, `CARD_SURFACE_CLASS`, `MONTH_NAMES`. Hoist static arrays, maps and long class strings out of the component.
- Write props as `interface XProps` or `type XProps`, right above the component. Follow the neighboring files.

### Function style by file type

- **Pages, layouts, `default.tsx`:** an arrow const plus a default export:

  ```tsx
  const AdminDashboardPage = async () => { ... };

  export default AdminDashboardPage;
  ```

  Trivial pages are one line: `const LoginPage = () => <LoginForm />;`

- **ui / shared / layout components:** a named `function` export. A few legacy files use a default export (`Case`, `TextLink`, `InputError`, `LanguageSwitcher`). When you edit one of those, keep what it has.

### TypeScript

- Strict mode with `noUncheckedIndexedAccess` and `verbatimModuleSyntax`. Use `import type { X }` or inline `type X` for types, and handle possibly-undefined index access with `?.` / `??`.
- Don't use `any`. Infer from zod (`z.infer<typeof schema>`) and from component props.

### React and JSX

- **No pointless wrappers.** Every element must have a job: layout, semantics or styling that can't go on its parent or child. If a `<div>` only wraps one child and adds nothing, remove it. Use fragments `<>` only when you have to.
- Use semantic tags: `main`, `section`, `header`, `nav`, `h1`-`h4`, `p`, `ul`/`li`, `button`.
- Conditionals: `cond ? <X /> : null`, `cond && <X />`, or `<Case condition>`. Use early `return` for loading and empty states, like `DataTable` and `StatCard` do.
- Render lists with `.map` over a constant or data, with a stable `key` (an id, not the index, when one exists). Don't copy-paste repeated JSX.
- Use `useMemo` / `useCallback` only when there is a real cost or identity need (like the sidebar's nav items). Don't add them by default.
- In server components, run independent awaits in parallel:

  ```tsx
  const [, t] = await Promise.all([
    requirePermission('dashboard.view:admin'),
    getTranslations('dashboard.admin'),
  ]);
  ```

- Comments: almost none. Name things clearly instead. Never leave TODOs, commented-out code or `console.log`.

### Formatting

Oxfmt handles it: single quotes, semicolons, trailing commas, 80-column width, sorted Tailwind classes. Run `npm run lint:fix`. Don't hand-sort or fight the formatter. Never run ESLint or Prettier.

## Styling rules

- **Only Tailwind utilities that map to tokens:** `bg-background`, `bg-card`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `text-primary`, `bg-primary/10`, `border-border`, `border-input`, `ring-ring`, `text-success`, `bg-warning`, `text-destructive`, `bg-chart-1`...`chart-5`, `bg-sidebar*`, `rounded-sm|md|lg|xl`, `h-app-header` / `pt-app-header`.
- **Never** use raw hex, `rgb()`, `oklch()`, or Tailwind palette colors (`bg-blue-500`, `text-gray-600`, `bg-white`, `text-black`) in components. For inline needs (chart colors, SVG strokes, `BlurGlow`), use `var(--token)`: `color="var(--primary)"`, `stroke="var(--border)"`, `color="var(--glow-accent-subtle)"`.
- Opacity modifiers on tokens are fine and preferred over new tokens: `bg-primary/10`, `border-border/40`, `bg-muted/70`.
- **Need a new token?** Add it to `src/app/styles/tokens.css` in **three** places: `:root` (light), `.dark`, and the `@theme` mapping (`--color-x: var(--x)`). Give it a value for both themes, then use it as `bg-x` / `text-x`. Ask the user before adding brand-level tokens.
- Avoid arbitrary values (`w-[437px]`, `text-[13px]`). Use the Tailwind scale. Arbitrary values are OK only for CSS-variable references (`w-[var(--radix-popover-trigger-width)]`) or a real one-off that the scale can't express.
- Use the `dark:` variant only when a token doesn't already switch with the theme.
- **RTL is supported** (Arabic). Use logical utilities: `ms-*`/`me-*`, `ps-*`/`pe-*`, `start-*`/`end-*`, `border-s`/`border-e`, `text-start`/`text-end`. Don't use `ml-*`/`mr-*`/`left-*`/`right-*` for directional spacing in new code.
- No new CSS files and no `style={{}}` for things Tailwind can do. Global CSS lives only in `src/app/styles/` (`tokens.css`, `base.css`, `components.css`).
- Responsive design is mobile first: `grid-cols-2 xl:grid-cols-4`, `p-4 md:p-6`, `flex-col sm:flex-row`. Add `min-w-0` on flex/grid children that hold truncating text, charts or tables.
- Use `tabular-nums` for numbers in stats, tables and counters.

## Server vs client

- Pages (`page.tsx`) and layouts are **async Server Components**. Use `getTranslations` from `next-intl/server` and `generateMetadata` for SEO.
- Public pages (`src/app/(public)`) must render real content on the server. Put interactivity in small `'use client'` leaf components and pass them server-rendered children or data.
- `'use client'` goes in components that use state, effects, event handlers, context, or browser APIs. Client components use `useTranslations` from `next-intl`.
- Client-only libraries (ApexCharts) load through `next/dynamic` with `ssr: false` and a `Skeleton` fallback, like `ui/chart.tsx` does.
- Server-only modules start with `import 'server-only';` (see `features/auth/server/get-current-user.ts`).

## Pages and routing

- **Route groups:** `(public)` for marketing/SEO pages, `(auth)` for login, register and reset, `(protected)` for the app behind login.
- **Role slots:** protected pages live in `@admin/<route>/page.tsx` and/or `@user/<route>/page.tsx`. The protected layout picks the slot based on permissions. New slots need a `default.tsx` that returns `null`.
- **Guard every protected page** with `requirePermission('<permission>')` (or `requireUser()`) from `@/features/auth/rbac/require`. New permissions go in `features/auth/rbac/permissions.ts` and are mapped in `roles.ts`.
- **Standard protected page:**

  ```tsx
  import { PageHeader, PageLayout } from '@/components/shared/page-header';
  import { requirePermission } from '@/features/auth/rbac/require';
  import { getTranslations } from 'next-intl/server';

  const AdminOrdersPage = async () => {
    const [, t] = await Promise.all([
      requirePermission('dashboard.view:admin'),
      getTranslations('orders'),
    ]);

    return (
      <PageLayout>
        <PageHeader title={t('title')} subtitle={t('description')} />
        <OrdersTable />
      </PageLayout>
    );
  };

  export default AdminOrdersPage;
  ```

- Dashboard sections follow this grid: a `StatCard` row in `grid grid-cols-2 gap-4 xl:grid-cols-4`, then `Card flat` panels in `grid gap-4 xl:grid-cols-3` with `min-w-0` and `xl:col-span-2` where needed.
- Add the route to `src/app/sitemap.ts` / `features/site/site.config.json` only for public pages.

## Data, forms, i18n

- **Server data:** fetch in the Server Component when the data is needed for first paint or SEO.
- **Client data:** use TanStack Query (`useQuery` / `useMutation`). The client is already provided in `app/providers.tsx` with defaults from `libs/query-client.ts`. Don't add another fetching library or a global store unless the user agrees.
- **Forms:** use react-hook-form + `zodResolver`. Put the schema in `src/features/<feature>/schemas/<name>.ts` and export `xSchema` plus `type XInput = z.infer<...>`. Wire fields with `Label` + `Input` + `InputError`, or with the `ui/form` primitives. Submit with `<Button type="submit" loading={form.formState.isSubmitting}>`. Copy `components/auth/login-form.tsx`.
- **Feature logic** (hooks, schemas, server helpers, types for one domain) goes in `src/features/<feature>/` using the same subfolders `auth` uses (`hooks/`, `lib/`, `schemas/`, `server/`, `types.ts`). Create only the subfolders you actually need.
- **i18n:** user-facing text goes through `next-intl`. Add every new key to **all six** files in `messages/` (`en`, `bn`, `ar`, `fr`, `es`, `zh`). Keys are type-checked from `en.json`. Reuse `common.*` keys (`save`, `cancel`, `delete`, `search`, `noData`, ...) before adding new ones. Add nav labels under `navigation.*` so breadcrumbs pick them up.
- **Env vars:** declare them in `src/libs/env.ts` (T3 Env) and document them in `.env.example`. Never read `process.env` directly in components.

## UX quality bar (no AI slop)

The product is judged on its UX. Everything must look like it belongs to the same product.

- Stay consistent with what exists: the same card surfaces, radii, spacing rhythm (`gap-4` / `gap-6`, `p-4 md:p-6`), type scale and muted-foreground hierarchy.
- Don't add gradients, emoji, rainbow badges, heavy shadows, random glows, stock "hero" filler, decorative icons on every line, lorem ipsum, or marketing fluff in app screens.
- Every data view needs **loading**, **empty** and **error** states. Use the built-in `isLoading`, `emptyMessage`, `Skeleton` and `Alert`.
- Give feedback for every action: button `loading`, `toast.success` / `toast.error`, and disabled states.
- Keep motion subtle and purposeful. Use the existing transitions; don't add new animations without a reason.
- Check accessibility: keyboard reachable, visible focus (it's built into the primitives), labels tied to inputs, sufficient contrast in **both** light and dark themes, and correct behavior in RTL.
- Write copy that is short, sentence case and specific. "Save changes", not "Submit Your Amazing Changes Now!"

## When to ask the user first

Stop and ask (with a short recommendation) before you:

- Add, rename, move or delete top-level folders, or change the `src/` layout, route groups or slot model.
- Add or remove a dependency, or change `next.config.mjs`, `tsconfig.json`, lint/format/knip configs, CI or Docker.
- Change a component's default look or API in a way that affects existing call sites.
- Add brand-level design tokens or change existing token values.
- Change auth, RBAC roles or permissions, or the i18n setup.
- Find that the request conflicts with these rules (for example "just hard-code this color" or "make a separate card component"). Explain the trade-off and offer the in-pattern option.
- Face a real product decision you can't infer (server vs client data source, pagination strategy, which role sees a page).

For small, in-pattern work (a page, a section, a variant, a translation key), just do it.

## Before you finish

- [ ] Reused or extended existing components; no near-duplicates created
- [ ] No hard-coded colors or sizes; tokens only; works in light, dark and RTL
- [ ] No unnecessary wrappers, classes, files, folders, exports or comments
- [ ] Server Component by default; `'use client'` only on leaves
- [ ] Protected pages guarded; translations added to all six `messages/*.json`
- [ ] Loading, empty and error states handled
- [ ] `npm run lint:fix`, then `npm run check` (typecheck, lint, knip, tests) passes
- [ ] If `src/_demo(DELETE)/` exists: demo code stays there, and `npm run demo:remove` still works
