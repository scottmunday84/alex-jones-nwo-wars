// @ts-check
const {
  test,
  firefox
} = require('@playwright/test');
const {describe} = require("node:test");
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
const configJson = require('../config.json');

const getCreds = async () => {
  const secret_name = "alex-jones-nwo-wars/creds";

  const client = new SecretsManagerClient(configJson);

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  const secret = JSON.parse(response.SecretString);

  return {userEmailText: secret.userEmail, userPasswordText: secret.userPassword};
}

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
    const {userEmailText, userPasswordText} = await getCreds();
    await page.goto('https://alexjonesgame.com/users/sign_in?');
    const userEmail = await page.locator('#user_email');
    const userPassword = await page.locator('#user_password');

    // Enter in username/password; login
    await userEmail.type(userEmailText);
    await userPassword.type(userPasswordText);
    await page.click("[data-test-id='form-action-button']");
    await page.waitForURL('https://alexjonesgame.com/');
    await page.goto('https://alexjonesgame.com/games/1/play?commit=PLAY');

    // Always is up; have fun!
    await page.pause();
  });
});
