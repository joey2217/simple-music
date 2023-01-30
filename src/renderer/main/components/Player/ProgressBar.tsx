import React, { memo, useCallback, useEffect, useState } from 'react'
import { Slider } from 'antd'
import { useRecoilValue } from 'recoil'
import { currentPlayState } from '../../store/atom'
import emitter from '../../utils/events'

let timer: string | number | NodeJS.Timeout | undefined

const format = (s: number) => {
  const minutes = Math.floor(s / 60)
  const seconds = s - minutes * 60
  return `${minutes.toString().padStart(2, '0')}︰${seconds
    .toString()
    .padStart(2, '0')}`
}

const ProgressBar: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(100)

  const currentPlay = useRecoilValue(currentPlayState)

  const start = useCallback(() => {
    clearInterval(timer)
    timer = setInterval(() => {
      setCurrent((d) => d + 1)
    }, 1000)
  }, [])

  const onPause = useCallback(() => {
    clearInterval(timer)
  }, [])

  const onChange = useCallback((val: number) => {
    setCurrent(val)
    emitter.emit('seek', val)
  }, [])

  useEffect(() => {
    emitter.on('pause', onPause)
    emitter.on('play', start)
    return () => {
      emitter.off('pause', onPause)
      emitter.off('play', start)
    }
  }, [onPause, start])

  useEffect(() => {
    if (currentPlay) {
      const { songTimeMinutes } = currentPlay
      const [m, s] = songTimeMinutes.split(':')
      const minutes = Number(m) || 0
      const seconds = Number(s) || 0
      const t = minutes * 60 + seconds
      setCurrent(0)
      setTotal(t)
    }
    return () => {
      clearInterval(timer)
    }
  }, [currentPlay])

  return (
    <div className="flex items-center">
      <span>{format(current)}</span>
      <div className="flex-1 mx-2">
        <Slider max={total} value={current} onChange={onChange} />
      </div>
      <span>{format(total)}</span>
    </div>
  )
}

export default memo(ProgressBar)
