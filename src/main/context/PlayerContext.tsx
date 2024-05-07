import React, {
  useState,
  type PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { Howl } from 'howler'
import type { Music, PlayMode } from '../types/player'
import { fetchSongInfo } from '../api/migu'
import useLocalStorage from '../hooks/useLocalStorage'
import { setVol, vol, mode } from '../utils/player'
import { shuffle as shuffleFn } from '../utils'
import { useRecentListStore } from '../store/playlist'
import emitter from '../utils/emitter'

interface PlayerContextProps {
  current: Music | null
  paused: boolean
  duration: number
  playList: Music[]
  play: (song: Music) => void
  togglePaused: () => void
  seek: (t: number) => void
  addToPlayList: (m: Music | Music[], replace?: boolean) => void
  removeFromPlayerList: (m: Music) => void
  playNext: (dir: 'next' | 'prev') => void
  clearPlayList: () => void
  setVolume: (v: number) => void
  setShuffleIndexList: (m: PlayMode) => void
}

const PlayerContext = React.createContext<PlayerContextProps>({
  current: null,
  paused: true,
  duration: 0,
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
let index = 0

const LOCAL_INDEX = 'play-index'
function getLocalIndex() {
  const localData = localStorage.getItem(LOCAL_INDEX)
  if (localData) {
    index = Number(localData) || 0
  }
}
getLocalIndex()
function setLocalIndex(i: number) {
  index = i
  localStorage.setItem(LOCAL_INDEX, i.toString())
}

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [paused, setPaused] = useState(true)
  const [playList, setPlayList] = useLocalStorage<Music[]>('play-list', [])
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useLocalStorage<Music | null>('current', null)

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
    (m: Music | Music[], replace = false) => {
      if (init) {
        init = false
      }
      console.log(m, 'addToPlayList')
      if (Array.isArray(m)) {
        if (replace) {
          setPlayList(m)
          setLocalIndex(0)
          setCurrent(mode === 'shuffle' ? m[shuffleIndexList[0]] : m[0])
        } else {
          const items =
            playList.length > 0
              ? m.filter((item) =>
                  playList.some((c) => c.copyrightId !== item.copyrightId)
                )
              : m
          setPlayList((l) => l.concat(items))
          setCurrent((c) => {
            if (c === null) {
              return mode === 'shuffle' ? m[shuffleIndexList[0]] : m[0]
            }
            return c
          })
        }
      } else {
        const idx = playList.findIndex((s) => s.copyrightId === m.copyrightId)
        if (idx === -1) {
          setPlayList((l) => l.concat(m))
        }
        setCurrent((c) => {
          if (c === null) {
            setLocalIndex(index + 1)
            return m
          }
          return c
        })
      }
    },
    [playList, setCurrent, setPlayList]
  )

  const removeFromPlayerList = useCallback(
    (m: Music) => {
      const idx = playList.findIndex((s) => s.copyrightId === m.copyrightId)
      if (idx !== -1) {
        setPlayList((l) => l.toSpliced(idx, 1))
        setCurrent((c) => {
          if (c?.copyrightId === m.copyrightId) {
            const nextIndex = index + 1 > playList.length - 1 ? 0 : index + 1
            setLocalIndex(nextIndex)
            return mode === 'shuffle'
              ? playList[shuffleIndexList[nextIndex]]
              : playList[nextIndex]
          }
          return c
        })
      }
    },
    [playList, setCurrent, setPlayList]
  )

  const playNext = useCallback(
    (dir: 'next' | 'prev' = 'next') => {
      if (dir === 'next') {
        // setIndex((i) => (i + 1 > playList.length - 1 ? 0 : i + 1))
        if (mode === 'sequence') {
          const i = index + 1 > playList.length - 1 ? -1 : index + 1
          setLocalIndex(i)
        } else {
          const i = index + 1 > playList.length - 1 ? 0 : index + 1
          setLocalIndex(i)
        }
      } else {
        if (mode === 'sequence') {
          const i = index - 1 < 0 ? -1 : index - 1
          setLocalIndex(i)
        } else {
          const i = index - 1 < 0 ? playList.length - 1 : index - 1
          setLocalIndex(i)
        }
      }
      setCurrent(
        mode === 'shuffle' ? playList[shuffleIndexList[index]] : playList[index]
      )
    },
    [setCurrent, playList]
  )

  const play = useCallback(
    (song: Music) => {
      if (init) {
        init = false
      }
      setCurrent(song)
      const idx = playList.findIndex((s) => s.copyrightId === song.copyrightId)
      if (idx === -1) {
        setPlayList((l) => l.toSpliced(index + 1, 0, song))
        if (playList.length > 0) {
          setLocalIndex(index + 1)
        } else {
          setLocalIndex(0)
        }
      } else {
        setLocalIndex(idx)
      }
    },
    [playList, setCurrent, setPlayList]
  )

  const clearPlayList = useCallback(() => {
    setPlayList([])
    setCurrent(null)
    setLocalIndex(0)
  }, [setCurrent, setPlayList])

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
          clearInterval(timer.current)
          if (init) {
            init = false
          } else {
            timer.current = setInterval(() => {
              emitter.emit('time', Math.ceil(howler.seek()))
            }, 1000) as unknown as number
          }
        })
        howler.on('play', () => {
          setPaused(false)
          if (timer.current === 0) {
            timer.current = setInterval(() => {
              emitter.emit('time', Math.ceil(howler.seek()))
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
            emitter.emit('time', 0)
          }
        })
        howlerRef.current = howler
      })
    } else {
      setPaused(true)
      setDuration(0)
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
