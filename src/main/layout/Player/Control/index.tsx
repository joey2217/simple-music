import React from 'react'
import ProgressBar from './ProgressBar'
import { PlayIcon, Pause, Previous, Next } from '../../../components/Icons'
import { usePlayer } from '../../../context/PlayerContext'
import { Button } from '@/components/ui/button'
import PlayModeButton from './PlayModeButton'
import { Heart } from 'lucide-react'

const LikeButton: React.FC = () => {
  return (
    <button title="收藏">
      <Heart className="fill-red-500 stroke-red-500" size={18} />
    </button>
  )
}
const Control: React.FC = () => {
  const { paused, togglePaused, playNext } = usePlayer()
  return (
    <div>
      <div className="flex justify-center items-center gap-3 mb-1">
        <LikeButton />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-base"
          title="上一首"
          onClick={() => playNext('prev')}
        >
          <Previous />
        </Button>
        {paused ? (
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12 text-2xl"
            onClick={togglePaused}
            title="播放"
          >
            <PlayIcon />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full w-12 h-12 text-2xl"
            onClick={togglePaused}
            title="暂停"
          >
            <Pause />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-base"
          title="下一首"
          onClick={() => playNext('next')}
        >
          <Next />
        </Button>
        <PlayModeButton />
      </div>
      <ProgressBar />
    </div>
  )
}

export default Control
