import { expect, test } from '@playwright/test';

test('home page has source code link', async ({ page }) => {
  await page.goto('/');
  const links = page.getByRole('link', { name: /source code|github/i });
  await expect(links.first()).toBeVisible();
});

test('landing page follows the locale cookie', async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([
    { name: 'NEXT_LOCALE', value: 'fr', url: baseURL ?? '' },
  ]);
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Plus de fonctionnalités' }),
  ).toBeVisible();
  await expect(page.getByText('More features')).toHaveCount(0);
});
