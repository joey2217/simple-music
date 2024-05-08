import { Slider } from '@/components/ui/slider'
import { vol as localVol } from '@/main/utils/player'
import { Volume1, Volume2, VolumeX } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { usePlayer } from './PlayerContext'
import { usePlayerListStore } from '@/main/store/player'

interface Props {
  value: number
  onMute: () => void
  onRestore: () => void
}

const VolumeIcon: React.FC<Props> = ({ value, onMute, onRestore }) => {
  if (value === 0) {
    return (
      <button onClick={onRestore} title="取消静音">
        <VolumeX size={18} />
      </button>
    )
  } else if (value < 50) {
    return (
      <button onClick={onMute} title="静音">
        <Volume1 size={18} />
      </button>
    )
  } else {
    return (
      <button onClick={onMute} title="静音">
        <Volume2 size={18} />
      </button>
    )
  }
}

let prevVol = localVol

const Volume: React.FC = () => {
  const current = usePlayerListStore((s) => s.current)
  const { setVolume } = usePlayer()
  const [vol, setVol] = useState(localVol)

  const setMusicVolume = useCallback(
    (value: number) => {
      setVol(value)
      setVolume(value)
    },
    [setVolume]
  )

  const onMute = useCallback(() => {
    prevVol = localVol
    setMusicVolume(0)
  }, [setMusicVolume])

  const onRestore = useCallback(() => {
    setMusicVolume(prevVol)
  }, [setMusicVolume])

  return (
    <div className="flex items-center gap-1">
      <VolumeIcon value={vol} onMute={onMute} onRestore={onRestore} />
      <Slider
        disabled={current === undefined}
        value={[vol]}
        max={100}
        step={1}
        className="mx-auto"
        onValueChange={(value) => setMusicVolume(value[0])}
      />
    </div>
  )
}

export default Volume
