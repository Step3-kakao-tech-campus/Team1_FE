import test, { expect } from '@playwright/test';
import { mockMapper, mockResponse } from '../mock/mockResponse';
import { loginErrorBody, loginHeader, loginSuccessBody } from '../mock/responseBody/auth';
import { getMyinfoNoGroup } from '../mock/responseBody/getMyInfo';
require('dotenv').config();

test.beforeEach(async ({ page }) => {
  await mockMapper({ page: page, url: 'group', method: 'GET', response: mockResponse(getMyinfoNoGroup) });
});

test.describe('로그인/회원가입', () => {
  test('로그인', async ({ page, baseURL }) => {
    await mockMapper({
      page,
      url: `auth/login`,
      method: 'POST',
      response: mockResponse(loginSuccessBody, 200, loginHeader),
    });

    await kakaoLogin({ page, baseURL });

    await expect(page.getByLabel('메뉴')).toBeVisible();
  });

  test('회원가입', async ({ page, baseURL }) => {
    await mockMapper({
      page,
      url: `auth/login`,
      method: 'POST',
      response: mockResponse(loginErrorBody, 404),
    });
    await mockMapper({
      page,
      url: `auth/join`,
      method: 'POST',
      response: mockResponse(loginSuccessBody, 200, loginHeader),
    });

    await kakaoLogin({ page, baseURL });

    await page.getByRole('button', { name: '매니저로 시작하기' }).click();

    await page.getByPlaceholder('이름').click();
    await page.getByPlaceholder('이름').fill('라이언');
    await page.getByText('약관동의 (필수)').click();
    await page.getByRole('button', { name: '가입 완료' }).click();

    await expect(page.getByLabel('메뉴')).toBeVisible();
  });
});

const kakaoLogin = async ({ page, baseURL }) => {
  await page.goto(baseURL);
  const loginBtn = page.getByRole('button', { name: '카카오로 로그인하기' });
  await loginBtn.click();

  // 카카오 로그인
  await page.locator('#loginId--1').click();
  await page.locator('#loginId--1').fill(process.env.KAKAO_MAIL || '');

  await page.locator('#password--2').click();
  await page.locator('#password--2').fill(process.env.KAKAO_PW || '');

  const submitLocator = 'button.btn_g.highlight.submit';
  await page.locator(submitLocator).click();
  await page.waitForSelector(submitLocator, { state: 'hidden' });

  // 동의하기 발생 시
  if (baseURL && !page.url().includes(baseURL)) {
    await page.locator('#txt_accept_button_confirm').click();
  }
};
