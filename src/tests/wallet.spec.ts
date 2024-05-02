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

test('Wallets', async ({ page }) => {
    // go to users
    await page.locator('[href*="user/users"]').click();
    await page.locator('#appShell').waitFor();

    // go to the wallets
    await expect(page.getByText('Wallets')).toBeVisible();
    await page.getByRole('button', { name: 'Wallets' }).click();
    await expect(page.getByText('TestWallet')).toBeVisible();
    await expect(page.getByText('10,000')).toBeVisible();
});

test('Test Create Wallets', async ({ page }) => {
    // go to users
    await page.locator('[href*="user/users"]').click();
    await page.locator('#appShell').waitFor();

    // go to the wallets
    await expect(page.getByText('Wallets')).toBeVisible();
    await page.getByRole('button', { name: 'Wallets' }).click();
    await page.getByRole('button', { name: 'Add Wallet' }).click();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Amount')).toBeVisible();
    await expect(page.getByText('SAVE')).toBeVisible();
});
