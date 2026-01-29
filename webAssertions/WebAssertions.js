import { expect } from "../fixtures/PageFixtures";
export class WebAssertion {
  validatePartialText(actualtext, expectedText) {
    expect(actualtext).toContain(expectedText);
  }
  validateExactText(actualtext, expectedText) {
    expect(actualtext).toBe(expectedText);
  }
}
