import { test } from "../fixtures/baseTest.js";
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
      async ({ pages }) => {
        await pages.mouseKeyboardPage.navigateToMouseKeyboard();
        await pages.mouseKeyboardPage.hoverPointMeAndSelectOption("Mobiles");
      },
    );
    test(
      "Perform double click on copy text button",
      { tag: "@mouseAction" },
      async ({ pages }) => {
        await pages.mouseKeyboardPage.navigateToMouseKeyboard();
        await pages.mouseKeyboardPage.doubleClickCopyTextButton();
        pages.assert.validatePartialText(
          await pages.mouseKeyboardPage.getField2ElementText(),
          "Hello World!",
        );
      },
    );

    test(
      "Perform drag and drop",
      { tag: "@mouseAction" },
      async ({ pages }) => {
        await pages.mouseKeyboardPage.navigateToMouseKeyboard();
        pages.assert.validatePartialText(
          await pages.mouseKeyboardPage.getDroppableElementText(),
          "Drop here",
        );
        await pages.mouseKeyboardPage.performDragAndDrop();
        pages.assert.validatePartialText(
          await pages.mouseKeyboardPage.getDroppableElementText(),
          "Dropped!",
        );
      },
    );
    test(
      "Perform Keyboard operations Control+C,Control+A,Control+V",
      { tag: "@keyboardAction" },
      async ({ pages }) => {
        await pages.mouseKeyboardPage.navigateToMouseKeyboard();
        await pages.mouseKeyboardPage.selectDoubleClickHeadingTextAndPasteInField2();
        pages.assert.validatePartialText(
          await pages.mouseKeyboardPage.getField2ElementText(),
          "Click",
        );
      },
    );

    test(
      "Select min head 20 and max head 40%",
      { tag: "@slider" },
      async ({ pages }) => {
        await pages.mouseKeyboardPage.navigateToMouseKeyboard();
        await pages.mouseKeyboardPage.selectSliderRange(20,80);
        pages.assert.validatePartialText(
          await pages.mouseKeyboardPage.getSelectedPriceRange(),
          "$100-$400",
        );
      },
    );
  },
);
