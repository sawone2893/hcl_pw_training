const { test, expect, chromium } = require("@playwright/test");

test("Amazon Search", async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 2000 });
  const context = await browser.newContext();
  const page = await context.newPage();
  const appUrl = "https://www.amazon.in/";
  await page.goto(appUrl);
  await page.getByPlaceholder("Search Amazon.in").fill("Mobile Stand for desk");
  await page.locator("//span[@aria-label='Go']/input").click();
  const productName =
    "STRIFF mobSpin 360° Rotating Metal Phone Stand, Foldable Mobile Holder with Adjustable Height & Angle, Stable Round";
  await page
    .locator(
      "//h2[text()='Results']/following::button[contains(text(),'Add to cart')][1]"
    )
    .click();
  await page.locator("//a[contains(text(),'Go to Cart')]").click();
  expect(page.locator("//span[@class='a-truncate-cut']")).toContainText(
    productName
  );
});
