import fs from "fs";
export class FileManager {
  static async isFileExists(filePath: string) {
    return fs.existsSync(filePath);
  }

  static async deleteFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  static async renameFile(oldPath: string, newPath: string) {
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
    }
  }
}
