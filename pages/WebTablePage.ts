import type { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class WebTablePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  pageLocators = {};
  async navigateToWebTablePage() {
    await this.actions.navigateTo("/");
  }
  async getStaticWebTableRowByBookName(bookName: string) {
    const rows = this.getTableRows("name", "BookTable");
    console.log(`Rows Count: ${await this.getRowsCellsCount(rows)}`);
    const row = this.getSpecificRow(rows, bookName);
    const cells = this.getRowCells(row, "td");
    console.log(`Cells Count: ${this.getRowsCellsCount(cells)}`);
    console.log(
      `BookName: ${await this.actions.getText(this.getNthRowCell(cells, 0))}`,
    );
    console.log(
      `Author: ${await this.actions.getText(this.getNthRowCell(cells, 1))}`,
    );
    console.log(
      `Subject: ${await this.actions.getText(this.getNthRowCell(cells, 2))}`,
    );
    console.log(
      `Price: ${await this.actions.getText(this.getNthRowCell(cells, 3))}`,
    );
  }
}
