/* eslint-disable @typescript-eslint/no-var-requires */
/*eslint-env node*/
const { version } = require('./package.json')
const nameEN = 'SimpleMusic'

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  productName: '轻音乐',
  appId: 'com.joey.music',
  artifactName: `${nameEN}-\${version}-\${os}-\${arch}.\${ext}`,
  directories: {
    output: 'release',
    buildResources: 'resources',
  },
  files: ['dist'],
  win: {
    icon: 'resources/icon.ico',
    target: 'nsis',
  },
  protocols: {
    name: 'simple-music',
    schemes: ['simple-music'],
  },
  nsis: {
    oneClick: false,
    language: '2052',
    perMachine: false,
    allowToChangeInstallationDirectory: true,
  },
  mac: {
    icon: 'resources/icon.icns',
    target: 'default',
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
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
  },
  releaseInfo: {
    releaseName: `v${version}`,
    releaseNotes: '1. 修复已知问题\n2. 优化用户体验\n',
    releaseNotesFile: 'resources/release-notes.md',
    releaseDate: new Date().toLocaleString(),
  },
}
