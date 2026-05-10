import { test } from "../fixtures/baseTest.js";
test(
  "Test Static Web Table",
  { tag: "@staticWebTable" },
  async ({ pages }) => {
    await pages.webTablePage.navigateToWebTablePage();
    await pages.webTablePage.getStaticWebTableRowByBookName("Learn Selenium");
  },
);
