import type { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class DialogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  pageLocators = {};
  async navigateToDialog() {
    await this.actions.navigateTo("/");
  }
  async acceptSimpleAlert() {
    await this.actions.acceptAlert(
      this.actions.getLocator("role", "button,Simple Alert"),
    );
  }
  async acceptConfirmationAlert() {
    await this.actions.acceptAlert(
      this.actions.getLocator("role", "button,Confirmation Alert"),
    );
  }
  async acceptPromptAlert(text: string) {
    await this.actions.typeInAlert(
      this.actions.getLocator("role", "button,Prompt Alert"),
      text,
    );
  }
  async getVisibleMessageElementText() {
    return await this.actions.getText(this.actions.getLocator("css", "#demo"));
  }
}
