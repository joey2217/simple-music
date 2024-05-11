import type { UpdateType } from '../types'

const LOCAL_AUTO_UPDATE = 'auto_update'

export let autoUpdate: UpdateType = 'auto'

function getLocalAutoUpdate() {
  const localAutoUpdate = localStorage.getItem(LOCAL_AUTO_UPDATE)
  if (localAutoUpdate) {
    autoUpdate = localAutoUpdate as UpdateType
  }
}
getLocalAutoUpdate()

export function setLocalAutoUpdate(value: UpdateType) {
  // 设置本地存储
  localStorage.setItem(LOCAL_AUTO_UPDATE, value)
  // 设置全局变量
  autoUpdate = value
  window.electronAPI.checkUpdate(value)
}
