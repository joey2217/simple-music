import React from 'react'
import MusicInfo from './MusicInfo'
import Control from './Control'
import PlayList from './PlayList'
import Volume from './Volume'
import { PlayerProvider } from './PlayerContext'

const Player: React.FC = () => {
  return (
    <PlayerProvider>
      <footer
        className="px-2 grid grid-cols-12 items-center gap-2 bg-base-300"
        id="player"
      >
        <div className="col-span-3">
          <MusicInfo />
        </div>
        <div className="col-span-8 md:col-span-6">
          <Control />
        </div>
        <div className="hidden md:block md:col-span-1">
          <Volume />
        </div>
        <div className="col-span-2">
          <PlayList />
        </div>
      </footer>
    </PlayerProvider>
  )
}

export default Player
