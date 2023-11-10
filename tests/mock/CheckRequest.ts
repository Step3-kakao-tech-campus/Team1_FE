import { Page } from '@playwright/test';

class CheckRequest {
  page: Page;
  url: string;
  requestParam: string[] = [];
  requestBody: string[] = [];

  constructor({ page, url }: { page: Page; url: string }) {
    this.page = page;
    this.url = url;
  }

  getRequestParam = () => {
    if (this.requestParam.length === 0) return null;
    return this.requestParam.at(-1);
  };

  getRequestBody = () => {
    if (this.requestBody.length === 0) return null;
    const stringBody = this.requestBody.at(-1);
    return JSON.parse(stringBody || '');
  };

  requestParamParser = async (response) => {
    await this.page.route(`*/**/${this.url}`, async (route) => {
      if (route.request().method() === 'GET') {
        this.requestParam.push(route.request().url());
        await route.fulfill(response);
      }
    });
  };

  requestBodyParser = async () => {
    await this.page.route(`*/**/${this.url}`, async (route) => {
      if (route.request().method() === 'POST' || route.request().method() === 'PUT') {
        const response = route.request().postData();
        if (response !== null) {
          this.requestBody.push(response);
          route.continue();
          return;
        }
      }
      route.continue();
      return;
    });
  };
}

export { CheckRequest };
