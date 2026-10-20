import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const at = (relative) => path.join(root, relative);

const DEMO_DIR = 'src/_demo(DELETE)';
const DEMO_ROUTE = 'src/app/(public)/ui-components';
const DEMO_IMAGES = [
  'public/Next-Elite-Admin.webp',
  'public/Next-Elite-Auth.webp',
  'public/Next-Elite-Home.webp',
  'public/Next-Elite-LightHouse.webp',
  'public/Nextjs-Elite-UI-Components.webp',
];

if (!fs.existsSync(at(DEMO_DIR))) {
  process.stdout.write(`${DEMO_DIR} not found, nothing to remove.\n`);
  process.exit(0);
}

const pending = new Map();

const read = (file) => pending.get(file) ?? fs.readFileSync(at(file), 'utf8');

const edit = (file, replacements) => {
  let content = read(file);
  for (const [pattern, replacement] of replacements) {
    const found =
      typeof pattern === 'string'
        ? content.includes(pattern)
        : pattern.test(content);
    if (!found) {
      throw new Error(`${file}: could not find ${String(pattern)}`);
    }
    content = content.replace(pattern, replacement);
  }
  pending.set(file, content);
};

const editJson = (file, mutate) => {
  const json = JSON.parse(read(file));
  mutate(json);
  pending.set(file, `${JSON.stringify(json, null, 2)}\n`);
};

pending.set(
  'src/app/(public)/page.tsx',
  `import { siteConfig } from '@/features/site/config';

const HomePage = () => (
  <section className="flex flex-col items-center gap-4 px-4 py-24 text-center">
    <h1 className="text-4xl font-extrabold tracking-tight">
      {siteConfig.appName}
    </h1>
    <p className="text-muted-foreground">{siteConfig.appType}</p>
  </section>
);

export default HomePage;
`,
);

edit('src/components/auth/login-form.tsx', [
  ["import { env } from '@/libs/env';\n", ''],
  ["import { type DemoAccount } from '@/_demo(DELETE)/auth/accounts';\n", ''],
  [
    "import DemoCredentials from '@/_demo(DELETE)/auth/demo-credentials';\n",
    '',
  ],
  [
    "import { signInWithDemoFallback } from '@/_demo(DELETE)/auth/sign-in';\n",
    '',
  ],
  ['const isDemoMode = env.NEXT_PUBLIC_DEMO_MODE;\n\n', ''],
  ['signIn, signUp, signInWithGoogle', 'signIn, signInWithGoogle'],
  [
    / {6}if \(isDemoMode\) \{[\s\S]*?\} else \{\n {8}await signIn\(values\.email, values\.password\);\n {6}\}\n/,
    '      await signIn(values.email, values.password);\n',
  ],
  [/ {2}const handleDemoSelect = [\s\S]*?\n {2}\};\n\n/, ''],
  [
    '\n          {isDemoMode && <DemoCredentials onSelect={handleDemoSelect} />}\n',
    '\n',
  ],
]);

edit('src/features/auth/rbac/roles.ts', [
  ["import { env } from '@/libs/env';\n", ''],
  ["import { getDemoRoleByEmail } from '@/_demo(DELETE)/auth/accounts';\n", ''],
  [/ {2}if \(env\.NEXT_PUBLIC_DEMO_MODE\) \{\n[^\n]*\n {2}\}\n/, ''],
]);

edit('src/tests/features/auth/rbac/roles.test.ts', [
  ['    NEXT_PUBLIC_DEMO_MODE: false,\n', ''],
]);

edit('src/components/layout/header.tsx', [
  [/ *<Link\n *href="\/ui-components"\n[\s\S]*?<\/Link>\n/, ''],
  [/ *<Link\n *href="\/ui-components"\n[\s\S]*?<\/Link>\n/, ''],
]);

edit('src/libs/env.ts', [
  ['    NEXT_PUBLIC_DEMO_MODE: booleanFromString,\n', ''],
  ['    NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,\n', ''],
]);

edit('.env.example', [
  [/\n# Demo mode\n[\s\S]*?NEXT_PUBLIC_DEMO_MODE=\w+\n/, ''],
]);

edit('Dockerfile', [
  ['ARG NEXT_PUBLIC_DEMO_MODE\n', ''],
  ['ENV NEXT_PUBLIC_DEMO_MODE=$NEXT_PUBLIC_DEMO_MODE\n', ''],
]);

edit('config/playwright.config.ts', [
  [
    "testMatch: ['e2e/**/*.spec.ts', /src\\/_demo\\(DELETE\\)\\/.+\\.spec\\.ts$/],",
    "testMatch: ['e2e/**/*.spec.ts'],",
  ],
]);

edit('next.config.mjs', [[' https://api.github.com', '']]);

edit('.github/workflows/check.yml', [[/\n {2}demo-removal:\n[\s\S]*/, '']]);

edit('public/llms.txt', [
  [/### Demo Credentials\n[\s\S]*?\n\n(?=###)/, ''],
  [/- `\/ui-components`[^\n]*\n/, ''],
  [', and a demo-removal check', ''],
]);

edit('README.md', [
  [/### Demo Credentials\n[\s\S]*?(?=### Docker)/, ''],
  [/│ {3}├── _demo\(DELETE\)\/[^\n]*\n/, ''],
  [
    /<div align="center">\n {2}<table>[\s\S]*?<\/table>\n<\/div>\n\n<br\/>\n\n/,
    '',
  ],
  [/## 📈 Lighthouse Report\n\n[\s\S]*?<br\/>\n\n/, ''],
  [' (incl. demo removal)', ''],
  [/├── scripts\/ {18}remove-demo\.mjs[^\n]*\n/, ''],
]);

edit('AGENTS.md', [
  [/- Demo-only code lives in `src\/_demo\(DELETE\)\/`[^\n]*\n/, ''],
]);

edit('.claude/skills/project-standards/SKILL.md', [
  [
    / If `src\/_demo\(DELETE\)\/` exists, its [^\n]*?never import from it\./,
    '',
  ],
  [/ {2}- If `src\/_demo\(DELETE\)\/` exists[^\n]*\n/, ''],
  [/- \[ \] If `src\/_demo\(DELETE\)\/` exists[^\n]*\n/, ''],
]);

edit('src/features/i18n/request.ts', [
  ["import { withDemoMessages } from '@/_demo(DELETE)/i18n';\n", ''],
  [
    /const baseMessages = [\s\S]*?\n {2}const messages = await withDemoMessages\(locale, baseMessages\);\n/,
    'const messages = (await import(`../../../messages/${locale}.json`))\n    .default;\n',
  ],
]);

edit('src/global.d.ts', [
  ["import type demoMessages from '@/_demo(DELETE)/messages/en.json';\n", ''],
  [
    'Messages: typeof messages & typeof demoMessages;',
    'Messages: typeof messages;',
  ],
]);

editJson('package.json', (json) => {
  delete json.scripts['demo:remove'];
});

for (const [file, content] of pending) fs.writeFileSync(at(file), content);

fs.rmSync(at(DEMO_DIR), { recursive: true, force: true });
fs.rmSync(at(DEMO_ROUTE), { recursive: true, force: true });
for (const image of DEMO_IMAGES) fs.rmSync(at(image), { force: true });
fs.rmSync(at('.next'), { recursive: true, force: true });
fs.rmSync(fileURLToPath(import.meta.url));
if (fs.readdirSync(at('scripts')).length === 0) fs.rmdirSync(at('scripts'));

execFileSync(at('node_modules/.bin/oxfmt'), [...pending.keys()], {
  cwd: root,
  stdio: 'inherit',
});

process.stdout.write(
  'Demo code removed and .next cleared. Restart the dev server if it is running, then run `npm run check`.\n',
);
