import { test } from "../fixtures/PageFixtures";
test("Validate Broken links",{ tag: "@brokenLink" }, async ({ brokenLinkPage }) => {
  await brokenLinkPage.navigateToBrokenLinkPage();
  await brokenLinkPage.validateBrokenLinks();
});
