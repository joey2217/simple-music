import { Button } from '@/components/ui/button'
import { usePlaylist } from '@/main/store/playlist'
import type { Music } from '@/main/types/player'
import { ListPlus } from 'lucide-react'
import React from 'react'

interface Props {
  items: Music[]
}

const AddPlayListButton: React.FC<Props> = ({ items }) => {
  const { addToPlayList } = usePlaylist()

  return (
    <Button size="sm" variant="secondary" onClick={() => addToPlayList(items)}>
      <ListPlus className="mr-2" />
      <span>添加到播放列表</span>
    </Button>
  )
}

export default AddPlayListButton
