import React from 'react'

const Player: React.FC = () => {
  return (
    <div className="px-2 grid grid-cols-12 gap-2 items-center">
      <div className="col-span-3"></div>
      <div className="col-span-8 md:col-span-6"></div>
      <div className="hidden md:block col-span-2"></div>
      <div className="col-span-1"></div>
    </div>
  )
}

export default Player
