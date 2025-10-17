const DOWNLOAD_DIR_KEY = "download_dir";

class Setting {
  private _downloadDir = localStorage.getItem(DOWNLOAD_DIR_KEY) ?? "";

  constructor() {
    this.initDownloadDir();
  }

  private initDownloadDir() {
    if (this._downloadDir === "") {
      window.mainAPI.getDownloadsPath().then((dir) => {
        localStorage.setItem(DOWNLOAD_DIR_KEY, dir);
        this._downloadDir = dir;
      });
    }
  }

  get downloadDir() {
    return this._downloadDir;
  }

  set downloadDir(dir: string) {
    localStorage.setItem(DOWNLOAD_DIR_KEY, dir);
    this._downloadDir = dir;
  }
}

export const setting = new Setting();
