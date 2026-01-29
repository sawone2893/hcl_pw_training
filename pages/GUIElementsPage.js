import { BasePage } from "../pages/BasePage";
export class GUIElementsPage extends BasePage {
  constructor(page) {
    super(page);
  }

  pageLocators = {};

  async navigateToPage() {
    await this.actions.navigateTo("/");
  }
  async enterName(name) {
    await this.actions.typeText(
      this.actions.getLocator("placeholder", "Enter Name"),
      name,
    );
  }
  async enterEmail(email) {
    await this.actions.typeText(
      this.actions.getLocator("placeholder", "Enter EMail"),
      email,
    );
  }
  async enterPhone(phone) {
    await this.actions.typeText(
      this.actions.getLocator("placeholder", "Enter Phone"),
      phone,
    );
  }

  async selectGender(gender) {
    await this.actions.clickElement(
      this.actions.getLocator("css", `#${gender.toLowerCase()}`),
    );
  }

  async selectDay(name) {
    await this.actions.selectRadioCheckbox(
      this.actions.getLocator("css", `#${name.toLowerCase()}`),
    );
  }

  async selectCountry(name) {
    await this.actions.selectDropDown("#country", name);
  }
  async selectColors(names) {
    await this.actions.selectDropDown("#colors", names);
  }
  async selectAnimals(names) {
    await this.actions.selectDropDown("#animals", names);
  }

  async selectDatePicker1(dateValue) {
    await this.selectDateFromDatePicker(dateValue, "#datepicker");
  }

  async selectDatePicker2(dateValue) {
    await this.selectDateFromDatePickerWithMonthYearDropdown(
      dateValue,
      "#txtDate",
    );
  }

  async selectStartDate(dateValue) {
    await this.actions.typeText(
      this.actions.getLocator("placeholder", "Start Date"),
      dateValue,
    );
  }

  async selectEndDate(dateValue) {
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

  getMessageLocator() {
    return this.actions.getLocator("css", "#result");
  }
}
