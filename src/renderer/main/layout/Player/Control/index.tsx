import React from 'react'
import ProgressBar from './ProgressBar'
import { PlayIcon, Pause, Previous, Next } from '../../../components/Icons'
import { usePlayer } from '../../../context/PlayerContext'
import { Button } from '@/components/ui/button'

const Control: React.FC = () => {
  const { paused, togglePaused, playNext } = usePlayer()
  return (
    <div>
      <div className="flex justify-center items-center gap-2 mb-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          title="上一首"
          onClick={() => playNext('prev')}
        >
          <Previous />
        </Button>
        {paused ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-12 h-12 text-xl"
            onClick={togglePaused}
            title="播放"
          >
            <PlayIcon />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full w-12 h-12 text-xl"
            onClick={togglePaused}
            title="暂停"
          >
            <Pause />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          title="下一首"
          onClick={() => playNext('next')}
        >
          <Next />
        </Button>
      </div>
      <ProgressBar />
    </div>
  )
}

export default Control
