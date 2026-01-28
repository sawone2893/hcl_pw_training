import { BasePage } from "./BasePage";
export class WebTablePage extends BasePage{
  constructor(page){
    super(page);
  }
  pageLocators={
    
  };
  async navigateToWebTablePage() {
    await this.actions.navigateTo("/");
  }
  async getStaticWebTableRowByBookName(bookName){
    const rows=await this.getTableRows("name","BookTable");
    const row =await this.getSpecificRow(rows,bookName);
    const cells=await this.getRowCells(row,"td");
    console.log(`BookName: ${this.actions.getText(cells[0])}`);
    console.log(`Author: ${this.actions.getText(cells[1])}`);
    console.log(`Subject: ${this.actions.getText(cells[2])}`);
    console.log(`Price: ${this.actions.getText(cells[3])}`);
  }

}