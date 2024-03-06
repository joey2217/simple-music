import { Slider } from '@/components/ui/slider'
import { usePlayer } from '@/main/context/PlayerContext'
import { vol } from '@/main/utils/player'
import React from 'react'

const Volume: React.FC = () => {
  const { current, setVolume } = usePlayer()
  return (
    <Slider
      disabled={current === undefined}
      defaultValue={[vol]}
      max={100}
      step={1}
      className="mx-auto"
      onValueChange={(value) => setVolume(value[0])}
    />
  )
}

export default Volume
