import db from '.'
import type { Music } from '../types'

export function getPlaylist() {
  return db.playlist.toArray()
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
