import { test as baseTest } from "@playwright/test";
import { PageFixtures } from "./PageFixtures.js";
type Fixtures = { pages: PageFixtures };

export const test = baseTest.extend<Fixtures>({
  pages: async ({ page }, use) => {
    await use(new PageFixtures(page));
    },
});