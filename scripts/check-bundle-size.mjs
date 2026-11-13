import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

// Max gzipped JS per route, excluding the shared Next.js/React runtime.
// Lower these as the bundle shrinks; the long-term target is 80 KB.
const BUDGETS_KB = {
  '/': 140,
  '/login': 143,
  '/register': 142,
  '/password-reset': 140,
  '/dashboard': 140,
  '/analytics': 140,
  '/profile': 140,
  '/settings': 140,
};
const PROTECTED_ROUTES = new Set([
  '/dashboard',
  '/analytics',
  '/profile',
  '/settings',
]);
const PORT = 6799;
const BASE = `http://localhost:${PORT}`;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nextDir = path.join(root, '.next');

if (!fs.existsSync(path.join(nextDir, 'build-manifest.json'))) {
  throw new Error('No production build found. Run `npm run build` first.');
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(nextDir, 'build-manifest.json'), 'utf8'),
);
const toChunkPath = (file) => file.replace(/^static\//, '');
const frameworkFiles = new Set(manifest.rootMainFiles.map(toChunkPath));
const legacyPolyfills = new Set(manifest.polyfillFiles.map(toChunkPath));

const gzipKb = (file) =>
  gzipSync(fs.readFileSync(path.join(nextDir, 'static', file)), { level: 9 })
    .length / 1024;

const scriptFiles = (html) =>
  [
    ...new Set(
      [...html.matchAll(/\/_next\/static\/(chunks\/[^"'?\s]+\.js)/g)].map(
        (match) => match[1],
      ),
    ),
  ].filter((file) => !legacyPolyfills.has(file));

const server = spawn(
  path.join(root, 'node_modules/.bin/next'),
  ['start', '-p', String(PORT)],
  {
    cwd: root,
    env: { ...process.env, BETTER_AUTH_URL: BASE, NODE_ENV: 'production' },
    stdio: 'ignore',
  },
);

const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt++) {
    const response = await fetch(`${BASE}/api/health`).catch(() => null);
    if (response?.ok) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error('Server did not start');
};

const signUp = async () => {
  const response = await fetch(`${BASE}/api/auth/sign-up/email`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: BASE },
    body: JSON.stringify({
      name: 'Size Check',
      email: `size-check-${Date.now()}@example.com`,
      password: `size-check-${Date.now()}`,
    }),
  });
  const cookie = response.headers
    .getSetCookie()
    .map((value) => value.split(';')[0])
    .join('; ');
  if (!response.ok || !cookie) {
    throw new Error(`Sign-up failed with status ${response.status}`);
  }
  return cookie;
};

const measure = async (route, cookie) => {
  const response = await fetch(`${BASE}${route}`, {
    headers: cookie ? { cookie } : {},
    redirect: 'manual',
  });
  if (response.status !== 200) {
    throw new Error(`${route} returned ${response.status}`);
  }
  const files = scriptFiles(await response.text());
  const sum = (list) => list.reduce((total, file) => total + gzipKb(file), 0);
  const framework = sum(files.filter((file) => frameworkFiles.has(file)));
  const own = sum(files.filter((file) => !frameworkFiles.has(file)));
  return { route, framework, own };
};

try {
  await waitForServer();
  const cookie = await signUp();
  const results = [];
  for (const route of Object.keys(BUDGETS_KB)) {
    results.push(
      await measure(route, PROTECTED_ROUTES.has(route) ? cookie : undefined),
    );
  }
  const isOver = ({ route, own }) => own > BUDGETS_KB[route];

  const rows = results.map(({ route, framework, own }) => ({
    route,
    'framework (KB gz)': framework.toFixed(1),
    'own code (KB gz)': own.toFixed(1),
    'total (KB gz)': (framework + own).toFixed(1),
    'budget (KB gz)': BUDGETS_KB[route],
  }));
  // oxlint-disable-next-line no-console -- report output
  console.table(rows);

  const over = results.filter(isOver);
  if (over.length > 0) {
    console.error(
      `Initial JS budget exceeded: ${over.map(({ route }) => route).join(', ')}`,
    );
    process.exitCode = 1;
  }
} finally {
  server.kill();
}
