import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchRankingList } from '../../api/migu'
import type { AlbumImg, ColumnContent, ColumnInfo } from '../../types/migu'
import { usePlayer } from '../../context/PlayerContext'
import { columnContent2Music } from '../../utils/player'
import { PlayIcon, FluentAdd } from '../../components/Icons'

export const topListLoader: LoaderFunction = ({ params }) => {
  if (params.id) {
    return fetchRankingList(params.id)
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const AlbumImage: React.FC<{ albumImgList: AlbumImg[] }> = ({
  albumImgList,
}) => {
  const albumImg = albumImgList[albumImgList.length - 1]
  if (albumImg) {
    return (
      <img src={albumImg.webpImg} alt="album" className="w-10 h-10 rounded" />
    )
  }
  return null
}

const TopList: React.FC = () => {
  const data = useLoaderData() as ColumnInfo
  const { play, addToPlayList } = usePlayer()

  return (
    <div
      className="p-2 w-full"
      style={{
        height: 'calc(100vh - 140px)',
        overflow: 'auto',
      }}
    >
      <div>
        <h1 className="text-2xl font-bold mb-4">{data.columnTitle}</h1>
        <div className="overflow-x-auto w-full">
          <table className="table table-sm">
            <tbody>
              {data.contents.map((item, index) => (
                <tr key={item.contentId}>
                  <th>
                    <div className="w-6 text-center">{index + 1}</div>
                  </th>
                  <td className="max-w-20 sm:max-w-40  md:max-w-60 lg:w-full">
                    <div className="flex items-center gap-1">
                      <AlbumImage albumImgList={item.objectInfo.albumImgs} />
                      <div className="truncate flex-1 font-semibold text-base">
                        {item.objectInfo.songName}
                      </div>
                    </div>
                  </td>
                  <td className="flex gap-1 items-center">
                    <button
                      className="btn btn-xs btn-circle btn-outline"
                      onClick={() => play(columnContent2Music(item))}
                      title="播放"
                    >
                      <PlayIcon />
                    </button>
                    <button
                      className="btn btn-xs btn-circle btn-outline"
                      onClick={() => addToPlayList(columnContent2Music(item))}
                      title="添加到播放列表"
                    >
                      <FluentAdd />
                    </button>
                  </td>
                  <td
                    title={item.objectInfo.singer}
                    className="max-w-10 sm:max-w-20  md:max-w-40 lg:max-w-60 xl:max-w-80"
                  >
                    <div className="truncate">{item.objectInfo.singer}</div>
                  </td>
                  <td
                    title={item.objectInfo.album}
                    className="max-w-10 sm:max-w-20 md:max-w-40 lg:max-w-60 xl:max-w-80"
                  >
                    <div className="truncate">{item.objectInfo.album}</div>
                  </td>
                  <td className="hidden lg:block">{item.objectInfo.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TopList
