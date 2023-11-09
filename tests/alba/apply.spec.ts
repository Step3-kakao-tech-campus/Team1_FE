import { expect, test } from '@playwright/test';
import { getApplyForm } from '../mock/responseBody/apply';
import { getWeekProgressInprogress } from '../mock/responseBody/selectWeek';
import { mockMapper, mockResponse } from './../mock/mockResponse';

test.describe('알바 스케줄 신청', () => {
  test('알바 스케줄 신청', async ({ page, baseURL }) => {
    // 접속
    await page.getByText('모집 중').first().click();
    await page.getByRole('button', { name: '신청하러가기' }).click();

    // 모집중인 시간대가 뜬다
    const list = page.getByTestId('체크리스트');
    await expect(list).toBeVisible();

    // 시간대 박스를 클릭하면 체크된다.
    for (let checkbox of await list.locator('label').all()) {
      if ((await checkbox.getAttribute('data-testid')) === 'false') {
        await checkbox.click();
      }
    }

    // 미리보기 버튼을 클릭하면 미리보기 화면이 뜬다.
    await page.getByRole('button', { name: '미리보기' }).click();
    const submit = page.getByRole('button', { name: '제출하기' });
    await expect(submit).toBeVisible();

    // 체크한 시간대가 정리되어 표시된다.
    const preview = await page.getByTestId('요일별선택미리보기').all();
    for (let i = 0; i < 7; i++) {
      const time = await preview[i].locator('span').last().innerText();
      if (i === 0) {
        expect(time).not.toBe('휴무');
      } else {
        expect(time).toBe('휴무');
      }
    }

    // 제출하면 메인화면으로 이동한다.
    await submit.click();
    await page.waitForURL(baseURL || '');
    expect(page.url()).toBe(baseURL + '/');
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
    url: `schedule/application*`,
    method: 'GET',
    response: mockResponse(getApplyForm),
  });

  await mockMapper({
    page,
    url: `schedule/application`,
    method: 'POST',
    response: mockResponse(null),
  });

  await page.goto(`${baseURL}/apply`);
});
