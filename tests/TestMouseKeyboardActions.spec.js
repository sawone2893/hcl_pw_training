import { test } from "../fixtures/PageFixtures";
//Here we handles diagloga and implements the grouping concept.
/**
 * Topic Covered
 * ===================
 * Hover on element
 * Double click on element
 * Drop and drag element.
 * Perform Keyboard operation Control+C,Control+V
 */
test.describe(
  "Test Mouse Keybaord Actions",
  { tag: "@mouseKeyboardAction" },
  async () => {
    test(
      "Hover and select option",
      { tag: "@mouseAction" },
      async ({ mouseKeyboardPage }) => {
        await mouseKeyboardPage.navigateToMouseKeyboard();
        await mouseKeyboardPage.hoverPointMeAndSelectOption("Mobiles");
      },
    );
    test(
      "Perform double click on copy text button",
      { tag: "@mouseAction" },
      async ({ mouseKeyboardPage, assert }) => {
        await mouseKeyboardPage.navigateToMouseKeyboard();
        await mouseKeyboardPage.doubleClickCopyTextButton();
        assert.validatePartialText(
          await mouseKeyboardPage.getField2ElementText(),
          "Hello World!",
        );
      },
    );

    test(
      "Perform drag and drop",
      { tag: "@mouseAction" },
      async ({ mouseKeyboardPage, assert }) => {
        await mouseKeyboardPage.navigateToMouseKeyboard();
        assert.validatePartialText(
          await mouseKeyboardPage.getDroppableElementText(),
          "Drop here",
        );
        await mouseKeyboardPage.performDragAndDrop();
        assert.validatePartialText(
          await mouseKeyboardPage.getDroppableElementText(),
          "Dropped!",
        );
      },
    );
    test(
      "Perform Keyboard operations Control+C,Control+A,Control+V",
      { tag: "@keyboardAction" },
      async ({ mouseKeyboardPage, assert }) => {
        await mouseKeyboardPage.navigateToMouseKeyboard();
        await mouseKeyboardPage.selectDoubleClickHeadingTextAndPasteInField2();
        assert.validatePartialText(
          await mouseKeyboardPage.getField2ElementText(),
          "Click",
        );
      },
    );
  },
);
