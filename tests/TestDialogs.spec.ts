import { test } from "../fixtures/baseTest.js";
//Here we handles diagloga and implements the grouping concept.
/**
 * Topic covered in this
 * Handling dialogs
 * Grouping tests
 * Hooks
 * Tags:
 */
test.describe("Test Dialogs", { tag: "@dialogs" }, async () => {
  test("Simple Alert", { tag: "@sa" }, async ({ pages }) => {
    await pages.dialogPage.navigateToDialog();
    await pages.dialogPage.acceptSimpleAlert();
  });

  test("Confirmation Alert", { tag: "@ca" }, async ({ pages }) => {
    await pages.dialogPage.navigateToDialog();
    await pages.dialogPage.acceptConfirmationAlert();
    pages.assert.validatePartialText(
      await pages.dialogPage.getVisibleMessageElementText(),
      "You pressed OK!"
    );
  });

  test("Prompt Alert", { tag: "@pa" }, async ({ pages }) => {
    await pages.dialogPage.navigateToDialog();
    await pages.dialogPage.acceptPromptAlert("Shabbir");
     pages.assert.validatePartialText(
      await pages.dialogPage.getVisibleMessageElementText(),
      "Shabbir",
    );
  });
});
