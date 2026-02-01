import {test} from '../fixtures/PageFixtures';
import path from "path";
test.describe('Test File Download',{tag:"@downloadFile"}, async()=>{
  const downloadPath = path.resolve(__dirname, "../uploadDownloadFiles");
  test('Test File Download:TXT',{tag:"@downloadFileTxt"},async({ uploadDownloadPage, assert })=>{
    await uploadDownloadPage.navigateToUploadDownloadPage();
    await uploadDownloadPage.clickDownloadFilesLink();
    await assert.verifyCurrentPageURLContains(/download-files/);
    await uploadDownloadPage.enterTextToGenerateFile('This is the content of the TXT file.');
    await uploadDownloadPage.clickGenerateFile('Text');
    await assert.verifyElementVisible(uploadDownloadPage.getDownloadLinkLocator('Text'));
    await uploadDownloadPage.downloadGeneratedFile('Text', downloadPath,"sample.txt");
  });

    test('Test File Download:PDF',{tag:"@downloadFilePdf"},async({ uploadDownloadPage, assert })=>{
    await uploadDownloadPage.navigateToUploadDownloadPage();
    await uploadDownloadPage.clickDownloadFilesLink();
    await assert.verifyCurrentPageURLContains(/download-files/);
    await uploadDownloadPage.enterTextToGenerateFile('This is the content of the PDF file.');
    await uploadDownloadPage.clickGenerateFile('PDF');
    await assert.verifyElementVisible(uploadDownloadPage.getDownloadLinkLocator('PDF'));
    await uploadDownloadPage.downloadGeneratedFile('PDF', downloadPath,"sample.pdf");
  });

});