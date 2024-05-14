import { PlayMode } from '@/main/types/player'
import React, { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ArrowRightToLine, Repeat, Repeat1, Shuffle } from 'lucide-react'
import { mode, setMode, setShuffleIndexList } from '@/main/utils/player'
import { usePlayerListStore } from '@/main/store/player'
import { usePlayer } from '../PlayerContext'

interface ModeIcon {
  icon: ReactNode
  title: string
}

const modes: PlayMode[] = ['sequence', 'loop', 'repeat', 'shuffle']

const ICON_SIZE = 16

const modeIcons: { [p in PlayMode]: ModeIcon } = {
  sequence: {
    icon: <ArrowRightToLine size={ICON_SIZE} />,
    title: '顺序播放',
  },
  loop: {
    icon: <Repeat size={ICON_SIZE} />,
    title: '列表循环',
  },
  repeat: {
    icon: <Repeat1 size={ICON_SIZE} />,
    title: '单曲循环',
  },
  shuffle: {
    icon: <Shuffle size={ICON_SIZE} />,
    title: '随机播放',
  },
}

const PlayModeButton: React.FC = () => {
  const playList = usePlayerListStore((s) => s.playList)
  const { setLoop } = usePlayer()

  const [m, setM] = useState<PlayMode>(mode)

  const modeIcon = useMemo(() => modeIcons[m], [m])

  const onClick = () => {
    const nextMode = modes[(modes.indexOf(m) + 1) % modes.length]
    setMode(nextMode)
    setM(nextMode)
  }

  useEffect(() => {
    if (m === 'shuffle') {
      setShuffleIndexList(playList.length)
    } else {
      setShuffleIndexList(0)
    }
    setLoop(m === 'repeat')
  }, [m, playList.length, setLoop])

  return (
    <button title={modeIcon.title} onClick={onClick}>
      {modeIcon.icon}
    </button>
  )
}

export default PlayModeButton
