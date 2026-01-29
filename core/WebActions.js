export class WebActions {
  constructor(page) {
    this.page = page;
  }

  getLocator(locatortype, locator) {
    switch (locatortype.toLowerCase()) {
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
          ? this.page.getByRole(role, { name })
          : this.page.getByRole(role);
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
  async getLocatorCount(elements) {
    return await elements.count();
  }
  getNthLocator(elements, index) {
    return elements.nth(index);
  }
  getChildLocator(element, locatorStr) {
    return element.locator(locatorStr);
  }
  getSpecificLocator(elements, searchText) {
    return elements.filter({ hasText: searchText });
  }
  async navigateTo(url) {
    await this.page.goto(url);
  }

  async isDisplayed(element) {
    return await element.isVisible();
  }

  async wait(timeInSeconds) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }

  async isElementPresent(element) {
    let status = false;
    if ((await element.count()) > 0) {
      if (await this.isDisplayed(element)) {
        status = true;
      } else {
        status = false;
      }
    } else {
      status = false;
    }
    return status;
  }

  async waitForElementToBeClickable(element) {
    await element.waitFor({ state: "visible", timeout: 30000 });
    if (!(await element.isEnabled())) throw new Error("Element not enabled");
  }

  async waitForPageLoadState(eventName) {
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

  async waitUntilElementAppears(element, timeInSeconds = 120) {
    let status = true;
    try {
      const startTime = Date.now();
      while (!(await this.isElementPresent(element))) {
        console.log(`Waiting for Element to be appear...`);
        await this.waitForPageLoadState("networkidle");
        await this.waitForPageLoadState("load");
        await this.waitForPageLoadState("domcontentloaded");
        await this.wait(1);
        const endTime = Date.now();
        if (endTime - startTime > timeInSeconds * 1000) {
          break;
        }
      }
    } catch (error) {
      status = false;
      console.error(`Element is not appear within the specified timeout.`);
    }

    return status;
  }

  async clickElement(element) {
    if (await this.waitUntilElementAppears(element)) {
      await this.waitForElementToBeClickable(element);
      await element.click();
    } else {
      throw new Error(
        `Unable to perform click on Element, is not present in the DOM or displayed`,
      );
    }
  }
  async selectRadioCheckbox(element) {
    if (await this.waitUntilElementAppears(element)) {
      await element.check();
    } else {
      throw new Error(
        `Unable to select Radio/Checkbox, is not present in the DOM or displayed`,
      );
    }
  }
  async typeText(element, text) {
    if (await this.waitUntilElementAppears(element)) {
      await this.waitForElementToBeClickable(element);
      await element.fill(text);
    } else {
      throw new Error(
        `Unable to type in textbox/textarea, is not present in the DOM or displayed`,
      );
    }
  }
  async selectDropDown(locator, options) {
    await this.page.selectOption(locator, options);
  }

  async acceptAlert(element) {
    this.page.once("dialog", (dialog) => dialog.accept());
    await this.clickElement(element);
  }

  async dismissAlert(element) {
    this.page.once("dialog", (dialog) => dialog.dismiss());
    await this.clickElement(element);
  }

  async typeInAlert(element, text) {
    this.page.once("dialog", (dialog) => dialog.accept(text));
    await this.clickElement(element);
  }

  async closePage() {
    await this.page.close();
  }

  async controlClickElement(element) {
    if (await this.waitUntilElementAppears(element)) {
      await this.waitForElementToBeClickable(element);
      await element.click({ modifiers: ["Control"] });
    } else {
      throw new Error(
        `Unable to perform control click on Element, is not present in the DOM or displayed`,
      );
    }
  }

  async hoverElement(element) {
    if (await this.waitUntilElementAppears(element)) {
      await element.hover();
    } else {
      throw new Error(
        `Unable to perform hover on Element, is not present in the DOM or displayed`,
      );
    }
  }

  async doubleClickElement(element) {
    if (await this.waitUntilElementAppears(element)) {
      await this.waitForElementToBeClickable(element);
      await element.dblclick({ button: "left" });
    } else {
      throw new Error(
        `Unable to perform double click on Element,is not present in the DOM or displayed`,
      );
    }
  }

  async typeUsingKeyBoard(text) {
    await this.page.keyboard.type(text);
  }

  async downloadFile(element, locationToSave) {
    const downloadPromise = this.page.waitForEvent("download");
    await this.clickElement(element);
    const download = await downloadPromise;
    await download.saveAs(`${locationToSave}/${download.suggestedFilename()}`);
  }

  async getTextFromReadOnlyInput(locator) {
    return await this.page.inputValue(locator);
  }

  async getText(element) {
    if (await this.waitUntilElementAppears(element)) {
      return await element.textContent();
    }
    throw new Error(
      "getText() failed: The 'element' provided is undefined or null.",
    );
  }
  async performKeyOperation(keyCombination) {
    await this.page.keyboard.press(keyCombination);
  }

  async dragAndDrop(srcElement, destElement) {
    if (await this.waitUntilElementAppears(srcElement)) {
      await srcElement.dragTo(destElement);
    } else {
      throw new Error(
        `Unable to perform Drag and Drop on Element, is not present in the DOM or displayed`,
      );
    }
  }

  async getElementBoundingBoxDimensions(element) {
    if (await this.waitUntilElementAppears(element)) {
      const box = await element.boundingBox();
      return ({ x, y, height, width } = box);
    } else {
      throw new Error(
        "boundingBox() failed: The 'element' provided is undefined or null.",
      );
    }
  }

  async performMouseDown() {
    await this.page.mouse.down();
  }
  async performMouseUp() {
    await this.page.mouse.up();
  }

  async moveMouseTo(x, y) {
    await this.page.mouse.move(x, y);
  }

  async getElementAttribute(element, attributeName) {
    return await element.getAttribute(attributeName);
  }
}
