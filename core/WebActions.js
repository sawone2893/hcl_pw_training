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
    // const element = await this.getLocator("", locator);
    // await element.selectOption(options);
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

  // async waitForPageLoadState(eventName) {
  //   switch (eventName.toLowerCase()) {
  //     case "networkidle":
  //       await this.page.waitForLoadState("networkidle");
  //       break;
  //     case "load":
  //       await this.page.waitForLoadState("load");
  //       break;
  //     case "domcontentloaded":
  //       await this.page.waitForLoadState("domcontentloaded");
  //       break;
  //     default:
  //       throw new Error(`Invalid Event Name: ${eventName}`);
  //   }
  // }

  // async waitUntillElementAppear(locatortype, locator, timeInSeconds = 120) {
  //   let status = true;
  //   try {
  //     const startTime = Date.now();
  //     while (!(await this.isDisplayed(locatortype, locator))) {
  //       console.log(`Waiting for Element[${locator}] to be appear...`);
  //       await this.waitForPageLoadState("networkidle");
  //       await this.waitForPageLoadState("load");
  //       await this.waitForPageLoadState("domcontentloaded");
  //       await this.wait(1);
  //       const endTime = Date.now();
  //       if (endTime - startTime > timeInSeconds * 1000) {
  //         break;
  //       }
  //     }
  //   } catch (error) {
  //     status = false;
  //     console.error(
  //       `Element:: ${locator} is not appear within the specified timeout.`,
  //     );
  //   }

  //   return status;
  // }

  // async waitForElementToBeClickable(locatortype, locator) {
  //   try {
  //     const element = await this.getLocator(locatortype, locator);
  //     await element.isEnabled({ timeout: 30000 });
  //   } catch (error) {
  //     console.error("Element is not clickable within the specified timeout.");
  //   }
  // }

  // async controlClickElement(locatortype, locator) {
  //   if (this.waitUntillElementAppear(locatortype, locator)) {
  //     await this.waitForElementToBeClickable(locatortype, locator);
  //     const element = await this.getLocator(locatortype, locator);
  //     await element.click({ modifiers: ["Control"] });
  //     console.log(`Control clicked perform on element: ${locator}`);
  //   } else {
  //     throw new Error(
  //       `Unable to perfrom control click on Element with locator:${locator} is not present in the DOM or displayed`,
  //     );
  //   }
  // }

  // async hoverElement(locatortype, locator) {
  //   if (this.waitUntillElementAppear(locatortype, locator)) {
  //     const element = await this.getLocator(locatortype, locator);
  //     await element.hover();
  //     console.log(`Hover perform on element: ${locator}`);
  //   } else {
  //     throw new Error(
  //       `Unable to perfrom hover on Element with locator:${locator} is not present in the DOM or displayed`,
  //     );
  //   }
  // }

  // async dbClickElement(locatortype, locator) {
  //   if (this.waitUntillElementAppear(locatortype, locator)) {
  //     await this.waitForElementToBeClickable(locatortype, locator);
  //     const element = await this.getLocator(locatortype, locator);
  //     await element.dblclick({ button: "left" });
  //     console.log(`Clicked element: ${locator}`);
  //   } else {
  //     throw new Error(
  //       `Unable to click Element with locator:${locator} is not present in the DOM or displayed`,
  //     );
  //   }
  // }

  // async typeUsingKeyBoard(text) {
  //   await this.page.keyboard.type(text);
  // }

  // async downloadFile(locatortype, locator, locationToSave) {
  //   const downloadPromise = this.page.waitForEvent("download");
  //   await this.clickElement(locatortype, locator);
  //   const download = await downloadPromise;
  //   await download.saveAs(`${locationToSave}/${download.suggestedFilename()}`);
  // }

  // async getTextFromReadOnlyInput(locator) {
  //   return await this.page.inputValue(locator);
  // }
}
