import { test, expect, chromium } from '@playwright/test';

test("Testing Signup Page", async () => {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  if (!process.env.HOMEPAGE_URL) {
    throw new Error("HOMEPAGE_URL is not set in the environment variables.");
  }

  await page.goto(process.env.HOMEPAGE_URL);

  const signupButton = page.locator("//a[@data-target='#signInModal']");
  await expect(signupButton).toBeVisible();
  await signupButton.click();

  const signupModal = page.locator("//div[@id='signInModal']");
  await expect(signupModal).toBeVisible();

  const usernameField = page.locator("(//input[@class='form-control'])[3]");
  await expect(usernameField).toBeVisible();
  await expect(usernameField).toHaveAttribute('type', 'text');
  await usernameField.fill("Vanraj8169");

  const passwordField = page.locator("(//input[@type='password'])[1]");
  await expect(passwordField).toBeVisible();
  await expect(passwordField).toHaveAttribute('type', 'password');
  await passwordField.fill("Vanraj8169");

  const signUpButton = page.locator("(//button[@class='btn btn-primary'])[2]");
  await expect(signUpButton).toBeVisible();
  await signUpButton.click();

  const successMessage = page.locator("//div[contains(text(),'Account created successfully')]");
  await expect(successMessage).toBeVisible();

  const userDashboard = page.locator("//span[contains(text(),'Vanraj8169')]");
  await expect(userDashboard).toBeVisible();

  await browser.close();
});
