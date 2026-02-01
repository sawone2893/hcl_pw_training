import { test } from "../fixtures/PageFixtures";
test(
  "Test Static Web Table",
  { tag: "@staticWebTable" },
  async ({ webTablePage }) => {
    await webTablePage.navigateToWebTablePage();
    await webTablePage.getStaticWebTableRowByBookName("Learn Selenium");
  },
);
