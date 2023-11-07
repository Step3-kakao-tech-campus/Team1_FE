import { expect, test } from '@playwright/test';
import { getMyinfoNoGroup } from '../mock/getMyInfo';
import { mockResponse } from '../mock/mockResponse';

test.beforeEach(async ({ page }) => {
  await page.route('*/**/group', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill(mockResponse(getMyinfoNoGroup));
    } else {
      await route.fulfill(mockResponse(null));
    }
  });
});

test.describe('그룹 생성 페이지', () => {
  test('그룹 생성', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/addGroup`);
    expect(page.getByText('매장 등록하기')).toBeVisible();

    const marketName = page.getByLabel('상호명');
    const marketNumber = page.getByLabel('사업자 번호');
    const address = page.getByLabel('상세 주소');
    const mainAddress = page.getByLabel('주소', { exact: true });

    await marketName.focus();
    await marketName.fill('카카오 프렌즈샵');

    await marketNumber.focus();
    await marketNumber.fill('1111111111');

    await address.focus();
    await address.fill('11');

    await mainAddress.click();
    await page
      .frameLocator('iframe[title="우편번호서비스 레이어 프레임"]')
      .frameLocator('iframe[title="우편번호 검색 프레임"]')
      .getByText('예) 판교역로 166, 분당 주공, 백현동 532')
      .click();
    await page
      .frameLocator('iframe[title="우편번호서비스 레이어 프레임"]')
      .frameLocator('iframe[title="우편번호 검색 프레임"]')
      .getByLabel('검색할 도로명/지번주소를 입력, 예시) 판교역로 166, 분당 주공, 백현동 532')
      .fill('성동구 서울숲길');
    await page
      .frameLocator('iframe[title="우편번호서비스 레이어 프레임"]')
      .frameLocator('iframe[title="우편번호 검색 프레임"]')
      .getByRole('link', { name: '서울특별시 성동구 서울숲길' })
      .click();
    await page
      .frameLocator('iframe[title="우편번호서비스 레이어 프레임"]')
      .frameLocator('iframe[title="우편번호 검색 프레임"]')
      .getByRole('button', { name: '서울 성동구 서울숲길 17 (성수파크빌)' })
      .click();

    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: '그룹 생성하기' }).click();

    await page.getByText('매장 등록에 성공했습니다').isVisible({ timeout: 10000 });

    expect(page.getByText('매장 등록에 성공했습니다')).toBeVisible({ timeout: 10000 });
  });
});
