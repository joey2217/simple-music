import React, { ButtonHTMLAttributes, memo } from 'react'
import type { PlayMode } from '../../../types'
import ControlButton from './ControlButton'
import { usePlaylist } from '../../../store/hooks'
import {
  ArrowsRight,
  BaselineShuffle,
  OutlineLoop,
  RoundReplay,
} from '../../icons'

const PLAY_MODE_LABEL: {
  [p in PlayMode]: { title: string; element: React.ReactNode }
} = {
  loop: {
    title: '列表循环',
    element: <OutlineLoop />,
  },
  sequence: {
    title: '顺序播放',
    element: <ArrowsRight />,
  },
  shuffle: {
    title: '随机播放',
    element: <BaselineShuffle />,
  },
  single: {
    title: '单曲循环',
    element: <RoundReplay />,
  },
}

const PlayModeButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  const { playMode, changePlayMode } = usePlaylist()
  return (
    <ControlButton
      title={PLAY_MODE_LABEL[playMode].title}
      onClick={changePlayMode}
      {...props}
    >
      {PLAY_MODE_LABEL[playMode].element}
    </ControlButton>
  )
}

export default memo(PlayModeButton)
