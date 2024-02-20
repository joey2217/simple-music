import React, {
  useState,
  type PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react'
import { Howl } from 'howler'
import type { Music } from '../types/player'
import { fetchSongInfo } from '../api/migu'
import type { DownloadInfo } from '../../../renderer'
import useLocalStorage from '../hooks/useLocalStorage'

interface PlayerContextProps {
  current?: Music
  paused: boolean
  duration: number
  time: number
  playList: Music[]
  play: (song: Music) => void
  download: (song: Music) => void
  togglePaused: () => void
  seek: (t: number) => void
  addToPlayerList: (m: Music | Music[]) => void
  removeFromPlayerList: (m: Music) => void
}

const PlayerContext = React.createContext<PlayerContextProps>({
  current: undefined,
  paused: true,
  duration: 0,
  time: 0,
  playList: [],
  play: () => {},
  download: () => {},
  togglePaused: () => {},
  seek: () => {},
  addToPlayerList: () => {},
  removeFromPlayerList: () => {},
})

export function usePlayer() {
  return React.useContext(PlayerContext)
}

// let howler: Howl | null

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(true)
  const [playList, setPlayList] = useState<Music[]>([])
  const [duration, setDuration] = useState(0)
  const [time, setTime] = useState(0)

  const [downloadDir, setDownloadDir] = useLocalStorage('download_dir', '')

  const howlerRef = useRef<Howl | null>(null)
  const timer = useRef(0)

  const togglePaused = useCallback(() => {
    const howler = howlerRef.current
    if (howler) {
      const playing = howler.playing()
      if (playing) {
        howler.fade(howler.volume(), 0, 500)
        howler.pause()
      } else {
        howler.play()
      }
    }
  }, [])

  const seek = useCallback((t: number) => {
    howlerRef.current?.seek(t)
  }, [])

  const addToPlayerList = useCallback(
    (m: Music | Music[]) => {
      if (Array.isArray(m)) {
        // const items = m.filter((item) =>
        //   playList.some((c) => c.copyrightId !== item.copyrightId)
        // )
        // setPlayList((l) => l.concat(items))
        setPlayList(m)
        setIndex(0)
      } else {
        const idx = playList.findIndex((s) => s.copyrightId === m.copyrightId)
        if (idx === -1) {
          setPlayList((l) => l.concat(m))
        }
      }
    },
    [playList]
  )

  const removeFromPlayerList = useCallback(
    (m: Music) => {
      const idx = playList.findIndex((s) => s.copyrightId === m.copyrightId)
      if (idx !== -1) {
        setPlayList((l) => l.toSpliced(idx, 1))
        if (idx < index) {
          if (index > 0) {
            setIndex(index - 1)
          }
        }
      }
    },
    [index, playList]
  )

  const current = useMemo(() => playList[index], [index, playList])
  const playListLength = useMemo(() => playList.length, [playList])

  const playNext = useCallback(
    (dir: 'next' | 'prev' = 'next') => {
      if (dir === 'next') {
        setIndex((i) =>
          i + 1 > playListLength - 1 ? playListLength - 1 : i + 1
        )
      } else {
        setIndex((i) => (i - 1 < 0 ? 0 : i - 1))
      }
    },
    [playListLength]
  )

  const play = useCallback(
    (song: Music) => {
      const idx = playList.findIndex((s) => s.copyrightId === song.copyrightId)
      if (idx === -1) {
        setPlayList((l) => l.toSpliced(index + 1, 0, song))
        if (playList.length > 0) {
          setIndex((i) => i + 1)
        } else {
          setIndex(0)
        }
      } else {
        setIndex(idx)
      }
    },
    [index, playList]
  )

  const download = useCallback(
    (m: Music) => {
      fetchSongInfo(m.copyrightId).then((data) => {
        const url = new URL(data.playUrl)
        const ext = url.pathname.split('.').pop()
        const item: DownloadInfo = {
          rid: m.copyrightId,
          url: data.playUrl,
          fileName: m.title,
          downloadPath: `${downloadDir}/${m.title}.${ext}`,
          title: m.title,
          artist: m.artist,
          album: m.album,
          cover: m.pic,
        }
        window.electronAPI.download([item])
      })
    },
    [downloadDir]
  )

  useEffect(() => {
    console.log(current, index)
    console.table(playList)
  }, [current, index, playList])

  useEffect(() => {
    if (current?.copyrightId) {
      fetchSongInfo(current.copyrightId).then((data) => {
        howlerRef.current?.stop()
        howlerRef.current?.unload()
        current.url = data.playUrl
        const howler = new Howl({
          src: data.playUrl,
          autoplay: true,
          html5: true,
        })
        howler.once('load', () => {
          setDuration(Math.ceil(howler.duration()))
          setTime(0)
          clearInterval(timer.current)
          timer.current = setInterval(() => {
            setTime(Math.ceil(howler.seek()))
          }, 1000) as unknown as number
        })
        howler.on('play', () => setPaused(false))
        howler.on('pause', () => setPaused(true))
        howler.once('end', () => playNext())
        howlerRef.current = howler
      })
    } else {
      setPaused(true)
      setDuration(0)
      setTime(0)
    }

    return () => {
      howlerRef.current?.unload()
      clearInterval(timer.current)
    }
  }, [current, playNext])

  useEffect(() => {
    if (downloadDir === '') {
      window.electronAPI.getDownloadsPath().then((dir) => {
        setDownloadDir(dir)
      })
    }
  }, [downloadDir, setDownloadDir])

  return (
    <PlayerContext.Provider
      value={{
        current,
        paused,
        duration,
        time,
        playList,
        play,
        download,
        togglePaused,
        seek,
        addToPlayerList,
        removeFromPlayerList,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
