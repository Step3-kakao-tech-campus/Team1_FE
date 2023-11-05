import { expect, test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../../playwright.config';
import { postLoginNoUser } from '../mock/auth';
import { mockMapper, mockResponse } from '../mock/mockResponse';
import { loginTest } from './../logintest';

setup('로그인', async ({ page, baseURL }) => {
  await page.evaluate((val) =>
    localStorage.setItem('login', JSON.stringify({ isLogin: true, token: 'Bearer ABC', isAdmin: true })),
  );

  await mockMapper({ page, url: 'auth/login', method: 'POST', response: postLoginNoUser });
  await mockMapper({ page, url: 'auth/join', method: 'POST', response: mockResponse(null) });

  await loginTest({ page: page, baseURL: baseURL, isAdmin: true });
  expect(page.getByText('내 스케줄')).toBeVisible({ timeout: 10000 });

  await page.waitForTimeout(3000);

  await page.context().storageState({ path: STORAGE_STATE });
});
