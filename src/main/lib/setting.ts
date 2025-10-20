import type { UpdateType } from "@/renderer";

const DOWNLOAD_DIR_KEY = "download_dir";
const UPDATE_TYPE_KEY = "download_dir";

class Setting {
  private _downloadDir = localStorage.getItem(DOWNLOAD_DIR_KEY) ?? "";
  private _updateType: UpdateType = (localStorage.getItem(UPDATE_TYPE_KEY) as UpdateType) ?? "auto";

  constructor() {
    this.initDownloadDir();
    this.initUpdate();
  }

  private initDownloadDir() {
    if (this._downloadDir === "") {
      window.mainAPI.getDownloadsPath().then((dir) => {
        localStorage.setItem(DOWNLOAD_DIR_KEY, dir);
        this._downloadDir = dir;
      });
    }
  }

  private initUpdate() {
    if (this._updateType === "auto") {
      window.mainAPI.checkUpdate(this._updateType);
    }
  }

  get downloadDir() {
    return this._downloadDir;
  }

  set downloadDir(dir: string) {
    localStorage.setItem(DOWNLOAD_DIR_KEY, dir);
    this._downloadDir = dir;
  }

  get updateType() {
    return this._updateType;
  }
  set updateType(type: UpdateType) {
    localStorage.setItem(UPDATE_TYPE_KEY, type);
    this._updateType = type;
  }
}

export const setting = new Setting();
