import React from 'react'
import { useLoaderData, type LoaderFunction, Link } from 'react-router'
import { fetchSongDetail } from '../api/migu'
import type { SongDetail } from '../types/migu'
import { Button, buttonVariants } from '@/components/ui/button'
import { songDetail2Music } from '../utils/player'
import { ListPlus, ListVideo } from 'lucide-react'
import LazyLoadImage from '../components/LazyLoadImage'
import { usePlayerList } from '../store/player'
import SongLyric from '../components/SongLyric'

export const songLoader: LoaderFunction = ({ params }) => {
  if (params.copyrightId) {
    return fetchSongDetail(params.copyrightId)
  }
  throw new Response('数据不存在', { status: 404 }) // 404
}

const Song: React.FC = () => {
  const data = useLoaderData() as SongDetail // 获取数据

  const { addToPlayList, play } = usePlayerList()
  return (
    <div className="relative">
      <div className="fixed -z-10  w-full h-full pr-44 pb-20 flex items-center justify-center">
        <LazyLoadImage
          src={data.picUrl}
          alt={data.albumName}
          className="rounded brightness-50"
        />
      </div>
      <div className="text-center text-secondary-foreground">
        <h1 className="font-semibold text-lg mb-2">{data.musicName}</h1>
        <h2>
          <span>歌手:</span>
          <span className="artists ml-1 text-sm">
            {data.singers.map((s) => (
              <Link key={s.singerId} to={`/artist/${s.singerId}`}>
                <span className="underline-offset-4 hover:underline text-accent-foreground/80 hover:text-accent-foreground">
                  {s.singerName}
                </span>
              </Link>
            ))}
          </span>
        </h2>
        <div>
          <span>专辑:</span>
          <Link
            className={buttonVariants({ variant: 'link' })}
            to={`/album/${data.albumId}`}
          >
            {data.albumName}
          </Link>
        </div>
        <div className="flex gap-2 justify-center mt-3">
          <Button onClick={() => play(songDetail2Music(data))} size="sm">
            <ListVideo className="mr-2" />
            播放
          </Button>
          <Button
            variant="secondary"
            onClick={() => addToPlayList(songDetail2Music(data))}
            size="sm"
          >
            <ListPlus className="mr-2" />
            添加到播放列表
          </Button>
        </div>
        <SongLyric copyrightId={data.copyrightId11} />
      </div>
    </div>
  )
}

export default Song
