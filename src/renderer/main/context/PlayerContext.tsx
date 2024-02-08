import React, {
  useState,
  type PropsWithChildren,
  useCallback,
  useRef,
} from 'react'
import { Howl } from 'howler'
import type { SongItem } from '../types/migu'
import { fetchSongInfo } from '../api/migu'

interface PlayerContextProps {
  play: (song: SongItem) => void
}

const PlayerContext = React.createContext<PlayerContextProps>({
  play: () => {},
})

export function usePlayer() {
  return React.useContext(PlayerContext)
}

// let howler: Howl | null

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [current, setCurrent] = useState()
  const [index, setIndex] = useState(0)
  const [playerList, setPlayerList] = useState<SongItem[]>([])

  const howlerRef = useRef<Howl | null>(null)

  const play = useCallback((song: SongItem) => {
    fetchSongInfo(song.copyrightId).then((data) => {
      if (howlerRef.current) {
        howlerRef.current.stop()
      }
      const howler = new Howl({
        src: data.playUrl,
      })
      howler.once('load', howler.play)
      howlerRef.current = howler
    })
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        play,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
