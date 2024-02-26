import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchAlbum } from '../api/migu'
import type { AlbumInfo } from '../types/migu'
import { usePlayer } from '../context/PlayerContext'
import { songItem2Music } from '../utils/player'
import { FluentAdd, PlayIcon } from '../components/Icons'

export const albumLoader: LoaderFunction = ({ params }) => {
  if (params.id) {
    return fetchAlbum(params.id)
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const Album: React.FC = () => {
  const { detailInfo, songs } = useLoaderData() as AlbumInfo
  const { play, addToPlayList } = usePlayer()

  return (
    <div>
      <h2>{detailInfo.name}</h2>
      <h3>{detailInfo.albumDesc}</h3>
      <img src={detailInfo.mediumPic} alt={detailInfo.name} />
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <tbody>
            {songs.items.map((song, index) => (
              <tr key={song.copyrightId}>
                <th>
                  <div className="w-6 text-center">{index + 1}</div>
                </th>
                <td className="max-w-20 sm:max-w-40  md:max-w-60 lg:w-full">
                  <div className="flex items-center gap-1">
                    <img
                      src={song.smallPic}
                      alt="album"
                      className="w-10 h-10 rounded"
                    />
                    <div className="truncate flex-1 font-semibold text-base">
                      {song.name}
                    </div>
                  </div>
                </td>
                <td className="flex gap-1 items-center">
                  <button
                    className="btn btn-xs btn-circle btn-outline"
                    onClick={() => play(songItem2Music(song))}
                    title="播放"
                  >
                    <PlayIcon />
                  </button>
                  <button
                    className="btn btn-xs btn-circle btn-outline"
                    onClick={() => addToPlayList(songItem2Music(song))}
                    title="添加到播放列表"
                  >
                    <FluentAdd />
                  </button>
                </td>
                <td className="max-w-10 sm:max-w-20  md:max-w-40 lg:max-w-60 xl:max-w-80">
                  <div className="truncate">
                    {song.singers.map((s) => s.name).join()}
                  </div>
                </td>
                <td
                  title={song.album?.name}
                  className="max-w-10 sm:max-w-20 md:max-w-40 lg:max-w-60 xl:max-w-80"
                >
                  <div className="truncate">{song.album?.name}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Album
