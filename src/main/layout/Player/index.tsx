import React from 'react'
import MusicInfo from './MusicInfo'
import Control from './Control'
import PlayerList from './PlayerList'
import Volume from './Volume'
import { PlayerProvider } from './PlayerContext'

const Player: React.FC = () => {
  return (
    <PlayerProvider>
      <footer
        className="px-2 grid grid-cols-12 items-center gap-2 bg-base-300 fixed bottom-0 left-0 w-full z-40"
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
          <PlayerList />
        </div>
      </footer>
    </PlayerProvider>
  )
}

export default Player
