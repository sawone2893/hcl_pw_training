const { test: base } = require('@playwright/test');
const { GUIElementsPage } = require('../pages/GUIElementsPage.js');
import { DialogPage } from '../pages/DialogPage.js';
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
});

exports.expect = base.expect;