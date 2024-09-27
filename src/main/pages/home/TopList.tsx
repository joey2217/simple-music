import { fetchRankingList } from '@/main/api/migu'
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import type { AlbumImg, ColumnInfo } from '@/main/types/migu'
import { Play } from 'lucide-react'
import { columnContent2Music } from '@/main/utils/player'
import LazyImage from '@/main/components/LazyLoadImage'
import { usePlayerList } from '@/main/store/player'

const AlbumImage: React.FC<{ albumImgList: AlbumImg[] }> = ({
  albumImgList,
}) => {
  const albumImg = albumImgList[albumImgList.length - 1]
  if (albumImg) {
    const pic = albumImg.webpImg || albumImg.img
    return <LazyImage src={pic} alt="album" className="w-10 h-10 rounded-md" />
  }
  return null
}

const MusicTable: React.FC<{
  id: string
}> = ({ id }) => {
  const { addToPlayList } = usePlayerList()
  const [data, setData] = useState<ColumnInfo>()
  const navigate = useNavigate()

  useEffect(() => {
    fetchRankingList(id).then((res) => {
      setData(res)
    })
  }, [id])

  const play = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (data) {
      addToPlayList(data.contents.map(columnContent2Music), true)
    }
  }

  if (data) {
    return (
      <Card
        className="p-2 cursor-pointer"
        onClick={() => navigate(`/top/${id}`)}
      >
        <div className="mb-2 flex items-center">
          <h2 className="text-lg font-semibold">{data.columnTitle}</h2>
        </div>
        <div className="flex">
          <div className="relative group shrink-0" onClick={play}>
            <LazyImage
              src={data.columnSmallpicUrl}
              alt={data.columnTitle}
              className="h-36 object-contain rounded-md hover:opacity-75"
            />

            <div className="opacity-0 group-hover:opacity-80 absolute w-full h-full top-0 left-0 bg-secondary/50 flex items-center justify-center">
              <Play size={64} />
            </div>
          </div>
          <div className="grow shrink truncate">
            {data.contents.slice(0, 3).map((item, index) => (
              <div key={item.contentId} className="flex items-center gap-1">
                <div className="text-center w-4 shrink-0">{index + 1}</div>
                <AlbumImage albumImgList={item.objectInfo.albumImgs} />
                <div className="truncate grow">
                  <div className="truncate font-semibold text-base">
                    {item.objectInfo.songName}
                  </div>
                  <div className="truncate">{item.objectInfo.singer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  }
  return <Card></Card>
}

const TopList: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="font-semibold">精选排行</h2>
        <Link to="/top" className={buttonVariants({ variant: 'link' })}>
          排行榜&gt;
        </Link>
      </div>
      <div className="grid  gap-1 lg:gap-1.5 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        <MusicTable id="27186466" />
        <MusicTable id="27553319" />
        <MusicTable id="27553408" />
      </div>
    </div>
  )
}

export default TopList
