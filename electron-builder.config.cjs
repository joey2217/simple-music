/*eslint-env node*/
const { version, author } = require("./package.json");
const nameEN = "SimpleMusic";

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  productName: "轻音乐",
  appId: "com.joey.music",
  artifactName: `${nameEN}-\${version}-\${os}-\${arch}.\${ext}`,
  directories: {
    output: `release/${version}`,
    buildResources: "build",
  },
  executableName: nameEN,
  files: ["dist", "!node_modules"],
  electronLanguages: ["zh-CN", "en-US"],
  win: {
    icon: "build/icon.ico",
    target: "nsis",
    signtoolOptions: {
      certificateFile: "build/SimpleMusic.pfx",
      // https://github.com/electron-userland/electron-builder/issues/1187#issuecomment-278972073
      publisherName: "SimpleMusic",
    },
  },
  protocols: {
    name: "simple-music",
    schemes: ["simple-music"],
  },
  nsis: {
    oneClick: true,
    installerLanguages: ["zh_CN", "en_US"],
    license: "build/license.html",
  },
  mac: {
    icon: "build/icon.icns",
    target: "default",
  },
  dmg: {
    window: {
      width: 540,
      height: 380,
    },
    contents: [
      {
        x: 410,
        y: 150,
        type: "link",
        path: "/Applications",
      },
      {
        x: 130,
        y: 150,
        type: "file",
      },
    ],
  },
  releaseInfo: {
    releaseName: `v${version}`,
    releaseNotes: "1. 修复已知问题\n2. 优化用户体验\n",
    releaseDate: new Date().toLocaleString("zh-CN"),
  },
  publish: {
    provider: "generic",
    url: "https://api.jjdd.site/app/music/latest",
  },
};
