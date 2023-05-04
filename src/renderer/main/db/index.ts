import Dexie, { Table } from 'dexie'
import type { Music } from '../types'
import type { Artist } from '../types/artist'

class Database extends Dexie {
  musics!: Table<Music>
  playlist!: Table<Music>
  artists!: Table<Artist>

  constructor() {
    super('simple-music')
    this.version(2).stores({
      musics: 'rid',
      playlist: 'rid',
      artists: 'id',
    })
  }
}

const db = new Database()

export default db
