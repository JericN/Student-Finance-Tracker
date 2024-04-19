import * as dotenv from 'dotenv';
import { expect, test } from '@playwright/test';

dotenv.config();
const url = 'https://student-finance-tracker.vercel.app/';

test('Check Title', async ({ page }) => {
    await page.goto(url);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Student Financial Tracker/);
});

test('Login Test', async ({ page }) => {
    // eslint-disable-next-line prefer-template
    await page.goto(url + 'auth/login');
    const email = process.env.USER_EMAIL!;
    const pass = process.env.USER_PASSWORD!;

    await page.getByPlaceholder('Username').fill(email);
    await page.getByPlaceholder('Password').fill(pass);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('expenses')).toBeVisible();
    await expect(page.getByText('wallets')).toBeVisible();
});
