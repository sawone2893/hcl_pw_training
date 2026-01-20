import { BasePage } from "../pages/BasePage";
export class DialogPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToDialog(){
    await this.actions.navigateTo("/");
  }
  async acceptSimpleAlert() {
    await this.actions.acceptAlert("role", "button,Simple Alert");
  }
  async acceptConfirmationAlert() {
    await this.actions.acceptAlert("role", "button,Confirmation Alert");
  }
  async acceptPromptAlert(text) {
    await this.actions.typeInAlert("role", "button,Prompt Alert", text);
  }
  getVisibleMessageElement() {
    return this.actions.getLocator("css", "#demo");
  }
}
