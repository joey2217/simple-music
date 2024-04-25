import React, {
  useState,
  type PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react'
import { Howl } from 'howler'
import type { Music, PlayMode } from '../types/player'
import { fetchSongInfo } from '../api/migu'
import useLocalStorage from '../hooks/useLocalStorage'
import { setVol, vol, mode } from '../utils/player'
import { shuffle as shuffleFn } from '../utils'
import { useRecentListStore } from '../store/playlist'

interface PlayerContextProps {
  current?: Music
  paused: boolean
  duration: number
  time: number
  playList: Music[]
  play: (song: Music) => void
  togglePaused: () => void
  seek: (t: number) => void
  addToPlayList: (m: Music | Music[]) => void
  removeFromPlayerList: (m: Music) => void
  playNext: (dir: 'next' | 'prev') => void
  clearPlayList: () => void
  setVolume: (v: number) => void
  setShuffleIndexList: (m: PlayMode) => void
}

const PlayerContext = React.createContext<PlayerContextProps>({
  current: undefined,
  paused: true,
  duration: 0,
  time: 0,
  playList: [],
  play: () => {},
  togglePaused: () => {},
  seek: () => {},
  addToPlayList: () => {},
  removeFromPlayerList: () => {},
  playNext: () => {},
  clearPlayList: () => {},
  setVolume: () => {},
  setShuffleIndexList: () => {},
})

export function usePlayer() {
  return React.useContext(PlayerContext)
}

let init = true

let shuffleIndexList: number[] = []

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [index, setIndex] = useLocalStorage('play-index', 0)
  const [paused, setPaused] = useState(true)
  const [playList, setPlayList] = useLocalStorage<Music[]>('play-list', [])
  const [duration, setDuration] = useState(0)

  const [time, setTime] = useState(0)

  const addRecent = useRecentListStore((s) => s.addRecent)

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

  const addToPlayList = useCallback(
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
    [playList, setIndex, setPlayList]
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
    [index, playList, setIndex, setPlayList]
  )

  const current = useMemo(
    () =>
      mode === 'shuffle' ? playList[shuffleIndexList[index]] : playList[index],
    [index, playList]
  )

  const playNext = useCallback(
    (dir: 'next' | 'prev' = 'next') => {
      if (dir === 'next') {
        // setIndex((i) => (i + 1 > playList.length - 1 ? 0 : i + 1))
        setIndex((i) => {
          if (mode === 'sequence') {
            return i + 1 > playList.length - 1 ? -1 : i + 1
          } else {
            return i + 1 > playList.length - 1 ? 0 : i + 1
          }
        })
      } else {
        setIndex((i) => {
          if (mode === 'sequence') {
            return i - 1 < 0 ? -1 : i - 1
          } else {
            return i - 1 < 0 ? playList.length - 1 : i - 1
          }
        })
      }
    },
    [playList.length, setIndex]
  )

  const play = useCallback(
    (song: Music) => {
      if (init) {
        init = false
      }
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
    [index, playList, setIndex, setPlayList]
  )

  const clearPlayList = useCallback(() => setPlayList([]), [setPlayList])

  const setVolume = useCallback((v: number) => {
    howlerRef.current?.volume(v / 100)
    setVol(v)
  }, [])

  const setShuffleIndexList = useCallback(
    (m: PlayMode) => {
      if (m === 'shuffle') {
        shuffleIndexList = shuffleFn(
          Array.from({ length: playList.length }, (_item, i) => i)
        )
      } else {
        shuffleIndexList = []
      }
    },
    [playList.length]
  )

  useEffect(() => {
    setShuffleIndexList(mode)
  }, [playList, setShuffleIndexList])

  useEffect(() => {
    if (current) {
      const title = `${current.title}-${current.artist}`
      window.electronAPI.setMusicPaused(paused)
      window.electronAPI.setAppTitle(title)
      document.title = title
    } else {
      window.electronAPI.setAppTitle()
      document.title = '轻·音乐'
    }
  }, [paused, current])

  useEffect(() => {
    const removeListener = window.messageAPI.onMusicControl((type) => {
      switch (type) {
        case 'next':
        case 'prev':
          playNext(type)
          break
        case 'pause':
        case 'play':
          togglePaused()
          break
        default:
          break
      }
    })

    return removeListener
  }, [playNext, togglePaused])

  useEffect(() => {
    if (current?.copyrightId) {
      fetchSongInfo(current.copyrightId).then((data) => {
        howlerRef.current?.stop()
        howlerRef.current?.unload()
        current.url = data.playUrl
        addRecent(current)
        const howler = new Howl({
          src: data.playUrl,
          autoplay: !init,
          loop: mode === 'repeat',
          html5: true,
          volume: vol / 100,
        })
        howler.once('load', () => {
          setDuration(Math.ceil(howler.duration()))
          setTime(0)
          clearInterval(timer.current)
          if (init) {
            init = false
          } else {
            timer.current = setInterval(() => {
              setTime(Math.ceil(howler.seek()))
            }, 1000) as unknown as number
          }
        })
        howler.on('play', () => {
          setPaused(false)
          if (timer.current === 0) {
            timer.current = setInterval(() => {
              setTime(Math.ceil(howler.seek()))
            }, 1000) as unknown as number
          }
        })
        howler.on('pause', () => {
          setPaused(true)
          clearInterval(timer.current)
          timer.current = 0
        })
        howler.once('end', () => {
          // TODO repeat end
          console.log('end', mode)
          if (mode !== 'repeat') {
            clearInterval(timer.current)
            playNext()
          } else {
            setTime(0)
          }
        })
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
  }, [current, playNext, addRecent])

  return (
    <PlayerContext.Provider
      value={{
        current,
        paused,
        duration,
        time,
        playList,
        setShuffleIndexList,
        play,
        togglePaused,
        seek,
        addToPlayList,
        removeFromPlayerList,
        playNext,
        clearPlayList,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
