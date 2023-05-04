import db from '.'
import type { Music } from '../types'

export function getMusicLikeList() {
  return db.musics.toArray()
}

export function insertMusicLike(m: Music) {
  const music = {
    ...m,
    timestamp: Date.now(),
  }
  return db.musics.put(music)
}

export function deleteMusicLike(m: Music) {
  return db.musics.delete(m.rid)
}
