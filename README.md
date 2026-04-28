<div align="center">
<h1>Next.js Elite: The Ultimate SaaS Starter</h1>
<p><strong>Enterprise-Grade Foundation.</strong> One config. i18n, RBAC, Better Auth, SEO & More (built to scale)</p>
</div>
<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br/>

<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z0erbpt4iuqs3m6tzbn7.jpg" alt="Next.js Production-Ready Boilerplate" />

<br/><br/>

[**Live Demo** ↗](https://nextjs-elite-boilerplate.vercel.app/) · [**Use this template** ↗](https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate/generate) · [Report Bug ↗](https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate/issues) · [Request Feature ↗](https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate/issues)

<img src="https://nextjs-elite-boilerplate.vercel.app/og-image.webp" alt="Next.js Elite Boilerplate" />

</div>

---

## Motivation

Most Next.js starters leave you wiring from scratch. This boilerplate prioritizes **app-ready defaults**: A production-ready Next.js SaaS Boilerplate with Type-safe i18n (6 languages) + BetterAuth, Google OAuth + RBAC with parallel routes + SEO (sitemap, robots, manifest) + Theme + ESLint + Prettier + Vitest + Playwright.

<br/><br/>

## Integrated features

- Central config - Single [app-main-meta-data.json](src/lib/config/app-main-meta-data.json) for app name, SEO, languages, organization, theme; drives metadata, sitemap, robots, manifest
- Type-safe i18n (6 languages) - English, বাংলা, العربية, Français, Español, and 简体中文 with RTL. Example: `t("navigation.home")` is type-checked (invalid keys fail at compile time)
- Role-based access control - Permission-based RBAC with role bundles (`user`, `admin`) and ownership scopes (`own`, `any`) plus [Next.js 16 parallel routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [BetterAuth](https://www.better-auth.com/) - Auth with optional Google OAuth; admin role via `AUTH_ADMIN_EMAILS`
- [Zod](https://zod.dev/) - Runtime validation for env, site config, auth payloads, and locale parsing
- SEO - Open Graph, Twitter Card, JSON-LD, multi-language meta, dynamic sitemap, canonical URLs
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode with system preference and manual toggle
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) - Lint and format (Tailwind plugin, format on save in `.vscode`)
- [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/react) - Unit and component tests
- [Playwright](https://playwright.dev/) - E2E tests in `e2e/`; optional WebKit-only for lower disk use
- [GitHub Actions](https://github.com/features/actions) - Check workflow (lint, format, test, build) and Playwright E2E workflow
- Health check - `GET /api/health` returns `{ status: "ok" }` for load balancers and Kubernetes probes
- [shadcn/ui](https://ui.shadcn.com/) - Accessible, customizable components (Radix + CVA)
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling
- [TypeScript](https://www.typescriptlang.org/) - Strict mode for type safety
- [Next.js 16](https://nextjs.org/) - App Router, Server Components, recommended stable 16.x

#### Vercel

Deploy with [Vercel](https://vercel.com) by clicking the button below:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate)

<br/><br/>

## Quick Start

### Prerequisites

- Node.js 20.9 or later
- npm, yarn, pnpm, or bun

### Next.js version

This boilerplate uses **Next.js 16** (16.2.4) for **stability and security**. Stay on the latest 16.x patch for security updates.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate.git
   cd Nextjs-Elite-Boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser** at `http://localhost:3000`

### First-time setup

1. Copy `.env.example` to `.env` and set `NEXT_PUBLIC_APP_URL` if you need to override the site URL (e.g. in production).
2. Edit **`src/lib/config/app-main-meta-data.json`** — main config for app name, domain, SEO, languages, organization, and theme. Sitemap, robots, and manifest are generated from it.
3. For **Google sign-in**: set `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` in `.env`, then set `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true`. See [Better Auth setup](#better-auth-setup) below.

<br/><br/>

## 📁 Project Structure

```
.
├── .github/workflows/           # CI workflows (check, playwright)
├── e2e/                         # Playwright E2E tests
├── locales/                     # Translation files (en, bn, ar, fr, es, zh)
├── public/                      # Static assets (favicon, og image, etc.)
├── src/
│   ├── app/                     # App Router pages and layouts
│   │   ├── (auth)/              # Public auth pages (login)
│   │   ├── (public)/            # Public pages (home, about)
│   │   ├── (protected)/         # Authenticated area with RBAC
│   │   │   ├── @admin/          # Admin dashboard
│   │   │   ├── @user/           # User dashboard
│   │   │   └── layout.tsx       # Chooses segment based on role
│   │   ├── api/                 # API routes
│   │   │   ├── auth/            # BetterAuth routes
│   │   │   └── health/          # Health check endpoint
│   │   ├── layout.tsx           # Root layout (SEO + server shell)
│   │   ├── client-providers.tsx # Minimal global client providers (theme, toaster)
│   │   ├── providers.tsx        # Route-scoped auth + language providers
│   │   ├── error.tsx            # Global error boundary
│   │   ├── not-found.tsx        # 404 page
│   │   ├── manifest.ts          # Web manifest from config
│   │   ├── robots.ts            # robots.txt from config
│   │   └── sitemap.ts           # Sitemap from config
│   ├── components/
│   │   ├── common/              # Page-level components (e.g. hero section)
│   │   ├── icons/               # Icon components
│   │   ├── layout/              # Header/sidebar/layout wrappers
│   │   ├── providers/           # Theme/session providers
│   │   └── ui/                  # shadcn/ui components
│   ├── core/                    # Core cross-cutting runtime modules
│   │   └── env/                 # Environment parsing entrypoint
│   ├── features/                # Feature modules (auth, i18n, navigation, theme, site)
│   │   ├── auth/                # Auth + RBAC logic
│   │   ├── i18n/                # i18n config, hooks, server helpers, types
│   │   ├── navigation/          # App navigation shells (header/sidebar)
│   │   ├── site/                # Site metadata/config accessors
│   │   └── theme/               # Theme context and UI
│   ├── hooks/                   # Shared React hooks
│   ├── lib/                     # Core logic, config, and utils
│   │   └── config/              # Central config (app-main-meta-data.json)
│   └── types/                   # Shared TypeScript types
├── test/                        # Vitest suites
├── proxy.ts                     # App proxy/middleware entry
├── playwright.config.ts         # Playwright config
└── vitest.config.ts             # Vitest config
```

<br/><br/>

## ⚙️ Configuration

### Site & SEO configuration

Edit **`src/lib/config/app-main-meta-data.json`** to customize app name, domain, SEO, languages, organization, theme. It drives metadata, sitemap, robots, manifest, and i18n locales.

```json
{
  "appName": "Next.js Elite Boilerplate",
  "appType": "Enterprise SaaS Starter",
  "tagline": "Enterprise-Grade Foundation: i18n, RBAC, and OAuth (Built to Scale)",
  "title": "Next.js Elite: The Ultimate SaaS Starter with i18n & RBAC",
  "description": "Production-ready Next.js boilerplate with multi-language support (i18n) and role-based access control (RBAC)",
  "locale": "en_US",
  "language": "en-US",
  "domain": "https://yourdomain.com",
  "canonicalPath": "/",
  "applicationCategory": "WebApplication",
  "audience": "Developers, Businesses",
  "keywords": ["nextjs", "i18n", "rbac", "boilerplate", "multilanguage"],
  "features": [
    "Multi-language Support",
    "Role-Based Access Control",
    "Production Ready"
  ],
  "languages": {
    "supported": ["en", "bn", "ar", "fr", "es", "zh"],
    "default": "en",
    "locales": { "...": "..." }
  },
  "organization": { "...": "..." },
  "contact": { "...": "..." },
  "social": { "...": "..." },
  "images": { "...": "..." },
  "icons": { "...": "..." },
  "theme": { "...": "..." },
  "pricing": { "...": "..." },
  "manifest": "/manifest.webmanifest"
}
```

### Adding a New Language

1. Add **`src/lib/config/app-main-meta-data.json`** entry:
   - Append the language code to `languages.supported` (e.g. `"es"`).
   - Add an entry under `languages.locales` (e.g. `"es": { "code": "es", "name": "Spanish", "nativeName": "Español", "locale": "es_ES", "direction": "ltr" }`).
2. Create **`locales/es.json`** (or your code) with the same structure as `locales/en.json`.
3. In **`src/features/i18n/config/get-translations.ts`**, import the new file and add it to the `translations` object. Add the new key to the relevant union/type in **`src/features/i18n/types/types.ts`** if you use strict keys.

Type-safe usage example:

```ts
const { t } = useTranslations(messages);

t('navigation.home');
// t("navigation.homer"); // invalid key (type error)
```

### Better Auth setup

By default, this boilerplate uses [BetterAuth](https://www.better-auth.com/) for authentication.

1. **Google Cloud Console**: Go to [APIs & Credentials](https://console.cloud.google.com/apis/credentials) and create an OAuth 2.0 Client ID (Web application).
2. **Authorized redirect URI**: Add `http://localhost:3000/api/auth/callback/google` (dev) and your production URL (e.g. `https://yourdomain.com/api/auth/callback/google`).
3. **`.env`**: Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_URL` (e.g. `http://localhost:3000`), and `BETTER_AUTH_SECRET` (e.g. `openssl rand -base64 32`). Set `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true` to show the Google sign-in button.
4. **Admin role**: Set `AUTH_ADMIN_EMAILS=admin@yourdomain.com` (comma-separated) so those Google accounts get the admin role and admin permission bundle.

### Adding a New Role

1. Create a new parallel route folder:

   ```bash
   mkdir -p app/(protected)/@moderator/dashboard
   ```

2. Add your role-specific pages inside the folder.

3. Extend role permissions in `src/features/auth/utils/authorization.ts` by adding a new entry to the role permission map.

4. Update `src/app/(protected)/layout.tsx` capability checks if your new role needs a new route slot.

### RBAC permission model

- Roles are bundles of permissions.
- Permissions are explicit keys such as `article.publish:own` and `article.publish:any`.
- Ownership checks are resolved by policy helpers in `src/features/auth/utils/authorization.ts`.
- Example behavior: a user with `article.publish:own` can publish their own content but cannot publish content owned by another user.

Your URL stays clean. Even with parallel routes like `app/(protected)/@admin/dashboard`, the user still visits `/dashboard` (the role is not exposed in the path).

<br/><br/>

## 🧪 Testing

- **Unit / component:** [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react). Run `npm run test` or `npm run test:watch`.
- **E2E:** [Playwright](https://playwright.dev) in `e2e/`. Run `npm run e2e` (starts dev server automatically). Use `npm run e2e:ui` for the UI.
- **E2E with Safari only:** To save disk space, install only WebKit and run with Safari: `npx playwright install webkit` then `npm run e2e:webkit`.
- **Coverage:** `npm run test:coverage`.

<br/><br/>

## 🔄 CI / DX

- **GitHub Actions:** `.github/workflows/check.yml` runs on push/PR: lint, Prettier check, unit tests, build. `.github/workflows/playwright.yml` runs E2E (Chromium, Firefox, WebKit).
- **Prettier:** `prettier.config.js` + Tailwind plugin. `npm run prettier` to check, `npm run prettier:fix` to fix.
- **Editor:** `.vscode/settings.json` enables format on save and ESLint fix on save.
- **Renovate:** `renovate.json` is configured for weekly dependency PRs, grouped non-major updates, and automerge for safe patch/minor updates.

<br/><br/>

## 🏥 Infra

- **Health check:** `GET /api/health` returns `{ status: "ok" }` for load balancers and Kubernetes probes.

## 🛠️ Available Scripts

| Command                   | Description                                 |
| ------------------------- | ------------------------------------------- |
| `npm run dev`             | Start development server                    |
| `npm run build`           | Build for production                        |
| `npm run analyze`         | Run Turbopack experimental analyzer         |
| `npm run analyze:webpack` | Build with bundle analyzer plugin (Webpack) |
| `npm run start`           | Start production server                     |
| `npm run lint`            | Run ESLint                                  |
| `npm run lint:fix`        | Fix ESLint errors                           |
| `npm run test`            | Run unit tests (Vitest)                     |
| `npm run test:watch`      | Run unit tests in watch mode                |
| `npm run test:coverage`   | Run unit tests with coverage                |
| `npm run e2e`             | Run Playwright E2E tests                    |
| `npm run e2e:ui`          | Run Playwright with UI                      |
| `npm run e2e:webkit`      | Run E2E in WebKit (Safari) only             |
| `npm run prettier`        | Check formatting                            |
| `npm run prettier:fix`    | Fix formatting                              |

<br/><br/>

## 🐳 Docker

### Prerequisites

```bash
cp .env.example .env
```

### Build and run with Docker

```bash
docker build -t nextjs-elite-boilerplate .
docker run --rm --name nextjs-elite-boilerplate --env-file .env -p 3000:3000 nextjs-elite-boilerplate
```

App is available at [http://localhost:3000](http://localhost:3000).

### Stop standalone container

```bash
docker stop nextjs-elite-boilerplate
```

### Run with Docker Compose

```bash
docker compose up --build
```

### Stop Docker Compose

```bash
docker compose down
```

The project includes:

- `Dockerfile` with multi-stage build and standalone Next.js output
- `.dockerignore` for smaller/faster builds
- `docker-compose.yml` for local production-like container run

<br/><br/>

## 🔐 Security Notes

- This project intentionally avoids `npm audit fix --force` because it can produce unsafe downgrade paths (for example, to legacy Next.js versions).
- Use Renovate and controlled dependency updates instead.
- Remaining audit findings can be transitive upstream advisories while lint, tests, and build remain green.

<br/><br/>

## 🧪 Tech Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **Language:** TypeScript
- **Auth:** BetterAuth (Google OAuth)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Internationalization:** Type-safe i18n (locales from config)
- **Code Quality:** ESLint, Prettier, TypeScript strict mode
- **Testing:** Vitest, React Testing Library, Playwright
- **Icons:** Lucide React

<br/><br/>

## 🧩 Best For

Your boilerplate is ideal for:

- ✅ SaaS applications with multiple user roles
- ✅ International apps (especially with RTL needs)
- ✅ Startups needing fast, professional launches
- ✅ Enterprise projects with auth/role requirements

May not be suitable for:

- ❌ Simple landing pages (over-engineered)
- ❌ Projects with highly custom authentication requirements
- ❌ Applications without internationalization needs

<br/><br/>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing ESLint configuration and includes appropriate documentation.

<br/><br/>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
<br/><br/><br/>

<div align="center">

<br/><br/>

## ⭐ Show your support

**[ If this boilerplate saved you time, a star helps more devs discover it ]**

[![GitHub stars](https://img.shields.io/github/stars/salmanshahriar/Nextjs-Elite-Boilerplate?style=social)](https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate/stargazers)

[![Star History Chart](https://api.star-history.com/svg?repos=salmanshahriar/Nextjs-Elite-Boilerplate&type=date&legend=bottom-right)](https://www.star-history.com/#salmanshahriar/Nextjs-Elite-Boilerplate&type=date&legend=bottom-right)

[**Star the repo**](https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate/stargazers) · [Contribute](https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate/blob/main/README.md#-contributing)

</div>
