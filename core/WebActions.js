export class WebActions {
  constructor(page) {
    this.page=page;
  }

  async getLocator(locatortype, locator) {
    let element;
    switch (locatortype.toLowerCase()) {
      case "placeholder":
        element= await this.page.getByPlaceholder(locator);
      case "label":
        element= await this.page.getByLabel(locator);
      case "text":
        element= await this.page.getByText(locator);
      case "title":
        element= await this.page.getByTitle(locator);
      case "testid":
        element= await this.page.getByTestId(locator);
      case "role":
        element= this.page.getByRole(locator);
      case "alttext":
        element= await this.page.getByAltText();
      case "xpath":
      case "css":
        element=await this.page.locator(locator);
      default:
          throw Error("Invalid Locator type!");
    }
    return element;
  }
  async navigateTo(url){
    await this.page.goto(url);
  }
  async clickElement(locatortype, locator) {
    await this.getLocator(locatortype, locator).click();
  }
  async selectRadioCheckbox(locatortype, locator) {
    await this.getLocator(locatortype, locator).check();
  }
  async typeText(locatortype, locator, text) {
    await this.getLocator(locatortype, locator).fill(text);
  }
  async selectDropDown(locator, options) {
    await this.page.selectOption(locator, optionValue);
  }

  async acceptAlert(locatortype, locator) {
    this.page.on("dialog", (dialog) => dialog.accept());
    await this.clickElement(locatortype, locator);
  }

  async dismissAlert(locatortype, locator) {
    this.page.on("dialog", (dialog) => dialog.dismiss());
    await this.clickElement(locatortype, locator);
  }

  async typeInAlert(locatortype, locator, text) {
    this.page.on("dialog", (dialog) => dialog.accept(text));
    await this.clickElement(locatortype, locator);
  }
}
