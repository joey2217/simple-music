import React, { useEffect, useState } from 'react'
import { usePlayer } from '../../../context/PlayerContext'
import { Slider } from '@/components/ui/slider'
import emitter from '@/main/utils/emitter'

const toMinutes = (s: number) => {
  const minutes = Math.floor(s / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(s % 60)
    .toString()
    .padStart(2, '0')
  return `${minutes} : ${seconds}`
}

const ProgressBar: React.FC = () => {
  const { duration, seek } = usePlayer()
  const [time, setTime] = useState(0)

  useEffect(() => {
    emitter.on('time', setTime)
    return () => emitter.off('time', setTime)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      <div>{toMinutes(time)}</div>
      <Slider
        min={0}
        max={duration}
        value={[time]}
        onValueChange={(values) => seek(values[0])}
        className="range range-xs range-primary flex-1"
      />
      <div>{toMinutes(duration)}</div>
    </div>
  )
}

export default ProgressBar
