import { test, expect } from "@playwright/test";
//Here we handles diagloga and implements the grouping concept.
/**
 * Topic covered in this
 * Handling dialogs
 * Grouping tests
 * Hooks
 * Tags:
 */
test.describe("Test Dialogs", async () => {
  const url = "https://testautomationpractice.blogspot.com/";

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test(
    "Simple Alert",{tag: "@sa"},async ({ page }) => {
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "Simple Alert" }).click();
    }
  );

  test("Confirmation Alert",{tag: "@ca"}, async ({ page }) => {
    page.on("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Confirmation Alert" }).click();
    expect(page.locator("#demo")).toContainText("You pressed OK!");
  });

  test("Prompt Alert",{tag: "@pa"}, async ({ page }) => {
    page.on("dialog", (dialog) => dialog.accept("Shabbir Rayeen"));
    await page.getByRole("button", { name: "Prompt Alert" }).click();
    expect(page.locator("#demo")).toContainText("Shabbir Rayeen");
  });
});
