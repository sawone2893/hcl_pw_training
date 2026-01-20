import { WebActions } from "../core/WebActions";
import { getCurrentMonthIndex, getFullMonthIndex } from "../utils/DateManager";
export class BasePage {
  constructor(page) {
    this.actions = new WebActions(page);
  }

  pageObject = {
    datePickerMonthYearWithOutDropdown: (monthYear, monthYearValue) =>
      `//span[contains(@class,'${monthYear}') and text()='${monthYearValue}']`,
    datePickerPrevNextArrowWithOutDropdown: (arrowName) =>
      `//a[@title='${arrowName}']`,
    datePickerDay: (daytext) => `//a[@data-date='${daytext}']`,
    datePickerSelectDropDownMonthYear: (dropdownType) =>
      `//select[contains(@aria-label,'${dropdownType}')]`,
  };

  generateLocator(locatorIdentifier, params) {
    xpath = locatorIdentifier;
    if (params.contains("~")) {
      values = params.split("~");
      for (let i = 0; i < values.length; i++) {
        newXpath = xpath.replace("#" + i + "#", values[i]);
        xpath = newXpath;
      }
    } else {
      newXpath = xpath.replace("#0#", params);
      xpath = newXpath;
    }
    return xpath;
  }

  async selectDateFromDatePicker(dateValue, datePickerLocator) {
    const dateList = dateValue.split(" ");
    const dayText = dateList[0];
    const monthText = dateList[1];
    const yearText = dateList[2];
    const monthIndex = getFullMonthIndex(monthText);
    const currentMonthIndex = getCurrentMonthIndex();
    await this.actions.clickElement("xpath", datePickerLocator);
    console.log(this.pageObject.datePickerMonthYearWithOutDropdown("month", "jan"));
    //This code is check given date month and year is displayed of not
    while (!(await this.actions.isDisplayed("xpath", this.pageObject.datePickerMonthYearWithOutDropdown("month", monthText)))
    ) {
      if (monthIndex > currentMonthIndex) {
        await this.actions.clickElement(
          "xpath",
          this.pageObject.datePickerPrevNextArrowWithOutDropdown("Next")
        );
      } else {
        await this.actions.clickElement(
          "xpath",
          this.pageObject.datePickerPrevNextArrowWithOutDropdown("Prev")
        );
      }
    }
    await this.actions.clickElement(
      "xpath",
      this.pageObject.datePickerDay(dayText)
    );
  }

  async selectDateFromDatePickerWithMonthYearDropdown(dateValue) {
    const dateList = dateValue.split(" ");
    const dayText = dateList[0];
    const monthText = dateList[1];
    const yearText = dateList[2];
    await this.actions.clickElement("xpath", datePickerLocator);
    await this.actions.selectDropDown(
      this.pageObject.datePickerSelectDropDownMonthYear("year"),
      yearText
    );
    await this.actions.selectDropDown(
      this.pageObject.datePickerSelectDropDownMonthYear("month"),
      monthText
    );
    await this.actions.clickElement(
      "xpath",
      this.pageObject.datePickerDay(dayText)
    );
  }
}
