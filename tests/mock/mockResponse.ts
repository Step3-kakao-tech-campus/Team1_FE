import { Page } from 'playwright-core';

export const mockResponse = (responseBody) => {
  if (responseBody === null) {
    return { status: 200 };
  }
  return { status: 200, contentType: 'application/json', body: JSON.stringify(responseBody) };
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
    }
  });
};

interface Response {
  body?: string | Buffer | undefined;
  status?: number | undefined;
}
