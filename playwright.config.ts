import { defineConfig, devices } from '@playwright/test';
import path from 'path';
require('dotenv').config();

const ADMINSTATE = path.join(__dirname, './tests/state/admin.json');
const ALBASTATE = path.join(__dirname, './tests/state/alba.json');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // globalSetup: require.resolve('./tests/globalSetup.ts'),

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.REACT_APP_BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  timeout: 10000,
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'setup',
    //   testMatch: /globalAdmin.setup\.ts/,
    //   use: { storageState: ADMINSTATE },
    // },
    // {
    //   name: 'setupAlba',
    //   testMatch: /globalAlba.setup\.ts/,
    //   use: { storageState: ALBASTATE },
    // },
    {
      name: 'admin',
      // dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: ADMINSTATE,
      },
      testMatch: '**/tests/admin/**',
      testIgnore: '**/tests/alba/**',
    },
    {
      name: 'alba',
      // dependencies: ['setupAlba'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: ALBASTATE,
      },
      testMatch: '**/tests/alba/**',
      testIgnore: '**/tests/admin/**',
    },
    {
      name: 'auth',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/tests/auth/**',
    },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
