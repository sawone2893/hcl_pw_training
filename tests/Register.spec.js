import { test} from "../fixtures/PageFixtures";
import register from "../testdata/register.json";
test("Register User",{ tag: "@register" }, async ({ gUIElementsPage,assert }) => {
  await gUIElementsPage.navigateToPage();
  await gUIElementsPage.enterName(register.name);
  await gUIElementsPage.enterEmail(register.email);
  await gUIElementsPage.enterPhone(register.phone);
  await gUIElementsPage.selectGender(register.gender);
  await gUIElementsPage.selectDay(register.day);
  await gUIElementsPage.selectCountry(register.country);
  await gUIElementsPage.selectColors(register.colors);
  await gUIElementsPage.selectAnimals(register.animals);
  await gUIElementsPage.selectDatePicker1(register.datePicker1);
  await gUIElementsPage.selectDatePicker2(register.datePicker2);
  await gUIElementsPage.selectStartDate(register.startDate);
  await gUIElementsPage.selectEndDate(register.endDate);
  await gUIElementsPage.clickSubmitBtn();
  assert.validateExactText(gUIElementsPage.getMessageLocator(),register.expectedMessage);
});
