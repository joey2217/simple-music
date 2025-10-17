import { useEffect } from "react";
import { autoUpdate } from "./app";
import { useDownloadStore } from "../store/download";
import { toast } from "sonner";

export default function useIPC() {
  const updateDownloadItem = useDownloadStore((s) => s.update);

  useEffect(() => {
    if (autoUpdate && autoUpdate !== "manual") {
      window.mainAPI.checkUpdate(autoUpdate);
    }
  }, []);

  useEffect(() => {
    const removeListener = window.mainListener.onUpdateDownload((info) => {
      updateDownloadItem(info);
      if (info.status === "completed") {
        toast.success("下载完成", {
          description: info.fileName,
          action: {
            label: "查看",
            onClick: () => window.mainAPI.showItemInFolder(info.downloadPath),
          },
        });
      }
    });
    return removeListener;
  }, [updateDownloadItem]);
}
