import type { Page, Locator } from "@playwright/test";

export class WebActions {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  getLocator(locatortype: string, locator: string) {
    switch (locatortype.toLowerCase() || "") {
      case "placeholder":
        return this.page.getByPlaceholder(locator);
      case "label":
        return this.page.getByLabel(locator);
      case "text":
        return this.page.getByText(locator);
      case "title":
        return this.page.getByTitle(locator);
      case "testid":
        return this.page.getByTestId(locator);

      case "role": {
        const [role, name] = String(locator)
          .split(",")
          .map((s) => s.trim());
        if (!role)
          throw new Error(`getLocator(role): Missing role in "${locator}"`);
        return name
          ? this.page.getByRole(role as any, { name })
          : this.page.getByRole(role as any);
      }
      case "alttext":
        return this.page.getByAltText(locator);
      case "xpath":
        return this.page.locator(`xpath=${locator}`);
      case "css":
        return this.page.locator(locator);
      default:
        throw Error("Invalid Locator type!");
    }
  }
  async getLocatorCount(elements: Locator) {
    return await elements.count();
  }
  getNthLocator(elements: Locator, index: number) {
    return elements.nth(index);
  }
  getChildLocator(element: Locator, locatorStr: string) {
    return element.locator(locatorStr);
  }
  getSpecificLocator(elements: Locator, searchText: string) {
    return elements.filter({ hasText: searchText });
  }
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async isDisplayed(element: Locator) {
    return await element.isVisible();
  }

  async isElementEnabled(element: Locator) {
    return await element.isEnabled();
  }
  async isElementEditable(element: Locator) {
    return await element.isEditable();
  }

  async wait(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }

  async waitForElement(element: Locator, elementState: "visible" | "hidden" | "attached" | "detached", timeInSeconds: number) {
    try {
      await element.waitFor({
        state: elementState,
        timeout: timeInSeconds * 1000,
      });
      return true;
    } catch {
      return false;
    }
  }

  async waitForElementToBeClickable(element: Locator) {
    if (!(await this.waitForElement(element, "visible", 30))) {
      throw new Error("Element is not visible");
    }
    if (!(await this.isElementEnabled(element)))
      throw new Error("Element is visible but not enabled");
  }

  async waitForPageLoadState(eventName: string) {
    switch (eventName.toLowerCase()) {
      case "networkidle":
        await this.page.waitForLoadState("networkidle");
        break;
      case "load":
        await this.page.waitForLoadState("load");
        break;
      case "domcontentloaded":
        await this.page.waitForLoadState("domcontentloaded");
        break;
      default:
        throw new Error(`Invalid Event Name: ${eventName}`);
    }
  }

  async waitUntilElementAppears(element: Locator, timeInSeconds = 120) {
    return this.waitForElement(element, "visible", timeInSeconds);
  }

  async clickElement(element: Locator) {
    if (
      (await this.waitUntilElementAppears(element)) &&
      (await this.isElementEnabled(element))
    ) {
      await element.click();
    } else {
      throw new Error(
        `Unable to perform click on Element, is not present in the DOM or displayed or disabled`,
      );
    }
  }
  async selectRadioCheckbox(element: Locator) {
    if (
      (await this.waitUntilElementAppears(element)) &&
      (await this.isElementEnabled(element))
    ) {
      await element.check();
    } else {
      throw new Error(
        `Unable to select Radio/Checkbox, is not present in the DOM or displayed or disabled`,
      );
    }
  }
  async typeText(element: Locator, text: string) {
    if (
      (await this.waitUntilElementAppears(element)) &&
      (await this.isElementEditable(element))
    ) {
      await element.fill(text);
    } else {
      throw new Error(
        `Unable to type in textbox/textarea, is not present in the DOM or displayed or non editable`,
      );
    }
  }
  async selectDropDown(locator: string | Locator, options: string | string[]) {
    return typeof locator === "string"
      ? await this.page.selectOption(locator, options)
      : await locator.selectOption(options);
  }

  async acceptAlert(element: Locator) {
    this.page.once("dialog", (dialog) => dialog.accept());
    await this.clickElement(element);
  }

  async dismissAlert(element: Locator) {
    this.page.once("dialog", (dialog) => dialog.dismiss());
    await this.clickElement(element);
  }

  async typeInAlert(element: Locator, text: string) {
    this.page.once("dialog", (dialog) => dialog.accept(text));
    await this.clickElement(element);
  }

  async closePage() {
    await this.page.close();
  }

  async controlClickElement(element: Locator) {
    if (
      (await this.waitUntilElementAppears(element)) &&
      (await this.isElementEnabled(element))
    ) {
      await element.click({ modifiers: ["Control"] });
    } else {
      throw new Error(
        `Unable to perform control click on Element, is not present in the DOM or displayed or disabled`,
      );
    }
  }

  async hoverElement(element: Locator) {
    if (await this.waitUntilElementAppears(element)) {
      await element.hover();
    } else {
      throw new Error(
        `Unable to perform hover on Element, is not present in the DOM or displayed`,
      );
    }
  }

  async doubleClickElement(element: Locator) {
    if (
      (await this.waitUntilElementAppears(element)) &&
      (await this.isElementEnabled(element))
    ) {
      await element.dblclick({ button: "left" });
    } else {
      throw new Error(
        `Unable to perform double click on Element,is not present in the DOM or displayed or disabled`,
      );
    }
  }

  async typeUsingKeyBoard(text: string) {
    await this.page.keyboard.type(text);
  }

  async downloadFile(element: Locator, locationToSave: string) {
    const downloadPromise = this.page.waitForEvent("download");
    await this.clickElement(element);
    const download = await downloadPromise;
    const downloadedFilePath = `${locationToSave}/${download.suggestedFilename()}`;
    await download.saveAs(downloadedFilePath);
    return downloadedFilePath;
  }

  async getTextFromReadOnlyInput(locator: string | Locator) {
    return typeof locator === "string"
      ? await this.page.inputValue(locator)
      : await locator.inputValue();
  }

  async getText(element: Locator) {
    if (await this.waitUntilElementAppears(element)) {
      return await element.textContent();
    }
    throw new Error("getText(): Element did not appear within the timeout.");
  }
  async performKeyOperation(keyCombination: string) {
    await this.page.keyboard.press(keyCombination);
  }

  async dragAndDrop(srcElement: Locator, destElement: Locator) {
    if (await this.waitUntilElementAppears(srcElement)) {
      await srcElement.dragTo(destElement);
    } else {
      throw new Error(
        `Unable to perform Drag and Drop on Element, is not present in the DOM or displayed`,
      );
    }
  }

  async getElementBoundingBoxDimensions(element: Locator) {
    if (await this.waitUntilElementAppears(element)) {
      const box = await element.boundingBox();
      return box;
    } else {
      throw new Error(
        "getElementBoundingBoxDimensions(): Element did not appear within the timeout.",
      );
    }
  }

  async performMouseDown() {
    await this.page.mouse.down();
  }
  async performMouseUp() {
    await this.page.mouse.up();
  }

  async moveMouseTo(x: number, y: number) {
    await this.page.mouse.move(x, y);
  }

  async getElementAttribute(element: Locator, attributeName: string) {
    return await element.getAttribute(attributeName);
  }
  async uploadFilesByInputTypeFile(element: Locator, files: string | string[]) {
    await element.setInputFiles(files);
  }

  async uploadFiles(element: Locator, files: string | string[]) {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.clickElement(element);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(files);
  }
}
