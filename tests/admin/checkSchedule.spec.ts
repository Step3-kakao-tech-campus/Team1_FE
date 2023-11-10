import { expect, test } from '@playwright/test';
import { CheckRequest } from '../mock/CheckRequest';
import { mockMapper, mockResponse } from '../mock/mockResponse';
import { getMyinfo } from '../mock/responseBody/getMyInfo';
import { getDailyWorker, getMonthly } from '../mock/responseBody/schedulePage';

test('스케줄 확인', async ({ page, baseURL }) => {
  await mockMapper({ page, url: 'group', method: 'GET', response: mockResponse(getMyinfo) });
  await mockMapper({ page, url: 'schedule/fix/day*', method: 'GET', response: mockResponse(getDailyWorker) });

  const check = new CheckRequest({ page, url: 'schedule/fix/month*' });
  await check.requestParamParser(mockResponse(getMonthly));
  await page.goto(`${baseURL}`);

  // 1. 드롭다운에서 멤버를 선택하면 이번달 캘린더가 표시된다.
  await page.getByRole('button', { name: '선택' }).click();
  await page.getByTestId('멤버리스트').locator('li').nth(1).click();
  const calendar = page.getByTestId('월간스케줄');
  await expect(page.getByTestId('월간스케줄')).toBeVisible();

  // 2. 캘린더 날짜를 누르면
  const firstDate = calendar.locator('div').first().locator('div').first();
  await firstDate.click();
  const badge = firstDate.locator('div').locator('li');

  if (badge === null) {
    // 확정 스케줄이 없으면 아직 스케줄이 확정되지 않았습니다 가 표시된다.
    const notFixed = page.getByTestId('미확정일간근무표');
    await expect(notFixed).toBeVisible();
  } else {
    // 확정 스케줄이 있으면 근무표가 표시된다
    const dailyTable = page.getByTestId('일간근무표');
    await expect(dailyTable).toBeVisible();
  }

  // 3. 캘린더 달을 이동하면 이전/다음달 캘린더가 표시된다
  const iter = 5;
  for (let i = 0; i < iter; i++) {
    await page.getByLabel('이전').click();
  }

  const today = new Date();
  const param = check.getRequestParam();
  const prevMonth = String(today.getMonth() + 1 - iter).padStart(2, '0');

  expect(param).toContain(`${today.getFullYear()}-${prevMonth}`);
});
