import { expect, test } from '@playwright/test';
import { mockMapper, mockResponse } from '../mock/mockResponse';
import { getMyinfoNoMember } from '../mock/responseBody/getMyInfo';

test.beforeEach(async ({ page, baseURL }) => {
  await mockMapper({ page: page, url: 'group', method: 'GET', response: mockResponse(getMyinfoNoMember) });
  await mockMapper({
    page: page,
    url: 'group/invitation',
    method: 'GET',
    response: mockResponse({ invitationKey: 'ABC' }),
  });
  await page.goto(`${baseURL}`);
});

test.describe('초대 링크 발급', () => {
  test('사이드바에서 초대 링크 발급', async ({ page }) => {
    // 1. 사이드바에서 초대하기 버튼을 누르면 모달이 뜬다.
    await page.getByLabel('메뉴').click();
    await page.getByRole('button', { name: '직원 초대하기' }).click();
    const modal = page.getByTestId('초대링크모달');
    await expect(modal).toBeVisible();

    // 2. 링크가 발급된다
    const link = await modal.locator('input').getAttribute('value');
    expect(link).toContain('ABC');

    // 3. 복사하기 버튼을 누르면 복사된다.
    await page.getByRole('button', { name: '복사하기' }).click();
    await expect(page.getByRole('button', { name: '복사됨' })).toBeVisible();

    // 4. 닫기 버튼을 누르면 사라진다.
    await page.getByRole('button', { name: '닫기' }).click();
    await expect(page.getByRole('button', { name: '닫기' })).not.toBeVisible();
  });

  test('메인에서 초대 링크 발급', async ({ page }) => {
    // 1. 메인에서 초대하기 버튼을 누르면 모달이 뜬다.
    await page.getByRole('button', { name: '초대링크 발급받기' }).click();
    const modal = page.getByTestId('초대링크모달');
    await expect(modal).toBeVisible();
  });
});
