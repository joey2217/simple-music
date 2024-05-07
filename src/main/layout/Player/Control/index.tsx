import React from 'react'
import ProgressBar from './ProgressBar'
import { PlayIcon, Pause, Previous, Next } from '../../../components/Icons'
import { Button } from '@/components/ui/button'
import PlayModeButton from './PlayModeButton'
import LikeButton from '@/main/components/buttons/LikeButton'
import { usePlayer } from '../PlayerContext'
import { usePlaylist, usePlaylistStore } from '@/main/store/playlist'

const Control: React.FC = () => {
  const { paused, togglePaused } = usePlayer()
  const current = usePlaylistStore((s) => s.current)
  const { playNext } = usePlaylist()

  const disabled = current == null

  return (
    <div>
      <div className="flex justify-center items-center gap-3 mb-1">
        <LikeButton item={current} />
        <Button
          disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
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
          disabled={disabled}
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
