import { test} from "../fixtures/PageFixtures";

test("Register User",{ tag: "@register" }, async ({ gUIElementsPage,assert }) => {
  await gUIElementsPage.navigateToPage();
  await gUIElementsPage.enterName("Shabbir");
  await gUIElementsPage.enterEmail("xyz@gmail.com");
  await gUIElementsPage.enterPhone("8987435643");
  await gUIElementsPage.selectGender("male");
  await gUIElementsPage.selectDay("sunday");
  await gUIElementsPage.selectCountry("india");
  await gUIElementsPage.selectColors(["green", "blue"]);
  await gUIElementsPage.selectAnimals(["cat", "cheetah"]);
  await gUIElementsPage.selectDatePicker1("2 January 2026");
  await gUIElementsPage.selectDatePicker2("12 Jan 2026");
  await gUIElementsPage.selectStartDate("2026-01-14");
  await gUIElementsPage.selectEndDate("2026-01-15");
  await gUIElementsPage.clickSubmitBtn();
  assert.validateExactText(gUIElementsPage.getMessageLocator(),"You selected a range of 1 days.");
});
