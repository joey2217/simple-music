import React, { memo, useEffect, useMemo } from 'react'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import {
  artistAlbumPageState,
  artistIdState,
  artistInfoState,
  artistMVPageState,
  artistPageState,
  artistSongListState,
} from './store'
import {
  FluentAdd,
  FluentHeart,
  LoadingIcon,
  Play,
} from '../../components/icons'
import { useArtistLikes, usePlaylist } from '../../store/hooks'
import PageHeader from '../../components/PageHeader'

const Artist: React.FC = () => {
  const { id } = useParams()
  const { addPlaylist } = usePlaylist()
  const { artistLikeIds, addLikeArtist, removeLikeArtist } = useArtistLikes()
  const setArtistId = useSetRecoilState(artistIdState)
  const setPage = useSetRecoilState(artistPageState)
  const setArtistAlbumPage = useSetRecoilState(artistAlbumPageState)
  const setArtistMVPage = useSetRecoilState(artistMVPageState)

  const artistSongListLoadable = useRecoilValueLoadable(artistSongListState)
  const artistInfoLoadable = useRecoilValueLoadable(artistInfoState)

  const artistSongList = useMemo(() => {
    if (
      artistSongListLoadable.state === 'hasValue' &&
      artistSongListLoadable.contents
    ) {
      return artistSongListLoadable.contents.list
    }
    return []
  }, [artistSongListLoadable.contents, artistSongListLoadable.state])

  useEffect(() => {
    setArtistId(id as string)
    setPage(1)
    setArtistAlbumPage(1)
    setArtistMVPage(1)
  }, [id, setArtistAlbumPage, setArtistId, setArtistMVPage, setPage])

  if (artistInfoLoadable.state === 'loading') {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }

  if (artistInfoLoadable.state === 'hasValue') {
    const artistInfo = artistInfoLoadable.contents
    return (
      <section>
        <PageHeader title={'歌手 : ' + artistInfo.name} />
        <div className="flex gap-4">
          <img
            className="rounded-full w-[160px] h-[160px]"
            src={artistInfo.pic300}
            alt={artistInfo.name}
          />
          <div className="flex flex-col gap-2">
            <h3
              className="text-lg font-semibold"
              dangerouslySetInnerHTML={{
                __html: artistInfo.name || '-',
              }}
            ></h3>
            <div className="flex flex-wrap gap-2">
              <div>
                <span className="label">单曲</span>
                <span>{artistInfo.musicNum}</span>
              </div>
              <div>
                <span className="label">专辑</span>
                <span>{artistInfo.albumNum}</span>
              </div>
              <div>
                <span className="label">MV</span>
                <span>{artistInfo.mvNum}</span>
              </div>
              <div>
                <span className="label">粉丝</span>
                <span>{artistInfo.artistFans}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div>
                <span className="label">译名</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: artistInfo.aartist || '-',
                  }}
                ></span>
              </div>
              <div>
                <span className="label">国籍</span>
                <span>{artistInfo.country}</span>
              </div>
              <div>
                <span className="label">语言</span>
                <span>{artistInfo.language || '-'}</span>
              </div>
              <div>
                <span className="label">出生地</span>
                <span>{artistInfo.birthplace || '-'}</span>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <button
                className="primary-btn"
                onClick={() => addPlaylist(artistSongList, { reset: true })}
              >
                <Play />
                <span>播放全部</span>
              </button>
              <button
                className="default-btn"
                onClick={() => addPlaylist(artistSongList)}
              >
                <FluentAdd />
                <span>添加</span>
              </button>
              {artistLikeIds.includes(artistInfo.id) ? (
                <button
                  onClick={() => removeLikeArtist(artistInfo)}
                  className="text-btn"
                >
                  <FluentHeart className="text-red-400" />
                  <span>取消喜欢</span>
                </button>
              ) : (
                <button
                  onClick={() => addLikeArtist(artistInfo)}
                  className="text-btn"
                >
                  <FluentHeart />
                  <span>喜欢</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <nav className="flex my-4 gap-2">
          <NavLink className="link" to="" end>
            单曲
          </NavLink>
          <NavLink className="link" to="album">
            专辑
          </NavLink>
          <NavLink className="link" to="mv">
            MV
          </NavLink>
          <NavLink className="link" to="info">
            简介
          </NavLink>
        </nav>
        <div>
          <Outlet />
        </div>
      </section>
    )
  }

  return (
    <section>
      <PageHeader />
      <h3>未知歌手</h3>
    </section>
  )
}

export default memo(Artist)
