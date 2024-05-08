import { useLikeStore } from '@/main/store/like'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ListPlus, ListVideo } from 'lucide-react'
import MusicTable from '@/main/components/MusicTable'
import { usePlayerList } from '@/main/store/player'

const Like: React.FC = () => {
  const musicList = useLikeStore((s) => s.musicList)

  const { addToPlayList } = usePlayerList()

  return (
    <div className="page">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold mb-4">我喜欢的音乐</h1>
          <div className="flex gap-2 mb-3">
            <Button
              variant="default"
              size="sm"
              onClick={() => addToPlayList(musicList, true)}
            >
              <ListVideo className="mr-2" />
              <span>播放全部</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => addToPlayList(musicList)}
            >
              <ListPlus className="mr-2" />
              <span>添加到播放列表</span>
            </Button>
          </div>
        </div>
      </div>
      <MusicTable items={musicList} />
    </div>
  )
}

export default Like
