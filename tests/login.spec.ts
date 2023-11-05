import { expect, test } from '@playwright/test';
import { loginTest } from './logintest';

test.describe('온보딩 페이지', () => {
  test('로그인', async ({ page, baseURL }) => {
    await loginTest({ page: page, baseURL: baseURL, isAdmin: true });
    expect(page.getByText('내 스케줄')).toBeVisible({ timeout: 30000 });
  });
});
