import { BasePage } from "./BasePage";
export class WebTablePage extends BasePage {
  constructor(page) {
    super(page);
  }
  pageLocators = {};
  async navigateToWebTablePage() {
    await this.actions.navigateTo("/");
  }
  async getStaticWebTableRowByBookName(bookName) {
    const rows = await this.getTableRows("name", "BookTable");
    console.log(`Rows Count: ${await this.getRowsCellsCount(rows)}`);
    const row = await this.getSpecificRow(rows, bookName);
    const cells = await this.getRowCells(row, "td");
    console.log(`Cells Count: ${await this.getRowsCellsCount(cells)}`);
    console.log(
      `BookName: ${await this.actions.getText(await this.getNthRowCell(cells, 0))}`,
    );
    console.log(
      `Author: ${await this.actions.getText(await this.getNthRowCell(cells, 1))}`,
    );
    console.log(
      `Subject: ${await this.actions.getText(await this.getNthRowCell(cells, 2))}`,
    );
    console.log(
      `Price: ${await this.actions.getText(await this.getNthRowCell(cells, 3))}`,
    );
  }
}
