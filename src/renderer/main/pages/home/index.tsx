import React, { memo, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import {
  artistTagState,
  currentArtistCategoryState,
  currentCategoryArtistListState,
  indexRankingListState,
  indexPlaylistState,
} from './store'
import RankingItem from './RankingItem'
import { ArrowRight, LoadingIcon } from '../../components/icons'
import ArtistCard from '../../components/ArtistCard'
import SongListItemCard from '../../components/SongListItemCard'

const Home: React.FC = () => {
  const indexPlaylistLoadable = useRecoilValueLoadable(indexPlaylistState)
  const rankingListLoadable = useRecoilValueLoadable(indexRankingListState)
  const artistTagLoadable = useRecoilValueLoadable(artistTagState)
  const artistListLoadable = useRecoilValueLoadable(
    currentCategoryArtistListState
  )
  const [currentArtistCategory, setCurrentArtistCategory] = useRecoilState(
    currentArtistCategoryState
  )
  // 歌单
  const playlist = useMemo(() => {
    switch (indexPlaylistLoadable.state) {
      case 'hasValue':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 my-4">
            {indexPlaylistLoadable.contents.slice(0, 5).map((item) => (
              <SongListItemCard key={item.id} item={item} />
            ))}
          </div>
        )
      case 'loading':
        return (
          <div className="min-h-[650px] flex justify-center items-center">
            <LoadingIcon className="text-4xl text-indigo-600" />
          </div>
        )
      case 'hasError':
        return null
    }
  }, [indexPlaylistLoadable.contents, indexPlaylistLoadable.state])

  // 排行榜
  const rankingList = useMemo(() => {
    switch (rankingListLoadable.state) {
      case 'hasValue':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-4">
            {rankingListLoadable.contents.map((item) => (
              <RankingItem key={item.id} item={item} />
            ))}
          </div>
        )
      case 'loading':
        return (
          <div className="flex justify-center items-center">
            <LoadingIcon className="text-4xl text-indigo-600" />
          </div>
        )
      case 'hasError':
        return null
    }
  }, [rankingListLoadable.contents, rankingListLoadable.state])

  // 歌手
  const artistTags = useMemo(() => {
    switch (artistTagLoadable.state) {
      case 'hasValue':
        return artistTagLoadable.contents.map((tag) => (
          <div
            key={tag.id}
            className={`cursor-pointer hover:text-neutral-500 dark:hover:text-white ${
              currentArtistCategory === tag.id
                ? 'underline underline-offset-8'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setCurrentArtistCategory(tag.id)}
          >
            {tag.name}
          </div>
        ))
      default:
        return null
    }
  }, [
    artistTagLoadable.contents,
    artistTagLoadable.state,
    currentArtistCategory,
    setCurrentArtistCategory,
  ])

  const artistList = useMemo(() => {
    switch (artistListLoadable.state) {
      case 'hasValue':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 my-4">
            {artistListLoadable.contents.list.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )
      default:
        return null
    }
  }, [artistListLoadable.contents, artistListLoadable.state])

  useEffect(() => {
    if (artistTagLoadable.state === 'hasValue') {
      setCurrentArtistCategory((cate) =>
        cate ? cate : artistTagLoadable.contents[0].id
      )
    }
  }, [
    artistTagLoadable.contents,
    artistTagLoadable.state,
    setCurrentArtistCategory,
  ])

  return (
    <div className="container mx-auto">
      <div className="flex items-baseline gap-4">
        <h2 className="font-semibold text-2xl">排行榜</h2>
        <Link
          to="/ranking"
          className="flex items-center hover:text-neutral-500 dark:hover:text-white"
        >
          <span>更多</span>
          <ArrowRight />
        </Link>
      </div>
      {rankingList}
      <div className="flex items-baseline gap-4">
        <h2 className="font-semibold text-2xl">推荐歌单</h2>
        <Link
          to="/song-list"
          className="flex items-center hover:text-neutral-500 dark:hover:text-white"
        >
          <span>更多</span>
          <ArrowRight />
        </Link>
      </div>
      {playlist}
      <div className="flex items-baseline gap-4">
        <h2 className="font-semibold text-2xl">歌手推荐</h2>
        {artistTags}
        <Link
          to="/artists"
          className="flex items-center hover:text-neutral-500 dark:hover:text-white"
        >
          <span>更多</span>
          <ArrowRight />
        </Link>
      </div>
      {artistList}
    </div>
  )
}

export default memo(Home)
