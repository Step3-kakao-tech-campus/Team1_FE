import { expect, test } from '@playwright/test';
import { getApplyStatus, getRecommends } from '../mock/responseBody/close';
import { getWeekProgressInprogress } from '../mock/responseBody/selectWeek';
import { mockMapper, mockResponse } from './../mock/mockResponse';

test.describe('매니저 주차 선택', () => {
  test('모집 중', async ({ page, baseURL }) => {
    const inProgress = page.getByText('모집 중').first();

    // 모집 중일 경우 : 마감하고 배정하기 버튼과 요일별 근무표가 뜬다
    await inProgress.click();

    const closeBtn = page.getByRole('button', { name: '스케줄 모집 마감하기' });
    await expect(closeBtn).toBeVisible();

    // 마감하고 배정하기 버튼을 클릭하면 모집 마감하기 페이지로 이동한다
    await closeBtn.click();
    await page.getByText('??').isVisible();
    expect(page.url()).toContain('close');

    // 후보와 근무표가 표시된다.
    // 후보 박스를 클릭하면 선택 후보가 바뀐다.
    // 요일 버튼을 클릭하면 선택 요일과 날짜가 변경된다.
    // 스케줄 확정하기 버튼을 누르면 제출되고 메인으로 이동한다.
  });
});

test.beforeEach(async ({ page, baseURL }) => {
  await mockMapper({
    page,
    url: `/schedule/status*`,
    method: 'GET',
    response: mockResponse(getWeekProgressInprogress),
  });

  await mockMapper({
    page,
    url: `/schedule/recommend*`,
    method: 'GET',
    response: mockResponse(getRecommends),
  });

  await mockMapper({
    page,
    url: `/schedule/fix*`,
    method: 'POST',
    response: mockResponse(null),
  });

  await mockMapper({
    page,
    url: `/schedule/remain/week*`,
    method: 'GET',
    response: mockResponse(getApplyStatus),
  });

  await page.goto(`${baseURL}/newSchedule`);
  await page.getByLabel('다음').click();
});
