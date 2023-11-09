import { expect, test } from '@playwright/test';
import { mockMapper, mockResponse } from '../mock/mockResponse';
import { getMyinfo, getMyinfoNoGroup, getMyinfoNoMember } from '../mock/responseBody/getMyInfo';

test.describe('매니저 메인 페이지', () => {
  // 그룹이 있고 멤버가 있으면 스케줄 화면이 표시된다.
  test('메인 : 그룹/멤버 있음', async ({ page, baseURL }) => {
    await mockMapper({ page: page, url: 'group', method: 'GET', response: mockResponse(getMyinfo) });

    await page.goto(`${baseURL}`);
    await expect(page.getByLabel('멤버 선택')).toBeVisible();
  });

  // 그룹이 있고 멤버가 없으면 초대하기 화면이 표시된다.
  test('메인 : 멤버 없음', async ({ page, baseURL }) => {
    await mockMapper({ page: page, url: 'group', method: 'GET', response: mockResponse(getMyinfoNoMember) });

    await page.goto(`${baseURL}`);
    await expect(page.getByRole('button', { name: '초대링크 발급받기' })).toBeVisible();
  });

  // 그룹이 없으면 그룹 생성하기 화면이 표시된다.
  test('메인 : 그룹 없음', async ({ page, baseURL }) => {
    await mockMapper({ page: page, url: 'group', method: 'GET', response: mockResponse(getMyinfoNoGroup) });

    await page.goto(`${baseURL}`);
    await expect(page.getByText('등록된 매장이 없습니다')).toBeVisible();
  });
});
