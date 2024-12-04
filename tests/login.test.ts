import { test, expect, chromium } from '@playwright/test';

test("Testing Login Page", async () => {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  
  await page.goto(process.env.HOMEPAGE_URL!);

  
  const loginButton = await page.locator('//*[@id="login2"]');
  await expect(loginButton).toBeVisible();
  await loginButton.click();

  
  await page.waitForTimeout(2000);


  const usernameField = await page.locator("(//label[text()='Username:']/following-sibling::input)[2]");
  await expect(usernameField).toBeVisible();
  await expect(usernameField).toHaveAttribute('type', 'text');
  await usernameField.fill("Vanraj8169");

  
  const passwordField = await page.locator("(//input[@type='password'])[2]");
  await expect(passwordField).toBeVisible();
  await expect(passwordField).toHaveAttribute('type', 'password');
  await passwordField.fill("Vanraj8169");

  
  const submitButton = await page.locator("(//button[@class='btn btn-primary'])[3]");
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  
  await page.waitForTimeout(2000);

 
  await browser.close();
});
