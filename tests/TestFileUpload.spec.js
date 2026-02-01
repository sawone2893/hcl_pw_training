import { test } from "../fixtures/PageFixtures";
import path from "path";
test.describe("Test Files Upload", { tag: "@FileUpload" }, async () => {
  const uploadPath = path.resolve(__dirname, "../uploadDownloadFiles");
  console.log(uploadPath);
  test(
    "Test Single File Upload",
    { tag: "@SingleFileUpload" },
    async ({ uploadDownloadPage, assert }) => {
      await uploadDownloadPage.navigateToUploadDownloadPage();
      await uploadDownloadPage.uploadSingleFile(uploadPath + "/TestFile1.txt");
      assert.validatePartialText(
        await uploadDownloadPage.getSingleFileUploadStatusText(),
        "TestFile1.txt, Size: 52 bytes, Type: text/plain",
      );
    },
  );

  test(
    "Test Multiple Files Upload",
    { tag: "@MultiFilesUpload" },
    async ({ uploadDownloadPage, assert }) => {
      await uploadDownloadPage.navigateToUploadDownloadPage();
      await uploadDownloadPage.uploadMultipleFiles([
        uploadPath + "/TestFile2.txt",
        uploadPath + "/TestFile3.txt",
      ]);
      assert.validatePartialText(
        await uploadDownloadPage.getMultipleFilesUploadStatusText(),
        "TestFile2.txt, Size: 52 bytes, Type: text/plain",
      );
      assert.validatePartialText(
        await uploadDownloadPage.getMultipleFilesUploadStatusText(),
        "TestFile3.txt, Size: 52 bytes, Type: text/plain",
      );
    },
  );
});
