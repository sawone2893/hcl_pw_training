import { test as base } from "@playwright/test";
import { GUIElementsPage } from "../pages/GUIElementsPage.js";
import { DialogPage } from "../pages/DialogPage.js";
import { MouseKeyboardPage } from "../pages/MouseKeyboardPage.js";
import { WebTablePage } from "../pages/WebTablePage.js";
import { BrokenLinkPage } from "../pages/BrokenLinkPage.js";
import { UploadDownloadPage } from "../pages/UploadDownloadPage.js";
import { WebAssertion } from "../webAssertions/WebAssertions.js";

export const test = base.extend({
  //Define the "GUIElementsPage" fixture
  gUIElementsPage: async ({ page }, use) => {
    await use(new GUIElementsPage(page));
  },
  //Define the "DialogPage" fixture
  dialogPage: async ({ page }, use) => {
    await use(new DialogPage(page));
  },
  //Define the "MouseKeyboardPage" fixture
  mouseKeyboardPage: async ({ page }, use) => {
    await use(new MouseKeyboardPage(page));
  },
  //Define the "WebTablePage" fixture
  webTablePage: async ({ page }, use) => {
    await use(new WebTablePage(page));
  },
  //Define the "BrokenLinkPage" fixture
  brokenLinkPage: async ({ page }, use) => {
    await use(new BrokenLinkPage(page));
  },
  //Define the "UploadDownloadPage" fixture
  uploadDownloadPage: async ({ page }, use) => {
    await use(new UploadDownloadPage(page));
  },
  assert: async ({}, use) => {
    await use(new WebAssertion());
  },
});

export const expect = base.expect;
