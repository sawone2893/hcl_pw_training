const fs = require("fs");
export class FileManager {
  static async isFileExists(filePath) {
    return fs.existsSync(filePath);
  }

  static async deleteFile(filePath) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  static async renameFile(oldPath, newPath) {
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
    }
  }
}
