import { Page } from 'playwright-core';

export const mockResponse = (
  responseBody,
  status: number = 200,
  header?: {
    [key: string]: string;
  },
) => {
  const body = status === 200 ? { response: responseBody } : { error: responseBody };
  return { status: status, contentType: 'application/json', body: JSON.stringify(body), header: header };
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
