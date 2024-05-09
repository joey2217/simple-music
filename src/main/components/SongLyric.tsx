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
    if (time == null || lyric.length === 0 || lyric[0].time == null) return
    const i = lyric.findIndex((row) => row.time && row.time > time)
    if (i === -1) {
      const lastTime = lyric[lyric.length - 1].time
      if (lastTime != null && time > lastTime) {
        setPlayIndex(lyric.length - 1)
      } else {
        setPlayIndex(0)
      }
    } else {
      setPlayIndex(i - 1 >= 0 ? i - 1 : 0)
      // const indexTime = lyric[i].time
      // const prevIndexTime = lyric[i - 1].time
      // if (indexTime && prevIndexTime) {
      //   const diff = Math.abs(indexTime - time)
      //   const nextDiff = Math.abs(prevIndexTime - time)
      //   if (diff > nextDiff) {
      //     setPlayIndex(i - 1)
      //   } else {
      //     setPlayIndex(i)
      //   }
      // } else {
      //   setPlayIndex(0)
      // }
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
            index === playIndex ? 'text-primary' : ''
          }`}
        >
          {row.words || <br />}
        </p>
      ))}
    </div>
  )
}

export default SongLyric
