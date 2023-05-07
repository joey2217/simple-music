import { useCallback, useMemo } from 'react'
import type { DownloadMusic, Music, PlayMode } from '../types'
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from 'recoil'
import {
  playListState,
  currentPlayIndexState,
  playingState,
  playModeState,
  likeMusicState,
  likeArtistState,
  playerVolumeState,
  downloadPathState,
  downloadListState,
} from './atom'
import {
  currentPlayUrlState,
  currentPlayMusicInfoState,
  currentPlayState,
  musicLikeIdsState,
  artistLikeIdsState,
  shufflePlayIndexListState,
  currentPlayLyricState,
} from './selector'
import { fetchSongListDetail } from '../api/songList'
import { insertMusicLike, deleteMusicLike } from '../db/music'
import { insertArtistLike, deleteArtistLike } from '../db/artist'
import {
  bulkAddPlaylist,
  clearDBPlaylist,
  deletePlaylist,
} from '../db/playlist'
import { Artist } from '../types/artist'
import { fetchAlbum } from '../api/album'
import { fetchMusicUrl } from '../api/music'

export interface PlaylistOptions {
  reset: boolean
  playNow: boolean
}

const DEFAULT_PLAYLIST_OPTIONS: PlaylistOptions = {
  reset: false,
  playNow: false,
}

const NEXT_PLAY_MODE: { [prop in PlayMode]: PlayMode } = {
  loop: 'sequence',
  sequence: 'shuffle',
  shuffle: 'single',
  single: 'loop',
}

export function usePlaylist() {
  const currentPlayUrlLoadable = useRecoilValueLoadable(currentPlayUrlState)
  const currentPlayLyricLoadable = useRecoilValueLoadable(currentPlayLyricState)
  const currentPlaMusicInfoLoadable = useRecoilValueLoadable(
    currentPlayMusicInfoState
  )
  const [playerVolume, setPlayerVolume] = useRecoilState(playerVolumeState)
  const [playlist, setPlaylist] = useRecoilState(playListState)
  const [playMode, setPlayMode] = useRecoilState(playModeState)
  const [playing, setPlaying] = useRecoilState(playingState)
  const currentPlay = useRecoilValue(currentPlayState)
  const shufflePlayIndexList = useRecoilValue(shufflePlayIndexListState)
  const [currentPlayIndex, setCurrentPlayIndex] = useRecoilState(
    currentPlayIndexState
  )

  const addPlaylist = useCallback(
    (payload: Music | Music[], opt?: Partial<PlaylistOptions>) => {
      const options = {
        ...DEFAULT_PLAYLIST_OPTIONS,
        ...opt,
      }
      const items = Array.isArray(payload) ? payload : [payload]

      if (options.reset) {
        setPlaylist(items)
        clearDBPlaylist().then(() => {
          bulkAddPlaylist(items)
        })
        if (shufflePlayIndexList.length > 0) {
          setCurrentPlayIndex(shufflePlayIndexList[0])
        } else {
          setCurrentPlayIndex(0)
        }
      } else {
        setPlaylist((list) => {
          const existedIds = list.map((m) => m.rid)
          return list.concat(items.filter((m) => !existedIds.includes(m.rid)))
        })
        bulkAddPlaylist(items)
      }
    },
    [setCurrentPlayIndex, setPlaylist, shufflePlayIndexList]
  )

  const removePlaylistMusic = useCallback(
    (m: Music, index: number) => {
      setPlaylist((list) => list.filter((item) => item.rid !== m.rid))
      deletePlaylist(m)
      setCurrentPlayIndex((i) => (index < i ? i - 1 : i))
    },
    [setCurrentPlayIndex, setPlaylist]
  )

  const playSongList = useCallback(
    (pid: string | number) => {
      fetchSongListDetail(pid, { rn: 30 }).then((data) => {
        const { musicList } = data
        addPlaylist(musicList, { reset: true })
      })
    },
    [addPlaylist]
  )

  const playAlbum = useCallback(
    (albumId: number) => {
      fetchAlbum(albumId).then(({ musicList }) => {
        addPlaylist(musicList, { reset: true })
      })
    },
    [addPlaylist]
  )

  const playNow = useCallback(
    (m: Music) => {
      const index = playlist.findIndex((item) => item.rid === m.rid)
      if (index === -1) {
        setPlaylist((list) =>
          list
            .slice(0, currentPlayIndex)
            .concat(m)
            .concat(list.slice(currentPlayIndex))
        )
      } else {
        setPlaylist((list) => [
          ...list
            .slice(0, currentPlayIndex)
            .filter((item) => item.rid !== m.rid),
          m,
          ...list.slice(currentPlayIndex).filter((item) => item.rid !== m.rid),
        ])
        if (index < currentPlayIndex) {
          setCurrentPlayIndex((i) => i - 1)
        }
      }
    },
    [currentPlayIndex, playlist, setCurrentPlayIndex, setPlaylist]
  )

  const playNext = useCallback(
    (dir: 'next' | 'prev', loop = false) => {
      if (loop) {
        return
      }
      let nextIndex = 0
      if (dir === 'next') {
        nextIndex =
          currentPlayIndex + 1 < playlist.length ? currentPlayIndex + 1 : 0
      } else {
        nextIndex =
          currentPlayIndex - 1 >= 0 ? currentPlayIndex - 1 : playlist.length
      }
      if (shufflePlayIndexList.length > 0) {
        nextIndex = shufflePlayIndexList[nextIndex]
      }
      setCurrentPlayIndex(nextIndex)
    },
    [
      currentPlayIndex,
      playlist.length,
      setCurrentPlayIndex,
      shufflePlayIndexList,
    ]
  )

  const clearPlaylist = useCallback(() => {
    setPlaylist([])
    clearDBPlaylist()
    setCurrentPlayIndex(0)
  }, [setCurrentPlayIndex, setPlaylist])

  const changePlayMode = useCallback(() => {
    setPlayMode((m) => NEXT_PLAY_MODE[m])
  }, [setPlayMode])

  const currentPlayUrl = useMemo(() => {
    switch (currentPlayUrlLoadable.state) {
      case 'hasValue':
        return currentPlayUrlLoadable.contents
      default:
        return ''
    }
  }, [currentPlayUrlLoadable.contents, currentPlayUrlLoadable.state])

  const currentPlaMusicInfo = useMemo(() => {
    switch (currentPlaMusicInfoLoadable.state) {
      case 'hasValue':
        return currentPlaMusicInfoLoadable.contents
      default:
        return null
    }
  }, [currentPlaMusicInfoLoadable.contents, currentPlaMusicInfoLoadable.state])

  const actionDisabled = useMemo(() => {
    return playlist.length === 0
  }, [playlist.length])

  return {
    playlist,
    currentPlay,
    currentPlayUrl,
    currentPlaMusicInfo,
    actionDisabled,
    playing,
    playMode,
    addPlaylist,
    setPlaying,
    playNext,
    clearPlaylist,
    changePlayMode,
    playSongList,
    playNow,
    removePlaylistMusic,
    setCurrentPlayIndex,
    playAlbum,
    playerVolume,
    setPlayerVolume,
    currentPlayLyricLoadable,
  } as const
}

export function useMusicLikes() {
  const [likeMusic, setLikeMusic] = useRecoilState(likeMusicState)
  const musicLikeIds = useRecoilValue(musicLikeIdsState)

  const addLikeMusic = useCallback(
    (m: Music) => {
      setLikeMusic((list) => [m].concat(list))
      insertMusicLike(m)
    },
    [setLikeMusic]
  )

  const removeLikeMusic = useCallback(
    (m: Music) => {
      setLikeMusic((list) => list.filter((item) => item.rid !== m.rid))
      deleteMusicLike(m)
    },
    [setLikeMusic]
  )

  return {
    addLikeMusic,
    removeLikeMusic,
    musicLikeIds,
    likeMusic,
  } as const
}

export function useArtistLikes() {
  const [likeArtist, setLikeArtist] = useRecoilState(likeArtistState)
  const artistLikeIds = useRecoilValue(artistLikeIdsState)

  const addLikeArtist = useCallback(
    (a: Artist) => {
      setLikeArtist((list) => [a, ...list])
      insertArtistLike(a)
    },
    [setLikeArtist]
  )

  const removeLikeArtist = useCallback(
    (a: Artist) => {
      setLikeArtist((list) => list.filter((item) => item.id !== a.id))
      deleteArtistLike(a)
    },
    [setLikeArtist]
  )

  return {
    likeArtist,
    artistLikeIds,
    addLikeArtist,
    removeLikeArtist,
  } as const
}

export function useDownload() {
  const [downloadPathLoadable, setDownloadPath] =
    useRecoilStateLoadable(downloadPathState)
  const [downloadList, setDownloadList] = useRecoilState(downloadListState)

  const downloadPath = useMemo(() => {
    if (downloadPathLoadable.state === 'hasValue') {
      return downloadPathLoadable.contents
    }
    return ''
  }, [downloadPathLoadable.contents, downloadPathLoadable.state])

  const openDownloadPath = useCallback(() => {
    window.electronAPI.openPath(downloadPath)
  }, [downloadPath])

  const selectDownloadPath = useCallback(() => {
    window.electronAPI
      .showOpenDialog({
        title: '选择下载目录',
        properties: ['openDirectory'],
      })
      .then(({ filePaths }) => {
        const [filePath] = filePaths
        if (filePath) {
          setDownloadPath(filePath)
        }
      })
  }, [setDownloadPath])

  const downloadMusic = useCallback(
    (m: Music, url?: string) => {
      const download = (url: string) => {
        const urlArr = url.split('.')
        const ext = urlArr[urlArr.length - 1]
        const fileName = `${m.artist}-${m.name}.${ext}`
        const mPath = `${downloadPath}/${fileName}`
        const downloadItem: DownloadMusic = {
          ...m,
          url,
          fileName,
          downloadPath: mPath,
          status: 'downloading',
        }
        setDownloadList((list) => [
          downloadItem,
          ...list.filter((item) => item.rid !== m.rid),
        ])
        window.electronAPI.download([downloadItem])
      }
      if (url) {
        download(url)
      } else {
        fetchMusicUrl(m.rid).then((url) => {
          download(url)
        })
      }
    },
    [downloadPath, setDownloadList]
  )

  const removeDownloadMusic = useCallback(
    (index: number, m: DownloadMusic, deleteFile = false) => {
      setDownloadList((list) => [
        ...list.slice(0, index),
        ...list.slice(index + 1),
      ])
      if (deleteFile) {
        window.electronAPI.trashItem(m.downloadPath).catch((error) => {
          console.error(error, '删除文件失败')
        })
      }
    },
    [setDownloadList]
  )

  return {
    downloadPath,
    setDownloadPath,
    downloadList,
    setDownloadList,
    downloadMusic,
    removeDownloadMusic,
    openDownloadPath,
    selectDownloadPath,
  }
}
