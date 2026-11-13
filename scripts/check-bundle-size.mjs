import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';

// Max Brotli-compressed JS per route (what Vercel/CDNs serve), excluding the
// shared Next.js/React runtime. Lower these as the bundle shrinks.
const BUDGETS_KB = {
  '/': 122,
  '/login': 122,
  '/register': 120,
  '/password-reset': 118,
  '/dashboard': 124,
  '/analytics': 124,
  '/profile': 124,
  '/settings': 124,
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

const readChunk = (file) => fs.readFileSync(path.join(nextDir, 'static', file));
const brotliKb = (file) =>
  brotliCompressSync(readChunk(file), {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  }).length / 1024;
const gzipKb = (file) => gzipSync(readChunk(file), { level: 9 }).length / 1024;

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
  const sum = (list, size) =>
    list.reduce((total, file) => total + size(file), 0);
  const ownFiles = files.filter((file) => !frameworkFiles.has(file));
  return {
    route,
    framework: sum(
      files.filter((file) => frameworkFiles.has(file)),
      brotliKb,
    ),
    own: sum(ownFiles, brotliKb),
    totalGzip: sum(files, gzipKb),
  };
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

  const rows = results.map(({ route, framework, own, totalGzip }) => ({
    route,
    'framework (KB br)': framework.toFixed(1),
    'own code (KB br)': own.toFixed(1),
    'total (KB br)': (framework + own).toFixed(1),
    'total (KB gz)': totalGzip.toFixed(1),
    'budget (KB br)': BUDGETS_KB[route],
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
