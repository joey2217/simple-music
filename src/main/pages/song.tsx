import React, { useEffect, useState } from 'react'
import { useLoaderData, type LoaderFunction, Link } from 'react-router-dom'
import { fetchSongDetail, fetchSongLyric } from '../api/migu'
import type { SongDetail } from '../types/migu'
import type { LyricRow } from '../types/player'
import { buttonVariants } from '@/components/ui/button'

export const songLoader: LoaderFunction = ({ params }) => {
  if (params.copyrightId) {
    return fetchSongDetail(params.copyrightId)
  }
  throw new Response('数据不存在', { status: 404 }) // 404
}

const Song: React.FC = () => {
  const data = useLoaderData() as SongDetail // 获取数据
  return (
    <div
      className="text-center bg-no-repeat bg-center bg-fixed bg-opacity-10 py-4 mr-44 text-secondary-foreground"
      style={{
        backgroundImage: `url(${data.picUrl})`,
      }}
    >
      <h1 className="font-semibold text-lg mb-2">{data.musicName}</h1>
      <h2>
        {data.singers.map((s, i) => (
          <Link
            className={buttonVariants({ variant: 'link' })}
            key={s.singerId}
            to={`/artist/${s.singerId}`}
          >
            {s.singerName} {i > 0 ? '/' : ''}
          </Link>
        ))}
      </h2>
      <div>
        专辑 :
        <Link
          className={buttonVariants({ variant: 'link' })}
          to={`/album/${data.albumId}`}
        >
          {data.albumName}
        </Link>
      </div>
      <SongLyric copyrightId={data.copyrightId11} />
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
