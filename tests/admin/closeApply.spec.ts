import { expect, test } from '@playwright/test';
import { CheckRequest } from '../mock/CheckRequest';
import { getApplyStatus, getRecommends } from '../mock/responseBody/close';
import { getWeekProgressInprogress } from '../mock/responseBody/selectWeek';
import { mockMapper, mockResponse } from './../mock/mockResponse';

test.describe('스케줄 모집 마감', () => {
  test('스케줄 모집 마감', async ({ page }) => {
    const inProgress = page.getByText('모집 중').first();
    await inProgress.click();

    // 모집 중일 경우 : 마감하고 배정하기 버튼과 요일별 근무표가 뜬다
    const closeBtn = page.getByRole('button', { name: '모집 마감하고 배정하기' });
    const dailyWorkerTable = page.getByTestId('일간근무표');
    await expect(closeBtn).toBeVisible();
    await expect(dailyWorkerTable).toBeVisible();

    // 마감하고 배정하기 버튼을 클릭하면 모집 마감하기 페이지로 이동한다
    await closeBtn.click();

    // 후보와 근무표가 표시된다.
    const recommendsList = page.getByTestId('후보목록');
    await expect(recommendsList).toBeVisible();
    await expect(dailyWorkerTable).toBeVisible();

    // 후보 박스를 클릭하면 선택 후보가 바뀐다.
    const amount = await page.getByTestId('후보목록').locator('li').all();
    await page.getByTestId('후보목록').last().click();

    // 스케줄 확정하기 버튼을 누르면 제출되고 메인으로 이동한다.
    const check = new CheckRequest({ page, url: 'schedule/fix' });
    await check.requestBodyParser();

    await page.getByRole('button', { name: '스케줄 확정하기 (그룹원에게 알림이 가요!)' }).click();

    const body = check.getRequestBody();

    expect(body.selection).toBe(amount.length);
  });
});

test.beforeEach(async ({ page, baseURL }) => {
  await mockMapper({
    page,
    url: `schedule/status*`,
    method: 'GET',
    response: mockResponse(getWeekProgressInprogress),
  });

  await mockMapper({
    page,
    url: `schedule/recommend*`,
    method: 'GET',
    response: mockResponse(getRecommends),
  });

  await mockMapper({
    page,
    url: `schedule/fix*`,
    method: 'POST',
    response: mockResponse(null),
  });

  await mockMapper({
    page,
    url: `schedule/remain/week*`,
    method: 'GET',
    response: mockResponse(getApplyStatus),
  });

  await page.goto(`${baseURL}/newSchedule`);
  await page.getByLabel('다음').click();
});
