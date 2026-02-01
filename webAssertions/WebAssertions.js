import { expect} from "../fixtures/PageFixtures";
import { FileManager } from "../utils/FileManager";
export class WebAssertion {
  constructor(page) {
    this.page = page;
  }
  validatePartialText(actualtext, expectedText) {
    expect(actualtext).toContain(expectedText);
  }
  validateExactText(actualtext, expectedText) {
    expect(actualtext).toBe(expectedText);
  }

  async verifyElementVisible(element) {
    await expect(element).toBeVisible();
  }

  async verifyElementInvisible(element) {
    await expect(element).toBeHidden();
  }

  async verifyElementEnabled(element) {
    await expect(element).toBeEnabled();
  }
  async verifyElementDisabled(element) {
    await expect(element).toBeDisabled();
  }

  async verifyElementChecked(element) {
    await expect(element).toBeChecked();
  }

  async verifyElementUnchecked(element) {
    await expect(element).not.toBeChecked();
  }
  async verifyElementCount(elements, expectedCount) {
    await expect(elements).toHaveCount(expectedCount);
  }

  async verifyElementEditable(element) {
    await expect(element).toBeEditable();
  }

  async verifyElementToContainText(element, expectedText) {
    await expect(element).toContainText(expectedText);
  }
  async verifyElementToHaveText(element, expectedText) {
    await expect(element).toHaveText(expectedText);
  }

  async verifyElementToHaveAttribute(element, attributeName, attributeValue) {
    await expect(element).toHaveAttribute(attributeName, attributeValue);
  }

  async verifyElementToHaveValue(element, expectedValue) {
    await expect(element).toHaveValue(expectedValue);
  }

  async verifyPageTitle(expectedTitle) {
    await expect(thispage).toHaveTitle(expectedTitle);
  }

  async verifyCurrentPageURLContains(expectedText) {
    await expect(this.page).toHaveURL(new RegExp(expectedText));
  }

  async verifyFileDownloaded(filePath) {
    expect(await FileManager.isFileExists(filePath)).toBeTruthy();
  }
}
