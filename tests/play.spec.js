// @ts-check
const {
  test,
  firefox
} = require('@playwright/test');
const {describe} = require("node:test");

describe('Alex Jones NWO Wars', () => {
  let browser;
  let browserContext;
  let page;

  test.beforeAll(async () => {
    browser = await firefox.launch({headless: false, args: ['--hide-scrollbars'], ignoreDefaultArgs: ['--mute-audio']});
    browserContext = await browser.newContext();
  });

  test.beforeEach(async () => {
    page = await browserContext.newPage();
  })

  test.afterAll(async () => {
    await browserContext.close();
    await browser.close();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Login and play the game; defeat the lizardnerd!!', async () => {
    await page.goto('https://alexjonesgame.com/users/sign_in?');
    const userEmail = await page.locator('#user_email');
    const userPassword = await page.locator('#user_password');

    // Enter in username/password; login
    await userEmail.type('scottmunday84@gmail.com');
    await userPassword.type('gn9muQs1m0VVIp3');
    await page.click("[data-test-id='form-action-button']");
    await page.waitForURL('https://alexjonesgame.com/');
    await page.goto('https://alexjonesgame.com/games/1/play?commit=PLAY');

    // Always is up; have fun!
    await new Promise(() => {});
  });
});
