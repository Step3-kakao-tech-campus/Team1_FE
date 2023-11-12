import { expect, test } from '@playwright/test';
import { getDailyWorker } from '../mock/responseBody/schedulePage';
import { getWeekProgressClosed } from '../mock/responseBody/selectWeek';
import { mockMapper, mockResponse } from './../mock/mockResponse';

test.describe('매니저 주차 선택', () => {
  test('접속', async ({ page }) => {
    // 접속하면 이번달 (주차선택)캘린더가 표시된다.
    await expect(page.getByTestId('주차선택캘린더')).toBeVisible();
  });

  test('모집 마감', async ({ page }) => {
    // 모집 마감일 경우 : 요일별 근무표가 뜬다
    const closed = page.getByText('모집 마감').first();
    await closed.click();

    await expect(page.getByTestId('일간근무표')).toBeVisible();
  });
});

test.beforeEach(async ({ page, baseURL }) => {
  await mockMapper({
    page,
    url: `schedule/status*`,
    method: 'GET',
    response: mockResponse(getWeekProgressClosed),
  });

  await mockMapper({ page, url: 'schedule/fix/day*', method: 'GET', response: mockResponse(getDailyWorker) });

  await page.goto(`${baseURL}/newSchedule`);
});
