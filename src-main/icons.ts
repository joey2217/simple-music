import { nativeImage } from 'electron'
import { join } from 'node:path'
import { ROOT } from './constant'
import play from './assets/FluentPlay48Filled.png'
import winIconImg from './assets/icon32.png'
import musicImg from './assets/music.png'
import appleIconImg from './assets/appleIcon.png'
import nextImg from './assets/FluentNext48Filled.png'
import previousImg from './assets/FluentPrevious48Filled.png'
import FluentPause48Filled from './assets/FluentPause48Filled.png'
import logoutImg from './assets/logout.png'
import downloadImg from './assets/download.png'
import iconImg from './assets/icon.png'

/**
 * @see https://cn.vitejs.dev/config/build-options.html#build-assetsinlinelimit
 * 小于4kB 的导入或引用资源将内联为 base64 编码，使用createFromDataURL
 */

export const winIcon = nativeImage.createFromDataURL(winIconImg)

export const appleIcon = nativeImage.createFromDataURL(appleIconImg) // 16 *16

export const icon = nativeImage.createFromPath(join(ROOT, iconImg))

export const appIcon = process.platform === 'darwin' ? appleIcon : winIcon

export const playIcon = nativeImage.createFromDataURL(play)

export const nextIcon = nativeImage.createFromDataURL(nextImg)

export const prevIcon = nativeImage.createFromDataURL(previousImg)

export const pauseIcon = nativeImage.createFromDataURL(FluentPause48Filled)

export const musicIcon = nativeImage.createFromDataURL(musicImg)

export const logoutIcon = nativeImage.createFromDataURL(logoutImg)

export const downloadIcon = nativeImage.createFromDataURL(downloadImg)
