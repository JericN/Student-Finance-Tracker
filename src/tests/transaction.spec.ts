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

test('Transactions Page', async ({ page }) => {
    // eslint-disable-next-line prefer-template
    // await page.goto(url + 'user/transactions');
    await page.locator('[href*="user/transactions"]').click();
    await page.locator('#appShell').waitFor();

    // go to transactions
    await expect(page.getByText('Income')).toBeVisible();
    await expect(page.getByText('Expenses')).toBeVisible();
    await expect(page.getByText('Balance')).toBeVisible();
    await expect(page.getByText('4,000').first()).toBeVisible();
});

test('Transaction Filter', async ({ page }) => {
    // go to transactions
    // eslint-disable-next-line prefer-template
    await page.locator('[href*="user/transactions"]').click();
    await page.locator('#appShell').waitFor();
    await expect(page.getByText('4,000').first()).toBeVisible();

    // applying the filter
    await page.getByRole('button', { name: 'Filters' }).click();
    await expect(page.getByText('Category')).toBeVisible();
    await page.getByRole('button', { name: 'Reset' }).click();
    await page.getByText('Cash').click();
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.locator('#appShell').waitFor();
    await expect(page.getByText('3,000').first()).toBeVisible();
});
