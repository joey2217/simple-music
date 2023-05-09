/* eslint-disable no-template-curly-in-string */
const nameEN = 'SimpleMusic'

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  productName: '轻音乐',
  appId: 'com.joey.music',
  artifactName: nameEN + '-${version}-${os}-${arch}.${ext}',
  directories: {
    output: 'release',
    buildResources: 'resources',
  },
  files: ['dist'],
  win: {
    icon: 'resources/icon.ico',
    target: 'nsis',
  },
  nsis: {
    oneClick: false,
    language: '2052',
    perMachine: true,
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
}
