import { BasePage } from "./BasePage";
import { FileManager } from "../utils/FileManager";
export class UploadDownloadPage extends BasePage {
  constructor(page) {
    super(page);
  }
  pageLocators = {};
  async navigateToUploadDownloadPage() {
    await this.actions.navigateTo("/");
  }
  async uploadSingleFile(file) {
    await this.actions.uploadFilesByInputTypeFile(
      this.actions.getLocator("css", "#singleFileInput"),
      file,
    );
    await this.actions.clickElement(
      this.actions.getLocator("role", "button,Upload Single File"),
    );
  }
  async uploadMultipleFiles(files) {
    await this.actions.uploadFilesByInputTypeFile(
      this.actions.getLocator("css", "#multipleFilesInput"),
      files,
    );
    await this.actions.clickElement(
      this.actions.getLocator("role", "button,Upload Multiple Files"),
    );
  }

  async getSingleFileUploadStatusText() {
    return await this.actions.getText(
      this.actions.getLocator("css", "#singleFileStatus"),
    );
  }
  async getMultipleFilesUploadStatusText() {
    return await this.actions.getText(
      this.actions.getLocator("css", "#multipleFilesStatus"),
    );
  }

  async clickDownloadFilesLink() {
    await this.actions.clickElement(
      this.actions.getLocator("text", "Download Files"),
    );
  }
  async enterTextToGenerateFile(fileText) {
    await this.actions.typeText(
      this.actions.getLocator("label", "Enter Text:"),
      fileText,
    );
  }

  async clickGenerateFile(fileType) {
    await this.actions.clickElement(
      this.actions.getLocator(
        "text",
        `Generate and Download ${fileType} File`,
      ),
    );
  }

  getDownloadLinkLocator(fileType) {
    return this.actions.getLocator("role", `link,Download ${fileType} File`);
  }

  async downloadGeneratedFile(fileType, locationToSave, fileName) {
    const newFileName = `${locationToSave}/${fileName}`;
    FileManager.deleteFile(newFileName);
    const downloadedFilePath = await this.actions.downloadFile(
      this.getDownloadLinkLocator(fileType),
      locationToSave,
    );
    FileManager.renameFile(downloadedFilePath, newFileName);
  }
}
