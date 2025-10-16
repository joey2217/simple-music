import { app, ipcMain, nativeTheme, shell, dialog } from "electron";
import { mainWindow } from "./windows/main";
import { checkForUpdates } from "./updater";
import type { DownloadInfo, Theme, UpdateType } from "./types";
import { download } from "./download";
import { setMenuPaused, setMenuTitle } from "./menu";

app.whenReady().then(() => {
  ipcMain.handle("dev:toggle_devtools", (event) => {
    event.sender.toggleDevTools();
  });

  ipcMain.handle("app:check_for_update", (_e, type: UpdateType = "auto") => {
    return checkForUpdates(type).then((res) => (res ? res.updateInfo.version : ""));
  });

  ipcMain.handle("app:set_theme", (e, theme: Theme) => {
    nativeTheme.themeSource = theme;
    if (process.platform === "win32") {
      mainWindow.setTitleBarOverlay();
    }
  });

  ipcMain.handle("app:open_external", (_e, url: string) => {
    return shell.openExternal(url);
  });

  ipcMain.handle("download:files", (e, files: DownloadInfo[]) => {
    download(files);
  });

  ipcMain.handle("download:get_path", () => {
    return app.getPath("downloads");
  });

  ipcMain.handle("app:show_item_in_folder", (e, fullPath: string) => {
    shell.showItemInFolder(fullPath);
  });

  ipcMain.handle("app:open_path", (e, fullPath: string) => {
    return shell.openPath(fullPath);
  });

  ipcMain.handle("app:open_dialog", (e, options: Electron.OpenDialogOptions) => {
    return dialog.showOpenDialog(options);
  });

  ipcMain.handle("music:paused", (_e, paused: boolean) => {
    // console.log('music:paused', paused)
    setMenuPaused(paused);
    mainWindow.setThumbarButtonsPaused(paused);
  });

  ipcMain.handle("app:title", (_e, title?: string) => {
    // console.log('app:title', title, Boolean(title))
    setMenuTitle(title);
    mainWindow.setThumbarButtonsEnabled(Boolean(title));
  });
});
