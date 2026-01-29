import { test } from "../fixtures/PageFixtures";
//Here we handles diagloga and implements the grouping concept.
/**
 * Topic covered in this
 * Handling dialogs
 * Grouping tests
 * Hooks
 * Tags:
 */
test.describe("Test Dialogs", async () => {
  test("Simple Alert", { tag: "@sa" }, async ({ dialogPage }) => {
    await dialogPage.navigateToDialog();
    await dialogPage.acceptSimpleAlert();
  });

  test("Confirmation Alert", { tag: "@ca" }, async ({ dialogPage, assert }) => {
    await dialogPage.navigateToDialog();
    await dialogPage.acceptConfirmationAlert();
    assert.validatePartialText(
      dialogPage.getVisibleMessageElement(),
      "You pressed OK!",
    );
  });

  test("Prompt Alert", { tag: "@pa" }, async ({ dialogPage, assert }) => {
    await dialogPage.navigateToDialog();
    await dialogPage.acceptPromptAlert("Shabbir");
    assert.validatePartialText(
      dialogPage.getVisibleMessageElement(),
      "Shabbir",
    );
  });
});
