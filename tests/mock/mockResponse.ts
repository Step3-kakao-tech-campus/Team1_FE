import { Page } from 'playwright-core';

export const mockResponse = (responseBody) => {
  if (responseBody === null) {
    return { status: 200 };
  }
  return { status: 200, body: JSON.stringify(responseBody) };
};

export const mockMapper = async ({
  page,
  response,
  url,
  method,
}: {
  page: Page;
  response: Response;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}) => {
  await page.route(`*/**/${url}`, async (route) => {
    if (route.request().method() === method) {
      await route.fulfill(response);
    } else {
      await route.continue();
    }
  });
};

interface Response {
  body?: string | Buffer | undefined;
  status?: number | undefined;
}
