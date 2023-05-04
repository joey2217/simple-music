import React, { memo } from 'react'
import Control from './Control'
import PlayList from './PlayList'
import MusicInfo from './MusicInfo'
import Volume from './Volume'

const Player: React.FC = () => {
  return (
    <div className="px-2 grid grid-cols-12 gap-2 bg-gray-100 dark:bg-gray-800 h-20 items-center">
      <div className="col-span-3">
        <MusicInfo />
      </div>
      <div className="col-span-8 md:col-span-6">
        <Control />
      </div>
      <div className="hidden md:block col-span-2">
        <Volume />
      </div>
      <div className="col-span-1">
        <PlayList />
      </div>
    </div>
  )
}

export default memo(Player)
