import { BasePage } from "../pages/BasePage";
export class MouseKeyboardPage extends BasePage {
  constructor(page) {
    super(page);
  }
  pageLocators = {
    droppableText: "//div[@id='droppable']/p",
  };

  async navigateToMouseKeyboard() {
    await this.actions.navigateTo("/");
  }
  async hoverPointMeAndSelectOption(optionName) {
    await this.actions.hoverElement("role", "button,Point Me");
    await this.actions.clickElement("role", `link,${optionName}`);
  }

  async doubleClickCopyTextButton() {
    await this.actions.dbClickElement("text", "Copy Text");
  }
  async getField2ElementText() {
    return await this.actions.getTextFromReadOnlyInput("#field2");
  }
  async performDragAndDrop() {
    await this.actions.dragAndDrop("css", "#draggable", "#droppable");
  }
  async getDroppableElementText() {
    return await this.actions.getText("xpath", this.pageLocators.droppableText);
  }
async selectDoubleClickHeadingTextAndPasteInField2(){
  await this.actions.dbClickElement("role", "heading,Double Click");
  await this.actions.performKeyOperation("Control+C");
  await this.actions.clickElement("css", "#field2");
  await this.actions.performKeyOperation("Control+A");
  await this.actions.performKeyOperation("Control+V");
}

}
