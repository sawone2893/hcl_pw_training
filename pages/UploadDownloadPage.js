import { BasePage } from "./BasePage";

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

  async generateFile(fileText, fileType) {
    await this.actions.typeText(
      this.actions.getLocator("label", "Enter Text:"),
      fileText,
    );
    await this.actions.clickElement(
      this.actions.getLocator(
        "role",
        `button,Generate and Download ${fileType} File`,
      ),
    );
  }

  async downloadGenerateFile(fileType, locationToSave) {
    await this.actions.downloadFile(
      this.actions.getLocator("text", `Download ${fileType} File`),
      locationToSave,
    );
  }
}
