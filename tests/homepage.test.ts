import { test, expect, chromium } from "@playwright/test";

// Test Case 1: Validate Homepage URL
test("Validate Homepage URL", async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  if (!process.env.HOMEPAGE_URL) {
    throw new Error("HOMEPAGE_URL is not set in the environment variables.");
  }

  await page.goto(process.env.HOMEPAGE_URL);
  await browser.close();
});

// Test Case 2: Validate Categories on Homepage
test("Validate Categories on Homepage", async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  if (!process.env.HOMEPAGE_URL) {
    throw new Error("HOMEPAGE_URL is not set in the environment variables.");
  }

  await page.goto(process.env.HOMEPAGE_URL);

  const categories = ["Phones", "Laptops", "Monitors"];

  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    const categoryText = await page.locator(`(//a[@id='itemc'])[${index + 1}]`).textContent();
    expect(categoryText?.trim()).toBe(category);
  }

  await browser.close();
});

// Test Case 3: Validate Phones List on Homepage
test("Validate Phones List on Homepage", async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  if (!process.env.HOMEPAGE_URL) {
    throw new Error("HOMEPAGE_URL is not set in the environment variables.");
  }

  await page.goto(process.env.HOMEPAGE_URL);

  const expectedPhones = [
    "Samsung galaxy s6",
    "Nokia lumia 1520",
    "Nexus 6",
    "Samsung galaxy s7",
    "Iphone 6 32gb",
    "Sony xperia z5",
    "HTC One M9"
  ];

  for (let index = 0; index < expectedPhones.length; index++) {
    const phone = expectedPhones[index];
    const phoneText = await page.locator(`(//a[@class='hrefch'])[${index + 1}]`).textContent();
    expect(phoneText?.trim()).toBe(phone);
  }

  await browser.close();
});

// Test Case 3: Validate Login Page URL
test("Validate Login Page URL", async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  if (!process.env.HOMEPAGE_URL) {
    throw new Error("HOMEPAGE_URL is not set in the environment variables.");
  }

  await page.goto(process.env.HOMEPAGE_URL);
  await browser.close();
});

// Test Case 4: Validate Login Button is Visible
test("Validate Login Button Visibility", async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.HOMEPAGE_URL!);

  const loginButton = await page.locator('//*[@id="login2"]');
  await expect(loginButton).toBeVisible();

  await browser.close();
});

// Test Case 5: Validate Login Form Elements (Username, Password Fields)
test("Validate Login Form Fields", async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.HOMEPAGE_URL!);

  const loginButton = await page.locator('//*[@id="login2"]');
  await loginButton.click();

  const usernameField = await page.locator("(//label[text()='Username:']/following-sibling::input)[2]");
  await expect(usernameField).toBeVisible();
  await expect(usernameField).toHaveAttribute('type', 'text');

  const passwordField = await page.locator("(//input[@type='password'])[2]");
  await expect(passwordField).toBeVisible();
  await expect(passwordField).toHaveAttribute('type', 'password');

  await browser.close();
});

// Test Case 6: Validating Signup 
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

  // const successMessage = page.locator("//div[contains(text(),'Account created successfully')]");
  // await expect(successMessage).toBeVisible();

  // const userDashboard = page.locator("//span[contains(text(),'Vanraj8169')]");
  // await expect(userDashboard).toBeVisible();

  await browser.close();
});

// Test Case 7: Validate Successful Login with Correct Credentials
test("Validate Successful Login", async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.HOMEPAGE_URL!);

  const loginButton = await page.locator('//*[@id="login2"]');
  await loginButton.click();

  const usernameField = await page.locator("(//label[text()='Username:']/following-sibling::input)[2]");
  await usernameField.fill("Vanraj8169");

  const passwordField = await page.locator("(//input[@type='password'])[2]");
  await passwordField.fill("Vanraj8169");

  const submitButton = await page.locator("(//button[@class='btn btn-primary'])[3]");
  await submitButton.click();


  await page.waitForTimeout(2000);  

  await browser.close();
});

// Test Case 8: Validating add product to cart page and handling the popup
test("Validating Add Product to cart page and handling the popup", async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  if (!process.env.HOMEPAGE_URL) {
    throw new Error("HOMEPAGE_URL is not set in the environment variables.");
  }

  await page.goto(process.env.HOMEPAGE_URL);


  const product = page.locator("(//a[@class='hrefch'])[1]").click();
  await page.waitForTimeout(4000);
  page.locator("//a[contains(@class,'btn btn-success')]").click();
  await page.waitForTimeout(2000);
  page.on("dialog",async (alert) =>{
    const text = alert.message;
    console.log(text);
    await alert.accept();
  })

  await browser.close();
});
