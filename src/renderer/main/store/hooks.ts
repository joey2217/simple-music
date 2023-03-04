import { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  playListState,
  currentPlayState,
  downloadItemsState,
  downloadPathState,
} from './atom'
import type { DownloadItem, SongListItem } from '../types'
import { fetchMusicInfo } from '../api/musicInfo'
import { download } from '../utils/download'

export function usePlayList() {
  const [playList, setPlayList] = useRecoilState(playListState)
  const [currentPlay, setCurrentPlay] = useRecoilState(currentPlayState)

  const addToPlayerList = useCallback(
    (items: SongListItem[], play: boolean | 'auto' = 'auto') => {
      console.log(items, play)
      if (items.length > 0) {
        const existedIds = playList.map((s) => s.rid)
        const adds = items.filter((s) => !existedIds.includes(s.rid))
        setPlayList((list) => list.concat(adds))
        if ((play === 'auto' && currentPlay == null) || play) {
          const item = items[0]
          fetchMusicInfo(item.rid).then((data) => {
            setCurrentPlay(data)
          })
        }
      }
    },
    [currentPlay, playList, setCurrentPlay, setPlayList]
  )

  const nextSong = useCallback(
    (target: 'prev' | 'next') => {
      if (playList.length > 0) {
        let index = 0
        if (currentPlay) {
          index = playList.findIndex((s) => s.rid === currentPlay.rid)
          if (index === -1) {
            index = 0
          }
        }
        // 模式
        if (target === 'prev') {
          index -= 1
          if (index === -1) {
            index = playList.length - 1
          }
        } else {
          index += 1
          if (index === playList.length) {
            index = 0
          }
        }
        fetchMusicInfo(playList[index].rid).then((data) => {
          setCurrentPlay(data)
        })
      }
    },
    [currentPlay, playList, setCurrentPlay]
  )

  const playListSong = (song: SongListItem) => {
    fetchMusicInfo(song.rid).then((data) => {
      setCurrentPlay(data)
    })
  }

  return { playList, currentPlay, addToPlayerList, nextSong, playListSong }
}

export function useDownloadList() {
  const [downloadList, setDownloadList] = useRecoilState(downloadItemsState)
  const [downloadPath,setDownloadPath] = useRecoilState(downloadPathState)

  const addDownloadItems = useCallback(
    (songs: SongListItem[]) => {
      const res = songs.map((song) => {
        return fetchMusicInfo(song.rid)
      })
      return Promise.all(res).then((list) => {
        const addIds = songs.map((s) => s.rid)
        const addList: DownloadItem[] = list.map((s) => {
          const fileName = `${s.name}-${s.artist}.mp3`
          return {
            ...s,
            fileName,
            path: `${downloadPath}/${fileName}`,
          }
        })
        setDownloadList((d) =>
          addList.concat(d.filter((c) => !addIds.includes(c.rid)))
        )
        console.log(addList,'addList')
        const downloadItems = addList.map((item) => ({
          rid: item.rid,
          url: item.url,
          fileName: item.fileName,
        }))
        download(downloadItems)
      })
    },
    [downloadPath, setDownloadList]
  )

  return {
    addDownloadItems,
    downloadList,
    downloadPath,
    setDownloadPath,
  }
}
