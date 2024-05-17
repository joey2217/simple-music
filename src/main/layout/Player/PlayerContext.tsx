import React, {
  type PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useState,
} from 'react'
import { Howl } from 'howler'
import { fetchSongInfo } from '../../api/migu'
import {
  vol,
  mode,
  autoplay,
  initPlayer,
  shuffleIndexList,
  setVol,
} from '../../utils/player'
import { useRecentListStore } from '../../store/playlist'
import { usePlayerList, usePlayerListStore } from '@/main/store/player'

interface PlayerContextProps {
  paused: boolean
  duration: number
  time: number
  togglePaused: () => void
  seek: (t: number) => void
  setVolume: (v: number) => void
  setLoop: (loop: boolean) => void
}

const PlayerContext = React.createContext<PlayerContextProps>({
  paused: true,
  duration: 0,
  time: 0,
  togglePaused: () => {},
  seek: () => {},
  setVolume: () => {},
  setLoop: () => {},
})

export function usePlayer() {
  return React.useContext(PlayerContext)
}

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [paused, setPaused] = useState(true)
  const [duration, setDuration] = useState(0)
  const [time, setTime] = useState(0)

  const current = usePlayerListStore((s) => s.current)
  const playList = usePlayerListStore((s) => s.playList)

  const addRecent = useRecentListStore((s) => s.addRecent)
  const setCurrent = usePlayerListStore((s) => s.setCurrent)

  const { playNext } = usePlayerList()

  const howlerRef = useRef<Howl | null>(null)
  const timer = useRef(0)

  const togglePaused = useCallback(() => {
    const howler = howlerRef.current
    if (howler) {
      const playing = howler.playing()
      if (playing) {
        howler.fade(howler.volume(), 0, 500).once('fade', () => {
          howler.pause()
        })
      } else {
        howler.fade(0, vol / 100, 500).play()
      }
    }
  }, [])

  const seek = useCallback((t: number) => {
    const howler = howlerRef.current
    if (howler) {
      howler.seek(t)
      setTime(t)
    }
  }, [])

  const setVolume = useCallback((v: number) => {
    howlerRef.current?.volume(v / 100)
    setVol(v)
  }, [])

  const setLoop = useCallback((loop: boolean) => {
    howlerRef.current?.loop(loop)
  }, [])

  useEffect(() => {
    if (current === undefined && playList.length > 0) {
      setCurrent(
        mode === 'shuffle' ? playList[shuffleIndexList[0]] : playList[0]
      )
    }
  }, [current, playList, setCurrent])

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
          autoplay: autoplay,
          loop: mode === 'repeat',
          html5: true,
          volume: vol / 100,
        })
        howler.once('load', () => {
          setDuration(Math.ceil(howler.duration()))
          clearInterval(timer.current)
          initPlayer()
          setTime(0)
          if (autoplay) {
            timer.current = setInterval(() => {
              setTime(Math.ceil(howler.seek()))
            }, 1000) as unknown as number
          } else {
            timer.current = 0
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
    }

    return () => {
      howlerRef.current?.unload()
      clearInterval(timer.current)
    }
  }, [addRecent, current, playNext])

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

  return (
    <PlayerContext.Provider
      value={{
        time,
        paused,
        duration,
        setLoop,
        togglePaused,
        seek,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
