import React, { memo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValueLoadable } from 'recoil'
import { albumQuery } from './store'
import { LoadingIcon, Play, FluentAdd } from '../../components/icons'
import { usePlaylist } from '../../store/hooks'
import PageHeader from '../../components/PageHeader'

const AlbumPage: React.FC = () => {
  const { id } = useParams()
  const albumLoadable = useRecoilValueLoadable(albumQuery(id as string))
  const { addPlaylist } = usePlaylist()

  if (albumLoadable.state === 'loading') {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }
  if (albumLoadable.state === 'hasValue') {
    const album = albumLoadable.contents
    return (
      <div>
        <PageHeader title={'专辑 : ' + album.album} />
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 flex flex-col gap-4">
              <h2 className="text-xl font-semibold">{album.album}</h2>
              <Link to={'/artist/' + album.artistid} className="link">
                {album.artist}
              </Link>
              <div className="flex gap-4">
                <div>
                  <span className="text-gray-400">语种 : </span>
                  {album.lang}
                </div>
                <div>
                  <span className="text-gray-400">发行时间 : </span>
                  {album.releaseDate}
                </div>
              </div>
              <div>
                <span className="text-gray-400">简直 : </span> {album.albuminfo}
              </div>
            </div>
            <div className="col-span-1">
              <img
                src={album.pic}
                alt="专辑封面"
                className="w-[120px] rounded"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="primary-btn"
              onClick={() => addPlaylist(album.musicList, { reset: true })}
            >
              <Play />
              <span>播放全部</span>
            </button>
            <button
              className="default-btn"
              onClick={() => addPlaylist(album.musicList)}
            >
              <FluentAdd />
              <span>添加</span>
            </button>
          </div>
          <div>
            <table className="min-w-full divide-y-2 divide-gray-200 text-base dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                    歌曲
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                    歌手
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                    专辑
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                    时长
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {album.musicList.map((m) => (
                  <tr key={m.rid}>
                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {m.name}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {m.artist}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {m.album}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {m.songTimeMinutes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return <PageHeader title="未知专辑" />
}

export default memo(AlbumPage)
