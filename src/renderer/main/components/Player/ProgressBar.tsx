import React, { memo, useEffect, useState } from 'react'
import { Slider } from 'antd'
import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { currentPlayState } from '../../store/atom'

dayjs.extend(duration)

let timer: string | number | NodeJS.Timeout | undefined

const FORMAT = 'mm:ss'

const ProgressBar: React.FC = () => {
  const [current, setCurrent] = useState<duration.Duration>(
    dayjs.duration({ minutes: 0, seconds: 0 })
  )
  const [total, setTotal] = useState<duration.Duration>(
    dayjs.duration({ minutes: 0, seconds: 0 })
  )
  const [totalSeconds, setTotalSeconds] = useState(1)
  const [progress, setProgress] = useState(0)

  const currentPlay = useRecoilValue(currentPlayState)
  useEffect(() => {
    if (currentPlay) {
      const { songTimeMinutes } = currentPlay
      const [m, s] = songTimeMinutes.split(':')
      const minutes = Number(m) || 0
      const seconds = Number(s) || 0
      let duration = dayjs.duration({
        minutes,
        seconds,
      })
      setTotalSeconds(duration.asSeconds())
      setCurrent(duration)
      setTotal(duration)
      if (timer) {
        clearInterval(timer)
      }
      timer = setInterval(() => {
        setCurrent((d) => d.subtract(1, 'second'))
        const currentSeconds = duration.asSeconds()
        if (currentSeconds <= 0) {
          clearInterval(timer)
        }
        const per = Math.round(
          (totalSeconds - currentSeconds / totalSeconds) * 100
        )
        setProgress(per)
      }, 1000)
    } else {
      setCurrent(dayjs.duration({ minutes: 0, seconds: 0 }))
      setTotal(dayjs.duration({ minutes: 0, seconds: 0 }))
      setTotalSeconds(1)
    }
  }, [currentPlay, totalSeconds])
  return (
    <div className="flex items-center">
      <span>{current.format(FORMAT)}</span>
      <Slider value={progress} className="flex-1 px-1" />
      <span>{total.format(FORMAT)}</span>
    </div>
  )
}

export default memo(ProgressBar)
