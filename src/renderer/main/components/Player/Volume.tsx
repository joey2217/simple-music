import React, { memo, useCallback } from 'react'
import Slider from 'rc-slider'
import { usePlaylist } from '../../store/hooks'
import { VolumeIcon, VolumeMute } from '../icons'

let prevVolume = 50

const Volume: React.FC = () => {
  const { playerVolume, setPlayerVolume } = usePlaylist()

  const toggleMute = useCallback(() => {
    setPlayerVolume((vol) => {
      if (vol > 0) {
        prevVolume = vol
        return 0
      } else {
        return prevVolume
      }
    })
  }, [setPlayerVolume])

  return (
    <div className="flex items-center gap-2 max-w-[200px] mx-auto">
      <button className="text-xl" onClick={toggleMute}>
        {playerVolume === 0 ? <VolumeMute /> : <VolumeIcon />}
      </button>
      <Slider
        max={100}
        value={playerVolume}
        onChange={(val) => setPlayerVolume(val as number)}
      />
    </div>
  )
}

export default memo(Volume)
