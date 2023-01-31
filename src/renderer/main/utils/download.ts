import type { DownloadInfo } from "../../renderer";

export function download(downloadItems: DownloadInfo[]) {
  window.electronAPI.download(downloadItems)
}
