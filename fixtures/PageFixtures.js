const { test: base } = require("@playwright/test");
const { GUIElementsPage } = require("../pages/GUIElementsPage.js");
const { DialogPage } = require("../pages/DialogPage.js");
const {MouseKeyboardPage}=require("../pages/MouseKeyboardPage.js");
const { WebAssertion } = require("../webAssertions/WebAssertions.js");
exports.test = base.extend({
  //Define the "loginPage" fixture
  gUIElementsPage: async ({ page }, use) => {
    const gUIElementsPage = new GUIElementsPage(page);
    await use(gUIElementsPage);
  },
  //Define the "dialogPage" fixture
  dialogPage: async ({ page }, use) => {
    const dialogPage = new DialogPage(page);
    await use(dialogPage);
  },

  //Define the "mouseKeyboardPage" fixture
  mouseKeyboardPage: async ({ page }, use) => {
    const mouseKeyboardPage = new MouseKeyboardPage(page);
    await use(mouseKeyboardPage);
  },

  assert: async ({}, use) => {
    const assert = new WebAssertion();
    await use(assert);
  },
});

exports.expect = base.expect;
