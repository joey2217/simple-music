import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Howl } from 'howler'
import { useMusicLikes, usePlaylist } from '../../../store/hooks'
import emitter from '../../../utils/events'
import ControlButton from './ControlButton'
import { FluentHeart, Next, Pause, Play, Previous } from '../../icons'
import ProgressBar from './ProgressBar'
import PlayModeButton from './PlayModeButton'

let audio: Howl | null = null

let volume = 0.5

let loop = false

const Control: React.FC = () => {
  const {
    currentPlay,
    currentPlayUrl,
    playing,
    setPlaying,
    playNext,
    actionDisabled,
    playMode,
    playerVolume,
    playlist,
  } = usePlaylist()

  const { addLikeMusic, removeLikeMusic, musicLikeIds } = useMusicLikes()

  const isLike = useMemo(() => {
    if (currentPlay) {
      return musicLikeIds.includes(currentPlay.rid)
    }
    return false
  }, [currentPlay, musicLikeIds])

  const toggleLike = useCallback(() => {
    if (currentPlay) {
      if (isLike) {
        removeLikeMusic(currentPlay)
      } else {
        addLikeMusic(currentPlay)
      }
    }
  }, [addLikeMusic, currentPlay, isLike, removeLikeMusic])

  const onEnd = useCallback((id?: number) => {
    emitter.emit('end', loop)
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

  const onSeek = useCallback((val: number) => {
    audio?.seek(val)
  }, [])

  useEffect(() => {
    if (currentPlayUrl) {
      audio = new Howl({
        src: currentPlayUrl,
        html5: true,
        volume,
        loop,
      })
      audio.on('end', onEnd)
      audio.on('pause', onPause)
      audio.on('play', onPlay)
      audio.once('load', () => {
        audio?.play()
      })
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
  }, [currentPlayUrl, onEnd, onPause, onPlay])

  useEffect(() => {
    const next = (loop?: boolean) => playNext('next', loop)
    emitter.on('seek', onSeek)
    emitter.on('end', next)
    return () => {
      emitter.off('seek', onSeek)
      emitter.off('end', next)
    }
  }, [onSeek, playNext])

  useEffect(() => {
    if (
      playMode === 'single' ||
      (playMode === 'loop' && playlist.length === 1)
    ) {
      loop = true
      audio?.loop(true)
    } else {
      loop = false
      audio?.loop(false)
    }
  }, [playMode, playlist.length])

  useEffect(() => {
    volume = playerVolume / 100
    if (audio) {
      audio.volume(volume)
    }
  }, [playerVolume])

  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        <PlayModeButton disabled={actionDisabled} />
        <ControlButton
          className="text-xl"
          title="上一首"
          disabled={actionDisabled}
          onClick={() => playNext('prev')}
        >
          <Previous />
        </ControlButton>
        {playing ? (
          <ControlButton
            className="text-3xl"
            disabled={actionDisabled}
            title="暂停"
            onClick={togglePlaying}
          >
            <Pause />
          </ControlButton>
        ) : (
          <ControlButton
            className="text-3xl"
            disabled={actionDisabled}
            title="播放"
            onClick={togglePlaying}
          >
            <Play />
          </ControlButton>
        )}
        <ControlButton
          className="text-xl"
          disabled={actionDisabled}
          title="下一首"
          onClick={() => playNext('next')}
        >
          <Next />
        </ControlButton>
        <ControlButton
          title={isLike ? '取消喜欢' : '喜欢'}
          disabled={actionDisabled}
          onClick={toggleLike}
        >
          <FluentHeart className={`${isLike ? 'text-red-400' : ''}`} />
        </ControlButton>
      </div>
      <ProgressBar />
    </div>
  )
}

export default memo(Control)