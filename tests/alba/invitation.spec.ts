import { expect, test } from '@playwright/test';
import { getGroupInfo } from '../mock/getInvitation';
import { mockMapper, mockResponse } from '../mock/mockResponse';

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
    expect(marketName).toBeVisible();

    // 승인
    await page.getByRole('button', { name: '승인하기' }).click();
    const successMessage = page.getByText('그룹 가입에 성공했어요');
    expect(successMessage).toBeVisible();
  });
});
