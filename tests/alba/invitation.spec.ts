import { expect, test } from '@playwright/test';
import { mockMapper, mockResponse } from '../mock/mockResponse';
import { getGroupInfo, getGroupInfoError } from '../mock/responseBody/invitation';

test.describe('초대장', () => {
  test('접속', async ({ page, baseURL }) => {
    await mockMapper({
      page: page,
      url: 'group/invitation/information*',
      method: 'GET',
      response: mockResponse(getGroupInfo),
    });
    await mockMapper({
      page: page,
      url: 'group/invitation',
      method: 'POST',
      response: mockResponse(null),
    });

    // 접속
    await page.goto(`${baseURL}/invited/123`);
    const marketName = page.getByText('라이언 월드');
    await expect(marketName).toBeVisible();

    // 승인
    await page.getByRole('button', { name: '승인하기' }).click();
    const successMessage = page.getByText('그룹 가입에 성공했어요');
    await expect(successMessage).toBeVisible();
  });

  test('에러', async ({ page, baseURL }) => {
    await mockMapper({
      page: page,
      url: 'group/invitation/information*',
      method: 'GET',
      response: mockResponse(getGroupInfoError, 400),
    });

    // 접속
    await page.goto(`${baseURL}/invited/123`);
    const errorMessage = page.getByText('유효하지 않은 초대입니다');
    await expect(errorMessage).toBeVisible();
  });
});
