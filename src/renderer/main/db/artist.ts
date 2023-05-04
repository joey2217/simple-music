import db from '.'
import type { Artist } from '../types/artist'

export function getArtistLikeList() {
  return db.artists.toArray()
}

export function insertArtistLike(a: Artist) {
  const artist = {
    ...a,
    timestamp: Date.now(),
  }
  return db.artists.put(artist)
}

export function deleteArtistLike(a: Artist) {
  return db.artists.delete(a.id)
}
