import { expect, test } from '@playwright/test';
import { getWeekProgressAllocatable } from '../mock/responseBody/selectWeek';
import { CheckRequest } from './../mock/CheckRequest';
import { mockMapper, mockResponse } from './../mock/mockResponse';
import { getTimeTemplate } from './../mock/responseBody/open';

test.describe('스케줄 모집 시작', () => {
  test('스케줄 모집 시작', async ({ page }) => {
    const allocatable = page.getByText('모집 전').first();

    // 주를 클릭하면 시작하기 버튼이 뜬다
    await allocatable.click();
    const startBtn = page.getByRole('button', { name: '스케줄 모집 시작하기' });
    await expect(startBtn).toBeVisible();

    // 시작하기 버튼을 클릭하면 모집 시작하기 페이지로 이동한다.
    await startBtn.click();
    await page.getByText('근무 시간대를 설정하세요').isVisible();
    expect(page.url()).toContain('open');

    // 삭제 버튼을 누르면 삭제된다.
    const remove = page.getByLabel('제거').first();
    await remove.click();
    await remove.click();
    await remove.click();

    // 추가 버튼을 누르면 추가된다.
    const add = page.getByLabel('추가').first();
    await add.click();

    const title = page.getByPlaceholder('시간대 이름을 입력하세요').first();
    const startTime = page.locator('#startTime').first();
    const endTime = page.locator('#endTime').first();

    // 시간을 편집하면 시간이 변경된다.
    await startTime.fill('05:00');
    await endTime.fill('13:00');

    // 이름을 편집하면 이름이 변경된다.
    await title.fill('테스트');

    // 요일별 모집 인원 설정하기 버튼을 누르면 인원 설정 화면으로 이동한다.
    const gotoAmountbutton = page.getByRole('button', { name: '요일별 모집 인원 설정하기' });
    await gotoAmountbutton.click();

    // 앞에서 편집한 시간대가 뜬다.
    await expect(page.getByText('테스트')).toBeVisible();

    // 요일 버튼을 클릭하면 선택 요일이 변경된다.
    const tuesday = page.getByRole('button', { name: '화' });
    await tuesday.click();

    // 인원을 입력하면 인원이 변경된다.
    const amount = page.locator('//li//input').first();
    await amount.fill('10');

    // 스케줄 모집 시작하기 버튼을 누르면 제출되고 메인으로 이동한다.
    const check = new CheckRequest({ page, url: 'schedule/worktime' });
    await check.requestBodyParser();

    const doneButton = page.getByRole('button', { name: '스케줄 모집 시작하기 (그룹원에게 알림이 가요!)' });
    await doneButton.click();
    const body = check.getRequestBody();

    expect(body.amount[1][0]).toBe(10);
    expect(body.template[0].title).toBe('테스트');
    expect(body.template[0].startTime).toBe('05:00:00');
    expect(body.template[0].endTime).toBe('13:00:00');
  });
});

test.beforeEach(async ({ page, baseURL }) => {
  await mockMapper({
    page,
    url: `schedule/status*`,
    method: 'GET',
    response: mockResponse(getWeekProgressAllocatable),
  });

  await mockMapper({
    page,
    url: `schedule/worktime?*`,
    method: 'GET',
    response: mockResponse(getTimeTemplate),
  });

  await mockMapper({
    page,
    url: `schedule/worktime`,
    method: 'POST',
    response: mockResponse(null),
  });

  await page.goto(`${baseURL}/newSchedule`);
  await page.getByLabel('다음').click();
});
