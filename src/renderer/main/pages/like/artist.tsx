import React, { memo } from 'react'
import ArtistCard from '../../components/ArtistCard'
import { useArtistLikes } from '../../store/hooks'

const Artist: React.FC = () => {
  const { likeArtist } = useArtistLikes()
  if (likeArtist.length > 0) {
    return (
      <div className="my-2 grid grid-cols-4 sm:col-span-4 md:grid-cols-6 lg:col-span-8 xl:col-span-10 gap-2 md:gap-4">
        {likeArtist.map((a) => (
          <ArtistCard key={a.id} artist={a} />
        ))}
      </div>
    )
  }
  return <div className="text-center font-semibold text-xl">暂无数据</div>
}

export default memo(Artist)
