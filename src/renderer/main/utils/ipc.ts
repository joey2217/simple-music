import { useEffect } from 'react'
import { useDownload, usePlaylist } from '../store/hooks'
import emitter from './events'

const MAX_TITLE_LENGTH = 10

export function useIPC() {
  const { playNext, currentPlay, playing } = usePlaylist()
  const { setDownloadList } = useDownload()

  useEffect(() => {
    window.electronAPI.onMusicControl((_e, type) => {
      switch (type) {
        case 'play':
        case 'pause':
          emitter.emit('togglePlay')
          break
        case 'next':
        case 'prev':
          playNext(type)
          break
        default:
          break
      }
    })
  }, [playNext])

  useEffect(() => {
    window.electronAPI.onDownloadFinish((_e, rid, success) => {
      setDownloadList((list) => {
        const index = list.findIndex((item) => item.rid === rid)
        if (index === -1) {
          return list
        } else {
          const current = list[index]
          return [
            ...list.slice(0, index),
            { ...current, status: success ? 'success' : 'failed' },
            ...list.slice(index + 1),
          ]
        }
      })
    })
  }, [setDownloadList])

  useEffect(() => {
    if (currentPlay) {
      let title = `${currentPlay.name} - ${currentPlay.artist}`
      if (title.length > MAX_TITLE_LENGTH) {
        title = title.slice(0, MAX_TITLE_LENGTH) + '...'
      }
      console.log('title', title)
      window.electronAPI.setCurrentPlay(title)
    }
  }, [currentPlay])

  useEffect(() => {
    window.electronAPI.setPlaying(playing)
  }, [playing])

  // useEffect(() => {
  //   window.electronAPI.setMainThumbarButtons(playing, actionDisabled)
  // }, [actionDisabled, playing])
}
