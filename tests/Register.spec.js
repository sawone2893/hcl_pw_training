const { test, expect } = require("@playwright/test");
import { GUIElementsPage } from "../pages/GUIElementsPage";
test("Register User", async ({ page }) => {
let gUIElementsPage=new GUIElementsPage(page);
await gUIElementsPage.navigateToPage();
await gUIElementsPage.enterName("Shabbir");
await gUIElementsPage.enterEmail("xyz@gmail.com");
await gUIElementsPage.enterPhone("8987435643");
await gUIElementsPage.selectGender("male");
await gUIElementsPage.selectDay("sunday");
await gUIElementsPage.selectCountry("india");
await gUIElementsPage.selectColors(["green", "blue"]);
await gUIElementsPage.selectAnimals(["cat","cheetah"]);

});
