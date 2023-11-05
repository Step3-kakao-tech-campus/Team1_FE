import { expect, test } from '@playwright/test';

test.describe('초대장', () => {
  test('접속', async ({ page, baseURL }) => {
    // 접속
    await page.goto(`${baseURL}/invited/123`);

    const marketName = page.getByText('라이언 월드');
    await marketName.isVisible();
    expect(marketName).toBeVisible({ timeout: 10000 });

    // 승인

    await page.getByRole('button', { name: '승인하기' }).click();

    const successMessage = page.getByText('그룹 가입에 성공했어요');
    await successMessage.isVisible();
    await page.waitForTimeout(1000);
    expect(successMessage).toBeVisible({ timeout: 10000 });
  });
});
