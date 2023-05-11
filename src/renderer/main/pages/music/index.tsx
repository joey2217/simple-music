import React, { memo, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValueLoadable } from 'recoil'
import { FluentAdd, LoadingIcon, Play } from '../../components/icons'
import { musicLyricQuery, musicQuery } from './store'
import { usePlaylist } from '../../store/hooks'
import PageHeader from '../../components/PageHeader'

const MusicPage: React.FC = () => {
  const { id } = useParams()
  const { addPlaylist, playNow } = usePlaylist()
  const musicInfoLoadable = useRecoilValueLoadable(musicQuery(id as string))
  const musicLyricLoadable = useRecoilValueLoadable(
    musicLyricQuery(id as string)
  )

  const lyric = useMemo(() => {
    switch (musicLyricLoadable.state) {
      case 'hasValue':
        return musicLyricLoadable.contents.map((l, index) => (
          <div key={l.time + index}>{l.lineLyric}</div>
        ))
      case 'loading':
        return (
          <div className="col-span-5 min-h-[650px] flex justify-center items-center">
            <LoadingIcon className="text-4xl text-indigo-600" />
          </div>
        )
      case 'hasError':
        return <p>暂无歌词</p>
    }
  }, [musicLyricLoadable.contents, musicLyricLoadable.state])

  if (musicInfoLoadable.state === 'loading') {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }
  if (musicInfoLoadable.state === 'hasValue') {
    const musicInfo = musicInfoLoadable.contents
    return (
      <div>
        <PageHeader title={'歌曲 : ' + musicInfo.name} />
        <div className="px-4 grid grid-cols-4">
          <div className="col-span-3 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{musicInfo.name}</h2>
            <Link
              to={'/artist/' + musicInfo.artistid}
              className="text-gray-400"
            >
              {musicInfo.artist}
            </Link>
            <div>
              <span className="text-gray-400 label">专辑</span>
              <Link to={'/album/' + musicInfo.albumid}>{musicInfo.album}</Link>
            </div>
            <div>
              <span className="text-gray-400 label">发行时间</span>
              {musicInfo.releaseDate}
            </div>
            <div>
              <span className="text-gray-400 label">专辑简介</span>
              {musicInfo.albuminfo}
            </div>
            <div className="flex gap-4">
              <button
                className="primary-btn"
                onClick={() => playNow(musicInfo)}
              >
                <Play />
                <span>播放</span>
              </button>
              <button
                className="default-btn"
                onClick={() => addPlaylist(musicInfo)}
              >
                <FluentAdd />
                <span>添加</span>
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <img
              src={musicInfo.pic120}
              alt="专辑封面"
              className="rounded aspect-square"
            />
          </div>
        </div>
        <div className="flex mt-4 flex-col gap-1 items-center">{lyric}</div>
      </div>
    )
  }
  return (
    <div>
      <PageHeader />
      <h3 className="text-center">未知歌曲</h3>
    </div>
  )
}

export default memo(MusicPage)
