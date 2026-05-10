import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { FileManager } from "../utils/FileManager";
export class WebAssertion {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  validatePartialText(actualtext: string | null, expectedText: string) {
    expect(actualtext).toContain(expectedText);
  }
  validateExactText(actualtext: string | null, expectedText: string) {
    expect(actualtext).toBe(expectedText);
  }

  async verifyElementVisible(element: Locator) {
    await expect(element).toBeVisible();
  }

  async verifyElementInvisible(element: Locator) {
    await expect(element).toBeHidden();
  }

  async verifyElementEnabled(element: Locator) {
    await expect(element).toBeEnabled();
  }
  async verifyElementDisabled(element: Locator) {
    await expect(element).toBeDisabled();
  }

  async verifyElementChecked(element: Locator) {
    await expect(element).toBeChecked();
  }

  async verifyElementUnchecked(element: Locator) {
    await expect(element).not.toBeChecked();
  }
  async verifyElementCount(elements: Locator, expectedCount: number) {
    await expect(elements).toHaveCount(expectedCount);
  }

  async verifyElementEditable(element: Locator) {
    await expect(element).toBeEditable();
  }

  async verifyElementToContainText(element: Locator, expectedText: string) {
    await expect(element).toContainText(expectedText);
  }
  async verifyElementToHaveText(element: Locator, expectedText: string) {
    await expect(element).toHaveText(expectedText);
  }

  async verifyElementToHaveAttribute(element: Locator, attributeName: string, attributeValue: string) {
    await expect(element).toHaveAttribute(attributeName, attributeValue);
  }

  async verifyElementToHaveValue(element: Locator, expectedValue: string) {
    await expect(element).toHaveValue(expectedValue);
  }

  async verifyPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyCurrentPageURLContains(expectedText: string | RegExp) {
    const matcher = expectedText instanceof RegExp ? expectedText : new RegExp(expectedText);
    await expect(this.page).toHaveURL(matcher);
  }

  async verifyFileDownloaded(filePath: string) {
    expect(await FileManager.isFileExists(filePath)).toBeTruthy();
  }
}
