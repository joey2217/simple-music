import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { playListState, currentPlayState } from './atom'
import type { SongListItem } from '../types'
import { fetchMusicInfo } from '../api/musicInfo'

export function usePlayList() {
  const [playList, setPlayList] = useRecoilState(playListState)
  const [currentPlay, setCurrentPlay] = useRecoilState(currentPlayState)

  const addToPlayerList = useCallback(
    (items: SongListItem[], play: boolean | 'auto' = 'auto') => {
      console.log(items, play)
      if (items.length > 0) {
        setPlayList((list) => list.concat(items))
        if ((play === 'auto' && currentPlay == null) || play) {
          const item = items[0]
          fetchMusicInfo(item.rid).then((data) => {
            setCurrentPlay(data)
          })
        }
      }
    },
    [currentPlay, setCurrentPlay, setPlayList]
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
