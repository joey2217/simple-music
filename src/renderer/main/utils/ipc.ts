import { useEffect } from 'react'
import { useDownload, usePlaylist } from '../store/hooks'
import emitter from './events'
import { useNavigate } from 'react-router-dom'

export function useIPC() {
  const { currentPlay, playing } = usePlaylist()
  const { setDownloadList } = useDownload()
  const navigate = useNavigate()

  useEffect(() => {
    window.electronAPI.onMusicControl((_e, type) => {
      emitter.emit('musicControl', type)
    })
  }, [])

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
      const title = `${currentPlay.name} - ${currentPlay.artist}`
      console.log('title', title)
      window.electronAPI.setCurrentPlay(title)
    }
  }, [currentPlay])

  useEffect(() => {
    window.electronAPI.setPlaying(playing)
  }, [playing])

  useEffect(() => {
    window.electronAPI.onNavigate((_e, to) => {
      navigate(to)
    })
  }, [navigate])

  // useEffect(() => {
  //   window.electronAPI.setMainThumbarButtons(playing, actionDisabled)
  // }, [actionDisabled, playing])
}
