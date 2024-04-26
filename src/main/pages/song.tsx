import React, { useEffect, useState } from 'react'
import { useLoaderData, type LoaderFunction, Link } from 'react-router-dom'
import { fetchSongDetail, fetchSongLyric } from '../api/migu'
import type { SongDetail } from '../types/migu'
import type { LyricRow } from '../types/player'
import { Button, buttonVariants } from '@/components/ui/button'
import { usePlayer } from '../context/PlayerContext'
import { songDetail2Music } from '../utils/player'
import { ListPlus, ListVideo } from 'lucide-react'
import Image from '../components/Image'

export const songLoader: LoaderFunction = ({ params }) => {
  if (params.copyrightId) {
    return fetchSongDetail(params.copyrightId)
  }
  throw new Response('数据不存在', { status: 404 }) // 404
}

const Song: React.FC = () => {
  const data = useLoaderData() as SongDetail // 获取数据

  const { addToPlayList, play } = usePlayer()
  return (
    <div>
      <div
        className="text-center bg-no-repeat bg-center bg-fixed bg-opacity-10 blur-sm py-4 mr-44 text-secondary-foreground"
        style={{
          backgroundImage: `url(${data.picUrl})`,
        }}
      ></div>
      <Image src={data.picUrl} alt={data.musicName} />
      <div className="text-center text-secondary-foreground">
        <h1 className="font-semibold text-lg mb-2">{data.musicName}</h1>
        <h2>
          <span>歌手:</span>
          <span className="divide-x">
            {data.singers.map((s) => (
              <Link
                className={buttonVariants({ variant: 'link' })}
                key={s.singerId}
                to={`/artist/${s.singerId}`}
              >
                {s.singerName}
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

const SongLyric: React.FC<{ copyrightId: string }> = ({ copyrightId }) => {
  const [status, setStatus] = useState<'loading' | 'error' | 'ok'>('loading')

  const [lyric, setLyric] = useState<LyricRow[]>([])

  useEffect(() => {
    setStatus('loading')
    fetchSongLyric(copyrightId)
      .then((data) => {
        setLyric(data.lyric)
        setStatus('ok')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [copyrightId])

  if (status === 'loading') {
    return <div>加载中</div>
  }
  if (status === 'error') {
    return <div>获取歌词错误</div>
  }
  return (
    <div>
      {lyric.map((row, index) => (
        <p key={index} className="p-1">
          {row.words || <br />}
        </p>
      ))}
    </div>
  )
}

export default Song
