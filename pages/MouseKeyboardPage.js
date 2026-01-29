import { BasePage } from "../pages/BasePage";
export class MouseKeyboardPage extends BasePage {
  constructor(page) {
    super(page);
  }
  pageLocators = {
    droppableText: "//div[@id='droppable']/p",
    sliderMinMaxHead: (index) =>
      `//span[contains(@class,'ui-slider-handle')][${index}]`,
  };

  async navigateToMouseKeyboard() {
    await this.actions.navigateTo("/");
  }
  async hoverPointMeAndSelectOption(optionName) {
    await this.actions.hoverElement(this.actions.getLocator("role", "button,Point Me"));
    await this.actions.clickElement(this.actions.getLocator("role", `link,${optionName}`));
  }

  async doubleClickCopyTextButton() {
    await this.actions.doubleClickElement(this.actions.getLocator("text", "Copy Text"));
  }
  async getField2ElementText() {
    return await this.actions.getTextFromReadOnlyInput("#field2");
  }
  async performDragAndDrop() {
    await this.actions.dragAndDrop(this.actions.getLocator("css", "#draggable"), this.actions.getLocator("css","#droppable"));
  }
  async getDroppableElementText() {
    return await this.actions.getText(this.actions.getLocator("xpath", this.pageLocators.droppableText));
  }
  async selectDoubleClickHeadingTextAndPasteInField2() {
    await this.actions.doubleClickElement(this.actions.getLocator("role", "heading,Double Click"));
    await this.actions.performKeyOperation("Control+C");
    await this.actions.clickElement(this.actions.getLocator("css", "#field2"));
    await this.actions.performKeyOperation("Control+A");
    await this.actions.performKeyOperation("Control+V");
  }

  async selectSliderRange(minValue, maxValue) {
    const silder = await this.actions.getLocator("css", "#slider-range");
    const minHead = await this.actions.getLocator(
      "xpath",
      this.pageLocators.sliderMinMaxHead(1),
    );
    const maxHead = await this.actions.getLocator(
      "xpath",
      this.pageLocators.sliderMinMaxHead(2),
    );
    await this.setSliderRange(silder, minHead, maxHead, minValue, maxValue);
  }

  async getSelectedPriceRange() {
    return await this.actions.getTextFromReadOnlyInput("#amount");
  }
}
