const { spawn } = require("child_process");
const { build, createLogger, createServer } = require("vite");
const electron = require("electron");
const path = require("path");

const ROOT = path.resolve(__dirname, "../");

/** @type import('child_process').ChildProcess  */
let electronProcess;

const logger = createLogger("info", {
  prefix: "[main]",
});

const defaultLogOptions = {
  timestamp: true,
};

async function start() {
  await startRendererServer(path.join(ROOT, "src/renderer/vite.config.ts"));
  const watcher = await build({
    configFile: path.join(ROOT, "src/main/vite.config.ts"),
    mode: "development",
    build: {
      watch: {},
    },
  });
  watcher.on("event", function (e) {
    logger.info(`build ${e.code}`, defaultLogOptions);
    if (e.code === "END") {
      startElectron();
    }
  });
}

function startElectron() {
  logger.info("start electron", defaultLogOptions);
  if (electronProcess != null) {
    // windows 上，不支持 signal 参数
    electronProcess.kill();
    // electronProcess = null
    // process.exit()
  }
  electronProcess = spawn(electron, [path.join(ROOT, "dist/main.js")]);
  // electronProcess.stdout.on('data', (data) => {
  //   logger.info(data.toString(), defaultLogOptions)
  // })
  electronProcess.stderr.on("data", (data) => {
    logger.error(data.toString(), defaultLogOptions);
  });
  electronProcess.on("close", (code) => {
    logger.info(`child process exited with code ${code}`, defaultLogOptions);
    if (code != null) {
      process.exit(code)
    }
  });
}

async function startRendererServer(configFile, port = 5174) {
  const viteDevServer = await createServer({
    configFile,
    mode: "development",
    server: {
      port,
    },
  });
  await viteDevServer.listen();
  logger.info(`renderer server start at: http://localhost:${port}`, {
    ...defaultLogOptions,
    prefix: ["renderer"],
  });
  return viteDevServer;
}

start();
