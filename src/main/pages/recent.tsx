import React from 'react'
import { usePlaylist, useRecentListStore } from '../store/playlist'
import { Button } from '@/components/ui/button'
import { ListPlus, ListVideo } from 'lucide-react'
import MusicTable from '../components/MusicTable'

const Recent: React.FC = () => {
  const list = useRecentListStore((s) => s.recent)
  const { addToPlayList } = usePlaylist()
  return (
    <div className="page">
      <div>
        <h1 className="text-xl font-bold mb-4">最近播放</h1>
        <div className="flex gap-2 mb-3">
          <Button
            variant="default"
            size="sm"
            onClick={() => addToPlayList(list, true)}
          >
            <ListVideo className="mr-2" />
            <span>播放全部</span>
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => addToPlayList(list)}
          >
            <ListPlus className="mr-2" />
            <span>添加到播放列表</span>
          </Button>
        </div>
      </div>
      <MusicTable items={list} />
    </div>
  )
}

export default Recent
