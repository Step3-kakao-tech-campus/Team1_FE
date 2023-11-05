import { expect, test } from '@playwright/test';
import { getMyinfo, getMyinfoNoGroup } from '../mock/getMyInfo';
import { mockResponse } from '../mock/mockResponse';

test.describe('사이드바', () => {
  test('사이드바 : 그룹 있음', async ({ page, baseURL }) => {
    await page.route('*/**/group', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill(mockResponse(getMyinfo));
      }
    });

    await page.goto(`${baseURL}`);
    await page.getByLabel('메뉴').click();
    await page.getByText('우리 매장 직원 목록').isVisible();

    expect(page.getByText('우리 매장 직원 목록')).toBeVisible({ timeout: 10000 });
  });

  test('사이드바 : 그룹 없음', async ({ page, baseURL }) => {
    await page.route('*/**/group', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill(mockResponse(getMyinfoNoGroup));
      }
    });

    await page.goto(`${baseURL}`);
    await page.getByLabel('메뉴').click();
    await page.waitForTimeout(3000);

    expect(page.getByText('우리 매장 직원 목록')).not.toBeVisible();
  });
});
