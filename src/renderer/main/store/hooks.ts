import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { playListState, currentPlayState } from './atom'
import type { PlayListItem } from '../api/types'
import resource from '../api'

export function usePlayList() {
  const [playList, setPlayList] = useRecoilState(playListState)
  const [currentPlay, setCurrentPlay] = useRecoilState(currentPlayState)

  const addToPlayerList = useCallback(
    (items: PlayListItem[], play: boolean | 'auto' = 'auto') => {
      console.log(items, play)
      if (items.length > 0) {
        if (play === 'auto') {
          setPlayList((list) => list.concat(items))
          if (currentPlay == null) {
            const item = items[0]
            resource.fetchSongsDetail2([item.id]).then((data) => {
              console.log(data)
            })
            setCurrentPlay(items[0])
          }
        } else if (play) {
          const item = items[0]
          resource.fetchSongsDetail2([item.id]).then((data) => {
            console.log(data)
          })
          setCurrentPlay(items[0])
        }
      }
    },
    [currentPlay, setCurrentPlay, setPlayList]
  )

  return { addToPlayerList }
}
