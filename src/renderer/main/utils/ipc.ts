import { useEffect } from 'react'
import { usePlaylist } from '../store/hooks'
import emitter from './events'

export function useIPC() {
  const { playNext } = usePlaylist()

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

  // useEffect(() => {
  //   window.electronAPI.setMainThumbarButtons(playing, actionDisabled)
  // }, [actionDisabled, playing])
}
