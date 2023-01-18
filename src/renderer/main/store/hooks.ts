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

  return { addToPlayerList }
}
