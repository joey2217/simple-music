import React, { useMemo } from 'react'
import type { Music } from '../types/player'
import { Button, buttonVariants } from '@/components/ui/button'
import LikeButton from './buttons/LikeButton'
import { Download, ListPlus, Play, SquarePlus } from 'lucide-react'
import { usePlayerList } from '../store/player'
import { useDownload } from '../store/download'
import { usePlaylists } from '../context/PlaylistContext'

type Action = 'append2PlayerList' | 'add2Playlist' | 'download' | 'like'

interface Props {
  actions?: Action[]
  music: Music
}

const ICON_SIZE = 18

const ActionRow: React.FC<Props & React.ComponentProps<'div'>> = ({
  actions = ['like', 'add2Playlist', 'append2PlayerList', 'download'],
  music,
  className,
  ...props
}) => {
  const { addToPlayList, play } = usePlayerList()
  const download = useDownload()
  const { saveToPlaylist } = usePlaylists()

  const actionCompMap = useMemo(() => {
    return {
      like: (
        <LikeButton
          key="like"
          item={music}
          className={buttonVariants({
            size: 'icon',
            variant: 'ghost',
          })}
          size={ICON_SIZE}
        />
      ),
      add2Playlist: (
        <Button
          key="add2Playlist"
          size="icon"
          variant="ghost"
          title="收藏"
          onClick={() => saveToPlaylist(music)}
        >
          <SquarePlus />
        </Button>
      ),
      append2PlayerList: (
        <Button
          key="append2PlayerList"
          size="icon"
          variant="ghost"
          onClick={() => addToPlayList(music)}
          title="添加到播放列表"
        >
          <ListPlus size={ICON_SIZE} />
        </Button>
      ),
      download: (
        <Button
          key="download"
          size="icon"
          variant="ghost"
          onClick={() => download(music)}
          title="下载"
        >
          <Download size={ICON_SIZE} />
        </Button>
      ),
      play: (
        <Button
          key="play"
          size="icon"
          variant="ghost"
          onClick={() => play(music)}
          title="播放"
        >
          <Play size={ICON_SIZE} />
        </Button>
      ),
    }
  }, [addToPlayList, download, music, play, saveToPlaylist])

  return (
    <div {...props} className={`flex ${className}`}>
      {actions.map((action) => actionCompMap[action])}
    </div>
  )
}

export default ActionRow
