import { expect, test } from '@playwright/test';
import { mockMapper, mockResponse } from '../mock/mockResponse';
import { getMyinfoNoGroup } from '../mock/responseBody/getMyInfo';

test.beforeEach(async ({ page }) => {
  mockMapper({ page, url: 'group', method: 'GET', response: mockResponse(getMyinfoNoGroup) });
  mockMapper({ page, url: 'group', method: 'POST', response: mockResponse(null) });
});

test.describe('그룹 생성 페이지', () => {
  test('그룹 생성', async ({ page, baseURL }) => {
    // 1. 접속
    await page.goto(`${baseURL}/addGroup`);
    expect(page.getByText('매장 등록하기')).toBeVisible();

    const marketName = page.getByLabel('상호명');
    const marketNumber = page.getByLabel('사업자 번호');
    const address = page.getByLabel('상세 주소');
    const mainAddress = page.getByLabel('주소', { exact: true });

    // 2. 매장명 입력
    await marketName.focus();
    await marketName.fill('카카오 프렌즈샵');

    // 3. 사업자번호 입력
    await marketNumber.focus();
    await marketNumber.fill('0123456789');

    // 4. 상세주소 입력
    await address.focus();
    await address.fill('상세 주소');

    // 5. 다음 주소
    await mainAddress.click();

    // 5. 다음 주소 - 검색
    const searchBox = page.locator('//fieldset/div/span');
    await searchBox.click();
    await searchBox.fill('강남구');

    // 5. 다음 주소 - 첫번째 결과 클릭
    await page.locator('//div[@id="postCodeSuggestLayer"]//li[1]').click();
    await page.locator('//ul/li[1]/dl/dd[1]/span/button').click();

    // 6. 제출
    await page.getByRole('button', { name: '그룹 생성하기' }).click();

    await expect(page.getByText('매장 등록에 성공했습니다')).toBeVisible();
  });
});
