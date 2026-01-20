export class WebActions {
  constructor(page) {
    this.page = page;
  }

  getLocator(locatortype, locator) {
    let element;
    switch (locatortype.toLowerCase()) {
      case "placeholder":
        element = this.page.getByPlaceholder(locator);
        break;
      case "label":
        element = this.page.getByLabel(locator);
        break;
      case "text":
        element = this.page.getByText(locator);
        break;
      case "title":
        element = this.page.getByTitle(locator);
        break;
      case "testid":
        element = this.page.getByTestId(locator);
        break;
      case "role":
        let data = locator.split(",");
        element = this.page.getByRole(`${data[0]}`, { name: `${data[1]}` });
        break;
      case "alttext":
        element = this.page.getByAltText();
        break;
      case "xpath":
      case "css":
        element = this.page.locator(locator);
        break;
      default:
        throw Error("Invalid Locator type!");
    }
    return element;
  }
  async navigateTo(url) {
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
    await this.page.selectOption(locator, options);
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
  getText(locatortype, locator) {
    return this.getLocator(locatortype, locator).textContent();
  }
  async closePage() {
    await this.page.close();
  }

  async isDisplayed(locatortype, locator) {
    return await this.getLocator(locatortype, locator).isVisible();
  }

  async wait(timeInSeconds) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}
