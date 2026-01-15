const { test, expect } = require("@playwright/test");
test("Fill GUI Elements", async ({ page }) => {
  const url = "https://testautomationpractice.blogspot.com/";
  await page.goto(url);
  //Text Fields
  await page.getByPlaceholder("Enter Name").fill("Xyz");
  await page.getByPlaceholder("Enter EMail").fill("xyz@gmail.com");
  await page.getByPlaceholder("Enter Phone").fill("4858345837");
  await page.getByLabel("Address:").fill("abc nagar, xcity");

  //Radio Buttons:
  await page.locator("#male").click();

  //Checkboxes
  await page.locator("#sunday").click();
  await page.locator("#monday").click();
  await page.locator("#saturday").click();

  //Select dropdown by value attribute
  await page.selectOption("#country", "india");
  await page.selectOption("#colors", ["green", "blue"]);

  //Select dropdown by visble text
  await page.selectOption("#animals", [{ label: "Cat" }, { label: "Cheetah" }]);
  //DatePicker1
  let datePicker1 = "2 Janauary 2026";
  await page.locator("#datepicker").click();
  let day1 = datePicker1.split(" ")[0];
  await page
    .locator(`//a[text()='${day1}' and @class='ui-state-default']`)
    .click();

  //Date Picker 2
  let datePicker2 = "25 Janauary 2026";
  await page.locator("#txtDate").click();
  let day2 = datePicker2.split(" ")[0];
  await page
    .locator(`//a[text()='${day2}'and @class='ui-state-default']`)
    .click();

  //Date Picker 3: (Select a Date Range)
  await page.getByPlaceholder("Start Date").fill("2026-01-14");
  await page.getByPlaceholder("End Date").fill("2026-01-15");
  await page
    .locator("//button[text()='Submit' and @class='submit-btn']")
    .click();
  expect(await page.locator("#result").textContent()).toBe(
    "You selected a range of 1 days."
  );
});
