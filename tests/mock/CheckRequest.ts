import { Page } from '@playwright/test';

class CheckRequest {
  // public requestParam: string | null;
  // public requestBody: string | null;
  page: Page;
  url: string;
  requestParam: string[] = [];
  requestBody: string[] = [];

  constructor({ page, url }: { page: Page; url: string }) {
    this.page = page;
    this.url = url;
  }

  public getRequestParam = () => {
    if (this.requestParam.length === 0) return null;
    return this.requestParam.at(-1);
  };

  public getRequestBody = () => {
    if (this.requestBody.length === 0) return null;
    return this.requestBody.at(-1);
  };

  public requestParamGetter = async () => {
    await this.page.route(`*/**/${this.url}`, async (route) => {
      if (route.request().method() === 'GET') {
        this.requestParam.push(route.request().url());
        route.continue();
        return;
      }
      return;
    });
  };

  public requestBodyGetter = async () => {
    await this.page.route(`*/**/${this.url}`, async (route) => {
      if (route.request().method() === 'POST' || route.request().method() === 'PUT') {
        const response = route.request().postData();
        if (response !== null) {
          this.requestBody.push(response);
          route.continue();
          return;
        }
      }
    });
  };
}

export { CheckRequest };

export const requestParamGetter = async ({ page, url }: { page: Page; url: string }) => {
  await page.route(`*/**/${url}`, async (route) => {
    if (route.request().method() === 'GET') {
      const request = route.request().url();
      route.continue();
      return request;
    }
    return null;
  });
};

export const requestBodyGetter = async ({ page, url }: { page: Page; url: string }) => {
  await page.route(`*/**/${url}`, async (route) => {
    if (route.request().method() === 'POST' || route.request().method() === 'PUT') {
      const request = route.request().postData();
      route.continue();
      return request;
    }
    return null;
  });
};
