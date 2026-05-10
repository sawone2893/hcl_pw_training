import { test } from "../fixtures/baseTest.js";
import path from "path";
test.describe("Test Files Upload", { tag: "@FileUpload" }, async () => {
  const uploadPath = path.resolve(__dirname, "../uploadDownloadFiles");
  console.log(uploadPath);
  test(
    "Test Single File Upload",
    { tag: "@SingleFileUpload" },
    async ({ pages }) => {
      await pages.uploadDownloadPage.navigateToUploadDownloadPage();
      await pages.uploadDownloadPage.uploadSingleFile(uploadPath + "/TestFile1.txt");
      pages.assert.validatePartialText(
        await pages.uploadDownloadPage.getSingleFileUploadStatusText(),
        "TestFile1.txt, Size: 52 bytes, Type: text/plain",
      );
    },
  );

  test(
    "Test Multiple Files Upload",
    { tag: "@MultiFilesUpload" },
    async ({ pages }) => {
      await pages.uploadDownloadPage.navigateToUploadDownloadPage();
      await pages.uploadDownloadPage.uploadMultipleFiles([
        uploadPath + "/TestFile2.txt",
        uploadPath + "/TestFile3.txt",
      ]);
      pages.assert.validatePartialText(
        await pages.uploadDownloadPage.getMultipleFilesUploadStatusText(),
        "TestFile2.txt, Size: 52 bytes, Type: text/plain",
      );
      pages.assert.validatePartialText(
        await pages.uploadDownloadPage.getMultipleFilesUploadStatusText(),
        "TestFile3.txt, Size: 52 bytes, Type: text/plain",
      );
    },
  );
});
