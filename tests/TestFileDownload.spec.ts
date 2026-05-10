import { test } from "../fixtures/baseTest.js";
import path from "path";
test.describe('Test File Download',{tag:"@downloadFile"}, async()=>{
  const downloadPath = path.resolve(__dirname, "../uploadDownloadFiles");
  test('Test File Download:TXT',{tag:"@downloadFileTxt"},async({ pages })=>{
    await pages.uploadDownloadPage.navigateToUploadDownloadPage();
    await pages.uploadDownloadPage.clickDownloadFilesLink();
    await pages.assert.verifyCurrentPageURLContains(/download-files/);
    await pages.uploadDownloadPage.enterTextToGenerateFile('This is the content of the TXT file.');
    await pages.uploadDownloadPage.clickGenerateFile('Text');
    await pages.assert.verifyElementVisible(pages.uploadDownloadPage.getDownloadLinkLocator('Text'));
    await pages.uploadDownloadPage.downloadGeneratedFile('Text', downloadPath,"sample.txt");
  });

    test('Test File Download:PDF',{tag:"@downloadFilePdf"},async({ pages })=>{
    await pages.uploadDownloadPage.navigateToUploadDownloadPage();
    await pages.uploadDownloadPage.clickDownloadFilesLink();
    await pages.assert.verifyCurrentPageURLContains(/download-files/);
    await pages.uploadDownloadPage.enterTextToGenerateFile('This is the content of the PDF file.');
    await pages.uploadDownloadPage.clickGenerateFile('PDF');
    await pages.assert.verifyElementVisible(pages.uploadDownloadPage.getDownloadLinkLocator('PDF'));
    await pages.uploadDownloadPage.downloadGeneratedFile('PDF', downloadPath,"sample.pdf");
  });

});