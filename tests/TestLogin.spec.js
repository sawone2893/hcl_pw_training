import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test("Test App Login",async ({ page }) => {
  let username = "mngr652178";
  let password = "UhabygY";
  let loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  expect(page).toHaveURL("https://demo.guru99.com/V4/");
  await loginPage.appLogin(username, password);
  expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  let homePage=new HomePage(page);
  await homePage.clickNewCustomer();
   expect(page).toHaveTitle("Guru99 Bank New Customer Entry Page");
});
