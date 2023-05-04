import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import type { Artist } from '../../types/artist'
import { useArtistLikes } from '../../store/hooks'
import { FluentHeart } from '../icons'

interface Props {
  artist: Artist
  className?: string
}

const ArtistCard: React.FC<Props> = ({ artist, className = '' }) => {
  const { artistLikeIds } = useArtistLikes()

  return (
    <Link to={`/artist/${artist.id}`} className={`text-center ${className}`}>
      <div className='aspect-square'>
        <img
          src={artist.pic300}
          alt={artist.name}
          className="rounded-full mx-auto"
        />
      </div>
      <div className="flex justify-center items-center gap-1">
        <h4 className="text-lg font-semibold">{artist.name}</h4>
        {artistLikeIds.includes(artist.id) && (
          <FluentHeart className="text-red-400" />
        )}
      </div>
      <div className="text-sm text-gray-500">{artist.musicNum}首歌曲</div>
    </Link>
  )
}

export default memo(ArtistCard)
