import { WebActions } from "../core/WebActions";
import { getCurrentMonthIndex, getFullMonthIndex } from "../utils/DateManager";
export class BasePage {
  constructor(page) {
    this.actions = new WebActions(page);
  }

  baseLocators = {
    datePickerMonthYearWithOutDropdown: (monthYear, monthYearValue) =>
      `//span[contains(@class,'${monthYear}') and text()='${monthYearValue}']`,
    datePickerPrevNextArrowWithOutDropdown: (arrowName) =>
      `//a[@title='${arrowName}']`,
    datePickerDay: (daytext) => `//a[@data-date='${daytext}']`,
    datePickerSelectDropDownMonthYear: (dropdownType) =>
      `//select[contains(@aria-label,'${dropdownType}')]`,
    radioCheckboxLocator: (labelName) =>
      `//label[text()='${labelName}']/preceding::input[1]`,
    webTable: (attributeName, attributeValue) =>
      `//table[@${attributeName}='${attributeValue}']/tbody/tr`,
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

  async selectDateFromDatePicker(dateValue, datePickerElement) {
    const dateList = dateValue.split(" ");
    const dayText = dateList[0];
    const monthText = dateList[1];
    const yearText = dateList[2];
    const monthIndex = getFullMonthIndex(monthText);
    const currentMonthIndex = getCurrentMonthIndex();
    await this.actions.clickElement(datePickerElement);
    //This code is check given date month and year is displayed of not
    while (
      !(await this.actions.isDisplayed(
        this.actions.getLocator(
          "xpath",
          this.baseLocators.datePickerMonthYearWithOutDropdown(
            "month",
            monthText,
          ),
        ),
      ))
    ) {
      await this.actions.wait(1);
      if (monthIndex > currentMonthIndex) {
        await this.actions.clickElement(
          this.actions.getLocator(
            "xpath",
            this.baseLocators.datePickerPrevNextArrowWithOutDropdown("Next"),
          ),
        );
      } else {
        await this.actions.clickElement(
          this.actions.getLocator(
            "xpath",
            this.baseLocators.datePickerPrevNextArrowWithOutDropdown("Prev"),
          ),
        );
      }
    }
    await this.actions.clickElement(
      this.actions.getLocator(
        "xpath",
        this.baseLocators.datePickerDay(dayText),
      ),
    );
  }

  async selectDateFromDatePickerWithMonthYearDropdown(
    dateValue,
    datePickerElement,
  ) {
    const dateList = dateValue.split(" ");
    const dayText = dateList[0];
    const monthText = dateList[1];
    const yearText = dateList[2];
    await this.actions.clickElement(datePickerElement);
    await this.actions.selectDropDown(
      this.baseLocators.datePickerSelectDropDownMonthYear("year"),
      yearText,
    );
    await this.actions.selectDropDown(
      this.baseLocators.datePickerSelectDropDownMonthYear("month"),
      monthText,
    );
    await this.actions.clickElement(
      this.actions.getLocator(
        "xpath",
        this.baseLocators.datePickerDay(dayText),
      ),
    );
  }

  getTableRows(attributeName, attributeValue) {
    return this.actions.getLocator(
      "xpath",
      this.baseLocators.webTable(attributeName, attributeValue),
    );
  }

  getRowsCellsCount(tableRowsCells) {
    return this.actions.getLocatorCount(tableRowsCells);
  }

  getNthRowCell(tableRows, index) {
    return this.actions.getNthLocator(tableRows, index);
  }

  getRowCells(row, cellLocator) {
    return this.actions.getChildLocator(row, cellLocator);
  }

  getSpecificRow(rows, searchText) {
    return this.actions.getSpecificLocator(rows, searchText);
  }

  async setSliderRange(
    silderElement,
    sliderHeadMinElement,
    sliderHeadMaxElement,
    minValue,
    maxValue,
  ) {
    const sliderDimension =
      await this.actions.getElementBoundingBoxDimensions(silderElement);
    const sX = sliderDimension.x;
    const sY = sliderDimension.y;
    const sWidth = sliderDimension.width;
    const sHeight = sliderDimension.height;
    const headMinDimension =
      await this.actions.getElementBoundingBoxDimensions(sliderHeadMinElement);
    const headMinX = headMinDimension.x;
    const headMaxDimension =
      await this.actions.getElementBoundingBoxDimensions(sliderHeadMaxElement);
    const headMaxX = headMaxDimension.x;
    const y = sY + sHeight / 2;
    const minX = sX + (sWidth * minValue) / 100;
    const maxX = sX + (sWidth * maxValue) / 100;

    //Moving HeadMin
    await this.actions.moveMouseTo(headMinX, y);
    await this.actions.performMouseDown();
    await this.actions.moveMouseTo(minX, y);
    await this.actions.performMouseUp();

    //Moving HeadMax
    await this.actions.moveMouseTo(headMaxX, y);
    await this.actions.performMouseDown();
    await this.actions.moveMouseTo(maxX, y);
    await this.actions.performMouseUp();
  }
}
