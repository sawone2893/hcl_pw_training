import type { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class GUIElementsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  pageLocators = {};

  async navigateToPage() {
    await this.actions.navigateTo("/");
  }
  async enterName(name: string) {
    await this.actions.typeText(
      this.actions.getLocator("placeholder", "Enter Name"),
      name,
    );
  }
  async enterEmail(email: string) {
    await this.actions.typeText(
      this.actions.getLocator("placeholder", "Enter EMail"),
      email,
    );
  }
  async enterPhone(phone: string) {
    await this.actions.typeText(
      this.actions.getLocator("placeholder", "Enter Phone"),
      phone,
    );
  }

  async selectGender(gender: string) {
    await this.actions.clickElement(
      this.actions.getLocator("css", `#${gender.toLowerCase()}`),
    );
  }

  async selectDay(name: string) {
    await this.actions.selectRadioCheckbox(
      this.actions.getLocator("css", `#${name.toLowerCase()}`),
    );
  }

  async selectCountry(name: string) {
    await this.actions.selectDropDown("#country", name);
  }
  async selectColors(names: string | string[]) {
    await this.actions.selectDropDown("#colors", names);
  }
  async selectAnimals(names: string | string[]) {
    await this.actions.selectDropDown("#animals", names);
  }

  async selectDatePicker1(dateValue: string) {
    await this.selectDateFromDatePicker(
      dateValue,
      this.actions.getLocator("css", "#datepicker"),
    );
  }

  async selectDatePicker2(dateValue: string) {
    await this.selectDateFromDatePickerWithMonthYearDropdown(
      dateValue,
      this.actions.getLocator("css", "#txtDate"),
    );
  }

  async selectStartDate(dateValue: string) {
    await this.actions.typeText(
      this.actions.getLocator("placeholder", "Start Date"),
      dateValue,
    );
  }

  async selectEndDate(dateValue: string) {
    await this.actions.typeText(
      this.actions.getLocator("placeholder", "End Date"),
      dateValue,
    );
  }

  async clickSubmitBtn() {
    await this.actions.clickElement(
      this.actions.getLocator("css", `button.submit-btn`),
    );
  }

  async getMessageLocatorText() {
    return await this.actions.getText(
      this.actions.getLocator("css", "#result"),
    );
  }
}
