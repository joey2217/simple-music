import { PlayMode } from '@/main/types/player'
import React, { useMemo, useState, type ReactNode } from 'react'
import { ArrowRightToLine, Repeat, Repeat1, Shuffle } from 'lucide-react'
import { mode, setMode } from '@/main/utils/player'
import { usePlayer } from '@/main/context/PlayerContext'

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
  const { setShuffleIndexList } = usePlayer()
  const [m, setM] = useState<PlayMode>(mode)

  const modeIcon = useMemo(() => modeIcons[m], [m])

  const onClick = () => {
    const nextMode = modes[(modes.indexOf(m) + 1) % modes.length]
    setMode(nextMode)
    setM(nextMode)
    setShuffleIndexList(nextMode)
  }

  return (
    <button title={modeIcon.title} onClick={onClick}>
      {modeIcon.icon}
    </button>
  )
}

export default PlayModeButton
