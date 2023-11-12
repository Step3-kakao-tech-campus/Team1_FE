import { expect, test } from '@playwright/test';
import { getWeekProgressInprogress } from '../mock/responseBody/selectWeek';
import { mockMapper, mockResponse } from './../mock/mockResponse';

test.describe('알바 주차 선택', () => {
  test('접속', async ({ page }) => {
    // 접속하면 이번달 (주차선택)캘린더가 표시된다.
    await expect(page.getByTestId('주차선택캘린더')).toBeVisible();
  });

  test('모집 중', async ({ page }) => {
    // 모집 중일 경우 : 신청하러가기 버튼이 뜬다
    await page.getByText('모집 중').first().click();
    await expect(page.getByRole('button', { name: '신청하러가기' })).toBeVisible();
  });
});

test.beforeEach(async ({ page, baseURL }) => {
  await mockMapper({
    page,
    url: `schedule/status*`,
    method: 'GET',
    response: mockResponse(getWeekProgressInprogress),
  });

  await page.goto(`${baseURL}/apply`);
});
