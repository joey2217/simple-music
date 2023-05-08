import React, { memo } from 'react'
import { useMusicLikes, usePlaylist } from '../../store/hooks'
import MusicList from '../../components/MusicPage/MusicList'
import { FluentAdd, Play } from '../../components/icons'

const Music: React.FC = () => {
  const { likeMusic } = useMusicLikes()
  const { addPlaylist } = usePlaylist()
  if (likeMusic.length > 0) {
    return (
      <div>
        <div className="my-2 flex items-center gap-4">
          <button
            className="primary-btn"
            onClick={() => addPlaylist(likeMusic, { reset: true })}
          >
            <Play />
            <span>播放全部</span>
          </button>
          <button
            className="default-btn"
            onClick={() => addPlaylist(likeMusic)}
          >
            <FluentAdd />
            <span>添加</span>
          </button>
        </div>
        <MusicList list={likeMusic} />
      </div>
    )
  }
  return <div className="text-center font-semibold text-xl">暂无数据</div>
}

export default memo(Music)
