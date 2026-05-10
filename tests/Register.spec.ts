import { test } from "../fixtures/baseTest.js";
import register from "../testdata/register.json";
test("Register User",{ tag: "@register" }, async ({ pages}) => {
  await pages.gUIElementsPage.navigateToPage();
  await pages.gUIElementsPage.enterName(register.name);
  await pages.gUIElementsPage.enterEmail(register.email);
  await pages.gUIElementsPage.enterPhone(register.phone);
  await pages.gUIElementsPage.selectGender(register.gender);
  await pages.gUIElementsPage.selectDay(register.day);
  await pages.gUIElementsPage.selectCountry(register.country);
  await pages.gUIElementsPage.selectColors(register.colors);
  await pages.gUIElementsPage.selectAnimals(register.animals);
  await pages.gUIElementsPage.selectDatePicker1(register.datePicker1);
  await pages.gUIElementsPage.selectDatePicker2(register.datePicker2);
  await pages.gUIElementsPage.selectStartDate(register.startDate);
  await pages.gUIElementsPage.selectEndDate(register.endDate);
  await pages.gUIElementsPage.clickSubmitBtn();
  pages.assert.validateExactText(await pages.gUIElementsPage.getMessageLocatorText(),register.expectedMessage);
});
