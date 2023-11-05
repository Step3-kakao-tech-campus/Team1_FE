import { expect, test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../../playwright.config';
import { loginTest } from '../logintest';

setup('로그인', async ({ page, baseURL }) => {
  await loginTest({ page: page, baseURL: baseURL, isAdmin: false });
  expect(page.getByText('내 스케줄')).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(3000);
  await page.context().storageState({ path: STORAGE_STATE });
});
