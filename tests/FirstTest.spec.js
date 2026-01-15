import {test,expect} from "@playwright/test";

test("Validate page tile for the product",async({page})=>{
await page.goto("https://automationexercise.com/");
await page.locator("//a[contains(text(),' Products')]").click();
await expect(page).toHaveTitle("Automation Exercise - All Products");
});