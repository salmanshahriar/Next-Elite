import { expect, test } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(
    /Next\.js|Production-Ready|Boilerplate|Elite/i,
  );
});

test('home page has source code link', async ({ page }) => {
  await page.goto('/');
  const links = page.getByRole('link', { name: /source code|github/i });
  await expect(links.first()).toBeVisible();
});

test('health check returns ok', async ({ request }) => {
  const res = await request.get('/api/health');
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body).toEqual({ status: 'ok' });
});

test('login page loads', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
});
