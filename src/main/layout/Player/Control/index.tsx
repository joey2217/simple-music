import React from 'react'
import ProgressBar from './ProgressBar'
import { PlayIcon, Pause, Previous, Next } from '../../../components/Icons'
import { usePlayer } from '../../../context/PlayerContext'
import { Button } from '@/components/ui/button'
import PlayModeButton from './PlayModeButton'
import { Heart } from 'lucide-react'
import { useLikeStore } from '@/main/store/like'

const LikeButton: React.FC = () => {
  const { current } = usePlayer()
  const likeMusicIds = useLikeStore((s) =>
    s.musicList.map((m) => m.copyrightId)
  )
  const addLikeMusic = useLikeStore((s) => s.addLikeMusic)
  const removeLikeMusic = useLikeStore((s) => s.removeLikeMusic)

  const isLiked = current && likeMusicIds.includes(current?.copyrightId)

  const toggleLike = () => {
    if (current) {
      if (isLiked) {
        removeLikeMusic(current)
      } else {
        addLikeMusic(current)
      }
    }
  }

  const title = isLiked ? '取消收藏' : '收藏'

  return (
    <button title={title} disabled={current == null} onClick={toggleLike}>
      <Heart
        className={`${isLiked ? 'fill-red-500 stroke-red-500' : ''}`}
        size={18}
      />
    </button>
  )
}
const Control: React.FC = () => {
  const { paused, togglePaused, playNext, current } = usePlayer()
  const disabled = current == null
  return (
    <div>
      <div className="flex justify-center items-center gap-3 mb-1">
        <LikeButton />
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
