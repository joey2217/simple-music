import { BrowserWindow, app } from "electron";
import log from "electron-log/main";
import type { LogFile } from "electron-log";
import path from "node:path";
import fsp from "node:fs/promises";
import { loadDevTools } from "./dev";
import { mainWindow } from "./windows/main";
import "./ipc";
import "./proxy";
import "./menu";
import "./protocol";

log.initialize();

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    // 当运行第二个实例时,将会聚焦到Window这个窗口
    mainWindow.focus();
    // windows 命令行是一个字符串数组，其中最后一个元素是深度链接的URL。
    // dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop()}`
  });
  app.whenReady().then(() => {
    mainWindow.create();
  });

  app.on("open-url", (_event, url) => {
    log.info(`You arrived from: ${url}`);
  });
}

if (import.meta.env.DEV) {
  Object.assign(console, log.functions);
  loadDevTools();
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow.create();
  } else {
    mainWindow.focus();
  }
});

app.on("before-quit", mainWindow.beforeQuit);

// mac 处理协议 在本例中，我们选择显示一个错误提示对话框。
// app.on('open-url', (event, url) => {
//   dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
// })

// 日志文件设置
if (import.meta.env.PROD) {
  log.transports.file.archiveLogFn = (oldLogFile: LogFile) => {
    const file = oldLogFile.toString();
    const info = path.parse(file);
    fsp
      .rename(file, path.join(info.dir, info.name + new Date().toLocaleString() + info.ext))
      .then(() => {
        log.info(`Log file archived: ${file}`);
      })
      .catch((err) => {
        log.error(err);
      });
  };
  // log.transports.file.resolvePathFn = () =>
  //   path.join(app.getAppPath(), 'logs/app.log')
}
