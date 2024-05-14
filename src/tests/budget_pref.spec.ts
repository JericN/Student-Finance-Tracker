import * as dotenv from 'dotenv';
import { expect, test } from '@playwright/test';

dotenv.config();
const url = 'https://student-finance-tracker.vercel.app/';

test.beforeEach(async ({ page }) => {
    // eslint-disable-next-line prefer-template
    await page.goto(url + 'auth/login');
    const email = process.env.USER_EMAIL!;
    const pass = process.env.USER_PASSWORD!;

    await page.getByPlaceholder('Username').fill(email);
    await page.getByPlaceholder('Password').fill(pass);
    await page.getByRole('button', { name: 'Login' }).click();
});

test('Budget Preference', async ({ page }) => {
    // go to users
    await page.locator('[href*="user/users"]').click();
    await page.locator('#appShell').waitFor();

    // go to the budget preference
    await expect(page.getByText('Daily Budget')).toBeVisible();
    await page.getByRole('button', { name: 'Edit Budget Preference' }).click();
    await expect(page.getByText('Budget Left')).toBeVisible();
});
