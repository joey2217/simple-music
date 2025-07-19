/*eslint-env node*/
import electron from "electron";
import { build, createLogger, createServer } from "vite";
import { spawn } from "node:child_process";
import { join } from "node:path";

const ROOT = process.cwd();

/** @type import('child_process').ChildProcess  */
let electronProcess;

function colorize(text, colorCode) {
  return `\x1b[${colorCode}m${text}\x1b[0m`;
}

const logger = createLogger("info", {
  prefix: "[main]",
});
const loggerInfo = logger.info;
const loggerError = logger.error;
logger.info = (msg, options) =>
  loggerInfo(`${colorize("[info]", 36)} ${msg}`, {
    timestamp: true,
    ...options,
  });
logger.error = (msg, options) =>
  loggerError(`${colorize("[error]", 91)}  ${msg}`, {
    timestamp: true,
    ...options,
  });

function startElectron() {
  logger.info("start electron");
  if (electronProcess != null) {
    // windows 上，不支持 signal 参数
    electronProcess.kill();
    // electronProcess = null
    if (process.platform === "darwin") {
      electronProcess = null;
    }
    // process.exit()
  }
  electronProcess = spawn(electron, [join(ROOT, "dist/main.mjs")]);
  electronProcess.stdout.on("data", (data) => {
    logger.info(data.toString());
  });
  electronProcess.stderr.on("data", (data) => {
    logger.error(data.toString().substring(0, 1000));
  });
  electronProcess.on("close", (code) => {
    logger.info(`child process exited with code ${code}`);
    if (code != null) {
      process.exit(code);
    }
  });
}

async function startRendererServer(configFile, port = 7000) {
  const viteDevServer = await createServer({
    configFile,
    mode: "development",
    server: {
      port,
    },
  });
  await viteDevServer.listen();
  viteDevServer.printUrls();
  return viteDevServer;
}

async function start() {
  await startRendererServer(join(ROOT, "vite.config.ts"));
  const preloadWatcher = await build({
    configFile: join(ROOT, "vite.config.preload.ts"),
    mode: "development",
    build: {
      sourcemap: true,
      minify: false,
      watch: {},
    },
  });
  logger.info("build preload");
  preloadWatcher.on("event", async function (event) {
    logger.info("preload event = ", JSON.stringify(event, null, 2));
    if (event.code === "END") {
      const watcher = await build({
        configFile: join(ROOT, "vite.config.main.ts"),
        mode: "development",
        build: {
          sourcemap: true,
          minify: false,
          watch: {},
        },
      });
      logger.info("build main");
      watcher.on("event", function (e) {
        logger.info(`main build event: ${e.code}`);
        if (e.code === "END") {
          startElectron();
        }
      });
    }
  });
}

start();
