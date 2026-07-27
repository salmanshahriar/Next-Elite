import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const host = '127.0.0.1';
const port = 6767;
const baseURL = `http://${host}:${port}`;

const webServerEnv = {
  SKIP_ENV_VALIDATION: 'true',
  BETTER_AUTH_SECRET: 'thisIsATestOnlySecretKeyOfAtLeast32Chars',
  BETTER_AUTH_URL: baseURL,
};

export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [['github'], ['html', { open: 'never' }]]
    : [['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: isCI
    ? [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
    : [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
      ],
  webServer: {
    command: isCI ? 'npm run start:standalone' : 'npm run dev',
    url: `${baseURL}/api/health`,
    reuseExistingServer: false,
    timeout: isCI ? 60_000 : 120_000,
    cwd: '..',
    env: {
      ...webServerEnv,
      PORT: String(port),
      HOSTNAME: host,
    },
  },
});
