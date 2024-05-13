import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Ross White/);
});

test('About link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the About link.
  await page.getByRole('link', { name: 'About' }).click();

  // Expects page to have a heading with the name of About.
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
});

test('CV link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the CV link.
  await page.getByRole('link', { name: 'CV' }).click();

  // Expects page to have a heading with the name of CV.
  await expect(page.getByRole('heading', { name: 'CV' })).toBeVisible();
});

test('Home link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the CV link.
  await page.getByRole('link', { name: 'Home' }).click();

  // Expects page to have a heading with the name of CV.
  await expect(page.getByRole('heading', { name: 'Hello' })).toBeVisible();
});
