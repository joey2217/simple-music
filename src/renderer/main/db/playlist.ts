import db from '.'
import type { Music } from '../types'

export let init = false

export function setInit(bool:boolean = false) {
  init = bool
}

export function getPlaylist() {
  return db.playlist.toArray().then((list) => {
    if (list.length > 0) {
      init = true
    }
    return list
  })
}

export function bulkAddPlaylist(items: Music[]) {
  return db.playlist.bulkPut(items)
}

export function deletePlaylist(m: Music) {
  return db.playlist.delete(m.rid)
}

export function clearDBPlaylist() {
  return db.playlist.clear()
}
