import {BasePage} from "../pages/BasePage";
export class GUIElementsPage extends BasePage{
  constructor(page) {
    super(page);
  }

  async navigateToPage(){
    await this.actions.navigateTo("/");
  }
  async enterName(name) {
    await this.actions.typeText("placeholder", "Enter Name", name);
  }
  async enterEmail(email) {
    await this.actions.typeText("placeholder", "Enter EMail", email);
  }
  async enterPhone(phone) {
    await this.actions.typeText("placeholder", "Enter Phone", phone);
  }

  async selectGender(gender) {
    await this.actions.clickElement("css", `#${gender.toLowerCase()}`);
  }

  async selectDay(name){
    await this.actions.selectRadioCheckbox("css",`#${name.toLowerCase()}`)
  }

  async selectCountry(name){
    await this.actions.selectDropDown("#country",name);
  }
  async selectColors(names){
    await this.actions.selectDropDown("#colors",names);
  }
  async selectAnimals(names){
    await this.actions.selectDropDown("#animals",names);
  }
}
