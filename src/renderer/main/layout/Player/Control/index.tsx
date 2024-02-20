import React from 'react'
import ProgressBar from './ProgressBar'
import { PlayIcon, Pause, Previous, Next } from '../../../components/Icons'
import { usePlayer } from '../../../context/PlayerContext'

const Control: React.FC = () => {
  const { paused, togglePaused } = usePlayer()
  return (
    <div>
      <div className="flex justify-center items-center gap-2 mb-1">
        <button className="btn btn-circle btn-outline btn-sm" title="上一首">
          <Previous />
        </button>
        {paused ? (
          <button
            className="btn btn-primary btn-circle btn-outline text-lg"
            onClick={togglePaused}
            title="播放"
          >
            <PlayIcon />
          </button>
        ) : (
          <button
            className="btn btn-primary btn-circle btn-outline text-lg"
            onClick={togglePaused}
            title="暂停"
          >
            <Pause />
          </button>
        )}
        <button className="btn btn-circle btn-outline btn-sm" title="下一首">
          <Next />
        </button>
      </div>
      <ProgressBar />
    </div>
  )
}

export default Control
