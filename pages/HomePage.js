export class HomePage {
  constructor(page) {
    this.page = page;
    this.newCustomerLink = page.getByText("New Customer");
  }
  async clickNewCustomer() {
    this.newCustomerLink.click();
  }
}
