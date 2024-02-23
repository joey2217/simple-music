import React from 'react'
import MusicInfo from './MusicInfo'
import Control from './Control'
import PlayList from './PlayList'

const Player: React.FC = () => {
  return (
    <footer className="px-2 grid grid-cols-12 gap-2 bg-base-300" id="player">
      <div className="col-span-3">
        <MusicInfo />
      </div>
      <div className="col-span-8 md:col-span-6">
        <Control />
      </div>
      <div className="hidden md:block col-span-2">3</div>
      <div className="col-span-1">
        <PlayList />
      </div>
    </footer>
  )
}

export default Player