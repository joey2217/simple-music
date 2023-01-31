import React, { memo, useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Howl } from 'howler'
import { Button, Space } from 'antd'
import {
  CaretRightOutlined,
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons'
import { usePlayList } from '../../store/hooks'
import { actionDisabledState } from '../../store/selector'
import { currentPlayState, playingState } from '../../store/atom'
import emitter from '../../utils/events'
import ProgressBar from './ProgressBar'

let audio: Howl | null = null

const Control: React.FC = () => {
  const actionDisabled = useRecoilValue(actionDisabledState)
  const { nextSong } = usePlayList()

  const currentPlay = useRecoilValue(currentPlayState)
  const [playing, setPlaying] = useRecoilState(playingState)

  const onEnd = useCallback((id?: number) => {
    console.log('onEnd')
    emitter.emit('end')
  }, [])

  const onPause = useCallback(
    (id?: number) => {
      console.log('onPause', id)
      setPlaying(false)
      emitter.emit('pause')
    },
    [setPlaying]
  )
  const onPlay = useCallback(
    (id?: number) => {
      console.log('onPlay', id)
      setPlaying(true)
      emitter.emit('play')
    },
    [setPlaying]
  )

  const togglePlaying = useCallback(() => {
    if (playing) {
      audio?.pause()
    } else {
      audio?.play()
    }
  }, [playing])

  useEffect(() => {
    if (currentPlay) {
      audio = new Howl({
        src: [currentPlay.url],
        html5: true,
      })
      audio.on('end', onEnd)
      audio.on('pause', onPause)
      audio.on('play', onPlay)
      audio.play()
    } else {
      if (audio != null) {
        audio.unload()
        audio = null
      }
    }
    return () => {
      if (audio != null) {
        audio.unload()
        audio = null
      }
    }
  }, [currentPlay, onEnd, onPause, onPlay])

  const onSeek = useCallback((val: number) => {
    audio?.seek(val)
  }, [])

  useEffect(() => {
    emitter.on('seek', onSeek)
    return () => {
      emitter.off('seek', onSeek)
    }
  }, [onSeek])

  return (
    <div className="text-center">
      <Space>
        <Button
          disabled={actionDisabled}
          shape="circle"
          title="上一首"
          icon={<StepBackwardOutlined />}
          onClick={() => nextSong('prev')}
        />
        {playing ? (
          <Button
            disabled={actionDisabled}
            size="large"
            shape="circle"
            title="暂停"
            icon={<PauseOutlined />}
            onClick={togglePlaying}
          />
        ) : (
          <Button
            disabled={actionDisabled}
            size="large"
            shape="circle"
            title="播放"
            icon={<CaretRightOutlined />}
            onClick={togglePlaying}
          />
        )}

        <Button
          disabled={actionDisabled}
          shape="circle"
          title="下一首"
          icon={<StepForwardOutlined />}
          onClick={() => nextSong('next')}
        />
      </Space>
      <ProgressBar />
    </div>
  )
}

export default memo(Control)
