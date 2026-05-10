import type { Page, Locator } from "@playwright/test";
export class HomePage {
  private page: Page;
  private newCustomerLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.newCustomerLink = page.getByText("New Customer");
  }
  async clickNewCustomer() {
    this.newCustomerLink.click();
  }
}
