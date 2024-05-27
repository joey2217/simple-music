import React, { useEffect, useRef, useState } from 'react'
import { fetchSongLyric } from '../api/migu'
import type { LyricRow } from '../types/player'

interface Props {
  copyrightId: string
  time?: number
  scroll?: boolean
}

const SongLyric: React.FC<Props> = ({ copyrightId, time, scroll = false }) => {
  const [status, setStatus] = useState<'loading' | 'error' | 'ok'>('loading')

  const [lyric, setLyric] = useState<LyricRow[]>([])

  const [playIndex, setPlayIndex] = useState(-1)

  const [disabledAutoScroll, setDisabledAutoScroll] = useState(false)

  const timer = useRef<number>(0)

  const onDisabledAutoScroll = () => {
    if (scroll) {
      setDisabledAutoScroll(true)
      timer.current = window.setTimeout(() => {
        setDisabledAutoScroll(false)
      }, 2000)
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => {
    setStatus('loading')
    fetchSongLyric(copyrightId)
      .then((data) => {
        setLyric(data.lyric)
        setStatus('ok')
        setPlayIndex(0)
      })
      .catch(() => {
        setStatus('error')
      })
  }, [copyrightId])

  useEffect(() => {
    if (scroll && !disabledAutoScroll) {
      const lyricEl = document.querySelector(`#lyric-row-${playIndex}`)
      if (lyricEl) {
        lyricEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }
  }, [disabledAutoScroll, playIndex, scroll])

  useEffect(() => {
    const len = lyric.length
    if (time == null || len === 0) return
    const i = lyric.findIndex((row) => row.time && row.time > time)
    if (i === -1) {
      if (lyric[len - 1].words === '') {
        const last = lyric[len - 2]
        if (last.time && time - last.time > 5) {
          setPlayIndex(len - 1)
        } else {
          setPlayIndex(len - 2)
        }
      } else {
        setPlayIndex(len - 1)
      }
    } else {
      setPlayIndex(i - 1 >= 0 ? i - 1 : 0)
    }
  }, [lyric, time])

  if (status === 'loading') {
    return <div>加载中</div>
  }
  if (status === 'error') {
    return <div>获取歌词错误</div>
  }
  return (
    <div className="py-2" onScroll={onDisabledAutoScroll}>
      {lyric.map((row, index) => (
        <p
          key={index}
          id={`lyric-row-${index}`}
          className={`p-1 leading-7 ${
            index === playIndex ? 'text-primary text-lg' : ''
          }`}
          data-t={row.time}
        >
          {row.words || <br />}
        </p>
      ))}
    </div>
  )
}

export default SongLyric
