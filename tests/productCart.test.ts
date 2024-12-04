import { test, expect, chromium } from "@playwright/test";

test("Validating HomePage", async () => {
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
