import { test, expect } from "@playwright/test";
//Here we handles diagloga and implements the grouping concept.
test.describe("Test Dialogs", async () => {
  const url = "https://testautomationpractice.blogspot.com/";

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Simple Alert", async ({ page }) => {
    page.on("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Simple Alert" }).click();
  });

  test("Confirmation Alert", async ({ page }) => {
    page.on("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Confirmation Alert" }).click();
    expect(page.locator("#demo")).toContainText("You pressed OK!");
  });

  test("Prompt Alert", async ({ page }) => {
    page.on("dialog", (dialog) => dialog.accept("Shabbir Rayeen"));
    await page.getByRole("button", { name: "Prompt Alert" }).click();
    expect(page.locator("#demo")).toContainText("Shabbir Rayeen");
  });
});
