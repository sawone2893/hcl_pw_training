import { test as base, Page } from "@playwright/test";
import { GUIElementsPage } from "../pages/GUIElementsPage.js";
import { DialogPage } from "../pages/DialogPage.js";
import { MouseKeyboardPage } from "../pages/MouseKeyboardPage.js";
import { WebTablePage } from "../pages/WebTablePage.js";
import { BrokenLinkPage } from "../pages/BrokenLinkPage.js";
import { UploadDownloadPage } from "../pages/UploadDownloadPage.js";
import { WebAssertion } from "../webAssertions/WebAssertions.js";

export class PageFixtures {
  readonly gUIElementsPage: GUIElementsPage;
  readonly dialogPage: DialogPage;
  readonly mouseKeyboardPage: MouseKeyboardPage;
  readonly webTablePage: WebTablePage;
  readonly brokenLinkPage: BrokenLinkPage;
  readonly uploadDownloadPage: UploadDownloadPage;
  assert: WebAssertion;
  constructor(page: Page) {
    this.gUIElementsPage = new GUIElementsPage(page);
    this.dialogPage = new DialogPage(page);
    this.mouseKeyboardPage = new MouseKeyboardPage(page);
    this.webTablePage = new WebTablePage(page);
    this.brokenLinkPage = new BrokenLinkPage(page);
    this.uploadDownloadPage = new UploadDownloadPage(page);
    this.assert = new WebAssertion(page);
  }
}
