import {WebActions} from "../core/WebActions";
export class BasePage{
  constructor(page) {
    this.actions= new WebActions(page);
  }
}
