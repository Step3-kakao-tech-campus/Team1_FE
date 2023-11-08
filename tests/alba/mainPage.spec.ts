import { expect, test } from '@playwright/test';
import { mockMapper, mockResponse } from '../mock/mockResponse';
import { getMyinfo, getMyinfoNoGroup } from '../mock/responseBody/getMyInfo';
import { getMonthly } from './../mock/responseBody/getSchedule';

test.describe('알바 메인 페이지', () => {
  // 그룹이 있으면 스케줄 화면이 표시된다.
  test('메인 : 그룹 있음', async ({ page, baseURL }) => {
    await mockMapper({ page: page, url: 'group', method: 'GET', response: mockResponse(getMyinfo) });
    await mockMapper({ page: page, url: 'schedule/fix/month*', method: 'GET', response: mockResponse(getMonthly) });

    await page.goto(`${baseURL}`);
    await expect(page.getByTestId('월간스케줄')).toBeVisible();
  });

  // 그룹이 없으면 그룹없음 화면이 표시된다.
  test('메인 : 그룹 없음', async ({ page, baseURL }) => {
    await mockMapper({ page: page, url: 'group', method: 'GET', response: mockResponse(getMyinfoNoGroup) });

    await page.goto(`${baseURL}`);
    await expect(page.getByText('매니저에게 초대링크를 요청하세요')).toBeVisible();
  });
});
