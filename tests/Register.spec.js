import { test, expect } from "../fixtures/PageFixtures";

test("Register User", async ({ gUIElementsPage }) => {
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
