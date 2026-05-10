import { test } from "../fixtures/baseTest.js";
test("Validate Broken links",{ tag: "@brokenLink" }, async ({ pages }) => {
  await pages.brokenLinkPage.navigateToBrokenLinkPage();
  await pages.brokenLinkPage.validateBrokenLinks();
});
