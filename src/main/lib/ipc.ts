import { useEffect } from "react";
import { autoUpdate } from "./app";

export default function useIPC() {
  useEffect(() => {
    if (autoUpdate && autoUpdate !== "manual") {
      window.electronAPI.checkUpdate(autoUpdate);
    }
  }, []);
}
