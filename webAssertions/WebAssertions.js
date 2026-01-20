import { expect } from "../fixtures/PageFixtures";
export class WebAssertion {
  validatePartialText(locator, expectedText) {
    expect(locator).toContainText(expectedText);
  }
  validateExactText(locator, expectedText) {
    expect(locator).toHaveText(expectedText);
  }
}
