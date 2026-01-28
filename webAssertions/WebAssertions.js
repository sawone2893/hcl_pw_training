import { expect } from "../fixtures/PageFixtures";
export class WebAssertion {
  validatePartialText(locator, expectedText) {
    expect(locator).toContainText(expectedText);
  }
  validatePartialText(actualtext, expectedText) {
    expect(actualtext).toContain(expectedText);
  }
  validateExactText(locator, expectedText) {
    expect(locator).toHaveText(expectedText);
  }

  validateExactText(actualtext, expectedText) {
    expect(actualtext).toBe(expectedText);
  }
}
