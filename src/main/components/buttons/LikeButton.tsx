import React, { useCallback, useMemo } from 'react'
import { Music } from '../../types/player'
import { useLikeStore } from '../../store/like'
import { Heart } from 'lucide-react'

interface Props {
  item?: Music | null
  size?: number
}

const LikeButton: React.FC<
  Props & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ item, size = 18, ...props }) => {
  const likeMusicIds = useLikeStore((s) =>
    s.musicList.map((m) => m.copyrightId)
  )
  const addLikeMusic = useLikeStore((s) => s.addLikeMusic)
  const removeLikeMusic = useLikeStore((s) => s.removeLikeMusic)

  const isLiked = useMemo(
    () => item && likeMusicIds.includes(item?.copyrightId),
    [item, likeMusicIds]
  )

  const toggleLike = useCallback(() => {
    if (item) {
      if (isLiked) {
        removeLikeMusic(item)
      } else {
        addLikeMusic(item)
      }
    }
  }, [addLikeMusic, isLiked, item, removeLikeMusic])

  const title = isLiked ? '取消喜欢' : '喜欢'

  return (
    <button
      {...props}
      title={title}
      disabled={item == null}
      onClick={toggleLike}
    >
      <Heart
        className={`${isLiked ? 'fill-red-500 stroke-red-500' : ''}`}
        size={size}
      />
    </button>
  )
}

export default LikeButton
