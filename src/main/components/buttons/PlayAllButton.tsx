import { Button } from '@/components/ui/button'
import { usePlaylist } from '@/main/store/playlist'
import type { Music } from '@/main/types/player'
import { ListVideo } from 'lucide-react'
import React from 'react'

interface Props {
  items: Music[]
}

const PlayAllButton: React.FC<Props> = ({ items }) => {
  const { addToPlayList } = usePlaylist()
  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => addToPlayList(items, true)}
    >
      <ListVideo className="mr-2" />
      <span>播放全部</span>
    </Button>
  )
}

export default PlayAllButton
