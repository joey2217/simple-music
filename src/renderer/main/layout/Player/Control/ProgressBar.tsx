import React from 'react'
import { usePlayer } from '../../../context/PlayerContext'

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
  const { duration, time, seek } = usePlayer()

  return (
    <div className="flex items-center gap-1 text-sm">
      <div>{toMinutes(time)}</div>
      <input
        id="process-bar"
        type="range"
        min={0}
        max={duration}
        value={time}
        onChange={(e) => seek(Number(e.target.value))}
        className="range range-xs range-success flex-1"
      />
      <div>{toMinutes(duration)}</div>
    </div>
  )
}

export default ProgressBar
